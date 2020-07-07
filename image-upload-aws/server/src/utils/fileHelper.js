const uuid = require( 'node-uuid' );

function generateUniqueFilename( filename ) {
  const fileNameSplit = filename.split( '.' );
  const ext = fileNameSplit[ fileNameSplit.length - 1 ];
  fileNameSplit.splice( fileNameSplit.length - 1, 1 );
  const name = fileNameSplit.join('') + '_' + uuid.v4() + '.' + ext;
  return name;
}

module.exports = {
  generateUniqueFilename,
}