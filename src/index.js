const express = require('express');
const { createPool } = require('mysql2/promise');

const app = express();

const pool = createPool({
    host: 'db_service',
    user: 'root',
    password: 'password',
    database: 'db_node',
    port: 3306
});

const port = 3000;

app.get('/', async (req, res) => {
 
	try{
		const [rows] = await pool.query('SELECT * FROM messages');
        
        	let responseText = '<h1>Mensajes existentes en la database:</h1>';
        	rows.forEach(row => {
            	responseText += `<p> -${row.text}</p>`;
        	});

        	res.send(responseText);
	}catch (error){
		res.status(500).send("Error al cosultar la base de datos");		
	}

});

app.get('/ping', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json(result[0])
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar la base de datos' });
    }
});

app.listen(port, () => {
    console.log(`Servidor activo pa, en el puerto ${port}`);
});

