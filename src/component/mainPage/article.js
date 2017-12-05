import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ListView, Image, Text, RefreshControl, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { List, Toast, Button } from 'antd-mobile'
import { getArticleList, gettingArticleList } from '../../store/actions/articleList'
import moment from 'moment'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccc'
    },
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    headerTitle: {
        color: '#f2928b',
        fontSize: 16
    },
    articleItem: {
        marginTop: 8,
        marginBottom: 8,
        backgroundColor: '#fff'
    },
    articleDesc: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        height: 35
    },
    articleTags: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        maxWidth: 100
    },
    footer: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadMore: {
        fontSize: 16,
        color: '#777'
    },
    noneArticleView: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    noneArticleIcon: {
        width: 110,
        height: 100
    },
    noneArticleText: {
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 10
    },
    jumpBtn: {
        width: 150,
        height: 35,
        borderRadius: 30,
        backgroundColor: 'rgb(255, 205, 0)',
        borderColor: '#ffc900',
        borderWidth: 1,
        fontSize: 14,
        color: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

const mapStateToProps = (state) => ({
    articleList: state.articleListState.articleList,
    err: state.articleListState.err,
    status: state.articleListState.status
})

class Article extends Component {
    constructor (props) {
        super(props)
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })

        this.state = {
            dataSource: ds,
            data: [],
            skipNum: 0,
            refreshing: true,
            loadMore: false,
            hasMoreData: true
        }
    }

    renderArticle = (article) => {
        const Item = List.Item

        return (
            <View style={styles.articleItem}>
                <List>
                    <Item
                      thumb={article.user && article.user.user_icon}
                      multipleLine
                      onClick={() => {Actions.articleDetail({articleId: article.article_id, user: this.props.user})}}
                      extra={article.user && article.user.username}
                    >
                      {article.title}
                    </Item>
                </List>
                <List>
                    <Item
                      multipleLine
                      wrap
                    >
                        {article.content}
                    </Item>
                </List>
                <View style={styles.articleDesc}>
                    <Text>{article.create_date && moment(article.create_date).format('YYYY-MM-DD HH:MM')}</Text>
                    <View style={styles.articleTags}>
                        {
                            article.tags && article.tags.map(tag => {
                                return <Text key={tag}>{tag}</Text>
                            })
                        }
                    </View>
                </View>
            </View>
        )
    }

    fetchData = () => {
        const { user, dispatch } = this.props
        const getArticleListFilter = {
            skip: this.state.skipNum,
            user_id: user.user_id
        }
        if (user && user.friend) {
            getArticleListFilter.friend = user.friend
        }
        dispatch(gettingArticleList())
        getArticleList(getArticleListFilter)(dispatch)
    }

    onRefresh = () => {
        this.setState({
            skipNum: 0,
            data: []
        }, this.fetchData)
    }

    loadingNextArticle = () => {
        if (this.state.hasMoreData) {
            this.setState({
                skipNum: this.props.articleList.length,
                loadMore: true
            }, this.fetchData)
        }
    }

    componentDidMount () {
        this.fetchData()
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.articleList !== this.props.articleList) {
            this.setState({
                data: [].concat(this.state.data, nextProps.articleList),
                hasMoreData: !(nextProps.articleList.length < 7)
            })
        }
        if (nextProps.status !== this.props.status) {
            this.setState({
                loadMore: false,
                refreshing: false
            })
        }
    }

    render () {
        const { dataSource, data, refreshing, loadMore } = this.state
        const FooterView = loadMore ?
            <View style={styles.footer}>
                <Text style={styles.loadMore}>加载更多...</Text>
            </View> : null

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>只属于你和ta的空间</Text>
                </View>
                {
                    !data.length 
                        ? <View style={styles.noneArticleView}>
                            <Image style={styles.noneArticleIcon} source={require('../../assets/image/none-article.jpg')}></Image>
                            <Text style={styles.noneArticleText}>暂未发表文章</Text>
                            <Button style={styles.jumpBtn} onClick={this.jumpNewArticle} type="primary">前去发表文章</Button>
                          </View>
                        : <ListView
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={this.onRefresh}
                                />
                            }
                            dataSource={dataSource.cloneWithRows(data)}
                            renderRow={(rowData) => this.renderArticle(rowData)}
                            initialListSize={4}
                            onEndReached={this.loadingNextArticle}
                            onEndReachedThreshold={20}
                            renderFooter={() => FooterView}
                          />
                        
                }
            </View>
        )
    }
}

export default connect(mapStateToProps)(Article)
