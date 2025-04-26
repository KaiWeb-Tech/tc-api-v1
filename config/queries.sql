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
    plan          VARCHAR(255) NOT NULL DEFAULT 'premium',
    misc1         VARCHAR(255),
    misc2         VARCHAR(255),
    misc3         VARCHAR(255),
    misc4         VARCHAR(255),
    created_at    TIMESTAMP             DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings
(
    user_id    INT PRIMARY KEY,
    theme      VARCHAR(50) NOT NULL DEFAULT 'default',
    language   VARCHAR(10) NOT NULL DEFAULT 'en',
    misc1      VARCHAR(255),
    misc2      VARCHAR(255),
    misc3      VARCHAR(255),
    misc4      VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS categories
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    user_id     INT NOT NULL,
    name        VARCHAR(100),
    description TEXT,
    color       VARCHAR(20),
    misc1       VARCHAR(255),
    misc2       VARCHAR(255),
    misc3       VARCHAR(255),
    misc4       VARCHAR(255),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cards
(
    id          INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT  NOT NULL,
    front_side  TEXT NOT NULL,
    back_side   TEXT NOT NULL,
    description TEXT,
    misc1       VARCHAR(255),
    misc2       VARCHAR(255),
    misc3       VARCHAR(255),
    misc4       VARCHAR(255),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE
);