/// <reference types="cypress" />
describe('Example cy.request',() => {
   // https://docs.cypress.io/api/cypress-api/custom-command#syntax

   it('Request to /api/login',() =>{
       cy.authenticate()
   })

   it('GET Request for rooms list api/rooms',() =>{           
            cy.request({
                method: 'GET',
                url: 'http://localhost:3000/api/rooms',
                headers: {
                    'x-user-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
            }).then((response =>{
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))
    })



    it('GET Request room  by roomId api/room/roomId',() =>{
            cy.request({
                method: 'GET',
                url: 'http://localhost:3000/api/room/1',
                headers: {
                    'x-user-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
            }).then((response =>{
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                
            }))
    })

    it('POST Request to Create New Room api/room/new',() =>{
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/api/room/new',
                headers: {
                    'x-user-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type': 'application/json'
                },
                body:{
                    "category": "single",
                    "floor": 5,
                    "number": 506,
                    "available": true,
                    "price": 200,
                    "features": [
                        "balcony"
                    ]
                }
            }).then((response =>{
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
                Cypress.env({newRoomId:response.body.id})
                
            }))
    })

    it('PUT Request to edit room details by room id api/room/id',() =>{
            const newRoomId = Cypress.env().newRoomId
            cy.log("Edit#######"+newRoomId)
             cy.request({
                 method: 'PUT',
                 url: 'http://localhost:3000/api/room/'+newRoomId,
                 headers: {
                     'x-user-Auth':JSON.stringify(Cypress.env().loginToken),
                     'Content-Type': 'application/json'
                 },
                 body:{
                    "floor": 6,
                    "number": 603,
                    "price": 2550,
                    
                }
                
             }).then((response =>{
                 expect(response.status).to.eq(200)
                 cy.log(JSON.stringify(response.body))
                 
             }))
     })

    it('DELETE Request to delete room by room id api/room/roomid',() =>{
            const newRoomId = Cypress.env().newRoomId
            cy.log("Delete#######"+newRoomId)
             cy.request({
                 method: 'DELETE',
                 url: 'http://localhost:3000/api/room/'+newRoomId,
                 headers: {
                     'x-user-Auth':JSON.stringify(Cypress.env().loginToken),
                     'Content-Type': 'application/json'
                 },
                
             }).then((response =>{
                 expect(response.status).to.eq(200)
                 cy.log(JSON.stringify(response.body))
                 
             }))
     })
     it('Request to /api/logout',() =>{
        cy.authenticate()
    })

})



