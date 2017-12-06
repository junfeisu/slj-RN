import React, { Component } from 'react'
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import addNewArticle from '../../store/actions/addNewArticle'
import HeadBar from '../../common/headBar'
import { Toast } from 'antd-mobile'

const styles = StyleSheet.create({
    head: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    headTitle: {
        color: '#000000',
        fontSize: 16
    },
    titleContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10
    },
    titleInput: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingLeft: 5,
        justifyContent: 'center'
    },
    contentContainer: {
        paddingLeft: 20,
        paddingRight: 20
    },
    contentInput: {
        padding: 5,
        flex: 1,
        lineHeight: 16,
        fontSize: 14,
        textAlignVertical: 'top'
    },
    publishBtn: {
        height: 20,
        width: 40,
        color: '#1890ff',
        fontSize: 16,
        backgroundColor: '#f6f6f6'
    }
})

const mapStateToProps = (state) => ({
    article: state.addNewArticleState.article,
    err: state.addNewArticleState.err,
    status: state.addNewArticleState.status
})

class AddNewArticle extends Component {
    constructor (props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            tags: [],
            disablePublish: false
        }
    }

    publishArticle = () => {
        const { title, content, disablePublish } = this.state
        const { user, dispatch } = this.props

        if (!disablePublish) {
            if (!title || !content) {
                Toast.info('文章标题或者内容不能为空', 2)
                return
            }
            
            let articleInfo = {
                title,
                content,
                tags: ['test', 'love'],
                author: user.user_id
            }
            
            addNewArticle(articleInfo)(dispatch)
            this.setState({
                disablePublish: true
            })
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.article !== this.props.article && nextProps.status === 'succ') {
            Actions.main({user: this.props.user})
        }
        if (nextProps.err !== this.props.err) {
            Toast.fail(nextProps.err.message, 2)
        }
        if (nextProps.status === 'fail') {
            this.setState({
                disablePublish: false
            })
        }
    }

    render () {
        const { title, content, tags } = this.state
        const publishBtn = <Text style={styles.publishBtn} onPress={this.publishArticle}>发布</Text>
        return (
            <ScrollView>
                <HeadBar title="添加文章" otherComponent={publishBtn} />
                <View style={styles.titleContainer}>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="添加文章标题"
                        value={title}
                        onChangeText={(text) => this.setState({title: text})}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={styles.contentContainer}>
                    <TextInput
                        style={styles.contentInput}
                        placeholder="填写文章内容"
                        value={content}
                        multiline={true}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({content: text})}
                    />
                </View>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(AddNewArticle)
