import React, { Component } from 'react'
import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native'
import { Button, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { updatePassword, updatePasswording } from '../../store/actions/updatePassword'

const styles = StyleSheet.create({
    input: {
        width: 200,
        height: 40,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 3,
        fontSize: 14,
        padding: 0,
        paddingLeft: 10
    },
})

const mapStateToProps = (state) => ({
    status: state.updatePasswordState.status,
    err: state.updatePasswordState.err,
    result: state.updatePasswordState.result
})

class UpdatePassword extends Component {
    constructor () {
        super()
        this.state = {
            oldPassword: '',
            newPassWord: '',
            loading: false,
            user_id: ''
        }
    }

    updatePassword = () => {
        const { oldPassword, newPassWord, user_id } = this.state
        if (!oldPassword && !newPassWord) {
            alert('新旧密码为必填项')
        } else {
            if (user_id) {
                let info = { oldPassword, newPassWord, user_id }
                this.props.dispatch(updatePasswording())
                updatePassword(info)(this.props.dispatch)
            }
        }
    }

    componentWillMount () {
        storage.load({
            key: 'user'
        }).then(ret => {
            this.setState({
                user_id: user.user_id
            })
        }).catch(err => {
            Actions.login()
        })
    }

    componetWillReceiveProps (nextProps) {
        if (nextProps.err !== this.props.err) {
            Toast.fail('更改密码失败，原因是' + nextProps.err.message, 2)
        }
        if (nextProps.result !== this.props.result) {
            alert(nextProps.result.message)
            if (nextProps.result.message === '修改密码成功，请重新登录') {
                Toast.success('修改密码成功，请重新登录', 2, () => {
                    storage.clearMapForKey('user')
                    Actions.login()
                })
            }
        }
        if (nextProps.status !== this.props.status) {
            this.setState({
                loading: nextProps.status === 'updating'
            })
        }
    }

    render () {
        const { oldPassword, newPassWord, loading } = this.state
        return (
            <View>
                <Text>修改密码</Text>
                <TextInput
                    style={styles.input}
                    value={oldPassword}
                    placeholder="old password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({oldPassword: text})}
                />
                <TextInput
                    style={styles.input}
                    value={newPassWord}
                    placeholder="new passWord"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({newPassWord: text})}
                />
                <Button
                    type="primary"
                    loading={loading}
                    disabled={loading}
                    onClick={this.updatePassword}
                >
                    {loading ? '正在修改...' : '修改'}
                </Button>
            </View>
        )
    }
}

export default connect(mapStateToProps)(UpdatePassword)
