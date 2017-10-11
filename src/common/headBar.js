import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
    navBar: {
        height: 30,
        flexDirection: 'row',
        backgroundColor: '#00b5ad',
        alignItems: 'center',
        position: 'relative'
    },
    backIcon: {
        position: 'absolute',
        width: 20,
        height: 20,
        left: 10,
        top: 5
    },
    title: {
        flex: 1,
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    }
})

class HeadBar extends Component {
    constructor (props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render () {
        return (
            <View style={styles.navBar}>
                <TouchableOpacity
                    onPress={() => {
                        Actions.pop()
                    }}
                    activeOpacity={1}
                    style={{width: 30, height: 30}}
                >
                    <Image source={{
                            uri: 'http://7xrp7o.com1.z0.glb.clouddn.com/arrow.png'
                        }}
                        height={20}
                        width={20}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.title}</Text>
            </View>
        )
    }
}

export default HeadBar
