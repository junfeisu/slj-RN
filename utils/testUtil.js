const expect = require('chai').expect

const utils = {
    badParam (response, badRequestMessage) {
        expect(response).to.have.property('statusCode', 400)
        expect(response).to.have.property('result')
        expect(response.result).to.have.property('statusCode', 400)
        expect(response.result).to.have.property('error', 'Bad Request')
        expect(response.result).to.have.property('message', badRequestMessage)
    }
}

module.exports = utils
