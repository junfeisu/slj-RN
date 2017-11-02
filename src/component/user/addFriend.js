import React, { Component } from 'react'
import { ScrollView, View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Button, Toast, SearchBar } from 'antd-mobile'
import { Actions } from 'react-native-router-flux'
import searchUser from '../../store/actions/searchUser'
import HeadBar from '../../common/headBar'

const styles = StyleSheet.create({
    searchResult: {
        width: '100%',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff'
    },
    searchResultItem: {
        height: 45,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    usericon: {
        width: 35,
        height: 35,
        borderRadius: 35
    },
    username: {
        fontSize: 18,
        marginLeft: 10
    }
})

const mapStateToProps = (state) => ({
    users: state.searchUserState.users,
    err: state.searchUserState.err
})

class AddFriend extends Component {
    constructor (props) {
        super(props)
        this.state = {
            searchContent: '',
            users: this.props.users
        }
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.err !== nextProps.err) {
            Toast.fail(err.message, 3)
        }
        if (this.props.users !== nextProps.users) {
            this.setState({
                users: nextProps.users
            })
        }
    }

    searchUserHandler = () => {
        const { user, dispatch } = this.props
        const { searchContent } = this.state

        if (!searchContent) {
            Toast.info('搜索内容不能为空', 2)
            this.setState({
                users: []
            })
            return
        }

        searchUser(searchContent, user.token)(dispatch)
    }

    changeHandler = (searchContent) => {
        this.setState({
            searchContent
        }, this.searchUserHandler)
    }

    render () {
        const { searchContent, users } = this.state
        return (
            <ScrollView>
                <HeadBar title="搜索"></HeadBar>
                <SearchBar
                    placeholder="搜索用户"
                    cancelText="取消"
                    value={searchContent}
                    onChange={(value) => this.changeHandler(value)}
                    onCancel={this.searchUserHandler}
                />
                <View style={styles.searchResult}>
                    {
                        users.map(user => {
                            return (
                                <View style={styles.searchResultItem}>
                                    <Image style={styles.usericon} source={{uri: user.user_icon}}></Image>
                                    <Text style={styles.username}>{user.username}</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(AddFriend)
