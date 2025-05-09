import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import comunaRoutes from './routers/comunasRouter.js';
import vecinoRoutes from './routers/vecinosRouter.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log('Error de conexión:', err));

app.use('/api/comunas', comunaRoutes);

app.use('/api/vecinos', vecinoRoutes); 

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
