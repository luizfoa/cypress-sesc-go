Cypress.Commands.add('aceitarCookies', () => {

    cy.get('body').then(($body) => {

        if ($body.find('button').filter(':contains("Aceitar")').length > 0) {

            cy.contains('button', 'Aceitar')
                .click();

        }

    });

});