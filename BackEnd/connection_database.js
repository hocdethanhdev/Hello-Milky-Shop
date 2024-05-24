const sql = require('mssql');

const config = {
    user: 'sa',              
    password: '12345',      
    server: 'localhost',     
    port: 1433,              
    database: 'HelloMilkyShop', 
    
    options: {
        encrypt: false,
        trustServerCertificate: true 
        
    }
};

let pool;

const connectionDatabase = async () => {
    try {
        pool = await sql.connect(config);
        console.log('Connected to SQL Server successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

const closeConnection = async () => {
    try {
        if (pool) {
            await pool.close();
            console.log('Connection to SQL Server closed.');
        }
    } catch (error) {
        console.error('Error while closing the connection:', error);
    }
};

module.exports = {
    connectionDatabase,
    closeConnection
};
