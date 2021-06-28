const Ajv = require('ajv');

const ajv = new Ajv();

function testFunc(vData, schema) {
    for (const data of vData) {
        const validate = ajv.validate(schema, data);
        console.log(validate);
    }
}

console.log('Boolean');
const schema1 = { type: 'boolean' };
const vData1 = [true, false, 'true'];
testFunc(vData1, schema1);

console.log('Null');
const schema2 = { type: 'null' };
const vData2 = [null, false, '0', 0];
testFunc(vData2, schema2);
