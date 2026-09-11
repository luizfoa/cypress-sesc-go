import SescCaldasNovasPage from '../pages/SescCaldasNovasPage';

describe('Reserva Sesc Caldas Novas', () => {

    it('deve buscar hospedagem para trabalhador do comércio', () => {

        const sescPage = new SescCaldasNovasPage();

        sescPage.acessar();

        sescPage.clicarReserva();

        cy.origin(
            'https://portalturismo.sescgo.com.br',
            () => {

                const { PortalTurismoPage } =
                    Cypress.require('../pages/PortalTurismoPage');

                const portal = new PortalTurismoPage();

                portal.selecionarAdultos('2');

                portal.validarCategoria(
                    'Trabalhador do Comércio'
                );

                portal.salvarCategoria();

                portal.informarPeriodo(
                    '31/12/2026 - 03/01/2027'
                );

                portal.selecionarRegime(
                    'Pensão Completa'
                );

                portal.clicarBuscar();

                portal.validarMensagemNaoLiberada();
            }
        );
    });
});