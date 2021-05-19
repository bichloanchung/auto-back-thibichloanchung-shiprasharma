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
    
    })
})