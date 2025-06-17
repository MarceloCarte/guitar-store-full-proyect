import { Router } from "express";

const authRouter = Router()

authRouter.post('/login', (req, res) => res.send('login'))
authRouter.post('/sign-up', (req, res) => res.send('sign-up'))
authRouter.post('/logout', (req, res) => res.send('logout'))

export default authRouter