const consul = require('./src/consul')

const commonConfiguration = {
  database: {
    connectionString: 'someConnectionString'
  }
}

const specificConfiguration = {
  domain: 'myapp.example.com',
  database: {
    connectionString: 'jdbc:mariadb://${database.host}/${database.name}?useSSL=false&useBulkStmts=true',
    host: 'localhost',
    name: 'some-db-name',
    someOtherObject: {
      has: 'somevalue'
    }
  }
}

const config = consul.flattenConfig([ common, specific ])
