import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Popup, List, Toast } from 'antd-mobile'
import ImagePicker from 'react-native-image-crop-picker'
import axios from 'axios'
import uploadFile from '../../common/uploadFile'
import { updateAvatar } from '../../store/actions/profile'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const mapStateToProps = (state) => ({
    user_icon: state.profileState.user_icon,
    status: state.profileState.status,
    err: state.profileState.err,
    progress: state.profileState.progress
})

const styles = StyleSheet.create({
    profile: {
        alignItems: 'center',
        height: windowHeight,
        backgroundColor: '#ccc'
    },
    backUserIcon: {
        width: windowWidth,
        height: windowHeight * 0.35
    },
    backShadow: {
        width: windowWidth,
        height: windowHeight * 0.35,
        backgroundColor: '#000',
        opacity: 0.6,
        position: 'absolute'
    },
    desc: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#ffe500'
    },
    username: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    slogan: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    operation: {
        width: windowWidth,
        marginTop: 20
    },
    item: {
        width: windowWidth,
        height: 45,
        lineHeight: 30,
        paddingLeft: 10,
        color: '#000',
        backgroundColor: '#fff',
        borderBottomColor: '#444',
        borderBottomWidth: 1
    }
})

class UploadAvatarPopup extends Component {
    render () {
        const Item = List.Item
        return (
            <List renderHeader={() => `上传头像`}>
                <Item onClick={this.props.openCamera}>拍照</Item>
                <Item onClick={this.props.openImageLibrary}>从图库选择</Item>
                <Item onClick={this.props.onClose}>取消</Item>
            </List>
        )
    }
}

class Profile extends Component {
    constructor () {
        super()
        this.state = {
            user: {
                user_id: 0,
                username: '',
                slogan: '',
                birthday: '',
                user_icon: '',
                token: '',
            },
            upToken: ''
        }
    }
    // 显示上传头像的Popup
    showPopup = () => {
        Popup.show(
            <UploadAvatarPopup 
                onClose={() => Popup.hide()} 
                openCamera={this.openCamera} 
                openImageLibrary={this.openImageLibrary}
            />
        )
    }
    // 打开相机
    openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log('camera image', image)
        })
    }
    // 打开图库
    openImageLibrary = () => {
        const { token, user_id } = this.state.user
        const { upToken } = this.state
        console.log('upToken')
        ImagePicker.openPicker({
            multiple: false
        }).then(image => {
            let filename = image.path.split('Camera/')[1]
            let key = new Date().getTime() + '-' + filename
            uploadFile({
                token: upToken,
                key: key,
                path: image.path,
                type: 'AVATAR'
            }, updateAvatar({key: key, token: token, userId: user_id}))(this.props.dispatch)
        })
    }
    // 跳转到修改密码
    updatePassword = () => {
        const { user_id } = this.state.user
        Actions.updatePassword({userId: user_id})
    }
    // 退出登录并清空storage
    loginOut = () => {
        storage.remove({key: 'user'})
        Actions.login()
    }

    componentWillReceiveProps (nextProps) {
        const { user } = this.state
        if (nextProps.user_icon !== this.props.user_icon) {
            let newUser = {...user, user_icon: nextProps.user_icon}
            this.setState({
                user: newUser
            })
            storage.save({
                key: 'user',
                data: newUser
            })
        }
        if (nextProps.progress < 1 && nextProps.status === 'uploading') {
            Toast.loading('上传' + nextProps.progress.toFixed(2).slice(2, 4) + '%')
        }
        if (nextProps.err !== this.props.err) {
            Toast.fail(nextProps.err, 2)
        }
    }

    componentWillMount () {
        storage.load({
            key: 'user'
        }).then(ret => {
            this.setState({
                user: ret
            })
            axios.get('http://localhost:8000/upload/up', {headers: {
                Authorization: ret.token
            }})
                .then(upToken => {
                    this.setState({
                        upToken: upToken.data.uploadToken
                    })
                })
        }).catch(err => {
            Actions.login()
        })
    }

    render () {
        const { username, slogan, birthday, user_icon } = this.state.user
        const Item = List.Item
        return (
            <View style={styles.profile}>
                <Image source={{uri: user_icon}} style={styles.backUserIcon}>
                    <View style={styles.backShadow}></View>
                    <View style={styles.desc}>
                        <TouchableOpacity
                            onPress={this.showPopup}
                            activeOpacity={1}
                        >
                            <Image source={{uri: user_icon}} style={styles.avatar}></Image>
                        </TouchableOpacity>
                        <View style={styles.info}>
                            <Text style={styles.username}>{username}</Text>
                            <Text style={styles.slogan}>{slogan}</Text>
                        </View>
                    </View>
                </Image>
                <List
                    style={styles.operation}
                    renderHeader={() => `用户操作`}
                >
                    <Item>关于作者</Item>
                    <Item onClick={this.updatePassword}>修改密码</Item>
                    <Item onClick={this.loginOut}>退出</Item>
                </List>
            </View>
        )
    }
}

export default connect(mapStateToProps)(Profile)
