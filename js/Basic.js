const Ajv = require('ajv');

const ajv = new Ajv();

const schema = { type: ['string', 'number'] };

const data1 = 42;
const data2 = 'string';
const data3 = {
    test: 1,
    test2: 'string',
    test3: null,
};

const valid1 = ajv.validate(schema, data1);
const valid2 = ajv.validate(schema, data2);
const valid3 = ajv.validate(schema, data3);

console.log(valid1, valid2, valid3);
