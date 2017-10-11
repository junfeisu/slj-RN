import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native'
import moment from 'moment'

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
    }
})

export default class ArticleDesc extends Component {
    constructor (props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render () {
        console.log('desc render')
        const { username, create_date, commentsLength, content } = this.props

        return (
            <View>
                <Image style={styles.backImage} height={windowHeight * 0.3} source={require('../../assets/image/article-background.jpg')}></Image>
                <View style={styles.articleDesc}>
                    <View style={styles.articleDescInfo}>
                        <Image style={styles.articleInfoIcon} source={require('../../assets/image/author.png')}></Image>
                        <Text>{username}</Text>
                    </View>
                    <View style={styles.articleDescInfo}>
                        <Image style={styles.articleInfoIcon} source={require('../../assets/image/comment.png')}></Image>
                        <Text>{commentsLength}</Text>
                    </View>
                    <View style={styles.articleDescInfo}>
                        <Image style={styles.articleInfoIcon} source={require('../../assets/image/clock.png')}></Image>
                        <Text>{moment(create_date).format('YYYY-MM-DD HH:MM')}</Text>
                    </View>
                </View>
                <View style={styles.articleContentContainer}>
                    <Text style={styles.articleContentText}>{content}</Text>
                </View>
            </View>
        )
    }
}
