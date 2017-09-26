import React, { Component } from 'react'
import {
    ScrollView,
    View,
    TextInput,
    Text,
    StyleSheet
} from 'react-native'
import Button from 'react-native-button'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { register, registering } from '../../store/actions/register'

const styles = StyleSheet.create({
    register: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    containerStyle: {
        width: 300,
        height: 400,
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
    registerInput: {
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
    registerBtn: {
        width: 200,
        height: 40,
        textAlignVertical: 'center',
        borderWidth: 0,
        borderRadius: 4,
        backgroundColor: '#3b99fc',
        color: 'white'
    }
})

const mapStateToProps = (state) => ({
    user: state.registerState.user,
    err: state.registerState.err,
    status: state.registerState.status,
})

class Register extends Component {
    constructor () {
        super()
        this.state = {
            username: '',
            password: '',
            ensurePassword: '',
            slogan: '',
            birthday: '',
            user_icon: '',
            registerBtnText: '注册'
        }
    }

    removeUnnecessaeyKey = (userInfo) => {
        if (!userInfo.birthday) {
            delete userInfo.birthday
        }
        if (!userInfo.slogan) {
            delete userInfo.slogan
        }
    }

    register = () => {
        if (this.props.status !== 'registering') {
            const { username, password, ensurePassword, birthday, slogan } = this.state
            if (password !== ensurePassword) {
                alert('密码和再次确认的密码不一样')
            } else {
                let userInfo = {
                    username,
                    password,
                    birthday,
                    slogan
                }
                this.props.dispatch(registering())
                this.removeUnnecessaeyKey(userInfo)
                register(userInfo)(this.props.dispatch)
            }
        } else {
            alert('正在注册中')
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.user !== this.props.user && nextProps.user.user_id) {
            Actions.login()
        }
        if (nextProps.err !== this.props.err) {
            alert('注册失败，原因是' + nextProps.err.response.data.message)
        }
        if (nextProps.status !== this.props.status) {
            this.setState({
                registerBtnText: nextProps.status === 'registering' ? '正在注册...' : '注册'
            })
        }
    }

    render () {
        const { username, password, ensurePassword, slogan, birthday, registerBtnText } = this.state
        return (
            <ScrollView contentContainerStyle={styles.register}>
                <View style={styles.containerStyle}>
                    <Text style={styles.title}>注册</Text>
                    <TextInput
                        style={styles.registerInput}
                        value={username}
                        placeholder="Username"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({username: text})}
                    />
                    <TextInput
                        style={styles.registerInput}
                        value={password}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({password: text})}
                    />
                    <TextInput
                        style={styles.registerInput}
                        value={ensurePassword}
                        placeholder="ensure password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({ensurePassword: text})}
                    />
                    <TextInput
                        style={styles.registerInput}
                        value={slogan}
                        placeholder="Slogan"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({slogan: text})}
                    />
                    <TextInput
                        style={styles.registerInput}
                        value={birthday}
                        placeholder="Birthday, eg: 1996-07-28"
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => this.setState({birthday: text})}
                    />
                    <Button
                        style={styles.registerBtn}
                        onPress={this.register}
                    >
                        {registerBtnText}
                    </Button>
                    <Text onPress={Actions.login} style={{marginTop: 10}}>已有账号去登录</Text>
                </View>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Register)
