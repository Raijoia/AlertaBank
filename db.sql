CREATE DATABASE alertabank_db;

USE alertabank_db;

CREATE TABLE IF NOT EXISTS tb_bancos (
    id CHAR(36) NOT NULL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS tb_relatos (
    id CHAR(36) NOT NULL PRIMARY KEY,
    banco_id CHAR(36) NOT NULL,
    descricao TEXT NOT NULL,
    data_ocorrido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (banco_id) REFERENCES tb_bancos(id)
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

select * from tb_bancos;