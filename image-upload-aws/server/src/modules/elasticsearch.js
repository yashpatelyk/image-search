const es = require('@elastic/elasticsearch');
const config = require('../config/config');

const client = new es.Client({
    node: config.elasticsearch.host,
    auth: {
      username: config.elasticsearch.username,
      password: config.elasticsearch.password
    },
});
const index = config.elasticsearch.indexName;

const addToIndex = ( imageObj ) => {
  return client.index({
    index,
    body: imageObj
  });
};

const bulkIndex = ( imageObjs ) => {
  const body = imageObjs.flatMap(doc => [{ index: { _index: index } }, doc])
  return client.bulk({ refresh: true, body })
    .catch( () => {
      console.log( 'Error occurred while performing Bulk Index' );
    } )
}

const search = ( filter ) => {
  const pageSize = 20;
  const pageNumber = filter.pageNumber;
  delete filter.pageNumber;
  return client.search({
    index,
    // type,
    from: ( ( pageNumber || 1 ) - 1 ) * pageSize,
    size: pageSize, // this is number of records to return
    body: {
      query: {
        bool: {
          must : Object.keys( filter ).map( key => ( {
            match: {
              [key]: filter[key],
            }
          } ) )
        },
      }
    }
  })
    .then( res => res.body );
}

module.exports = {
  client,
  addToIndex,
  search,
  bulkIndex
};
