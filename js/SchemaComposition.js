const Ajv = require('ajv');

const ajv = new Ajv();

function testFunc(vData, schema) {
    for (const data of vData) {
        const validate = ajv.validate(schema, data);
        console.log(validate);
    }
}

console.log('allOf - AND');
const schema1 = { allOf: [{ type: 'string' }, { maxLength: 5 }] };
const vData1 = ['short', 'too long'];
testFunc(vData1, schema1);

console.log('anyOf - OR');
const schema2 = {
    anyOf: [
        { type: 'string', maxLength: 5 },
        { type: 'number', minimum: 0 },
    ],
};
const vData2 = [...vData1, 12, -5];
testFunc(vData2, schema2);

console.log('oneOf - XOR');
const schema3 = {
    type: 'number',
    oneOf: [{ multipleOf: 3 }, { multipleOf: 5 }],
};
const vData3 = [10, 3, 4, 15];
testFunc(vData3, schema3);

console.log('not - NOT');
const schema4 = { not: { type: 'string' } };
const vData4 = [42, { key: 'value' }, 'yoo'];
testFunc(vData4, schema4);

console.log('Subschema Independence');
const schema5 = {
    definitions: {
        address: {
            type: 'object',
            properties: {
                street_address: { type: 'string' },
                city: { type: 'string' },
                state: { type: 'string' },
            },
            required: ['street_address', 'city', 'state'],
        },
    },

    allOf: [
        { $ref: '#/definitions/address' },
        {
            properties: {
                type: { enum: ['residential', 'business'] },
            },
        },
    ],
};
const vData5 = [
    {
        street_address: '1600 Pennsylvania Avenue NW',
        city: 'Washington',
        state: 'DC',
        type: 'business',
    },
];
testFunc(vData5, schema5);
const schema5_1 = { ...schema5, additionalProperties: false };
testFunc(vData5, schema5_1);
