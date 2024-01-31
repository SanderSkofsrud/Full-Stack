describe('Contact Form Validation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/contactForm');
    });

    it('Submit button should be disabled if form is invalid', () => {
        cy.get('input#name').type('John Doe');
        cy.get('input#email').type('john.doe@'); // Invalid email
        cy.get('textarea#message').type('Hello, this is a test message.');
        cy.get('button[type="submit"]').should('be.disabled');
    });
});
