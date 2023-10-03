const handleRegister = (req, res, db, bcrypt)=>{
    const {email, name, password} = req.body;
    if(!email || !name || !password)
       return res.status(404).json("Envio de datos incorrecto!.")
    
    
    const hash = bcrypt.hashSync(password);
    let registered = {};
        
    db.transaction(trx=>{
        trx.insert({
            email:email,
            hash: hash
        })
        .into("login")
        .returning("email")
        .then(loginEmail=>{
            console.log(loginEmail,'loginEmail')
            return trx('users')
            .returning("*")
            .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date()
            })
            .then(usr=>{
                if(usr.length)
                    registered = usr;
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .then(function(resp) {
        if(registered.length)
            res.json(registered[0]);
        else
            throw Error;
    })
    .catch(err=>res.status(404).json("Ocurrio un error y no pudiste registrarte. Revisa si no estabas ya registrad@." + err))
}

module.exports = {
    handleRegister: handleRegister
}