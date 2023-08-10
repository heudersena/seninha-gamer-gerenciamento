DROP PROCEDURE IF EXISTS PROCEDURE_VERIFICA_CONCURSO_PREMIADO;


DELIMITER //
CREATE PROCEDURE PROCEDURE_VERIFICA_CONCURSO_PREMIADO(IN INPUT_ID_TB_BETS INT)

BEGIN
   
  SELECT 
	CASE WHEN b.hits >= 4 THEN 'PREMIADA' ELSE 'NÃO PREMIADA' END AS situacao,
	b.id, b.namber_bet,b.hits,b.code_cart,b.number_game_result,b.numbers,b.namber_round,e.name, u.email, a.street, a.neighborhood, a.city,a.state
FROM bets AS b
INNER JOIN establishments AS e
	ON e.id = b.establishmentId
INNER JOIN users AS u
	ON u.id = e.userId
INNER JOIN adresses AS a
	ON a.establishmentId =  e.id
 WHERE 
 	b.id = INPUT_ID_TB_BETS;
   
END //

DELIMITER ;


CALL PROCEDURE_VERIFICA_CONCURSO_PREMIADO(108)