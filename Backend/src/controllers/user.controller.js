const db = require('../config/bd')//importar la conexion 
const bcrypt = require('bcryptjs')//para encriptar constraseña


//esportamos la funcion

exports.register = (req, res) =>{

    const {nombre, apellido1, apellido2, empresa, email, password, id_rol}= req.body

    //encriptar contraseña 
    const hashedPassword = bcrypt.hashSync(password, 10)

    const sql = "INSERT INTO Usuarios (id_rol, nombre, apellido1, apellido2, empresa, email, passwd) values (?,?,?,?,?,?,?)"
    db.query(sql, [id_rol,nombre,apellido1,apellido2,empresa,email,hashedPassword], (err, result) => {
        if(err){
            return res.status(500).json({erro: err.message})
        }
        res.status(201).json({message: "Usuario registrado correctamente", rol: id_rol})
    } )
}


//funcion de login

exports.login = (req, res) =>{
    const {email, passwd} = req.body

    if (!email || !passwd) {
        return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    const sql = "SELECT * FROM Usuarios WHERE email = ?"
    db.query(sql, [email], (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message})
        }
        console.log("Resultado de la consulta:", result); // Debug
        if (result.length === 0) {
            return res.status(404).json({error: "Usuario no encontrado"})
        }

        const userLogin = result[0]//email
        console.log("Datos del usuario:", userLogin); // Debug

        if (!userLogin.passwd) {
            return res.status(500).json({ error: "Error en la base de datos: el campo password está vacío" });
        }

        //comparamos contraseñas
        const passMatch = bcrypt.compareSync(passwd, userLogin.passwd)
        if (!passMatch) {
            return res.status(401).json({error: 'Contraseña incorrecta'})
        }
        res.status(200).json({message: 'Login exitoso', userLogin})
    })
}