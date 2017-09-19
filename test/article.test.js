const Lab = require('lab')
const lab = exports.lab = Lab.script()
const { describe, it, before, beforeEach, after } = lab
const expect = require('chai').expect
const Hapi = require('hapi')
const server = require('../server').server
const articleModel = require('../schemas/articleSchema')
const userModel = require('../schemas/userSchema')
const testUtils = require('../utils/testUtil')
const cryptic = require('../utils/cryptic')

const testUserInfo = {
    user_id: '1',
    username: 'testarticle',
    password: 'article'
}

const login = () => {
    const loginInfo = {
        method: 'POST',
        url: '/user/login',
        payload: {
            username: testUserInfo.username,
            password: testUserInfo.password
        }
    }
    return new Promise((resolve, reject) => {
        server.inject(loginInfo, response => {
            resolve(response.result)
        })
    })
}

// 测试新增文章
describe('test add article', () => {
    const options = {
        method: 'PUT',
        url: '/article/add',
        payload: {}
    }

    before(done => {
        let copyUserInfo = Object.assign({}, testUserInfo, {password: cryptic(testUserInfo.password)})
        new userModel(copyUserInfo).save((err, result) => {
            done()
        })
    })

    // 对title的检测
    it('should return 400, title is need', done => {
        login()
            .then(userInfo => {
                options.payload = {
                    content: 'this is test',
                    tags: ['add', 'test'],
                    author: userInfo.user_id
                }
                options.headers = {
                    Authorization: userInfo.token
                }

                server.inject(options, response => {
                    let badRequestMessage = 'child \"title\" fails because [\"title\" is required]'
                    testUtils.badParam(response, badRequestMessage)
                    done()
                })
            })
            .catch(done)
    })

    it('should return 400, title is not a string', done => {
        options.payload.title = {value: 'testarticle'}
        server.inject(options, response => {
            let badRequestMessage = 'child \"title\" fails because [\"title\" must be a string]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, title length less than 1', done => {
        options.payload.title = ''
        server.inject(options, response => {
            let badRequestMessage = 'child \"title\" fails because [\"title\" is not allowed to be empty]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })
    
    // 对content的检测
    it('should return 400, content is need', done => {
        delete options.payload.content
        options.payload.title = 'test'

        server.inject(options, response => {
            let badRequestMessage = 'child \"content\" fails because [\"content\" is required]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, content is not a string', done => {
        options.payload.content = {value: 'testarticle'}
        server.inject(options, response => {
            let badRequestMessage = 'child \"content\" fails because [\"content\" must be a string]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, content length less than 1', done => {
        options.payload.content = ''
        server.inject(options, response => {
            let badRequestMessage = 'child \"content\" fails because [\"content\" is not allowed to be empty]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })
    
    // 对author的检测
    it('should return 400, author is need', done => {
        delete options.payload.author
        options.payload.content = 'this is test'

        server.inject(options, response => {
            let badRequestMessage = 'child \"author\" fails because [\"author\" is required]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, author is not a number', done => {
        options.payload.author = {value: '1'}
        server.inject(options, response => {
            let badRequestMessage = 'child \"author\" fails because [\"author\" must be a number]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, author is not a integer', done => {
        options.payload.author = '1.1'
        server.inject(options, response => {
            let badRequestMessage = 'child \"author\" fails because [\"author\" must be an integer]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, author less than 1', done => {
        options.payload.author = '0'
        server.inject(options, response => {
            let badRequestMessage = 'child \"author\" fails because [\"author\" must be larger than or equal to 1]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    // 对tags的检测
    it('should return 400, tags is need', done => {
        login()
            .then(userInfo => {
                options.payload.author = userInfo.user_id
                delete options.payload.tags

                server.inject(options, response => {
                    let badRequestMessage = 'child \"tags\" fails because [\"tags\" is required]'
                    testUtils.badParam(response, badRequestMessage)
                    done()
                })
            })
            .catch(done)
    })

    it('should return 400, tags is not an array', done => {
        options.payload.tags = {name: 'test'}

        server.inject(options, response => {
            let badRequestMessage = 'child "tags" fails because ["tags" must be an array]'
            testUtils.badParam(response, badRequestMessage)
            done()
        })
    })

    it('should return 200, return right info', done => {
        options.payload.tags = ["test", "add"]

        server.inject(options, response => {
            expect(response).to.have.property('statusCode', 200)
            expect(response).to.have.property('result')
            expect(response.result).to.have.property('article_id')
            expect(response.result).to.have.property('create_date')
            expect(response.result).to.have.property('title', options.payload.title)
            expect(response.result).to.have.property('content', options.payload.content)
            expect(response.result.tags).to.deep.equal(options.payload.tags)
            expect(response.result).to.have.property('author', options.payload.author)
            done()
        })
    })

    after(done => {
        userModel.remove({username: 'testarticle'}, (err, result) => {
            done()
        })
    })
})
