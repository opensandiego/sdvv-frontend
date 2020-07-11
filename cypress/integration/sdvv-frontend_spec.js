describe('Production Deployment - Smoke Test', () => {

  beforeEach(() => {
    cy.visit('https://sdvv-frontend-prod2.web.app')
  })

  it('Clicking FAQ navigates to new URL', () => {
    cy.contains('FAQ').click()
    it('Check FAQ link', () => {
      cy.url().should('include', '/faq')
    })
    cy.go('back')
  })

  it('Clicking About navigates to new URL', () => {
    cy.contains('About').click()
    it('Check About link', () => {
      cy.url().should('include', '/about')
    })
    cy.go('back')
  })
  //Don't open link, just verify that it is set up correctly
  it('Verify Register to Vote Link', () => {
    cy.contains('Register to Vote')
      .should('have.attr', 'href')
      .and('include', 'registertovote.ca.gov')
  })


  it('Clicking Mayor Candidates ', () => {
    cy.contains('Mayor').click()
    it('Check Mayor Candidates listed', () => {
      cy.url().should('include', '/mayor')
    })
  })

  it('Clicking City Attorney Candidates ', () => {
    cy.contains('City Attorney').click()
    it('Check City Attorney Candidates listed', () => {
      cy.url().should('include', '/city-attorney')
    })
  })

  it('Clicking City Council Candidates ', () => {
    cy.contains('City Council').click()
    it('Check City Candidates listed', () => {
      cy.url().should('include', '/city-council')
    })
  })

  it('Clicking District 1 Candidates ', () => {
    it('Clicking District 1 Candidates ', () => {
      cy.contains('District 1').click()
      it('Check District 1 Candidates listed', () => {
        cy.url().should('include', 'District 1')
      })
    })
  })

  it('Clicking District 2 Candidates ', () => {
    it('Clicking District 2 Candidates ', () => {
      cy.contains('District 2').click()
      it('Check District 2 Candidates listed', () => {
        cy.url().should('include', 'District 2')
      })
    })
  })
})
