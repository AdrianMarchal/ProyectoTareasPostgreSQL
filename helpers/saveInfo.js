const fileSystem = require('fs');
const { openConexion } = require('../database/conectorPostgreSQL');




const ruta = './database/data.json'


const readTaskBD = async () => {
    await openConexion()
}


const saveTask = async (task) => {
    const client = await openConexion()
    try{
        const query = `
            INSERT INTO tasks (id , description, completed) 
            VALUES ($1, $2 , $3) 
            RETURNING id, description, completed;`;
        await  client.query(query, [task.id,task.description,task.completed])
        client.end()
    }catch (err){
        console.log(err) 
    }
}

const readTask = async () => {
    let info;
    try{
        const client = await openConexion()
        const response = await  client.query('SELECT * FROM tasks')
        info = response.rows
        client.end()
    }catch (err){
        console.log(err)
        
    }

    return info
}

const deleteTaskFromDataBase = async (id) => {
    const client = await openConexion()
    try{
        const query = `
            DELETE FROM tasks WHERE id = $1`;
        await  client.query(query, [id])
        client.end()
    }catch (err){
        console.log(err) 
    }
}

const updateFromDataBase = async (task) => {
    const client = await openConexion()
    try{
        const query = `
            UPDATE tasks SET completed = $1 WHERE id = $2`;
        await  client.query(query, [task.completed,task.id])
        client.end()
    }catch (err){
        console.log(err) 
    }
}

module.exports = {
    saveTask,
    readTask,
    readTaskBD,
    deleteTaskFromDataBase,
    updateFromDataBase
}