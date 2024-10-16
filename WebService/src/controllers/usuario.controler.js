const {getConnection,sql} = require('../database/connection');
const jwt = require('jsonwebtoken');


const getUserByCorreo = async (req,res) => {
    const {id} = req.params;
    console.log(id | JSON);
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('correo',sql.VarChar, id) 
        .query('select * from Usuarios where correo = @correo');
        console.log(respuesta.recordset);

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.json("Correo ya se encuentra en uso.");
        }else{
            res.json('Ok')
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}

const getUserByCorreoAndRut = async (req, res) => {
    console.log(req.query); // Cambiamos de req.body a req.query
    
    try {
        const pool = await getConnection();
        const { correo, rut } = req.query; // Obtenemos los parámetros de la consulta
        const respuesta = await pool.request()
            .input('correo', sql.VarChar, correo) // Usamos los parámetros directamente
            .input('rut', sql.VarChar, rut)
            .query('SELECT * FROM Usuarios WHERE correo = @correo AND rut = @rut');
        
        console.log(respuesta.recordset);

        await pool.close();
        if (respuesta.rowsAffected[0] > 0) {
            res.json('Ok');
        } else {
            res.json("No se encontró una cuenta asociada.");
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}

const getLogin = async (req, res) => {
    console.log(req.query);
    
    try {
        const pool = await getConnection();
        const { email, password } = req.query;
        
        const respuesta = await pool.request()
            .input('correo', sql.VarChar, email)
            .input('pass', sql.VarChar, password)
            .query(`
                SELECT correo, u.idTipoCuenta 
                FROM Usuarios u 
                JOIN TipoCuenta t ON u.idTipoCuenta = t.idTipoCuenta 
                WHERE correo = @correo AND password = @pass 

                UNION ALL 

                SELECT correo, e.idTipoCuenta 
                FROM Empleado e 
                JOIN TipoCuenta t ON e.idTipoCuenta = t.idTipoCuenta 
                WHERE correo = @correo AND password = @pass
            `);
        
        await pool.close();

        // Verificar si se encontraron resultados
        if (respuesta.recordset.length > 0) {
            const usuario = respuesta.recordset[0];

            // Creamos el token pasando los datos del usuario
            const tokenEmail = createToken(usuario.correo);
            const tokenTipoCuenta = createToken(usuario.idTipoCuenta);

            console.log(tokenEmail);
            console.log(tokenTipoCuenta);

            // Respondemos al cliente con el token generado
            res.json({ 'tokenCorreo': tokenEmail, 'tokenTipoCuenta': tokenTipoCuenta });
        } else {
            res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send(error.message);
    }
};

const createToken = (data) => {
    const payload = {
        data: data,
    };

    const token = jwt.sign(payload, 'secreto', { expiresIn: '1h' }); // Agregar expiración del token si es necesario

    return token;
};



const getUserByRut = async (req,res) => {
    const {id} = req.params;
    console.log(id | JSON);
    
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('rut',sql.VarChar, id) 
        .query('select * from Usuarios where rut = @rut');
        console.log(respuesta.recordset);

        await pool.close();
        if(respuesta.rowsAffected[0] > 0){
            res.json("Rut ya se encuentro en uso.");
        }else{
            res.json("Ok");

        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}



const createUser = async (req, res) => {
    try {
      const pool = await getConnection();
      const data = req.body;
      const request = await pool.request();
  
      console.log(data);
  
      // Definir los campos requeridos
      const camposRequeridos = ['nombre', 'apellido', 'rut', 'telefono', 'fechaNacimiento', 'email', 'password'];
  
      // Verificar si algún campo está vacío o indefinido
      for (let campo of camposRequeridos) {
        if (!data[campo] || data[campo].trim() === '') {
          res.status(400); // Código de error para mala solicitud
          return res.json(`El campo ${campo} no puede estar vacío`);
        }
      }
  
      const respuesta = await request
        .input('rut', sql.VarChar, data.rut)
        .input('nombre', sql.VarChar, data.nombre)
        .input('apellido', sql.VarChar, data.apellido)
        .input('correo', sql.VarChar, data.email)
        .input('telefono', sql.Int, data.telefono)
        .input('password', sql.VarChar, data.password)
        .input('tipoCuenta', sql.Int, 1)
        .query(
          'Insert into Usuarios (rut, nombre, apellido, correo, telefono, password, tipoCuenta) VALUES (@rut, @nombre, @apellido, @correo, @telefono, @password, @tipoCuenta)'
        );
  
      console.log(respuesta);
      await pool.close();
  
      if (respuesta.rowsAffected[0] > 0) {
        res.json("Ok");
      } else {
        res.json("Ocurrió un error al crear el usuario. Por favor, espere unos minutos.");
      }
    } catch (error) {
      console.log(error.message);
      res.status(501);
      res.send(error.message);
    }
  };
  

  const updateUser = async (req, res) => {
    console.log(req.body);
    const { id } = req.params; // Obtenemos el id de los parámetros de la ruta
    const data = req.body; // Obtenemos los datos del cuerpo de la solicitud

    try {
        const pool = await getConnection();
        
        // Validación de datos
        if (!data.email || !data.rut || !data.password) { // Cambiamos a 'data.email' y 'data.password'
            res.status(400); // Cambiamos a 400 para errores de solicitud
            return res.json("Error al actualizar usuario, no puede ingresar valores nulos");
        }

        const request = await pool.request();

        // Ejecutamos la consulta para actualizar el usuario basado en 'rut' y 'correo'
        const respuesta = await request
            .input('correo', sql.VarChar, data.email) // 'data.email' ahora se usa correctamente
            .input('rut', sql.VarChar, data.rut) // 'data.rut' está en el cuerpo de la solicitud
            .input('password', sql.VarChar, data.password) // 'data.password' ahora se usa correctamente
            .query("UPDATE Usuarios SET password = @password WHERE rut = @rut AND correo = @correo");

        console.log(respuesta);

        await pool.close();

        if (respuesta.rowsAffected[0] > 0) {
            res.status(200);
            return res.json("Usuario actualizado");
        } else {
            res.status(404); // Cambiamos a 404 si no se encontró el usuario
            return res.send('Error al actualizar: usuario no encontrado');
        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        return res.send(error.message);
    }
}


const deleteUser = async(req,res) => {
    const {id} = req.params;
    try {
        const pool = await getConnection();
        const respuesta = await pool.request()
        .input('id_usuario',sql.VarChar, id) 
        .query('delete from Usuario where correo = @id_usuario');
        console.log(respuesta);

        await pool.close(); 
        if(respuesta.rowsAffected[0] > 0){
            res.send(`Usuario con el id ${id} eliminado correctamente`);

        }else {
            res.status(500);
            res.send(`Error al eliminar el Usuario con el id ${id}`);

        }
    } catch (error) {
        console.log(error.message);
        res.status(500);
        res.send(error.message);
    }
}







module.exports = {
    viewByCorreo: getUserByCorreo,
    viewByRut: getUserByRut,
    viewByCorreoAndRut: getUserByCorreoAndRut,
    login: getLogin,
    createUser: createUser,
    update: updateUser,
    delete: deleteUser,
}
