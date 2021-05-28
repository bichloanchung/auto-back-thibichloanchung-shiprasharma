const faker = require('faker')

const CREATE_ROOM_ENDPOINT = 'http://localhost:3000/api/room/new'
const EDIT_ROOM_ENDPOINT = 'http://localhost:3000/api/room/'
//functions
function createRoomPayload(){
    let roomPayload = {
        "category":faker.commerce.department(), 
        "floor":faker.datatype.number(),
        "number":faker.datatype.number(),
        "available":faker.datatype.boolean(),
        "price":faker.datatype.number(),
        "features":faker.commerce.department()
    }

    return roomPayload
}


function createEditPayload(){
    let EditPayload = {
        "floor": faker.datatype.number(),
        "number": faker.datatype.number(),
        "price": faker.datatype.number()
    }

    return EditPayload
}


function createRoomRequest(){
    cy.request({
        method: 'POST',
        url: CREATE_ROOM_ENDPOINT,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        }, 
        body:createRoomPayload()
    }).then((response => {
        expect(response.status).to.eq(200)
        Cypress.env({lastID:response.body.id})
        
    }))
}

function editRoomRequest(idToEdit){
    cy.log("Edit room ID:"+ idToEdit)
     cy.request({
         method: 'PUT',
                 url: EDIT_ROOM_ENDPOINT +idToEdit,
                 headers: {
                     'x-user-Auth':JSON.stringify(Cypress.env().loginToken),
                     'Content-Type': 'application/json'
                 },
                 body:createEditPayload()
             }).then((response =>{
                 expect(response.status).to.eq(200)
                 cy.log(JSON.stringify(response.body))
                 
             }))

            }


function deleteRoomRequest(idToDelete){
    cy.log("Delete room ID:"+ idToDelete)
    cy.request({
        method: 'DELETE',
        url:'http://localhost:3000/api/room/'+idToDelete,
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        },                              
    }).then((response => {
        expect(response.status).to.eq(200)
    }))
}


function performLogout(){
    cy.request({
        method: 'POST',
        url:'http://localhost:3000/api/logout',
        headers: {
            'X-User-Auth':JSON.stringify(Cypress.env().loginToken), 
            'Content-Type': 'application/json'
        },                              
    }).then((response => {
        expect(response.status).to.eq(200)
    }))
}


//exports
module.exports = {
    createRoomPayload,
    createEditPayload,
    createRoomRequest,
    editRoomRequest,
    deleteRoomRequest,
    performLogout
}