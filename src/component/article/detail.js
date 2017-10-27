import React, { Component } from 'react'
import { 
    ScrollView, ListView, View, Image, Text, TextInput, StyleSheet, 
    Dimensions, TouchableOpacity, Keyboard 
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button, Toast } from 'antd-mobile'
import HeadBar from '../../common/headBar'
import KeyboardSpacer from '../../common/KeyboardSpacer'
import ArticleDesc from './articleDesc'
import moment from 'moment'
import { getSingleArticle, gettingArticle, uploadComment } from '../../store/actions/articleDetail'

const styles = StyleSheet.create({
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
        flex: 1,
        padding: 10,
        paddingTop: 0
    },
    commentDetail: {
        flexDirection: 'row',
        marginTop: 10
    },
    commentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    commentDetailContent: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    },
    commentUserIcon: {
        width: 35,
        height: 35,
        borderRadius: 35
    },
    noneCommentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noneCommentText: {
        fontSize: 18,
        color: '#000'
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
            data: this.props.article.comments,
            keyboardSpaceHeight: 0
        }
    }

    keyboardDidShowHandler = () => {
        if (!this.endCoordinates) {
            return
        }

        let keyboardHeight = this.endCoordinates.height
        this.setState({
            keyboardSpaceHeight: keyboardHeight
        })
    }

    keyboardDidHideHandler = () => {
        this.setState({
            keyboardSpaceHeight: 0
        })
    }

    addComment = () => {
        const { user, article, dispatch } = this.props
        const { commentContent } = this.state

        if (!commentContent) {
            Toast.info('评论内容不能为空', 1)
            return
        }

        let commentInfo = {
            comment_user: user.user_id,
            comment_content: commentContent,
            article_id: article.article_id
        }
        uploadComment(commentInfo, user.token)(dispatch)
    }

    componentWillMount () {
        const { articleId, user, dispatch } = this.props
        dispatch(gettingArticle())
        getSingleArticle(articleId, user.token)(dispatch)

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShowHandler)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHideHandler)
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.article !== this.props.article) {
            this.setState({
                data: nextProps.article.comments.reverse(),
                commentContent: ''
            })
        }
        if (nextProps.err !== this.props.err) {
            Toast.fail(nextProps.err.message, 2)
        }
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    renderCommentList = (comment) => {
        return (
            <View style={styles.commentDetail} key={comment.comment_id}>
                <Image style={styles.commentUserIcon} width={35} height={35} source={{uri: 'http://7xrp7o.com1.z0.glb.clouddn.com/sjfblog.png'}}></Image>
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
        const { dataSource, data, commentContent, keyboardSpaceHeight } = this.state
        const { title, content, tags, create_date, author, comments } = this.props.article

        return (
            <ScrollView contentContainerStyle={{flex:1}}>
                <HeadBar title={title} />
                <ArticleDesc
                    username={author.username}
                    create_date={create_date}
                    commentsLength={comments.length}
                    content={content}
                />
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
                        onClick={this.addComment}
                    >
                        评论
                    </Button>
                </View>
                <View style={styles.commentListContainer}>
                    <Text>评论列表</Text>
                    {
                        comments.length ? (<ListView
                            dataSource={dataSource.cloneWithRows(data)}
                            renderRow={(rowData) => this.renderCommentList(rowData)}
                            initialListSize={3}
                        />) : (<View style={styles.noneCommentContainer}>
                            <Text style={styles.noneCommentText}>暂无评论，快来占个沙发</Text>
                        </View>)
                    }
                </View>
                <KeyboardSpacer keyboardSpaceHeight={keyboardSpaceHeight} />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(ArticleDetail)
