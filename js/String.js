const Ajv = require('ajv');

const ajv = new Ajv();

const schema = { title: 'email',type: 'string', format: 'email' };

const data = '2020-01-01';

const validate = ajv.validate(schema, data);

console.log(validate);
