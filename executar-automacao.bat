@echo off

cd /d C:\projetos\cypress-sesc-go

if not exist logs mkdir logs

node cypress\scripts\executar-e-enviar.js >> logs\automacao.log 2>&1