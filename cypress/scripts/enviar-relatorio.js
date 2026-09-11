require('dotenv').config();

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

async function enviarRelatorio(testeAprovado) {

    const reportDir = path.join(
        __dirname,
        '..',
        'reports',
        'mochawesome'
    );

    if (!fs.existsSync(reportDir)) {
        throw new Error(
            `Pasta de relatório não encontrada: ${reportDir}`
        );
    }

    const arquivos = fs
        .readdirSync(reportDir)
        .filter(arquivo => arquivo.endsWith('.html'));

    if (arquivos.length === 0) {
        throw new Error(
            'Nenhum relatório HTML foi encontrado.'
        );
    }

    // Identifica o relatório mais recente
    const arquivosComData = arquivos.map(arquivo => ({
        nome: arquivo,
        data: fs.statSync(
            path.join(reportDir, arquivo)
        ).mtime
    }));

    arquivosComData.sort(
        (a, b) => b.data - a.data
    );

    const arquivoMaisRecente =
        arquivosComData[0].nome;

    const caminhoRelatorio = path.join(
        reportDir,
        arquivoMaisRecente
    );

    console.log(
        `📄 Relatório encontrado: ${arquivoMaisRecente}`
    );

    // Dados do Gmail
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword =
        process.env.GMAIL_APP_PASSWORD;
    const emailDestino =
        process.env.EMAIL_DESTINO;

    if (
        !gmailUser ||
        !gmailAppPassword ||
        !emailDestino
    ) {
        throw new Error(
            'Verifique o arquivo .env. ' +
            'GMAIL_USER, GMAIL_APP_PASSWORD e EMAIL_DESTINO são obrigatórios.'
        );
    }

    // Configuração do Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmailUser,
            pass: gmailAppPassword.replace(/\s/g, '')
        }
    });

    await transporter.verify();

    console.log(
        '✅ Conexão com Gmail estabelecida.'
    );

    const status = testeAprovado
        ? 'APROVADO'
        : 'REPROVADO';

    const emoji = testeAprovado
        ? '✅'
        : '❌';

    const dataAtual =
        new Date().toLocaleString('pt-BR');

    await transporter.sendMail({

        from:
            `"Automação Cypress Sesc GO" <${gmailUser}>`,

        to: emailDestino
            .split(',')
            .map(email => email.trim())
            .filter(Boolean),

        subject:
            `${emoji} Cypress Sesc GO - TESTE ${status}`,

        html: `
            <h2>Automação Cypress - Sesc GO</h2>

            <p>Olá,</p>

            <p>
                O teste automatizado do processo de
                reserva do Sesc Caldas Novas foi executado.
            </p>

            <p>
                <strong>Status:</strong>
                ${emoji} ${status}
            </p>

            <p>
                <strong>Data da execução:</strong>
                ${dataAtual}
            </p>

            <p>
                O relatório completo do Cypress
                está anexado a este e-mail.
            </p>

            <p>
                Atenciosamente,<br>
                Automação Cypress Sesc GO
            </p>
        `,

        attachments: [
            {
                filename:
                    'relatorio-cypress-sesc.html',

                path: caminhoRelatorio
            }
        ]
    });

    console.log(
        `📧 E-mail enviado: TESTE ${status}`
    );
}

module.exports = {
    enviarRelatorio
};