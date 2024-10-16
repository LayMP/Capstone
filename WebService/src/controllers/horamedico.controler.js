const {getConnection,sql} = require('../database/connection');


const getListadoHoraDisponible = async (req, res) => {
    const { id } = req.params; // id debería ser el correo electrónico
    console.log(id); // Cambié | JSON a solo imprimir id

    try {
        const pool = await getConnection();
        const data = req.body; // Asegúrate de que necesites esta variable, ya que no parece ser utilizada
        console.log(data);

        const respuesta = await pool.request()
            .input('correo', sql.VarChar, id)
            .query(`
                SELECT 
                    id,
                    FORMAT(fecha, 'dd-MM-yyyy') AS fecha,
                    CONVERT(VARCHAR(5), hora, 108) AS hora,
                    estado 
                FROM HorasDisponibles 
                WHERE correo = @correo
            `);
        
        await pool.close();

        if (respuesta.rowsAffected[0] > 0) {
            res.json(respuesta.recordset);
        } else {
            res.status(404).send('No se encontraron registros'); // Cambié el código de estado a 404 para indicar que no se encontró nada
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message); // Puedes optar por res.json({ error: error.message }) para una respuesta JSON
    }
}

const createHoraMedico = async (req,res) => {

    try {
        const pool = await getConnection();
        const data = req.body;
        const request = await pool.request();

        console.log(data);

        if ((data.fecha == "" || undefined) || (data.usuario == "" || undefined) ) {
            res.status(500);
            res.json("Error al crear la hora, no puede ingresar valores nulos");
            
        }else{
            const respuesta = await request

            .input('fecha', sql.Date, new Date(data.fecha)) // Asegúrate de que data.fecha sea un objeto Date
            .input('hora', sql.Time, data.hora) // Asegúrate de que data.hora sea una cadena que representa una hora
            .input('estado', sql.Int, 1)
            .input('correo', sql.VarChar(150), data.correo) // Especifica el tamaño de VarChar

            .query('Insert into HorasDisponibles (fecha, hora, estado,correo ) values (@fecha, @hora, @estado, @correo)');
            console.log(respuesta);
    
            await pool.close();
            if(respuesta.rowsAffected[0] > 0){
                res.json("Se ha registrado la hora.");
            }else{
                res.status(501);
                res.send('Error al crear el registro de hora')
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(501);
        res.send(error.message);
    }
}

const deleteHoraMedico = async (req, res) => {
    const { id } = req.params; // El id debería ser el identificador correcto (correo o id numérico)
    console.log('ID recibido:', id); // Imprime el id recibido

    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
            .input('id', sql.Int, id) // Verifica si el tipo del id es `sql.Int` o si es necesario ajustarlo (por ejemplo, si es un correo, sería `sql.VarChar`)
            .query('DELETE FROM HorasDisponibles WHERE id = @id');
        
        // Cerrar la conexión al pool de base de datos
        await pool.close();

        // Verificar si alguna fila fue afectada
        if (respuesta.rowsAffected[0] > 0) {
            res.json({ message: 'Se ha eliminado la hora con éxito.' });
        } else {
            res.status(404).json({ error: 'No se encontraron registros para eliminar.' });
        }

    } catch (error) {
        console.error('Error al eliminar la hora:', error.message);
        // Devolver el error como respuesta
        res.status(500).json({ error: error.message });
    }
};

const updateHoraMedico = async (req, res) => {
    const { id } = req.params; // ID del registro a actualizar
    const { fecha, hora, medico } = req.body; // Los campos que deseas actualizar (ajusta estos según lo que necesites)

    try {
        const pool = await getConnection();

        // Ejecutar la consulta de actualización
        const respuesta = await pool.request()
            .input('id', sql.Int, id)
            .input('fecha', sql.Date, new Date(fecha)) 
            .input('hora', sql.Time, hora)
            .query(`
                UPDATE HorasDisponibles 
                SET fecha = @fecha, hora = @hora
                WHERE id = @id
            `);

        // Cerrar la conexión a la base de datos
        await pool.close();

        // Verificar si alguna fila fue afectada
        if (respuesta.rowsAffected[0] > 0) {
            res.json({ message: 'La hora médica se ha actualizado con éxito.' });
        } else {
            res.status(404).json({ error: 'No se encontraron registros para actualizar.' });
        }

    } catch (error) {
        console.error('Error al actualizar la hora médica:', error.message);
        // Devolver el error como respuesta
        res.status(500).json({ error: error.message });
    }
};



module.exports = {
    getListadoHoraDisponible:getListadoHoraDisponible,
    postCreateHoraMedico: createHoraMedico,
    deleteCreateHoraMedico: deleteHoraMedico,
    updateHoraMedico: updateHoraMedico
}