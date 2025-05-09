import express from 'express';
import {
  getComunas,
  getComunaById,
  createComuna,
  updateComuna,
  deleteComuna
} from '../controllers/comunasController.js'; 

const router = express.Router();

router.get('/', getComunas);  

router.get('/:id', getComunaById);  

router.post('/', createComuna);

router.put('/:id', updateComuna);

router.delete('/:id', deleteComuna);

export default router;
