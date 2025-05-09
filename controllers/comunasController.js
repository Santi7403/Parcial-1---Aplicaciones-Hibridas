import Comuna from '../models/Comuna.js';

export const getComunas = async (req, res) => {
  try {
    const comunas = await Comuna.find();
    res.json(comunas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las comunas', error });
  }
};

export const createComuna = async (req, res) => {
  const { comuna, nombre, descripcion, dato_adicional, comisarias, barrios } = req.body;

  if (!comuna || !nombre || !descripcion || !dato_adicional || !comisarias || !barrios) {
    return res.status(400).json({ message: "Faltan datos en el cuerpo de la solicitud" });
  }

  const nuevaComuna = new Comuna({
    comuna,
    nombre,
    descripcion,
    dato_adicional,
    comisarias,
    barrios 
  });

  try {
    await nuevaComuna.save();
    res.status(201).json({ message: "Comuna creada", data: nuevaComuna });
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la comuna', error });
  }
};

export const getComunaById = async (req, res) => {
  const { id } = req.params;

  try {
      const comuna = await Comuna.findById(id);

      if (!comuna) {
          res.status(404).json({ message: "La comuna no fue encontrada" });
      } else {
          res.status(200).json({ message: "OK", data: comuna });
      }

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener la comuna", error });
  }
}

  export const deleteComuna = async (req, res) => {
    const { id } = req.params;

    try {
        const comuna = await Comuna.findByIdAndDelete(id);

        if (!comuna) {
            res.status(404).json({ message: "comuna no encontrada" });
        } else {
            res.status(200).json({ message: "comuna eliminada", data: comuna });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "error al eliminar comuna", error });
    }
  }

  export const updateComuna = async (req, res) => {
    const { id } = req.params; 
    const { comuna, nombre, descripcion, dato_adicional, comisarias, barrios } = req.body; 
  
    try {
      const updatedComuna = await Comuna.findByIdAndUpdate(
        id,
        { comuna, nombre, descripcion, dato_adicional, comisarias, barrios }, 
        { new: true } 
      );
  
      if (!updatedComuna) {
        return res.status(404).json({ message: 'Comuna no encontrada' }); 
      }
  
      res.status(200).json({ message: 'Comuna actualizada', data: updatedComuna });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar comuna', error });
    }
  };
  