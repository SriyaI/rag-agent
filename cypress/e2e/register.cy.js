describe('Registration Form', () => {
    beforeEach(() => {
      cy.visit('/register'); // Adjust the URL if necessary
    });
  
    it('should register successfully', () => {
      // Fill out the form fields
      cy.get('[data-cy=email-input]').type('test@test3.com');
      cy.get('[data-cy=password-input]').type('123');
      cy.get('[data-cy=confirm-password-input]').type('123');
      cy.get('[data-cy=name-input]').type('Sriya Ivaturi');
      cy.get('[data-cy=company-input]').type('MyCompany');
  
      // Submit the form
      cy.get('[data-cy=register-button]').click();
  
      // Assert success or redirection
      // For example, you can check for a successful redirect
      cy.url().should('include', '/login'); // Adjust based on your application
    });
  
    it('should display error for mismatched passwords', () => {
      // Fill out the form fields with mismatched passwords
      cy.get('[data-cy=email-input]').type('test@example.com');
      cy.get('[data-cy=password-input]').type('SecureP@ssw0rd');
      cy.get('[data-cy=confirm-password-input]').type('DifferentP@ssw0rd');
      cy.get('[data-cy=name-input]').type('Sriya Ivaturi');
  
      // Submit the form
      cy.get('[data-cy=register-button]').click();
  
      // Assert error message is displayed
      cy.get('[data-cy=error-message]').should('be.visible')
        .and('contain.text', 'Passwords do not match'); // Adjust based on your error message
    });
  });
  