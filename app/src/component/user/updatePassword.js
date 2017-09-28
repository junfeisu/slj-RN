import React, { Component } from 'react'
import { View, Text, TextInput, Image, StyleSheet, Dimensions } from 'react-native'
import { Button, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { updatePassword, updatePasswording } from '../../store/actions/updatePassword'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    background: {
        resizeMode: 'cover',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null
    },
    updateForm: {
        width: windowWidth * 0.7,
        height: windowWidth * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 18,
        color: '#000',
        marginBottom: 20
    },
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
    button: {
        width: 200
    }
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
            newPassword: '',
            loading: false,
            user_id: '',
            token: ''
        }
    }

    updatePassword = () => {
        const { oldPassword, newPassword, user_id, token } = this.state
        if (!oldPassword && !newPassword) {
            Toast.info('新旧密码为必填项', 2)
        } else {
            if (user_id && token) {
                let info = { oldPassword, newPassword, user_id }
                this.props.dispatch(updatePasswording())
                updatePassword(info, token)(this.props.dispatch)
            }
        }
    }

    componentWillMount () {
        storage.load({
            key: 'user'
        }).then(ret => {
            this.setState({
                user_id: ret.user_id,
                token: ret.token
            })
        }).catch(err => {
            Actions.login()
        })
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.err !== this.props.err) {
            Toast.fail(nextProps.err.message, 2)
        }
        if (nextProps.result !== this.props.result) {
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
        const { oldPassword, newPassword, loading } = this.state
        return (
            <Image 
                style={styles.background}
                source={require('../../assets/image/updatePasswordBackground.png')}
            >
                <View style={styles.updateForm}>
                    <Text style={styles.title}>修改密码</Text>
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
                        value={newPassword}
                        placeholder="new passWord"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({newPassword: text})}
                    />
                    <Button
                        style={styles.button}
                        type="primary"
                        loading={loading}
                        disabled={loading}
                        onClick={this.updatePassword}
                    >
                        {loading ? '正在修改...' : '修改'}
                    </Button>
                </View>
            </Image>
        )
    }
}

export default connect(mapStateToProps)(UpdatePassword)
