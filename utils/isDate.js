// import moment from 'moment'

// export const isDateValid = (value) => {
//    if (!value) return false

//    const date = moment(value)
//    if (date.isValid()) {
//       return true
//    } else {
//       return false
//    }
// }

// Función JS para fechas sin usar librerías
export const isDate = (value) => {
   if (!value || isNaN(new Date(value))) {
      return false;
   }
   return true;
}