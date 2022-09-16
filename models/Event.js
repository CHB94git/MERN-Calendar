import mongoose from 'mongoose';

const { Schema } = mongoose

const eventSchema = mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   notes: {
      type: String,
   },
   start: {
      type: Date,
      required: true
   },
   end: {
      type: Date,
      required: true
   },
   state: {
      type: Boolean,
      default: true
   },
   user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
   }

})


// EventSchema.method('toJSON', function () {
//    const { __v, _id, ...restObject } = this.toObject()
//    // restObject.id = _id
//    const id = _id
//    const eventObject = Object.assign({ id }, restObject)
//    return eventObject
// })


eventSchema.set('toJSON', {
   transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
   }
});

const Event = mongoose.model('Event', eventSchema)

export default Event