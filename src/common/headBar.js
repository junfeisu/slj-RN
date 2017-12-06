import React, { Component } from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'

const styles = StyleSheet.create({
    navBar: {
        height: 30,
        flexDirection: 'row',
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        position: 'relative'
    },
    backContainer: {
        width: 30,
        height: 30
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
        color: '#383838',
        fontSize: 18,
        textAlign: 'center'
    },
    otherComponent: {
        position: 'absolute',
        right: 10
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
                    style={styles.backContainer}
                >
                    <Image 
                        source={require('../assets/image/back.png')}
                        height={20}
                        width={20}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>{this.props.title}</Text>
                {
                    this.props.otherComponent
                        ? <View style={styles.otherComponent}>
                            {this.props.otherComponent}
                          </View>
                        : null
                    
                }
            </View>
        )
    }
}

export default HeadBar
