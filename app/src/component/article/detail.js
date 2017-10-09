import React, { Component } from 'react'
import { View, Image, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Button } from 'antd-mobile'
import moment from 'moment'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    navBar: {
        height: 30,
        flexDirection: 'row',
        backgroundColor: '#00b5ad',
        alignItems: 'center',
        position: 'relative',
        zIndex: 99
    },
    backIcon: {
        position: 'absolute',
        width: 20,
        height: 20,
        left: 10,
        top: 5
    },
    title: {
        flex: 1,
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
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
        width: 100,
        height: 35,
        alignSelf: 'flex-end'
    },
    commentListContainer: {
        margin: 10,
        marginTop: 0
    }
})

class ArticleDetail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            commentContent: ''
        }
    }

    render () {
        const { commentContent } = this.state

        return (
            <View>
                <View style={styles.navBar}>
                    <TouchableOpacity
                        onPress={() => {
                            Actions.pop()
                        }}
                        activeOpacity={1}
                        style={{width: 30, height: 30}}
                    >
                        <Image source={{
                                uri: 'http://7xrp7o.com1.z0.glb.clouddn.com/arrow.png'
                            }}
                            height={20}
                            width={20}
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>文章标题</Text>
                </View>
                <View style={styles.articleDesc}>
                    <View style={styles.articleDescInfo}>
                        <Image style={styles.articleInfoIcon} source={require('../../assets/image/author.png')}></Image>
                        <Text>作者名</Text>
                    </View>
                    <View style={styles.articleDescInfo}>
                        <Image style={styles.articleInfoIcon} source={require('../../assets/image/comment.png')}></Image>
                        <Text>0</Text>
                    </View>
                    <View style={styles.articleDescInfo}>
                        <Image style={styles.articleInfoIcon} source={require('../../assets/image/clock.png')}></Image>
                        <Text>2017-10-09 12:38</Text>
                    </View>
                </View>
                <View style={styles.articleContentContainer}>
                    <Text style={styles.articleContentText}>
                        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
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
                    <View>
                        <Image style={{width: 35, height: 35, borderRadius: 35}} width={35} height={35} source={{uri: 'http://7xrp7o.com1.z0.glb.clouddn.com/sjfblog.png'}}></Image>
                        <Text>苏俊飞</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default ArticleDetail
