describe('Build - Smoke Test', () => {

  const links = [
    { text: 'FAQ', url: '/faq' },
    { text: 'About', url: '/about' },
    { text: 'Mayor', url: '/mayor' },
    { text: 'City Attorney', url: '/city-attorney' },
    // { text: 'City Council', url: '/city-council' },
  ]

  links.forEach( link => {
    it(`Clicking ${link.text} navigates to new URL`, () => {
      cy.visit('')
      cy.contains(link.text).click()
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
    const url = `/city-council-district-${cityCouncilDistrict}`
    it(`Visit District ${cityCouncilDistrict} Candidates URL`, () => {
      cy.visit(url)
      cy.url().should('include', url)
    })
  })

})
