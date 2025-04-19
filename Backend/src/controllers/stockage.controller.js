const db = require("../config/bd");

// coger todos los ingredientes ordenados por ingrediente

exports.getAllStockage = (req, res) => {
  const sql = `
    SELECT id_ingrediente,
           ingrediente,
           categoria,
           cantidad_almacen,
           cantidad_nevera,
           cantidad_congelador, 
           qty_total  
    FROM vista_stockage
   
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "No se encuentran registros" });
    }

    res.status(200).json(result);
  });
};

exports.buscarStockage = (req, res) => {
  const busquedaNombre = req.query.busqueda || "";

  const sql = `SELECT * FROM vista_stockage WHERE ingrediente LIKE ? `;
  const valorLike = `%${busquedaNombre}%`; //asi eliminamos injecciones de sql

  db.query(sql, [valorLike], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({
          error: "No se encontraron ingredientes que coincidan con la búsqueda",
        });
    }

    res.status(200).json(result);
  });
};

//la he probado al no funcionarme otras y esta si funciona

exports.getStockageById = (req, res) => {
  const id = req.params.id; 
  const selectQuery = "SELECT * FROM stockages WHERE id_ingrediente = ?"; 

  db.query(selectQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message }); 
    }

    if (result.length == 0) {
      return res.status(404).json({ error: "Ingrediente no encontrado" }); 
    }

    res.status(200).json(result[0]); 
  });
};

//hay un problema con una tabla de etiquetas

exports.deleteIngredientById = (req, res) => {
  const { id } = req.params; // Se espera el id en la URL, como /stockage/delete/5

  const deleteQuery = "DELETE FROM stockages WHERE id_ingrediente = ?";
  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Ingrediente no encontrado para eliminar" });
    }

    res.status(200).json({ message: "Ingrediente eliminado correctamente" });
  });
};

exports.updateStockage = (req, res) => {
  // Extraemos las cantidades del body
  const { cantidad_almacen, cantidad_nevera, cantidad_congelador } = req.body;
  const idIngrediente = req.params.id; // ID del ingrediente pasado como parámetro en la URL

  // Por lo menos debe venir una cantidad sin no s epuede hacer
  if (!cantidad_almacen && !cantidad_nevera && !cantidad_congelador) {
    return res
      .status(400)
      .json({
        error: "Debe proporcionar al menos una cantidad para actualizar",
      });
  }

  // Comprobamos si el ingrediente existe en el almacenamiento con el ID
  const checkQuery = "SELECT * FROM stockages WHERE id_ingrediente = ?";
  db.query(checkQuery, [idIngrediente], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      // Si no existe el ingrediente con ese ID, respondemos con un error
      return res.status(404).json({ error: "Ingrediente no encontrado" });
    }

    // Si existe, sumamos las cantidades y actualizamos
    const existing = results[0];

    const newCantAlmacen =
      (Number(existing.cantidad_almacen) || 0) +
      (Number(cantidad_almacen) || 0);
    const newCantNevera =
      (Number(existing.cantidad_nevera) || 0) + (Number(cantidad_nevera) || 0);
    const newCantCongelador =
      (Number(existing.cantidad_congelador) || 0) +
      (Number(cantidad_congelador) || 0);

    // Query para la actualización
    const sql = `
        UPDATE stockages
        SET cantidad_almacen = ?,
            cantidad_nevera = ?,
            cantidad_congelador = ?
        WHERE id_ingrediente = ?
      `;

    db.query(
      sql,
      [newCantAlmacen, newCantNevera, newCantCongelador, idIngrediente],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ error: "No se actualizó el ingrediente" });
        } else {
          res
            .status(200)
            .json({ message: "Ingrediente actualizado correctamente" });
        }
      }
    );
  });
};
