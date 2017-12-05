import React, { Component } from 'react'
import { ScrollView, View, Text, TextInput, StyleSheet } from 'react-native'
import HeadBar from '../../common/headBar'

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
    }
})

class AddNewArticle extends Component {
    constructor (props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            tags: [],
            author: 0
        }
    }

    render () {
        const { title, content, tags } = this.state
        return (
            <ScrollView>
                <HeadBar title="添加文章" />
                <View style={styles.titleContainer}>
                    <TextInput
                        style={styles.titleInput}
                        placeholder="添加文章标题"
                        value={title}
                        onChange={(text) => this.setState({title: text})}
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
                        onChange={(text) => this.setState({content: text})}
                    />
                </View>
            </ScrollView>
        )
    }
}

export default AddNewArticle
