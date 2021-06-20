const Ajv = require('ajv');

const ajv = new Ajv();

function testFunc(vData, schema) {
    for (const data of vData) {
        const validate = ajv.validate(schema, data);
        console.log(validate);
    }
}

console.log('integer');
const schema1 = { type: 'integer' };
const vData1 = [42, -1, 1.0, 3.14159, '42'];
testFunc(vData1, schema1);

console.log('number');
const schema2 = { type: 'number' };
const vData2 = [42, -1, 1.0, 2.99792458e8, '42'];
testFunc(vData2, schema2);

console.log('multipleOf');
const schema3 = { type: 'number', multipleOf: 10 };
const vData3 = [0, 10, 20, 25];
testFunc(vData3, schema3);

console.log('range');
const schema4 = { type: 'number', minimum: 0, exclusiveMaximum: 100 };
const vData4 = [-1, 0, 30, 100];
testFunc(vData4, schema4);
