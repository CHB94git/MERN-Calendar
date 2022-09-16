import { request, response } from 'express';
import jwt from 'jsonwebtoken';

export const validateJWT = (req = request, res = response, next) => {

   // x-token - Headers
   const token = req.header('x-token')

   if (!token) {
      return res.status(401).json({
         ok: false,
         msg: 'No hay Token en la petición!'
      })
   }

   try {
      const { uid, name } = jwt.verify(token, process.env.JWT_SECRET_KEY)

      req.uid = uid
      req.name = name

   } catch (error) {
      console.log(error);
      return res.status(400).json({
         ok: false,
         msg: 'Token no válido',
         err: error.message
      })
   }

   next()

}