import jwt from 'jsonwebtoken'

export const generateJWT = (uid, name) => {
   return new Promise((resolve, reject) => {

      const payload = { uid, name }

      jwt.sign(payload, process.env.JWT_SECRET_KEY, {
         expiresIn: "6h"
      }, (error, token) => {
         if (!error) {
            return resolve(token)
         }
         console.log(error);
         reject('No se pudo generar el token')
      })
   })

}