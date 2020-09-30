const handleSignin = (db,bcrypt) => (req, res) => {
    const {email, password} = req.body;

    if(!email || !password)
       return res.status(404).json("Envio de datos incorrecto!")

    db.select("email", "hash").from("login")
    .where("email","=",email)
    .then(data=>{
        if(data.length){
            const isUserValid = bcrypt.compareSync(password,data[0].hash);
            if(isUserValid){
                db.select("*").from("users")
                .where("email","=",data[0].email)
                .then(user=>{
                    res.json(user[0]);
                })
                .catch(err=>{s
                    res.status(404).json("No se encontro el usuario debido a problemas tecnicos.");
                })
                
            }else{
                res.status(404).json("Usuario o Clave incorrecta.");
                
            }
        }else{
            res.status(404).json("Usuario o Clave incorrecta.");
        }
    })
    .catch(err=>{
        res.status(404).json("No se encontro el usuario debido a problemas con la base de datos.");
    })
}

module.exports = {
    handleSignin : handleSignin
}