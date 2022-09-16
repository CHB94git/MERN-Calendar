import { request, response } from 'express'
import Event from '../models/Event.js'


const getEvents = async (req, res = response) => {

   const events = await Event.find().populate('user', 'name')

   res.json({
      ok: true,
      events
   })
}

const createEvent = async (req = request, res = response) => {
   const event = new Event(req.body)

   try {
      event.user = req.uid

      const eventSaved = await event.save()

      res.json({
         ok: true,
         msg: 'createEvent',
         event: eventSaved
      })
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      })
   }

}

const updateEvent = async (req = request, res = response) => {

   const idEvent = req.params.id
   const uid = req.uid

   try {
      const event = await Event.findById(idEvent)

      if (!event) {
         return res.status(404).json({
            ok: false,
            msg: `ID de evento ${idEvent} no existe`
         })
      }

      if (event.user.toString() !== uid) {
         return res.status(401).json({
            ok: false,
            msg: 'No tiene los privilegios para modificar este evento'
         })
      }


      const newEvent = {
         ...req.body,
         user: uid
      }

      const eventUpdated = await Event.findByIdAndUpdate(idEvent, newEvent, {
         new: true
      })

      res.json({
         ok: true,
         event: eventUpdated
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      })
   }

}

const deleteEvent = async (req, res = response) => {
   const idEvent = req.params.id
   const uid = req.uid
   try {
      const event = await Event.findById(idEvent)

      if (!event) {
         return res.status(404).json({
            ok: false,
            msg: `ID de evento ${idEvent} no existe`
         })
      }

      if (event.user.toString() !== uid) {
         return res.status(401).json({
            ok: false,
            msg: 'No tiene los privilegios para modificar este evento'
         })
      }

      const eventDeleted = await Event.findByIdAndDelete(idEvent)

      res.json({
         ok: true,
         delete: eventDeleted
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      })
   }
}

const disableEvent = async (req, res = response) => {
   const idEvent = req.params.id
   const uid = req.uid
   try {
      const event = await Event.findById(idEvent)

      if (!event) {
         return res.status(404).json({
            ok: false,
            msg: `ID de evento ${idEvent} no existe`
         })
      }

      if (event.user.toString() !== uid) {
         return res.status(401).json({
            ok: false,
            msg: 'No tiene los privilegios para modificar este evento'
         })
      }

      const statusChange = await Event.findByIdAndUpdate(idEvent, { state: false }, { new: true })

      res.json({
         msg: `El evento ${statusChange.title} ha sido deshabilitado`,
         event: statusChange
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      })
   }
}

const enableEvent = async (req, res = response) => {

   const idEvent = req.params.id
   const uid = req.uid
   try {
      const event = await Event.findById(idEvent)

      if (!event) {
         return res.status(404).json({
            ok: false,
            msg: `ID de evento ${idEvent} no existe`
         })
      }

      if (event.user.toString() !== uid) {
         return res.status(401).json({
            ok: false,
            msg: 'No tiene los privilegios para modificar este evento'
         })
      }

      const statusChange = await Event.findByIdAndUpdate(idEvent, { state: true }, { new: true })

      res.json({
         msg: `El evento ${statusChange.title} ha sido habilitado`,
         event: statusChange
      })

   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         msg: 'Hable con el administrador'
      })
   }
}



export {
   createEvent,
   deleteEvent,
   getEvents,
   updateEvent,
   disableEvent,
   enableEvent,
}

