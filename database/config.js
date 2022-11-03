import mongoose from 'mongoose';

export const connectionDB = () => {

   try {
      const db = mongoose.connect(process.env.DB_URI, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })

      const url = `${db.connection.host}:${db.connection.port}`
      console.log(`MongoDB conectado en: ${url}`)

   } catch (error) {
      console.log(error)
      throw new Error('Error al conectar la Base de Datos')
   }

}





