-- Création de la base de données
USE tc_api;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users
(
    id            INT AUTO_INCREMENT PRIMARY KEY,
    nickname      VARCHAR(80)  NOT NULL,
    avatar        VARCHAR(255),
    password      VARCHAR(255) NOT NULL,
    email         VARCHAR(255) NOT NULL UNIQUE,
    auth_provider VARCHAR(10)           DEFAULT 'local',
    roles         VARCHAR(255) NOT NULL DEFAULT 'ROLE_USER',
    misc1         VARCHAR(255),
    misc2         VARCHAR(255),
    misc3         VARCHAR(255),
    misc4         VARCHAR(255),
    misc5         VARCHAR(255),
    created_at    TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);