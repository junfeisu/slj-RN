import React, { Component } from 'react'
import { ScrollView, ListView, View, Image, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button, Toast } from 'antd-mobile'
import HeadBar from '../../common/headBar'
import moment from 'moment'
import { getSingleArticle, gettingArticle } from '../../store/actions/articleDetail'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    backImage: {
        width: windowWidth,
        height: windowHeight * 0.3
    },
    articleDesc: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        paddingRight: 10
    },
    articleDescInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
    },
    articleInfoIcon: {
        width: 20,
        height: 20,
        marginRight: 8
    },
    articleContentContainer: {
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    articleContentText: {
        lineHeight: 25,
        fontSize: 16,
        color: '#000',
    },
    commentContainer: {
        margin: 10,
        borderBottomWidth: 1,
        paddingBottom: 10,
        borderBottomColor: '#ccc'
    },
    commentInput: {
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 3,
        fontSize: 14,
        padding: 0,
        paddingLeft: 10
    },
    commentBtn: {
        width: 80,
        height: 35,
        alignSelf: 'flex-end'
    },
    commentListContainer: {
        padding: 10,
        paddingTop: 0
    },
    commentDetail: {
        flexDirection: 'row',
        marginTop: 10,
        paddingRight: 30
    },
    commentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    commentDetailContent: {
        marginLeft: 10,
        marginRight: 10
    }
})

const mapStateToProps = (state) => ({
    article: state.articleDetailState.article,
    err: state.articleDetailState.err,
    status: state.articleDetailState.status
})

class ArticleDetail extends Component {
    constructor (props) {
        super(props)
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })

        this.state = {
            commentContent: '',
            dataSource: ds,
            data: this.props.article.comments
        }
    }

    componentWillMount () {
        const { articleId, user, dispatch } = this.props
        dispatch(gettingArticle())
        getSingleArticle(articleId, user.token)(dispatch)
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.article !== this.props.article) {
            this.setState({
                data: nextProps.article.comments
            })
        }
        if (nextProps.err !== this.props.err) {
            Toast.fail(err)
        }
    }

    renderCommentList = (comment) => {
        const Item = ListView.Item

        return (
            <View style={styles.commentDetail}>
                <Image style={{width: 35, height: 35, borderRadius: 35}} width={35} height={35} source={{uri: 'http://7xrp7o.com1.z0.glb.clouddn.com/sjfblog.png'}}></Image>
                <View style={styles.commentDetailContent}>
                    <View style={styles.commentInfo}>
                        <Text>{comment.comment_user}</Text>
                        <Text>{moment(comment.comment_date).format('YYYY-MM-DD HH:MM')}</Text>
                    </View>
                    <Text>{comment.comment_content}</Text>
                </View>
            </View>
        )
    }

    render () {
        const { dataSource, data, commentContent } = this.state
        const { title, content, tags, create_date, author, comments } = this.props.article

        return (
            <ScrollView>
                <HeadBar title="标题" />
                <View>
                    <Image style={styles.backImage} height={windowHeight * 0.3} source={require('../../assets/image/article-background.jpg')}></Image>
                </View>
                <View style={styles.articleDesc}>
                    <View style={styles.articleDescInfo}>
                        <Image style={styles.articleInfoIcon} source={require('../../assets/image/author.png')}></Image>
                        <Text>{author.username}</Text>
                    </View>
                    <View style={styles.articleDescInfo}>
                        <Image style={styles.articleInfoIcon} source={require('../../assets/image/comment.png')}></Image>
                        <Text>{comments.length}</Text>
                    </View>
                    <View style={styles.articleDescInfo}>
                        <Image style={styles.articleInfoIcon} source={require('../../assets/image/clock.png')}></Image>
                        <Text>{moment(create_date).format('YYYY-MM-DD HH:MM')}</Text>
                    </View>
                </View>
                <View style={styles.articleContentContainer}>
                    <Text style={styles.articleContentText}>
                        {content}
                    </Text>
                </View>
                <View style={styles.commentContainer}>
                    <TextInput 
                        style={styles.commentInput}
                        value={commentContent}
                        placeholder="请输入评论内容"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({commentContent: text})}
                    />
                    <Button
                        type="primary"
                        style={styles.commentBtn}
                    >
                        评论
                    </Button>
                </View>
                <View style={styles.commentListContainer}>
                    <Text>评论列表</Text>
                    <ListView
                        dataSource={dataSource.cloneWithRows(data)}
                        renderRow={(rowData) => this.renderCommentList(rowData)}
                        initialListSize={3}
                    />
                </View>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(ArticleDetail)