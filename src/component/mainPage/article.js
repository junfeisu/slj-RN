import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ListView, Image, Text, RefreshControl, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { List } from 'antd-mobile'
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
            data: ds.cloneWithRows(this.props.articleList),
            skipNum: 0,
            refreshing: true,
            loadMore: false
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
        if (user.friend) {
            getArticleListFilter.friend = user.friend
        }
        dispatch(gettingArticleList())
        if (user && user.token) {
            getArticleList(getArticleListFilter, user.token)(dispatch)
        } else {
            console.log('test')
        }
    }

    onRefresh = () => {
        this.setState({
            skipNum: this.props.articleList.length
        }, () => {
            this.fetchData()
        })
    }

    loadingNextArticle = () => {
        this.setState({
            skipNum: this.props.articleList.length,
            loadMore: true
        }, () => {
            this.fetchData()
        })
    }

    componentWillMount () {
        this.fetchData()
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.articleList !== this.props.articleList) {
            this.setState({
                data: nextProps.articleList
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
                <Text style={{fontSize: 16, color: '#777'}}>加载更多...</Text>
            </View> : null
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>只属于你和ta的空间</Text>
                </View>
                <ListView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                    dataSource={dataSource.cloneWithRows(data)}
                    renderRow={(rowData) => this.renderArticle(rowData)}
                    initialListSize={3}
                    onEndReached={this.loadingNextArticle}
                    onEndReachedThreshold={5}
                    renderFooter={() => FooterView}
                />
            </View>
        )
    }
}

export default connect(mapStateToProps)(Article)
