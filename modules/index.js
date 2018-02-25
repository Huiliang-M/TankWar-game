const pgp = require('pg-promise')();

//pgp.pg.defaults.ssl = true;

const localConnection = {
	host: 'localhost',
    port: 5432,
	database: 'tankwar',
	user: 'postgres',
	password: '1'
};

const connection = process.env.DATABASE_URL||localConnection;

const db = pgp(connection);


db.connect()
	.then(() => {
		console.log("Successfully connected to database");
	})
	.catch(error => {
		console.log(error);
	});

module.exports = db;