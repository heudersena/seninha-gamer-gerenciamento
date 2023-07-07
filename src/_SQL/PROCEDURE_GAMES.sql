DELIMITER $$
CREATE PROCEDURE PROCEDURE_GAMES(IN modo VARCHAR(50))
BEGIN
IF modo = 'um' THEN
  SELECT g.created_at	FROM	games AS g	ORDER BY g.created_at DESC LIMIT 1;
ELSEIF modo = 'approved' THEN
SELECT g.created_at	FROM	games AS g	ORDER BY g.created_at DESC;
END IF;
END $$
DELIMITER ;
