const AWS = require( 'aws-sdk' );
const fs = require( 'fs' );
const config = require( '../config/config' );

const s3 = new AWS.S3( { apiVersion: '2020-07-05' } );

const s3Bucket = {
  uploadFile: ( file, fileName ) => {
    return new Promise( ( resolve, reject ) => {
      var uploadParams = {
        Bucket: config.s3BucketName,
        Key: fileName,
        Body: '',
        ACL: 'public-read'
      };
      var fileStream = fs.createReadStream( file );
      fileStream.on( 'error', function () {
        reject( 'Unable to read the provided file' );
      } );
      uploadParams.Body = fileStream;
      s3.upload( uploadParams, function ( err, data ) {
        if ( err ) {
          reject( 'Unable to upload file to our servers' );
        } else {
          resolve( data.Location );
        }
      } );
    } )
  },
  deleteFile: ( Key ) => {
    return new Promise( ( resolve, reject ) => {
      var params = {
        Bucket: config.s3BucketName,
        Key,
      };
      s3.deleteObject( params, function ( err ) {
        if ( err ) {
          return reject( "Unexpected error occured" );
        }
        resolve();
      } );
    } );
  }
}

module.exports = s3Bucket;
