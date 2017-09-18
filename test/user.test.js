const Lab = require('lab')
const lab = exports.lab = Lab.script()
const { describe, it, before } = lab
const expect = require('chai').expect
const Hapi = require('hapi')
const server = require('../server').server
const userModel = require('../schemas/userSchema')
const testUtils = require('../utils/testUtil')
const cryptic = require('../utils/cryptic')

// 在测试之前启动服务
describe('server start', () => {
    before(done => {
        server.start()
        userModel.remove({username: 'test'}, (err, result) => {
            done()
        })
    })
})

// 添加用户API的测试
describe('add user API', () => {
    const options = {
        method: 'PUT',
        url: '/user/add',
        payload: {}
    }

    /* 对参数username的一系列检测
     * 是否有username参数
     * 是否为string类型
     * string的长度是否小于1
     */
    it('should return 400, username is need', done => {
        options.payload = {
            user_id: '1',
            password: '1234445'
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"username\" fails because [\"username\" is required]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, username is not string', done => {
        options.payload = {
            username: {name: '123'},
            password: '123456',
            user_id: '1'
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"username\" fails because [\"username\" must be a string]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, username length less than 1', done => {
        options.payload = {
            username: '',
            password: '123456',
            user_id: '1'
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"username\" fails because [\"username\" is not allowed to be empty]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })
    
    /* 对参数user_id的一系列检测
     * 是否有user_id参数
     * 是否为number类型
     * 是否为integer类型
     * number的值是否小于1
     */
    it('should return 400, user_id is need', done => {
        options.payload = {
            password: '1234445',
            username: 'sujunfei'
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"user_id\" fails because [\"user_id\" is required]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, user_id is not number', done => {
        options.payload = {
            username: '123',
            password: '123456',
            user_id: 'qwer'
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"user_id\" fails because [\"user_id\" must be a number]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, user_id is not integer', done => {
        options.payload = {
            username: '123',
            password: '123456',
            user_id: '1.1'
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"user_id\" fails because [\"user_id\" must be an integer]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, user_id less than 1', done => {
        options.payload = {
            username: '1231',
            password: '123456',
            user_id: '0'
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"user_id\" fails because [\"user_id\" must be larger than or equal to 1]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })
    
    /* 对参数password的一系列检测
     * 是否有password参数
     * 是否为string类型
     * string的长度是否小于6
     */
    it('should return 400, password is need', done => {
        options.payload = {
            user_id: '1',
            username: 'sujunfei'
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"password\" fails because [\"password\" is required]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, password is not string', done => {
        options.payload = {
            password: {name: '123'},
            username: '123456',
            user_id: '1'
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"password\" fails because [\"password\" must be a string]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, password length less than 6', done => {
        options.payload = {
            username: '123',
            password: '12356',
            user_id: '1'
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"password\" fails because [\"password\" length must be at least 6 characters long]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    /* 对参数user_icon的一系列检测
     * 是否为string类型
     * 是否符合格式
     */
    it('should return 400, user_icon is not a string', done => {
        options.payload = {
            user_id: '1',
            username: 'sjffly',
            password: '123456',
            user_icon: {src: 'test.png'}
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"user_icon\" fails because [\"user_icon\" must be a string]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, user_icon format is not valid', done => {
        options.payload = {
            user_id: '1',
            username: 'sjffly',
            password: '123456',
            user_icon: 'http://test.jng'
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"user_icon\" fails because [\"user_icon\" with value \"http:&#x2f;&#x2f;test.jng\" fails to match the required pattern: /^.+\\.(jpg|jpeg|png|gif)$/]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    /* 对slogan参数的一系列检测
     * 是否为string类型
     * 长度是否小于1
     */
    it('should return 400, slogan is not a string', done => {
        options.payload = {
            user_id: '1',
            username: 'sjffly',
            password: '123456',
            slogan: {src: 'test.png'}
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"slogan\" fails because [\"slogan\" must be a string]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, slogan length less than 1', done => {
        options.payload = {
            user_id: '1',
            username: 'sjffly',
            password: '123456',
            slogan: ''
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"slogan\" fails because [\"slogan\" is not allowed to be empty]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    /* 对birthday参数的一系列检测
     * 是否为string类型
     * 格式是否符合
     */
    it('should return 400, birthday is not a string', done => {
        options.payload = {
            user_id: '1',
            username: 'sjffly',
            password: '123456',
            birthday: {src: 'test.png'}
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"birthday\" fails because [\"birthday\" must be a string]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, birthday format is not valid', done => {
        options.payload = {
            user_id: '1',
            username: 'sjffly',
            password: '12345642342',
            birthday: '1996-13-12'
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"birthday\" fails because [\"birthday\" with value \"' + options.payload.birthday + '\" fails to match the required pattern: /^(19[0-9]{2}|20[0-1][0-7])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })
    
    /* 对200返回的一系列检测
     * 不应该返回password
     * 没填slogan，是否返回默认slogan
     * 没填birthday，是否返回默认birthday
     * 没填user_icon，是否返回默认user_icon
     * 返回的信息是否和提交的信息是否一致
     */
    it('should return 200, return the result does not have password', done => {
        options.payload = {
            user_id: '1',
            username: 'test',
            password: '123456'
        }

        userModel.remove({username: 'test'}, (err, result) => {
            server.inject(options, response => {
                expect(response).to.have.property('statusCode', 200)
                expect(response).to.have.property('result')
                expect(response.result).to.not.have.property('password')
                done()
            })
        })
    })

    it('should return 200, return the default slogan', done => {
        options.payload = {
            user_id: '1',
            username: 'test',
            password: '123456',
            user_icon: 'http://test.png',
            birthday: '2017-09-15'
        }
        
        userModel.remove({username: 'test'}, (err, result) => {
            server.inject(options, response => {
                expect(response).to.have.property('statusCode', 200)
                expect(response).to.have.property('result')
                expect(response.result).to.have.property('slogan', 'slj is forever') // default value
                done()
            })
        })
    })

    it('should return 200, return the default birthday', done => {
        options.payload = {
            user_id: '1',
            username: 'test',
            password: '123456',
            user_icon: 'http://test.png',
            slogan: 'this is for test'
        }
        
        userModel.remove({username: 'test'}, (err, result) => {
            server.inject(options, response => {
                expect(response).to.have.property('statusCode', 200)
                expect(response).to.have.property('result')
                expect(response.result).to.have.property('birthday', '1996-07-28') // default value
                done()
            })
        })
    })

    it('should return 200, return the default user_icon', done => {
        options.payload = {
            user_id: '1',
            username: 'test',
            password: '123456',
            birthday: '2017-09-15',
            slogan: 'this is for test'
        }
        
        userModel.remove({username: 'test'}, (err, result) => {
            server.inject(options, response => {
                expect(response).to.have.property('statusCode', 200)
                expect(response).to.have.property('result')
                expect(response.result).to.have.property('user_icon', 'https://ohjoq511u.qnssl.com/2016-10-19-07-21-15-290709/1-14092G22551.jpg') // default value
                done()
            })
        })
    })

    it('should return 200, return info is same with the payload', done => {
        options.payload = {
            user_id: '1',
            username: 'test',
            password: '123456',
            user_icon: 'http://test.png',
            slogan: 'this is for test',
            birthday: '2017-09-15'
        }
        
        userModel.remove({username: 'test'}, (err, result) => {
            if (err) {
                throw err
            }

            server.inject(options, response => {
                expect(response).to.have.property('statusCode', 200)
                expect(response).to.have.property('result')
                expect(response.result).to.have.property('username', options.payload.username)
                expect(response.result).to.have.property('birthday', options.payload.birthday)
                expect(response.result).to.have.property('user_icon', options.payload.user_icon)
                expect(response.result).to.have.property('slogan', options.payload.slogan)
                done()
            })
        })
    })
})

// 测试登录API的测试
describe('user login API', () => {
    const options = {
        method: 'POST',
        url: '/user/login',
        payload: {}
    }

    const testUserInfo = {
        username: 'test',
        password: 'testlogin',
        user_id: '1'
    }

    /* 对参数username的一系列测试
     * 是否有username参数
     * 是否为string类型
     * 是否长度小于1
     */
    it('should return 400, username is need', done => {
        options.payload = {
            password: testUserInfo.password
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"username\" fails because [\"username\" is required]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, username is not string', done => {
        options.payload = {
            username: {name: '123'},
            password: testUserInfo.password
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"username\" fails because [\"username\" must be a string]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, username length less than 1', done => {
        options.payload = {
            username: '',
            password: testUserInfo.password
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"username\" fails because [\"username\" is not allowed to be empty]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    /* 对参数password的一系列检测
     * 是否有password参数
     * 是否为string类型
     * 是否长度小于6
     */
    it('should return 400, password is need', done => {
        options.payload = {
            username: testUserInfo.username
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"password\" fails because [\"password\" is required]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, password is not string', done => {
        options.payload = {
            username: testUserInfo.username,
            password: {value: 'testlogin'}
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"password\" fails because [\"password\" must be a string]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, password length less than 6', done => {
        options.payload = {
            username: testUserInfo.username,
            password: 'test'
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"password\" fails because [\"password\" length must be at least 6 characters long]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    /* 正常响应的一系列检测
     * 是否返回password
     * 是否返回token
     * 是否返回user_id
     */
    it('should return 200, return info should have token, user_id and not have password', done => {
        let copyUserInfo = Object.assign({}, testUserInfo, {password: cryptic(testUserInfo.password)})
        new userModel(copyUserInfo).save((err, result) => {
            options.payload = {
                username: testUserInfo.username,
                password: testUserInfo.password
            }

            server.inject(options, response => {
                expect(response).to.have.property('statusCode', 200)
                expect(response).to.have.property('result')
                expect(response.result).to.not.have.property('password')
                expect(response.result).to.have.property('user_id')
                expect(response.result).to.have.property('token')
                done()
            })
        })
    })
})

// 获取用户信息API的测试
describe('get user API', () => {
    const options = {
        method: 'GET'
    }

    let testUserInfo = {
        user_id: '1',
        username: 'test',
        password: 'testget'
    }

    /* 对参数userId的一系列检测
     * 是否有userId参数
     * 是否为number类型
     * 是否为integer类型
     * 是否小于1
     */
    it('should return 404, does not have userId', done => {
        options.url = '/user/'
        server.inject(options, response => {
            expect(response).to.have.property('statusCode', 404)
            expect(response).to.have.property('result')
            expect(response.result).to.have.property('error', 'Not Found')
            expect(response.result).to.have.property('message', 'Not Found')
            done()
        })
    })

    it('should return 400, userId is not the number', done => {
        options.url = '/user/s'
        server.inject(options, response => {
            let badRequestMessage = 'child \"userId\" fails because [\"userId\" must be a number]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, userId is not the integer', done => {
        options.url = '/user/1.1'
        server.inject(options, response => {
            let badRequestMessage = 'child \"userId\" fails because [\"userId\" must be an integer]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, userId is less than 1', done => {
        options.url = '/user/0'
        server.inject(options, response => {
            let badRequestMessage = 'child \"userId\" fails because [\"userId\" must be larger than or equal to 1]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    /*
     * 没有Authorization的header
     * 错误的token
     * token过期
     */
    it('should return 400', 'token is not add to headers', done => {
        let copyUserInfo = Object.assign({}, testUserInfo, {password: cryptic(testUserInfo.password)})
        let userId = 1

        before(done => {
            new userModel(copyUserInfo).save((err, result) => {
                if (result && result.username === copyUserInfo.username) {
                    userId = result.user_id
                }
                done()
            })
        })

        options.url = '/user/' + userId
        server.inject(options, response => {
            console.log(response)
            let badRequestMessage = 'Authorization header is need'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })
})