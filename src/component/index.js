import { connect } from 'react-redux'
import Login from './user/login'
import Register from './user/register'

const loginMapStateToProps = (state) => ({})
const loginMapDispatchToProps = {}

const registerMapStateToProps = (state) => ({})
const registerMapDispatchToProps = {}

const loginWithStore = connect(loginMapStateToProps, loginMapDispatchToProps)(Login)
const registerWithStore = connect(registerMapStateToProps, registerMapDispatchToProps)(Register)

export default {
    loginWithStore,
    registerWithStore
}
