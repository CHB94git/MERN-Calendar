import { Router } from 'express';
import { body, param } from 'express-validator';

import { createEvent, deleteEvent, disableEvent, enableEvent, getEvents, updateEvent } from '../controllers/events.js';
import { validateFields } from '../middlewares/validate-fields.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { isDate } from '../utils/isDate.js';


const router = Router()

// Usar middleware personalizado para todas las rutas
router.use(validateJWT)

router.route('/')
   .get(getEvents)
   .post([
      body('title', 'El título es requerido').notEmpty(),
      body('start', 'La fecha de inicio es requerida').custom(isDate),
      body('end', 'La fecha de finalización es requerida').custom(isDate),
      validateFields
   ], createEvent)


router.route('/:id')
   .delete([
      param('id', 'No es un ID de Mongo válido').isMongoId(),
      validateFields
   ], deleteEvent)
   .put([
      param('id', 'No es un ID de Mongo válido').isMongoId(),
      validateFields
   ], updateEvent)

router.patch('/enable/:id', [
   param('id', 'No es un ID de Mongo válido').isMongoId(),
   validateFields
], enableEvent)

router.patch('/disable/:id', [
   param('id', 'No es un ID de Mongo válido').isMongoId(),
   validateFields
], disableEvent)

export default router