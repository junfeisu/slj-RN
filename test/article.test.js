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

// 登录测试用户比返回Promise
const login = (testUserInfo) => {
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

// 添加测试文章并返回Promise
const addArticle = (articleInfo, token) => {
    const addArticleOptions = {
        method: 'PUT',
        url: '/article/add',
        payload: articleInfo,
        headers: {
            Authorization: token
        }
    }

    return new Promise((resolve, reject) => {
        server.inject(addArticleOptions, response => {
            resolve(response.result)
        })
    })
}

// 每个API测试之前的操作
const beforeTestOperations = (testUserInfo) => {
    before(done => {
        let copyUserInfo = Object.assign({}, testUserInfo, {password: cryptic(testUserInfo.password)})
        new userModel(copyUserInfo).save((err, result) => {
            done()
        })
    })
}

// 每个API测试之后的操作
const afterTestOperations = () => {
    after(done => {
        userModel.remove({username: 'testarticle'}, (err, result) => {
            done()
        })
    })
}

// 在所有测试之前先删除以前的测试文章
describe('remove article before test', () => {
    before(done => {
        articleModel.remove({content: 'this is test'}, (err, result) => {
            done()
        })
    })
})

// 测试新增文章
describe('test add article', () => {
    const options = {
        method: 'PUT',
        url: '/article/add',
        payload: {}
    }

    const testUserInfo = {
        user_id: '1',
        username: 'testarticle',
        password: 'article'
    }

    beforeTestOperations(testUserInfo)

    // 对title的检测
    it('should return 400, title is need', done => {
        login(testUserInfo)
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
                    testUtils.badRequest(response, badRequestMessage)
                    done()
                })
            })
            .catch(done)
    })

    it('should return 400, title is not a string', done => {
        options.payload.title = {value: 'testarticle'}
        server.inject(options, response => {
            let badRequestMessage = 'child \"title\" fails because [\"title\" must be a string]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, title length less than 1', done => {
        options.payload.title = ''
        server.inject(options, response => {
            let badRequestMessage = 'child \"title\" fails because [\"title\" is not allowed to be empty]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })
    
    // 对content的检测
    it('should return 400, content is need', done => {
        delete options.payload.content
        options.payload.title = 'test'

        server.inject(options, response => {
            let badRequestMessage = 'child \"content\" fails because [\"content\" is required]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, content is not a string', done => {
        options.payload.content = {value: 'testarticle'}
        server.inject(options, response => {
            let badRequestMessage = 'child \"content\" fails because [\"content\" must be a string]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, content length less than 1', done => {
        options.payload.content = ''
        server.inject(options, response => {
            let badRequestMessage = 'child \"content\" fails because [\"content\" is not allowed to be empty]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })
    
    // 对author的检测
    it('should return 400, author is need', done => {
        delete options.payload.author
        options.payload.content = 'this is test'

        server.inject(options, response => {
            let badRequestMessage = 'child \"author\" fails because [\"author\" is required]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, author is not a number', done => {
        options.payload.author = {value: '1'}
        server.inject(options, response => {
            let badRequestMessage = 'child \"author\" fails because [\"author\" must be a number]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, author is not a integer', done => {
        options.payload.author = '1.1'
        server.inject(options, response => {
            let badRequestMessage = 'child \"author\" fails because [\"author\" must be an integer]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, author less than 1', done => {
        options.payload.author = '0'
        server.inject(options, response => {
            let badRequestMessage = 'child \"author\" fails because [\"author\" must be larger than or equal to 1]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    // 对tags的检测
    it('should return 400, tags is need', done => {
        login(testUserInfo)
            .then(userInfo => {
                options.payload.author = userInfo.user_id
                delete options.payload.tags

                server.inject(options, response => {
                    let badRequestMessage = 'child \"tags\" fails because [\"tags\" is required]'
                    testUtils.badRequest(response, badRequestMessage)
                    done()
                })
            })
            .catch(done)
    })

    it('should return 400, tags is not an array', done => {
        options.payload.tags = {name: 'test'}

        server.inject(options, response => {
            let badRequestMessage = 'child "tags" fails because ["tags" must be an array]'
            testUtils.badRequest(response, badRequestMessage)
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

    afterTestOperations()
})

// 测试获得单个文章
describe('test get single article', () => {
    const options = {
        method: 'GET',
        url: '/article/'
    }

    const testUserInfo = {
        user_id: '1',
        username: 'testarticle',
        password: 'article'
    }

    const testArticleInfo = {
        title: 'test add',
        content: 'this is test',
        author: 1,
        tags: ['test', 'add']
    }

    beforeTestOperations(testUserInfo)

    it('should return 404, articleId is need', done => {
        login(testUserInfo)
            .then(user => {
                options.headers = {
                    Authorization: user.token
                }
                testArticleInfo.author = user.user_id

                server.inject(options, response => {
                    expect(response).to.have.property('statusCode', 404)
                    expect(response).to.have.property('result')
                    expect(response.result).to.have.property('error', 'Not Found')
                    expect(response.result).to.have.property('message', 'Not Found')
                    done()
                })
            })
            .catch(done)
    })

    it('should return 400, articleId is not a number', done => {
        options.url += 'ss'
        server.inject(options, response => {
            let badRequestMessage = 'child \"articleId\" fails because [\"articleId\" must be a number]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, articleId is not a integer', done => {
        options.url = '/article/1.1'
        server.inject(options, response => {
            let badRequestMessage = 'child \"articleId\" fails because [\"articleId\" must be an integer]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, articleId is less than 1', done => {
        options.url = '/article/0',
        server.inject(options, response => {
            let badRequestMessage = 'child \"articleId\" fails because [\"articleId\" must be larger than or equal to 1]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 200, return right info', done => {
        addArticle(testArticleInfo, options.headers.Authorization)
            .then(article => {
                options.url = '/article/' + article.article_id
                server.inject(options, response => {
                    expect(response).to.have.property('statusCode', 200)
                    expect(response).to.have.property('result')
                    expect(response.result).to.have.property('comments')
                    expect(response.result).to.have.property('create_date')
                    expect(response.result).to.have.property('article_id', article.article_id)
                    expect(response.result).to.have.property('title', testArticleInfo.title)
                    expect(response.result).to.have.property('content', testArticleInfo.content)
                    expect(response.result).to.have.property('author', testArticleInfo.author)
                    expect(response.result.tags).to.deep.equal(testArticleInfo.tags)
                    done()
                })
            })
            .catch(done)
    })

    afterTestOperations()
})

// 测试修改文章
describe('test update article', () => {
    const options = {
        method: 'POST',
        url: '/article/update',
        payload: {}
    }

    const testUserInfo = {
        username: 'testarticle',
        password: 'article',
        user_id: '1'
    }

    const testArticleInfo = {
        title: 'test update',
        content: 'this is test',
        author: '1',
        tags: ['test', 'update']
    }

    beforeTestOperations(testUserInfo)

    it('should return 404, articleId is need', done => {
        login(testUserInfo)
            .then(user => {
                options.headers = {
                    Authorization: user.token
                }
                testArticleInfo.author = user.user_id

                server.inject(options, response => {
                    expect(response).to.have.property('statusCode', 404)
                    expect(response).to.have.property('result')
                    expect(response.result).to.have.property('error', 'Not Found')
                    expect(response.result).to.have.property('message', 'Not Found')
                    done()
                })
            })
            .catch(done)
    })

    it('should return 400, articleId is not a number', done => {
        options.url += '/s'
        server.inject(options, response => {
            let badRequestMessage = 'child \"articleId\" fails because [\"articleId\" must be a number]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, articleId is not a integer', done => {
        options.url = '/article/update/1.1'
        server.inject(options, response => {
            let badRequestMessage = 'child \"articleId\" fails because [\"articleId\" must be an integer]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, articleId is less than 1', done => {
        options.url = '/article/update/0',
        server.inject(options, response => {
            let badRequestMessage = 'child \"articleId\" fails because [\"articleId\" must be larger than or equal to 1]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, title is not a string', done => {
        addArticle(testArticleInfo, options.headers.Authorization)
            .then(article => {
                options.url = '/article/update/' + article.article_id
                options.payload = {
                    title: {value: 'test update'}
                }

                server.inject(options, response => {
                    let badRequestMessage = 'child \"title\" fails because [\"title\" must be a string]'
                    testUtils.badRequest(response, badRequestMessage)
                    done()
                })
            })
    })

    it('should return 400, title length less than 1', done => {
        options.payload.title = ''
        server.inject(options, response => {
            let badRequestMessage = 'child \"title\" fails because [\"title\" is not allowed to be empty]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, content is not a string', done => {
        options.payload = {
            title: 'test update',
            content: {value: 'this is test'}
        }

        server.inject(options, response => {
            let badRequestMessage = 'child \"content\" fails because [\"content\" must be a string]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, content length less than 1', done => {
        options.payload.content = ''
        server.inject(options, response => {
            let badRequestMessage = 'child \"content\" fails because [\"content\" is not allowed to be empty]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, tags is not an array', done => {
        options.payload = {
            content: 'this is the updated content',
            tags: {name: 'test'}
        }

        server.inject(options, response => {
            let badRequestMessage = 'child "tags" fails because ["tags" must be an array]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 200, update fail because none is update', done => {
        options.payload = {
            title: 'test update',
            content: 'this is test'
        }

        server.inject(options, response => {
            expect(response).to.have.property('statusCode', 200)
            expect(response).to.have.property('result')
            expect(response.result).to.have.property('message', '修改文章失败')
            done()
        })
    })

    it('should return 200, update success', done => {
        options.payload = {
            title: 'this is the updated title',
            tags: ['test', 'upadte']
        }

        server.inject(options, response => {
            expect(response).to.have.property('statusCode', 200)
            expect(response).to.have.property('result')
            expect(response.result).to.have.property('message', '修改文章成功')
            done()
        })
    })

    afterTestOperations()
})

// 测试删除文章
describe('test remove article', () => {
    const options = {
        method: 'DELETE',
        url: '/article/remove',
        payload: {}
    }

    const testUserInfo = {
        username: 'testarticle',
        password: 'article',
        user_id: '1'
    }

    const testArticleInfo = {
        title: 'test delete',
        content: 'this is test',
        author: '1',
        tags: ['test', 'delete']
    }

    beforeTestOperations(testUserInfo)

    it('should be return 400, articleId is need', done => {
        login(testUserInfo)
            .then(user => {
                options.headers = {
                    Authorization: user.token
                }

                server.inject(options, response => {
                    let badRequestMessage = 'child \"articleId\" fails because [\"articleId\" is required]'
                    testUtils.badRequest(response, badRequestMessage)
                    done()
                })
            })
            .catch(done)
    })

    it('should be return 400, articleId is not a number', done => {
        options.payload = {
            articleId: {value: 1}
        }
        server.inject(options, response => {
            let badRequestMessage = 'child \"articleId\" fails because [\"articleId\" must be a number]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should be return 400, articleId is not an integer', done => {
        options.payload.articleId = '1.1'
        server.inject(options, response => {
            let badRequestMessage = 'child \"articleId\" fails because [\"articleId\" must be an integer]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should be return 400, articleId is less than 1', done => {
        options.payload.articleId = '0'
        server.inject(options, response => {
            let badRequestMessage = 'child \"articleId\" fails because [\"articleId\" must be larger than or equal to 1]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 200, delete success', done => {
        addArticle(testArticleInfo, options.headers.Authorization)
            .then(article => {
                options.payload.articleId = article.article_id
                server.inject(options, response => {
                    expect(response).to.have.property('statusCode', 200)
                    expect(response).to.have.property('result')
                    expect(response.result).to.have.property('message', '删除文章成功')
                    done()
                })
            })
            .catch(done)
    })

    afterTestOperations()
})

describe('test get article list', () => {
    const options = {
        method: 'GET',
        url: '/article/list'
    }

    const testUserInfo = {
        username: 'testarticle',
        password: 'article',
        user_id: '1'
    }

    const testArticleInfo = {
        title: 'test get list',
        content: 'this is test',
        author: '1',
        tags: ['test', 'getList']
    }

    beforeTestOperations(testUserInfo)

    it('should return 400, skip is need', done => {
        login(testUserInfo)
            .then(user => {
                options.headers = {
                    Authorization: user.token
                }
                server.inject(options, response => {
                    let badRequestMessage = 'child \"skip\" fails because [\"skip\" is required]'
                    testUtils.badRequest(response, badRequestMessage)
                    done()
                })
            })
            .catch(done)
    })

    it('should return 400, skip is not a number', done => {
        options.url += '?skip={name: 1}'
        server.inject(options, response => {
            let badRequestMessage = 'child \"skip\" fails because [\"skip\" must be a number]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, skip is not an integer', done => {
        options.url = '/article/list?skip=1.1'
        server.inject(options, response => {
            let badRequestMessage = 'child \"skip\" fails because [\"skip\" must be an integer]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 400, skip is less than 0', done => {
        options.url = '/article/list?skip=-1'
        server.inject(options, response => {
            let badRequestMessage = 'child \"skip\" fails because [\"skip\" must be larger than or equal to 0]'
            testUtils.badRequest(response, badRequestMessage)
            done()
        })
    })

    it('should return 200, return a empty array', done => {
        options.url = '/article/list?skip=0'
        articleModel.remove({}, (err, result) => {
            server.inject(options, response => {
                expect(response).to.have.property('statusCode', 200)
                expect(response).to.have.property('result')
                expect(response.result).to.deep.equal([])
                done()
            })
        })
    })

    it('should return 200, return a array with one content', done => {
        options.url = '/article/list?skip=0'
        addArticle(testArticleInfo, options.headers.Authorization)
            .then(article => {
                server.inject(options, response => {
                    expect(response).to.have.property('statusCode', 200)
                    expect(response).to.have.property('result')
                    expect(response.result).to.be.an('array').with.lengthOf(1)
                    done()
                })
            })
            .catch(done)
    })

    afterTestOperations()
})
