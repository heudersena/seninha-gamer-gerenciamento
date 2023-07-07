import { Router } from "express"
import { UsersController } from "../controllers/UsersController"
import { GamersController } from "../controllers/GamersController"
import { ensureAuthenticated } from "../middleware/ensureAuthenticated"
import { BetsController } from "../controllers/BetsController"

const router = Router()

router.post("/v1/users/signin", UsersController.signIn) // SESSION
router.post("/v1/users/signup", UsersController.signUp) // REGISTER



router.get("/v1/games", GamersController.index)
router.post("/v1/games/create", ensureAuthenticated, GamersController.create)


router.post("/v1/bets", ensureAuthenticated, BetsController.search_concurso)


export { router }