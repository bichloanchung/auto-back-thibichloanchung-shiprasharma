/// <reference types="cypress" />

import * as bill from '../helpers/billHelpers'
import * as reser from '../helpers/reservationHelpers'

describe('Test suite', () => {
    it('Perform create a new bill', () => {
        cy.authenticate().then((response =>{
            bill.createBillRequest()
            bill.performLogout()
        }))
    })

    it('Perform edit last bill', () => {
        cy.authenticate().then((response => {
            bill.editBillRequest(Cypress.env().lastID)
            bill.performLogout()
        }))
    })

    it('Perform delete last bill', () => {
        cy.authenticate().then((response => {
            bill.createBillRequest()
            bill.deleteBillRequest(Cypress.env().lastID)
            bill.performLogout()
        }))
    })

    it('Perform create a new reservation', () => {
        cy.authenticate().then((response => {
            reser.createReserRequest()
            reser.performLogout()
        }))
    })

    it('Perform edit last reservation', () => {
        cy.authenticate().then((response => {
            reser.createReserRequest()
            reser.editReserRequest(Cypress.env().lastID)
            reser.performLogout()
        }))
    })

    it('Perform delete last reservation', () => {
        cy.authenticate().then((response => {
            reser.createReserRequest()
            reser.deleteReserRequest(Cypress.env().lastID)
            reser.performLogout()
        }))
    })
})