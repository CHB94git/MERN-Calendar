import { Router } from 'express';
import { body } from 'express-validator';

import { createUser, loginUser, revalidateToken } from '../controllers/auth.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { validateJWT } from '../middlewares/validate-jwt.js';


const router = Router()

router.post('/new',
   [
      body('name', 'El nombre es requerido').notEmpty(),
      body('email', 'El email es obligatorio').isEmail(),
      body('password', 'La contraseña es obligatoria').notEmpty(),
      body('password', 'La contraseña debe contener como mínimo 6 caracteres').isLength({ min: 6 }),
      validateFields
   ],
   createUser
)

router.post('/',
   [
      body('email', 'El email es obligatorio').isEmail(),
      body('password', 'La contraseña es obligatoria').notEmpty(),
      body('password', 'La contraseña debe contener como mínimo 6 caracteres').isLength({ min: 6 }),
      validateFields
   ],
   loginUser
)

router.get('/renew', validateJWT, revalidateToken)


export default router