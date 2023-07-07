DROP PROCEDURE IF EXISTS PROCEDURE_BUSCAS_QUANTIDADE_GANHADORES;

DELIMITER //
CREATE PROCEDURE PROCEDURE_BUSCAS_QUANTIDADE_GANHADORES(IN param_id INT)

/*
	AUTOR = HEUDER RODRIGUES DE SENA - (61)99302-9884
	01 - SELECIONAR TODOS AS APOSTAS COM GANHADORAS [4,5,6] PONTOS RETORNANDO A QUANTIDADE DE VEZES QUE CADA UMA SAIU.
	02 -  FAZER A DIVISÃO DA QUANTIDADE / VALOR.
	03 - VERIFICAR SE EXISTE A QUANTIDADE PARA ENTRAR EM CADA IF.
	04 - ATUALIZAR O CAMPO COM O VALOR A SER PAGO E ATUALIZAR A SUBTRAÇÃO DO CAMPO "subtract_premiums"

*/

BEGIN
  DECLARE QUANTIDADE_QUATRO INT;
  DECLARE QUANTIDADE_CINCO INT;
  DECLARE QUANTIDADE_SEIS INT;
  
  DECLARE _PLAYER_BLOCK DECIMAL(10,2);  
  DECLARE _PLAYER_FIVE DECIMAL(10,2);   
  DECLARE _PLAYER_SIX DECIMAL(10,2);
  
  DECLARE SET_UPDATE_AWARDS_BLOCK DECIMAL(10,2);
  DECLARE SET_UPDATE_AWARDS_BLOCK_CALC DECIMAL(10,2);
  
  DECLARE SET_UPDATE_AWARDS_FIVE DECIMAL(10,2);
  DECLARE SET_UPDATE_AWARDS_FIVE_CALC DECIMAL(10,2);
  
  DECLARE SET_UPDATE_AWARDS_SIX DECIMAL(10,2);
  DECLARE SET_UPDATE_AWARDS_SIX_CALC DECIMAL(10,2);
   
  DECLARE SUBTRACAO_BLOCK DECIMAL(10,2);
  DECLARE SUBTRACAO_FIVE DECIMAL(10,2);
  DECLARE SUBTRACAO_SIX DECIMAL(10,2);
  
  DECLARE SET_IS_FINISHED VARCHAR(100);
  SELECT ADS.is_completed AS is_completed INTO SET_IS_FINISHED FROM awards AS ADS WHERE ADS.gamer_ref = param_id;
  
 IF SET_IS_FINISHED != "FINISHED" THEN	
	 SELECT COUNT(B.hits_round) AS QUANTIDADE_QUATRO INTO QUANTIDADE_QUATRO FROM bets AS B WHERE B.number_game_result = param_id  AND B.hits_round = 4 AND B.awarded = TRUE;
	 SELECT COUNT(B.hits_round) AS QUANTIDADE_CINCO INTO QUANTIDADE_CINCO  FROM bets AS B WHERE B.number_game_result = param_id  AND B.hits_round = 5 AND B.awarded = TRUE;
	 SELECT COUNT(B.hits_round) AS QUANTIDADE_SEIS INTO QUANTIDADE_SEIS   FROM bets AS B WHERE B.number_game_result = param_id  AND B.hits_round = 6 AND B.awarded = TRUE;
	 

    SELECT TRUNCATE(COALESCE(`block` / NULLIF(QUANTIDADE_QUATRO,0) ,0),2)  INTO _PLAYER_BLOCK FROM awards AS A WHERE A.gamer_ref = param_id; 
	 SELECT TRUNCATE(COALESCE(corner / NULLIF(QUANTIDADE_CINCO,0) ,0),2) INTO _PLAYER_FIVE FROM awards AS A WHERE A.gamer_ref = param_id; 
	 SELECT TRUNCATE(COALESCE(seine / NULLIF(QUANTIDADE_SEIS,0) ,0),2) INTO _PLAYER_SIX FROM awards AS A WHERE A.gamer_ref = param_id;
	 
	  
	 SELECT `block`  INTO SUBTRACAO_BLOCK FROM awards AS A WHERE A.gamer_ref = param_id; 
	 SELECT `corner` INTO SUBTRACAO_FIVE FROM awards AS A WHERE A.gamer_ref = param_id; 
	 SELECT `seine`  INTO SUBTRACAO_SIX FROM awards AS A WHERE A.gamer_ref = param_id; 
	 
	 
	
	 
	 IF QUANTIDADE_QUATRO <> 0 THEN
	     UPDATE awards SET player_block = _PLAYER_BLOCK WHERE gamer_ref = param_id;	       
	     SELECT subtract_premiums INTO SET_UPDATE_AWARDS_BLOCK FROM awards  WHERE gamer_ref = param_id;     
	     SET SET_UPDATE_AWARDS_BLOCK_CALC =  TRUNCATE(SET_UPDATE_AWARDS_BLOCK - SUBTRACAO_BLOCK,2);
	     UPDATE awards SET subtract_premiums = SET_UPDATE_AWARDS_BLOCK_CALC WHERE gamer_ref = param_id;
	     
	 END IF;
	 
	 IF QUANTIDADE_CINCO <> 0 THEN
	     UPDATE awards SET player_corner = _PLAYER_FIVE WHERE gamer_ref = param_id;	     
	     SELECT subtract_premiums INTO SET_UPDATE_AWARDS_FIVE FROM awards  WHERE gamer_ref = param_id;     
	     SET SET_UPDATE_AWARDS_FIVE_CALC =  TRUNCATE(SET_UPDATE_AWARDS_FIVE - SUBTRACAO_FIVE,2);
	     UPDATE awards SET subtract_premiums = SET_UPDATE_AWARDS_FIVE_CALC WHERE gamer_ref = param_id;
	 END IF;
	 
	 IF QUANTIDADE_SEIS <> 0 THEN
	     UPDATE awards SET player_seine = _PLAYER_SIX WHERE gamer_ref = param_id;     
	     SELECT subtract_premiums INTO SET_UPDATE_AWARDS_SIX FROM awards  WHERE gamer_ref = param_id;	   
	     SET SET_UPDATE_AWARDS_SIX_CALC =  TRUNCATE(SET_UPDATE_AWARDS_SIX - SUBTRACAO_SIX,2);
	     UPDATE awards SET subtract_premiums = SET_UPDATE_AWARDS_SIX_CALC WHERE gamer_ref = param_id;	     
	  END IF;	  
	  		UPDATE awards SET is_completed = "FINISHED" WHERE gamer_ref = param_id;
			SELECT QUANTIDADE_QUATRO,_PLAYER_BLOCK,QUANTIDADE_CINCO,_PLAYER_FIVE,QUANTIDADE_SEIS,_PLAYER_SIX;
	ELSE
	   	SELECT * FROM awards AS ADS WHERE ADS.gamer_ref = param_id;
   END IF;
   
   
   END //

DELIMITER ;
   
   
   
   
   
   
   
   call PROCEDURE_BUSCAS_QUANTIDADE_GANHADORES(9)
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   




 CALL PROCEDURE_BUSCAS_QUANTIDADE_GANHADORES(9);
 SELECT * FROM awards WHERE awards.gamer_ref = 44
