const express = require( 'express' );
const router = express.Router();

const s3 = require( '../modules/s3bucket' );
const rds = require( '../modules/rds' );
const es = require('../modules/elasticsearch');
const { generateUniqueFilename } = require( '../utils/fileHelper' );

function validateUploadRequest ( req ) {
    if ( !req.files || !req.files.file ) {
        return "Image is required";
    }
    if (
        req.files.file.mimetype !== "image/png"
        && req.files.file.mimetype !== "image/jpeg"
        && req.files.file.mimetype !== "image/jpg"
    ) {
        return "Image should be in PNG or JPEG format";
    }
    if ( req.files.file.size > 500000 ) {
        return "Image can't be larger than 500KB";
    }
    if ( !req.body.description ) {
        return "Description is required";
    }
}

router.post( '/upload', ( req, res ) => {
  const validationError = validateUploadRequest( req );
  if ( !validationError ) {
    const description = req.body.description;
    const file = req.files.file;
    const fileName = generateUniqueFilename( file.name );
    // upload to s3
    return s3.uploadFile( file.tempFilePath, fileName )
      .then( ( imageUrl ) => {
        // index image to elastic search
        es.addToIndex( {
          imageUrl,
          description,
          fileType: file.mimetype,
          size: file.size,
        } ).then( () => {
          // if both are success, send 201 status
          res.status( 201 ).send();
        } )
          .catch( err => {
            // if error occurred while indexing, delete the file stored in S3
            s3.deleteFile( fileName ).then( () => {
              res.status( 500 ).send( { err } );
            } )
          } )
      } )
      .catch( ( err ) => {
        res.status( 500 ).send( { err } );
      } );
  } else {
    res.status( 400 ).send( { err: validationError } );
  }
} );

router.get( '/search', ( req, res ) => {
  es.search( req.query )
    .then( ( data ) => {
      res.status(200).send( data );
    } )
    .catch( err => {
      console.log( err )
      res.status(500).send( { err : 'Error occurred while fetching the records' } );
    } );
} )

module.exports = router;
