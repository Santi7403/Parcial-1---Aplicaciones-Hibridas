import Vecino from '../models/Vecino.js';

export const getVecinos = async (req, res) => {
  try {
    const vecinos = await Vecino.find();
    res.json(vecinos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los vecinos', error });
  }
};

export const getVecinoById = async (req, res) => {
  const { id } = req.params;

  try {
    const vecino = await Vecino.findById(id);
    if (!vecino) {
      return res.status(404).json({ message: 'Vecino no encontrado' });
    }
    res.json(vecino);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el vecino', error });
  }
};

export const createVecino = async (req, res) => {
  const { nombre, edad, comuna, direccion, telefono } = req.body; 

  try {
    const nuevoVecino = new Vecino({ nombre, edad, comuna, direccion, telefono }); 
    await nuevoVecino.save();
    res.status(201).json({ message: 'Vecino creado', data: nuevoVecino });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el vecino', error });
  }
};

export const updateVecino = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, telefono, comunaId } = req.body;  

  try {
    const vecino = await Vecino.findByIdAndUpdate(
      id,
      {
        nombre,
        direccion,  
        telefono,   
        comuna: comunaId,  
      },
      { new: true }
    );

    if (!vecino) {
      return res.status(404).json({ message: 'Vecino no encontrado' });
    }

    res.json({ message: 'Vecino actualizado', data: vecino });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el vecino', error });
  }
};

export const deleteVecino = async (req, res) => {
  const { id } = req.params;

  try {
    const vecino = await Vecino.findByIdAndDelete(id);
    if (!vecino) {
      return res.status(404).json({ message: 'Vecino no encontrado' });
    }
    res.json({ message: 'Vecino eliminado', data: vecino });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el vecino', error });
  }
};
export const getVecinosByComuna = async (req, res) => {
  const { comunaId } = req.params;

  try {
    const vecinos = await Vecino.find({ comuna: comunaId });

    if (!vecinos || vecinos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron vecinos en esta comuna' });
    }

    res.json(vecinos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los vecinos por comuna', error });
  }
};


export const buscarVecinoPorNombre = async (req, res) => {
  const { nombre } = req.params;

  try {
    const vecinos = await Vecino.find({
      nombre: { $regex: nombre, $options: 'i' } 
    });

    if (vecinos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron vecinos con ese nombre' });
    }

    res.json(vecinos);
  } catch (error) {
    res.status(500).json({ message: 'Error en la búsqueda por nombre', error });
  }
};
