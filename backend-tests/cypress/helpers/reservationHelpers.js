const faker = require('faker')

//functions
function createReserPayload(){
    let start = faker.date.between('2021-06-01','2021-06-20').toISOString()
    let end = faker.date.between('2021-07-01','2021-07-15').toISOString()
    let reserPayload = {
        "client": 2,
        "room": 2,
        "bill": 2,
        "start": start.toString().substring(0,10),
        "end": end.toString().substring(0,10)
    }
    return reserPayload
}

function createReserRequest(){
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/reservation/new',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type':'application/json'
        },
        body: createReserPayload()
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
        Cypress.env({lastID:response.body.id})
    }))
}

function editReserPayload(){
    let editStart = faker.date.between('2021-08-01', '2021-08-30').toISOString()
    let editEnd = faker.date.between('2021-09-01', '2021-09-30').toISOString()
    let reserPayloadEdit = {
        "client": 2,
        "room": 1,
        "bill": 2,
        "start": editStart.toString().substring(0,10),
        "end": editEnd.toString().substring(0,10),
        "id":9,
        "created": faker.date.recent()
    }
    return reserPayloadEdit
}

function editReserRequest(idToEdit){
    cy.request({
        method: 'PUT',
        url: 'http://localhost:3000/api/reservation/'+idToEdit,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
            'Content-Type':'application/json'
        },
        body: editReserPayload()
    }).then((response => {
        expect(response.status).to.eq(200)
        cy.log(JSON.stringify(response.body))
    }))
}

function deleteReserRequest(idToDelete){
    cy.request({
        method:'DELETE',
        url:'http://localhost:3000/api/reservation/'+idToDelete,
        headers:{
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
    createReserPayload,
    createReserRequest,
    editReserRequest,
    deleteReserRequest,
    performLogout
}