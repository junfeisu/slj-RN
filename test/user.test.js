const Lab = require('lab')
const lab = exports.lab = Lab.script()
const { describe, it, before } = lab
const expect = require('chai').expect
const Hapi = require('hapi')
const server = require('../server').server

// 在测试之前启动服务
describe('server start', () => {
    before(done => {
        server.start()
        done()
    })
})

// 添加用户API的测试
describe('add user API', () => {
    /* 对参数username的一系列检测
     * 是否有username参数
     * 是否为string类型
     * string的长度是否小于1
     */
    it('should return 400, username is need', done => {
        const options = {
            method: 'PUT',
            url: 'http://localhost:8000/user/add',
            payload: {
                user_id: '1',
                password: '1234445'
            }
        }

        server.inject(options, response => {
            expect(response).to.have.property('statusCode', 400)
            expect(response).to.have.property('result')
            expect(response.result).to.have.property('statusCode', 400)
            expect(response.result).to.have.property('error', 'Bad Request')
            expect(response.result).to.have.property('message', 'child \"username\" fails because [\"username\" is required]')
            done()
        })
    })

    it('should return 400, username is not string', done => {
        const options = {
            method: 'PUT',
            url: '/user/add',
            payload: {
                username: {name: '123'},
                password: '123456',
                user_id: '1'
            }
        }

        server.inject(options, response => {
            expect(response).to.have.property('statusCode', 400)
            expect(response).to.have.property('result')
            expect(response.result).to.have.property('statusCode', 400)
            expect(response.result).to.have.property('error', 'Bad Request')
            expect(response.result).to.have.property('message', 'child \"username\" fails because [\"username\" must be a string]')
            done()
        })
    })

    it('should return 400, username length less than 1', done => {
        const options = {
            method: 'PUT',
            url: '/user/add',
            payload: {
                username: '',
                password: '123456',
                user_id: '1'
            }
        }

        server.inject(options, response => {
            expect(response).to.have.property('statusCode', 400)
            expect(response).to.have.property('result')
            expect(response.result).to.have.property('statusCode', 400)
            expect(response.result).to.have.property('error', 'Bad Request')
            expect(response.result).to.have.property('message', 'child \"username\" fails because [\"username\" is not allowed to be empty]')
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
        const options = {
            method: 'PUT',
            url: 'http://localhost:8000/user/add',
            payload: {
                password: '1234445',
                username: 'sujunfei'
            }
        }

        server.inject(options, response => {
            expect(response).to.have.property('statusCode', 400)
            expect(response).to.have.property('result')
            expect(response.result).to.have.property('statusCode', 400)
            expect(response.result).to.have.property('error', 'Bad Request')
            expect(response.result).to.have.property('message', 'child \"user_id\" fails because [\"user_id\" is required]')
            done()
        })
    })

    it('should return 400, user_id is not number', done => {
        const options = {
            method: 'PUT',
            url: '/user/add',
            payload: {
                username: '123',
                password: '123456',
                user_id: 'qwer'
            }
        }

        server.inject(options, response => {
            expect(response).to.have.property('statusCode', 400)
            expect(response).to.have.property('result')
            expect(response.result).to.have.property('statusCode', 400)
            expect(response.result).to.have.property('error', 'Bad Request')
            expect(response.result).to.have.property('message', 'child \"user_id\" fails because [\"user_id\" must be a number]')
            done()
        })
    })

    it('should return 400, user_id is not integer', done => {
        const options = {
            method: 'PUT',
            url: '/user/add',
            payload: {
                username: '123',
                password: '123456',
                user_id: '1.1'
            }
        }

        server.inject(options, response => {
            expect(response).to.have.property('statusCode', 400)
            expect(response).to.have.property('result')
            expect(response.result).to.have.property('statusCode', 400)
            expect(response.result).to.have.property('error', 'Bad Request')
            expect(response.result).to.have.property('message', 'child \"user_id\" fails because [\"user_id\" must be an integer]')
            done()
        })
    })

    it('should return 400, user_id less than 1', done => {
        const options = {
            method: 'PUT',
            url: '/user/add',
            payload: {
                username: '1231',
                password: '123456',
                user_id: '0'
            }
        }

        server.inject(options, response => {
            expect(response).to.have.property('statusCode', 400)
            expect(response).to.have.property('result')
            expect(response.result).to.have.property('statusCode', 400)
            expect(response.result).to.have.property('error', 'Bad Request')
            expect(response.result).to.have.property('message', 'child \"user_id\" fails because [\"user_id\" must be larger than or equal to 1]')
            done()
        })
    })
    
    /* 对参数password的一系列检测
     * 是否有password参数
     * 是否为string类型
     * string的长度是否小于6
     */
    it('should return 400, password is need', done => {
        const options = {
            method: 'PUT',
            url: 'http://localhost:8000/user/add',
            payload: {
                user_id: '1',
                username: 'sujunfei'
            }
        }

        server.inject(options, response => {
            expect(response).to.have.property('statusCode', 400)
            expect(response).to.have.property('result')
            expect(response.result).to.have.property('statusCode', 400)
            expect(response.result).to.have.property('error', 'Bad Request')
            expect(response.result).to.have.property('message', 'child \"password\" fails because [\"password\" is required]')
            done()
        })
    })

    it('should return 400, password is not string', done => {
        const options = {
            method: 'PUT',
            url: '/user/add',
            payload: {
                password: {name: '123'},
                username: '123456',
                user_id: '1'
            }
        }

        server.inject(options, response => {
            expect(response).to.have.property('statusCode', 400)
            expect(response).to.have.property('result')
            expect(response.result).to.have.property('statusCode', 400)
            expect(response.result).to.have.property('error', 'Bad Request')
            expect(response.result).to.have.property('message', 'child \"password\" fails because [\"password\" must be a string]')
            done()
        })
    })

    it('should return 400, password length less than 6', done => {
        const options = {
            method: 'PUT',
            url: '/user/add',
            payload: {
                username: '123',
                password: '12356',
                user_id: '1'
            }
        }

        server.inject(options, response => {
            expect(response).to.have.property('statusCode', 400)
            expect(response).to.have.property('result')
            expect(response.result).to.have.property('statusCode', 400)
            expect(response.result).to.have.property('error', 'Bad Request')
            expect(response.result).to.have.property('message', 'child \"password\" fails because [\"password\" length must be at least 6 characters long]')
            done()
        })
    })
})