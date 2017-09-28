import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight, Dimensions, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Popup, List } from 'antd-mobile'
import ImagePicker from 'react-native-image-crop-picker'
import axios from 'axios'
import uploadFile from '../../common/uploadFile'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

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

export default class Profile extends Component {
    constructor () {
        super()
        this.state = {
            user: {
                username: '',
                slogan: '',
                birthday: '',
                user_icon: '',
                upToken: ''
            }
        }
    }

    showPopup = () => {
        Popup.show(
            <UploadAvatarPopup 
                onClose={() => Popup.hide()} 
                openCamera={this.openCamera} 
                openImageLibrary={this.openImageLibrary} 
            />
        )
    }

    openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log('camera image', image)
        })
    }

    openImageLibrary = () => {
        let self = this
        ImagePicker.openPicker({
            multiple: false
        }).then(image => {
            uploadFile({
                token: self.state.upToken,
                key: image.path.split('Camera/')[1],
                path: image.path
            })
        })
    }

    updatePassword = () => {
        Actions.updatePassword()
    }

    loginOut = () => {
        storage.remove({key: 'user'})
        Actions.login()
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
        return (
            <View style={styles.profile}>
                <Image source={{uri: user_icon}} style={styles.backUserIcon}>
                    <View style={styles.backShadow}></View>
                    <View style={styles.desc}>
                        <TouchableHighlight
                            underlayColor="rgba(0,0,0,.6)"
                            onPress={this.showPopup}
                        >
                            <Image source={{uri: user_icon}} style={styles.avatar}></Image>
                        </TouchableHighlight>
                        <View style={styles.info}>
                            <Text style={styles.username}>{username}</Text>
                            <Text style={styles.slogan}>{slogan}</Text>
                        </View>
                    </View>
                </Image>
                <View style={styles.operation}>
                    <Text style={styles.item}>关于作者</Text>
                    <Text style={styles.item} onPress={this.updatePassword}>修改密码</Text>
                    <Text style={styles.item} onPress={this.loginOut}>退出</Text>
                </View>
            </View>
        )
    }
}
