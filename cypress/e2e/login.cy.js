describe('Login Flow', () => {
    before(() => {
      cy.visit('/login'); // Ensure this is the correct path
    });
    
    it('should login successfully', () => {
      // Check if the form is visible
      cy.get('form', { timeout: 10000 }).should('exist').should('be.visible');
  
      // Log the current HTML to check the form's state
      cy.get('body').then(($body) => {
        cy.log($body.html()); // Log the entire HTML content
      });
  
      // Debugging the email input field
      cy.get('[data-cy=email-input]').type('test@test2.com');
      cy.get('[data-cy=password-input]').type('123');
      cy.get('form').submit();

        
      // Debugging the submit button
      cy.get('button[type="submit"]', { timeout: 10000 }).should('exist').should('be.visible').click().then(() => {
        cy.log('Submit button clicked.');
      });
  
      // Verify that the user is redirected to the profile page
      cy.url({ timeout: 10000 }).should('include', '/profile').then(() => {
        cy.log('Redirected to /profile.');
      });
    });
  });
  