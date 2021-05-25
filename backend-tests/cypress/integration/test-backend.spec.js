/// <reference types="cypress" />

describe('Test suite', () => {
    it('Perform Login', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/login',
            headers: {
                'Content-Type':'application/json'
            },
            body:{
                'username': 'tester01',
		        'password': 'GteteqbQQgSr88SwNExUQv2ydb7xuf8c'
            }
        }).then((response => {
            expect(response.status).to.eq(200)
            Cypress.env({loginToken:response.body})
            cy.log(response.body)
        }))
    })

    it('Create Bill', () => {
        cy.authenticate().then((response => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3000/api/bill/new',
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type':'application/json'
                    },
                body:{
                    "value":"5000"
                    }
            }).then((response => {
                expect(response.status).to.eq(200)
            }))
        }))
    
    })

    it('Edit Last Bill', () => {
        cy.authenticate().then((response => {
            cy.request({
                method: 'GET',
                url: 'http://localhost:3000/api/bills',
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type':'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                let lastID = response.body[response.body.length -1].id
                cy.log(lastID)
    
                cy.request({
                    method:'PUT',
                    url: 'http://localhost:3000/api/bill/'+lastID,
                    headers: {
                        'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                        'Content-Type':'application/json'
                    },
                    body:{
                        "value":"6000",
                        "id":lastID,
                        "created":"2021-05-19T21:21:00.609Z",
                        "paid":true
                    }
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))
            }))
        
        }))
    })

    it('Delete Last Bill', () => {
        cy.authenticate().then((response => {
            cy.request({
                method: 'GET',
                url: 'http://localhost:3000/api/bills',
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type':'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                let lastID = response.body[response.body.length -1].id
                cy.log(lastID)
    
                cy.request({
                    method:'DELETE',
                    url: 'http://localhost:3000/api/bill/'+lastID,
                    headers: {
                        'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                        'Content-Type':'application/json'
                    }
                }).then((response => {
                    expect(response.status).to.eq(200)
                    cy.log(JSON.stringify(response.body))
                }))
            }))
        
        }))
    })

    it('Create Reservation', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/api/reservation/new',
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type':'application/json'
            },
            body: {
                "client":2,
                "room":2,
                "bill":2,
                "start":"2021-05-24",
                "end":"2021-05-30"
            }
        }).then((response => {
            expect(response.status).to.eq(200)
            cy.log(JSON.stringify(response.body))
        }))
    })
    
    it('Edit Last Reservation', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/api/reservations',
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type':'application/json'
            }
        }).then((response => {
            expect(response.status).to.eq(200)
            let lastID = response.body[response.body.length -1].id
            cy.log(lastID)

            cy.request({
                method: 'PUT',
                url: 'http://localhost:3000/api/reservation/'+lastID,
                headers: {
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type':'application/json'
                },
                body: {
                    "client":2,
                    "room":2,
                    "bill":2,
                    "start":"2021-05-24",
                    "end":"2021-06-25",
                    "id":9,
                    "created":"2021-05-23T20:54:16.500Z"
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))
        }))
    })

    it('Delete Last Reservation', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:3000/api/reservations',
            headers: {
                'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                'Content-Type':'application/json'
            }
        }).then((response => {
            expect(response.status).to.eq(200)
            let lastID = response.body[response.body.length -1].id
            cy.log(lastID)

            cy.request({
                method:'DELETE',
                url:'http://localhost:3000/api/reservation/'+lastID,
                headers:{
                    'X-User-Auth':JSON.stringify(Cypress.env().loginToken),
                    'Content-Type':'application/json'
                }
            }).then((response => {
                expect(response.status).to.eq(200)
                cy.log(JSON.stringify(response.body))
            }))
        }))
    })
})