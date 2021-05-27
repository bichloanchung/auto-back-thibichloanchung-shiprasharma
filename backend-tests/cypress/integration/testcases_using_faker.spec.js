/// <reference types="cypress" />

import * as room from '../helper/helper'

describe('Test suite', () => {
    it('Create a new room', () => {
        cy.authenticate().then((response =>{
            room.createRoomRequest()
            room.performLogout()
        }))
    })
    
    it('Edit a room', () => {
        cy.authenticate().then((response =>{
            room.editRoomRequest(Cypress.env().lastID)
            room.performLogout()
        }))
    })

    it('Delete a room', () => {
        cy.authenticate().then((response =>{
            room.createRoomRequest()
            room.deleteRoomRequest(Cypress.env().lastID)
            room.performLogout()
        }))
    })
       
})