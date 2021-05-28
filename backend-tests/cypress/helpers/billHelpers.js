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
        Cypress.env({lastID:response.body.id})
    }))

}

function editBillPayload(){
    let billPayload = {
        "value": faker.commerce.price(),
        "id": Cypress.env().lastID,
        "created": faker.date.past(),
        "paid":true
    }
    return billPayload
}

function editBillRequest(idToEdit){
    cy.request({
        method:'PUT',
        url: 'http://localhost:3000/api/bill/'+idToEdit,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type':'application/json'
        },
        body: editBillPayload()
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function deleteBillRequest(idToDelete){
    cy.request({
        method:'DELETE',
        url: 'http://localhost:3000/api/bill/'+idToDelete,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type':'application/json'
        }
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function performLogout(){
    cy.request({
        method: 'POST',
        url:'http://localhost:3000/api/logout',
        headers:{
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type':'application/json'
        }
    }).then((response => {
        expect(response.status).to.eq(200)
    }))
}

//exports
module.exports = {
    createBillValue,
    createBillRequest,
    editBillRequest,
    deleteBillRequest,
    performLogout
}