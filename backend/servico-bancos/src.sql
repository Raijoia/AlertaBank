CREATE DATABASE IF NOT EXISTS servico_bancos;

USE servico_bancos;

CREATE TABLE IF NOT EXISTS tb_bancos (
    id CHAR(36) NOT NULL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO tb_bancos (id, nome) VALUES
(UUID(), 'Itaú Unibanco'),
(UUID(), 'Bradesco'),
(UUID(), 'Banco do Brasil'),
(UUID(), 'Santander'),
(UUID(), 'Caixa Econômica Federal'),
(UUID(), 'Nubank'),
(UUID(), 'Banco Inter'),
(UUID(), 'C6 Bank'),
(UUID(), 'BTG Pactual'),
(UUID(), 'XP Inc.');

CREATE TABLE IF NOT EXISTS tb_relatos (
    id CHAR(36) NOT NULL PRIMARY KEY,
    banco_id CHAR(36) NOT NULL,
    descricao TEXT NOT NULL,
    data_ocorrido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);