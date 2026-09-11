class SescCaldasNovasPage {

    acessar() {
        cy.visit('https://www.sesc.com.br/unidade/sesc-caldas-novas/');
    }

    clicarReserva() {
        cy.get('a[href="https://portalturismo.sescgo.com.br/"]')
            .should('be.visible')
            .invoke('removeAttr', 'target')
            .click();

        cy.url().should(
            'eq',
            'https://portalturismo.sescgo.com.br/'
        );
    }
}

export default SescCaldasNovasPage;