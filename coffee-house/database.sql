CREATE DATABASE coffee_house;

-- Conecte no banco coffee_house antes de rodar o restante

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco NUMERIC(10,2) NOT NULL,
    tempo_preparo INTEGER NOT NULL,
    emoji VARCHAR(10) NOT NULL
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    produto_id INTEGER NOT NULL REFERENCES produtos(id),
    quantidade INTEGER NOT NULL DEFAULT 1,
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE avaliacoes (
    id SERIAL PRIMARY KEY,
    produto_id INTEGER NOT NULL REFERENCES produtos(id),
    nota INTEGER NOT NULL CHECK (nota BETWEEN 1 AND 5),
    comentario TEXT,
    data_avaliacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO produtos (nome, categoria, preco, tempo_preparo, emoji) VALUES
('Cappuccino', 'cafe', 12.00, 5, '☕'),
('Café Expresso', 'cafe', 8.00, 3, '☕'),
('Mocha', 'cafe', 15.00, 6, '☕'),
('Croissant', 'lanches', 14.00, 4, '🥐'),
('Pão de Queijo', 'lanches', 9.00, 3, '🥐'),
('Sanduíche Natural', 'lanches', 18.00, 7, '🥐'),
('Bolo de Chocolate', 'sobremesas', 10.00, 3, '🍰'),
('Cheesecake', 'sobremesas', 16.00, 4, '🍰'),
('Brownie', 'sobremesas', 11.00, 3, '🍰');

INSERT INTO pedidos (produto_id, quantidade) VALUES
(1, 1),
(4, 1),
(7, 1);

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);

INSERT INTO usuarios (nome, senha)
VALUES ('admin', '123456')
ON CONFLICT (nome) DO NOTHING;