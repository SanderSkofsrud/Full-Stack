describe('Contact Form Submission', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081/contactForm');
    });

    it('Should show correct response from the server on successful submission', () => {
        // Stub the window.alert to capture its invocation and arguments
        const alertStub = cy.stub();
        cy.on('window:alert', alertStub);

        // Fill out the form and submit
        cy.get('input#name').type('Jane Doe');
        cy.get('input#email').type('jane.doe@example.com');
        cy.get('textarea#message').type('Hello, this is a test message.');
        cy.get('button[type="submit"]').should('not.be.disabled').click()
            .then(() => {
                // Ensure the alert has been called with the correct argument
                expect(alertStub).to.be.calledWith('Success');
            });
    });
});
