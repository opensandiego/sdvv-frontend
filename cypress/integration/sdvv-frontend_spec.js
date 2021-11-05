describe('Run - Smoke Test', () => {

  const links = [
    { text: 'FAQ', url: '/faq' },
    { text: 'About', url: '/about' },
    { text: 'Mayor', url: '/office/mayor' },
    { text: 'City Attorney', url: '/office/city-attorney' },
    { text: 'City Council', url: '/office/city-council' },
  ]

  links.forEach( link => {
    it(`Visit ${link.text} URL`, () => {
      cy.visit(link.url)
      cy.url().should('include', link.url)
    })
  })

  // Don't open link, just verify that it is set up correctly
  it('Verify Register to Vote Link', () => {
    cy.visit('')
    cy.contains('Register to Vote')
      .should('have.attr', 'href')
      .and('include', 'registertovote.ca.gov')
  })

  const cityCouncilDistricts = [ '1', '3', '5', '7', '9']

  cityCouncilDistricts.forEach( cityCouncilDistrict => {
    const url = `/office/city-council/${cityCouncilDistrict}`
    it(`Visit District ${cityCouncilDistrict} Candidates URL`, () => {
      cy.visit(url)
      cy.url().should('include', url)
    })
  })

})
