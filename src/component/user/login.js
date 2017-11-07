import React, { Component } from 'react'
import { ScrollView, View, Text, Image, TextInput, Keyboard, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Button, Toast } from 'antd-mobile'
import KeyboardSpacer from '../../common/KeyboardSpacer'
import { Actions } from 'react-native-router-flux'
import { login, loading } from '../../store/actions/login'
import { updateToken } from '../../common/fetch'

const styles = StyleSheet.create({
    background: {
        resizeMode: 'cover',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null
    },
    login: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginContainer: {
        width: 300,
        height: 300,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20
    },
    loginInput: {
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
    loginBtn: {
        width: 200,
        height: 40,
        textAlignVertical: 'center',
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: '#3b99fc',
        color: 'white'
    },
    otherOperation: {
        width: 150,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        marginBottom: 10
    },
    otherOperationText: {
        color: '#3b99fc',
        fontSize: 16,
        fontWeight: 'bold'
    },
    separator: {
        height: 25,
        width: 1,
        backgroundColor: 'rgba(0, 0, 0, .9)'
    }
})

const mapStateToProps = (state) => ({
    user: state.loginState.user,
    status: state.loginState.status,
    err: state.loginState.err
})

class Login extends Component {
    constructor () {
        super()
        this.state = {
            username: '',
            password: '',
            keyboardSpaceHeight: 0,
            loading: false,
            user: null
        }
    }

    login = () => {
        let userInfo = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.dispatch(loading())
        login(userInfo)(this.props.dispatch)
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

    componentWillReceiveProps (nextProps) {
        if (nextProps.user !== this.props.user && nextProps.user.user_id) {
            storage.save({
                key: 'user',
                data: nextProps.user
            })
            updateToken(nextProps.user.token + '|' + nextProps.user.user_id)
            Actions.main({user: nextProps.user})
        }
        if (nextProps.status !== this.props.status) {
            this.setState({
                loading: nextProps.status === 'logining'
            })
        }
        if (nextProps.err !== this.props.err) {
            Toast.fail(nextProps.err.message, 2)
        }
    }

    componentWillMount () {
        storage.load({
            key: 'user'
        }).then(ret => {
            if (ret) {
                this.setState({
                    user: ret
                })
                socket.emit('login', ret)
            }
        }).catch(err => {
            console.log('err', err)
        })

        socket.on('updateToken', newToken => {
            updateToken(newToken)
            Actions.main({user: this.state.user})
        })

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShowHandler)
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHideHandler)
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove()
        this.keyboardDidHideListener.remove()
    }

    render () {
        const { username, password, keyboardSpaceHeight, loading } = this.state
        return (
                <Image 
                    style={styles.background} 
                    source={require('../../assets/image/bg.jpg')}
                >
                    <ScrollView contentContainerStyle={styles.login}>
                        <View style={styles.loginContainer}>
                            <Text style={styles.title}>登录</Text>
                            <TextInput
                                style={styles.loginInput}
                                value={username}
                                placeholder="Username"
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({username: text})}
                            />
                            <TextInput
                                style={styles.loginInput}
                                value={password}
                                placeholder="Password"
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                                onChangeText={(text) => this.setState({password: text})}
                            />
                            <Button
                                style={styles.loginBtn}
                                onClick={this.login}
                                type="primary"
                                loading={loading}
                                disabled={loading}
                            >
                                {loading ? '正在登录...' : '登录'}
                            </Button>
                            <View style={styles.otherOperation}>
                                <Text style={styles.otherOperationText} onPress={Actions.forgotPassword}>忘记密码</Text>
                                <Text style={styles.separator}></Text>
                                <Text style={styles.otherOperationText} onPress={Actions.register}>注册</Text>
                            </View>
                        </View>
                        <KeyboardSpacer keyboardSpaceHeight={keyboardSpaceHeight} />
                    </ScrollView>
                </Image>
        )
    }
}

export default connect(mapStateToProps)(Login)
