import bcrypt from 'bcrypt';
import { request, response } from 'express';
import User from '../models/User.js';
import { generateJWT } from '../utils/generate-jwt.js';

const createUser = async (req = request, res = response) => {

   const { email, password } = req.body
   try {
      let user = await User.findOne({ email })

      if (user) {
         return res.status(400).json({
            ok: false,
            msg: `El usuario con el correo '${email}' ya existe!`
         })
      }

      user = new User(req.body)

      // Encriptar contraseña
      const salt = bcrypt.genSaltSync()
      user.password = bcrypt.hashSync(password, salt)


      await user.save()

      res.status(201).json({
         ok: true,
         uid: user.id,
         name: user.name
      })
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Por favor hable con el administrador'
      })
   }
}

const loginUser = async (req, res = response) => {
   const { email, password } = req.body

   try {
      const user = await User.findOne({ email })

      if (!user) {
         return res.status(400).json({
            ok: false,
            msg: `El usuario con el correo '${email}' no existe!`
         })
      }

      // Confirmar y comparar las contraseñas
      const validPassword = bcrypt.compareSync(password, user.password)

      if (!validPassword) {
         return res.status(400).json({
            ok: false,
            msg: 'Contraseña no válida'
         })
      }

      // Generar JWT
      const token = await generateJWT(user.id, user.name)


      res.json({
         ok: true,
         uid: user.id,
         name: user.name,
         token
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Por favor hable con el administrador'
      })
   }
}

const revalidateToken = async (req, res = response) => {

   const { uid, name } = req

   // Generar un nuevo JWT
   const token = await generateJWT(uid, name)

   res.json({
      ok: true,
      uid,
      name,
      token
   })
}


export {
   createUser,
   loginUser,
   revalidateToken,
};

