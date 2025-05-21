-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS consultorio_medico;
USE consultorio_medico;

-- Tabela de Pacientes
CREATE TABLE pacientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    endereco TEXT NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Médicos
CREATE TABLE medicos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    especialidade VARCHAR(50) NOT NULL,
    crm VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    status ENUM('Ativo', 'Inativo') DEFAULT 'Ativo'
);

-- Tabela de Atendimentos
CREATE TABLE atendimentos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    paciente_id INT NOT NULL,
    medico_id INT NOT NULL,
    data_atendimento DATETIME NOT NULL,
    descricao TEXT NOT NULL,
    status ENUM('Agendado', 'Realizado', 'Cancelado') DEFAULT 'Agendado',
    FOREIGN KEY (paciente_id) REFERENCES pacientes(id),
    FOREIGN KEY (medico_id) REFERENCES medicos(id)
);