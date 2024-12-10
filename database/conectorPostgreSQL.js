const {Client} = require('pg')

const connectionData = {
    user: 'postgres',
    host: '',
    database: 'tarea',
    password: 'root',
    port: 5432,
}

const openConexion = async () => {
    const client = new Client(connectionData);
    try {
        
        await client.connect();
        return client; 
    } catch (error) {  
        throw error; 
    }
}

module.exports = {
   openConexion
}

