const rds = require('./rds');
const elastic = require( './elasticsearch' );

const migrateFromRdsToElastic = () => {
  console.log('Starting Migration');
  console.log('Fetching data from RDS');
  rds.getAllData().then( data => {
    if ( data && data.length ) {
      console.log( `Successfully fetched ${data.length} records` );
      console.log( 'Starting indexing to Elastic search' );
      const dataToIndex = data.map( image => ( {
        description: image.description,
        imageUrl: image.imageUrl,
        fileType: image.fileType,
        size: image.size
      } ) );
      elastic.bulkIndex( dataToIndex ).then( () => {
          console.log( 'Indexing completed' );
          console.log( 'Migration from RDS to elastic search successful' );
          process.exit( 1 );
        } );
    } else {
      console.log( 'No data found' );
      process.exit( 1 );
    }
  } );
};

migrateFromRdsToElastic();
