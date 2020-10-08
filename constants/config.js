const enviroments = {
    development:{
        host : 'localhost',
        user : 'postgres',
        password : '123456',
        database : 'facerecognitiondb',
        apiclarifai:'531b1501937b46ce9504c24f406fd7e3'
    },
    production:{
        active: false
    }

}

module.exports = {
    enviroments : enviroments
}