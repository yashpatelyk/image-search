const mysql = require( 'mysql' );
const config = require( '../config/config' );

const rds = {
  connection: null,
  setUpDatabase: () => {
    const con = mysql.createConnection( {
      host: config.db.endpoint,
      user: config.db.username,
      password: config.db.password
    } );
    this.connection = con;
    const tableName = config.db.tableName;
    const dbName = config.db.dbName;

    con.connect( ( err ) => {
      if ( err ) throw err;
      console.log( "Connected!" );
      con.query( `CREATE DATABASE IF NOT EXISTS ${dbName};` );
      con.query( `USE ${dbName};` );
      con.query( `CREATE TABLE IF NOT EXISTS ${tableName}(id int NOT NULL AUTO_INCREMENT, description varchar(255), imageUrl varchar(255), fileType varchar(10), size int, PRIMARY KEY(id));`, ( error ) => {
        if ( error ) {
          console.log( error );
        }
      } );
    } );
  },

  insertImageRow: ( description, imageFile ) => {
    return new Promise( ( resolve, reject ) => {
      try {
        const query = `INSERT INTO ${config.db.tableName} (description, imageUrl, fileType, size) VALUES ("${description}", "${imageFile.imageUrl}", "${imageFile.mimetype}",${imageFile.size});`;
        this.connection.query( query, ( error ) => {
          if ( error ) {
            console.log( error );
            return reject( 'Error inserting image into database' );
          }
          return resolve();
        } )
      } catch( err ) {
        reject( 'Unexpected error occurred' );
      }
    } );
  },

  getAllData: () => {
    return new Promise( ( resolve, reject ) => {
      const con = mysql.createConnection( {
        host: config.db.endpoint,
        user: config.db.username,
        password: config.db.password
      } );
      con.query( `select * from ${ config.db.dbName }.${ config.db.tableName }`, ( error, result ) => {
        if ( error ) {
          console.log( error );
          return reject( 'Error fetching images from rds' );
        }
        console.log( result );
        return resolve( result );
      } )
    } )
  }
}

module.exports = rds;
