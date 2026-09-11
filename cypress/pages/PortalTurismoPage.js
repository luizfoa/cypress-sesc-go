class PortalTurismoPage {

    selecionarAdultos(quantidade) {
        cy.get('select[name="adultos"]:visible')
            .select(quantidade)
            .should('have.value', quantidade);
    }

    validarCategoria(categoria) {
        cy.get('.containerSpecification.adultos:visible select')
            .each(($select) => {
                cy.wrap($select)
                    .find('option:selected')
                    .should('have.text', categoria);
            });
    }

    salvarCategoria() {
        cy.get(
            '.containerSpecification.adultos:visible input[type="button"][value="SALVAR"]:visible'
        )
            .should('have.length', 1)
            .click();
    }

    informarPeriodo(periodo) {
        cy.get('input[name="datas"]:visible')
            .clear()
            .type(periodo)
            .blur()
            .should('have.value', periodo);
    }

    selecionarRegime(regime) {
        cy.get('select:visible')
            .filter((index, select) => {
                return Array.from(select.options).some(
                    option => option.text.trim() === regime
                );
            })
            .should('have.length', 1)
            .select(regime);

        cy.get('select:visible')
            .filter((index, select) => {
                return Array.from(select.options).some(
                    option => option.text.trim() === regime
                );
            })
            .find('option:selected')
            .should('have.text', regime);
    }

    clicarBuscar() {
        cy.contains('button:visible', 'Buscar')
            .should('have.length', 1)
            .should('be.visible')
            .click();
    }

    validarMensagemNaoLiberada() {
        cy.get('#result-booking')
            .should('be.visible');

        cy.get('#result-booking .alert.alert-warning')
            .should('not.exist');
    }
}

export { PortalTurismoPage };