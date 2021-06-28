const Ajv = require('ajv');

const ajv = new Ajv();

function testFunc(vData, schema) {
    for (const data of vData) {
        const validate = ajv.validate(schema, data);
        console.log(validate);
    }
}

console.log('Annotation');
const schema1 = {
    title: 'Match anything',
    description: 'This is a schema that matches anything',
    default: 'Default value',
    example: ['Anything', 4035],
    readOnly: true,
    writeOnly: false,
};

console.log('Enumerated value');
const schema2 = { enum: ['red', 'amber', 'green'] };
const vData2 = ['red', 'green', 'blue'];
testFunc(vData2, schema2);

console.log('---');

const schema3 = { enum: [...schema2.enum, null, 42] };
const vData3 = ['red', 'green', 'blue', null, 42];
testFunc(vData3, schema3);

console.log('Constant value');
const schema4 = { properties: { country: { const: 'USA' } } };
const vData4 = [{ country: 'USA' }, { country: 'Taiwan' }];
testFunc(vData4, schema4);
