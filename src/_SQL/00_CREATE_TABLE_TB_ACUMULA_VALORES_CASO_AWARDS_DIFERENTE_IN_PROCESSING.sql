CREATE TABLE TB_ACUMULA_VALORES_CASO_AWARDS_DIFERENTE_IN_PROCESSING(
	 `id` INT(10) AUTO_INCREMENT,	 
	 `amount` DECIMAL(10,2) NULL DEFAULT '0.00',
	 `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
     `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    PRIMARY KEY(id)
)DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;