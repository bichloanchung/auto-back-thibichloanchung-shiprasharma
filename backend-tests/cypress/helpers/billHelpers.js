var faker = require('faker')

//functions
function createBillValue(){
    let billValue = {
        "value":faker.commerce.price()
    }
    return billValue
}

function createBillRequest(){
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/bill/new',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type':'application/json'
            },
        body:createBillValue()
    }).then((response => {
        expect(response.status).to.eq(200)
    }))

}

//exports
module.exports = {
    createBillValue,
    createBillRequest
}