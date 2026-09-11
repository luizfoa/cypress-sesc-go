require('dotenv').config();

const { exec } = require('child_process');
const path = require('path');

const { enviarRelatorio } =
    require('./enviar-relatorio');

const projectDir =
    path.join(__dirname, '..', '..');

console.log('');
console.log('======================================');
console.log('🚀 AUTOMAÇÃO CYPRESS SESC GO');
console.log('======================================');
console.log('');

console.log('▶️ Iniciando execução do Cypress...');
console.log('');

exec(
    'npx cypress run',
    {
        cwd: projectDir
    },
    async (error, stdout, stderr) => {

        // Mostra saída do Cypress
        console.log(stdout);

        if (stderr) {
            console.error(stderr);
        }

        // Código de saída do Cypress
        const codigoSaida =
            error ? error.code : 0;

        const testeAprovado =
            codigoSaida === 0;

        console.log('');
        console.log('======================================');
        console.log('🏁 EXECUÇÃO DO CYPRESS FINALIZADA');
        console.log('======================================');
        console.log('');

        console.log(
            `Código de saída: ${codigoSaida}`
        );

        if (testeAprovado) {

            console.log(
                '✅ Resultado: TESTE APROVADO'
            );

        } else {

            console.log(
                '❌ Resultado: TESTE REPROVADO'
            );
        }

        console.log('');
        console.log('📧 Enviando relatório por e-mail...');
        console.log('');

        try {

            await enviarRelatorio(
                testeAprovado
            );

            console.log('');
            console.log(
                '✅ Processo concluído!'
            );

        } catch (erroEmail) {

            console.error('');
            console.error(
                '❌ Erro ao enviar relatório:'
            );

            console.error(erroEmail);
        }

        // Retorna o mesmo código do Cypress
        process.exit(codigoSaida);
    }
);