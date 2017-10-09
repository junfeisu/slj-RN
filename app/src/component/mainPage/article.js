import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ListView, Image, Text, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { List } from 'antd-mobile'
import { getArticleList, gettingArticleList } from '../../store/actions/articleList'
import axios from 'axios'

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
            data: ds.cloneWithRows(this.props.articleList)
        }
    }

    renderArticle = (article) => {
        const Item = List.Item
        const Brief = Item.Brief
        console.log('article', article)
        return (
            <View style={styles.articleItem}>
                <List>
                    <Item
                      thumb={article.user && article.user.user_icon}
                      multipleLine
                      onClick={() => {}}
                    >
                      {article.title} <Brief>{article.user && article.user.username}</Brief>
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
                    <Text>{article.create_date}</Text>
                    <View style={styles.articleTags}>
                        {
                            article.tags && article.tags.map(tag => {
                                return <Text>{tag}</Text>
                            })
                        }
                    </View>
                </View>
            </View>
        )
    }

    loadingNextArticle = () => {
        console.log('nextArticles')
    }

    componentWillMount () {
        const { user, dispatch } = this.props
        dispatch(gettingArticleList())
        getArticleList(0, user.token)(dispatch)
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.articleList !== this.props.articleList) {
            this.setState({
                data: nextProps.articleList
            })
        }
    }

    render () {
        const { dataSource, data } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>只属于你和ta的空间</Text>
                </View>
                <ListView
                    dataSource={dataSource.cloneWithRows(data)}
                    renderRow={(rowData) => this.renderArticle(rowData)}
                    initialListSize={3}
                    onEndReached={this.loadingNextArticle}
                    onEndReachedThreshold={5}
                />
            </View>
        )
    }
}

export default connect(mapStateToProps)(Article)
