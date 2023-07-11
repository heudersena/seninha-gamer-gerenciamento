SET collation_connection = 'utf8mb4_general_ci';

ALTER DATABASE gamers CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
ALTER DATABASE gamers CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE bets CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE bets CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE tabel2 CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INPUT_NUMBER_GAME_RESULT