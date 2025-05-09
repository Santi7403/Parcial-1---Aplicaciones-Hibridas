import mongoose from 'mongoose';

const comisariaSchema = new mongoose.Schema({
  nombre: String,
  direccion: String,
  telefono: String
}, { _id: false }); 

const comunaSchema = new mongoose.Schema({
  comuna: {
    type: Number,
    required: true
  },
  nombre: String,
  descripcion: String,
  dato_adicional: String,
  barrios: [String], 
  comisarias: {
    comunal: {
      nombre: String,
      direccion: String
    },
    vecinales: [comisariaSchema]
  }
});

const Comuna = mongoose.model('Comuna', comunaSchema);

export default Comuna;
