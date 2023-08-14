import { Router } from 'express';
import registerValidation from './register/register.middleware.js';
import register from './register/register.js';
import loginValidation from './login/login.middleware.js';
import login from './login/login.js';

const router = Router();

router.get('/', (_req, res) => {
    res.send('Welcome to the API');
});
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);



export default router;