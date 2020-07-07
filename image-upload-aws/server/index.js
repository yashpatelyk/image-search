const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const AWS = require( 'aws-sdk' );

const rds = require('./src/modules/rds');
const imageRoutes = require('./src/routes/image-routes');
const config = require( './src/config/config' );

const app = express();

const credentials = new AWS.SharedIniFileCredentials( { profile: config.awsProfile } );
AWS.config.credentials = credentials;

rds.setUpDatabase();

app.set('executionsThisTime', 0);
// app.set('config', config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
}));

app.use('/image', imageRoutes);

app.listen( 3000, () => {
  console.log( 'Server running on port 3000' )
} );

module.exports = app;
