import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, ListView, Image, Text, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { List } from 'antd-mobile'

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
            dataSource: ds.cloneWithRows(['13223', '43434', '43434', '43434', '43434', '43434'])
        }
    }

    renderArticle = () => {
        const Item = List.Item
        const Brief = Item.Brief
        return (
            <View style={styles.articleItem}>
                <List>
                    <Item
                      thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                      multipleLine
                      onClick={() => {}}
                    >
                      Title <Brief>subtitle</Brief>
                    </Item>
                </List>
                <List>
                    <Item
                      multipleLine
                      wrap
                    >
                        这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
                    </Item>
                </List>
                <View style={styles.articleDesc}>
                    <Text>2017-09-28 08:32</Text>
                    <View style={styles.articleTags}>
                        <Text>test</Text>
                        <Text>test</Text>
                    </View>
                </View>
            </View>
        )
    }

    render () {
        const { dataSource } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>只属于你和ta的空间</Text>
                </View>
                <ListView
                    dataSource={dataSource}
                    renderRow={(rowData) => this.renderArticle(rowData)}
                    initialListSize={3}
                />
            </View>
        )
    }
}

export default connect(mapStateToProps)(Article)

