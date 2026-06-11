import express from 'express'
import { login, signup, task } from '../controllers/userController.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login )
router.get('/task', task)

export default router;