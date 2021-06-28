const Ajv = require('ajv');

const ajv = new Ajv();

function testFunc(vData, schema) {
    for (const data of vData) {
        const validate = ajv.validate(schema, data);
        console.log(validate);
    }
}

console.log('Property dependencies');
const schema1 = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        credit_card: { type: 'number' },
        billing_address: { type: 'string' },
    },
    require: ['name'],
    dependencies: { credit_card: ['billing_address'] },
};
const vData1 = [
    {
        name: 'John Doe',
        credit_card: 5555555555555555,
        billing_address: "555 Debtor's Lane",
    },
    {
        name: 'John Doe',
        credit_card: 5555555555555555,
    },
    {
        name: 'John Doe',
    },
    {
        name: 'John Doe',
        billing_address: "555 Debtor's Lane",
    },
];
testFunc(vData1, schema1);

console.log('Schema dependencies');
const schema2 = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        credit_card: { type: 'number' },
    },
    require: ['name'],
    dependencies: {
        credit_card: {
            properties: { billing_address: { type: 'string' } },
            required: ['billing_address'],
        },
    },
};
testFunc(vData1, schema2);

console.log('if/else/then');
const schema3 = {
    type: 'object',
    properties: {
        street_address: {
            type: 'string',
        },
        country: {
            default: 'United States of America',
            enum: ['United States of America', 'Canada'],
        },
    },
    if: {
        properties: { country: { const: 'United States of America' } },
    },
    then: {
        properties: { postal_code: { pattern: '[0-9]{5}(-[0-9]{4})?' } },
    },
    else: {
        properties: { postal_code: { pattern: '[A-Z][0-9][A-Z] [0-9][A-Z][0-9]' } },
    },
};
const vData3 = [
    {
        street_address: '1600 Pennsylvania Avenue NW',
        country: 'United States of America',
        postal_code: '20500',
    },
    {
        street_address: '1600 Pennsylvania Avenue NW',
        postal_code: '20500-0000',
    },
    {
        street_address: '24 Sussex Drive',
        country: 'Canada',
        postal_code: 'K1M 1M4',
    },
    {
        street_address: '24 Sussex Drive',
        country: 'Canada',
        postal_code: '10000',
    },
    {
        street_address: '1600 Pennsylvania Avenue NW',
        postal_code: 'K1M 1M4',
    },
];
testFunc(vData3, schema3);

console.log('if/then & allOf');
const schema4 = {
    type: 'object',
    properties: {
        street_address: {
            type: 'string',
        },
        country: {
            default: 'United States of America',
            enum: ['United States of America', 'Canada', 'Netherlands'],
        },
    },
    allOf: [
        {
            if: {
                properties: { country: { const: 'United States of America' } },
            },
            then: {
                properties: { postal_code: { pattern: '[0-9]{5}(-[0-9]{4})?' } },
            },
        },
        {
            if: {
                properties: { country: { const: 'Canada' } },
                required: ['country'],
            },
            then: {
                properties: { postal_code: { pattern: '[A-Z][0-9][A-Z] [0-9][A-Z][0-9]' } },
            },
        },
        {
            if: {
                properties: { country: { const: 'Netherlands' } },
                required: ['country'],
            },
            then: {
                properties: { postal_code: { pattern: '[0-9]{4} [A-Z]{2}' } },
            },
        },
    ],
};
const vData4 = [
    ...vData3,
    {
        street_address: 'Adriaan Goekooplaan',
        country: 'Netherlands',
        postal_code: '2517 JX',
    },
    {
        street_address: '24 Sussex Drive',
        country: 'Canada',
        postal_code: '10000',
    },
    {
        street_address: '1600 Pennsylvania Avenue NW',
        postal_code: 'K1M 1M4',
    },
];
testFunc(vData4, schema4);

console.log('anyOf : !A || B');
const schema5 = {
    type: 'object',
    properties: {
        restaurantType: { enum: ['fast-food', 'sit-down'] },
        total: { type: 'number' },
        tip: { type: 'number' },
    },
    anyOf: [
        {
            not: {
                properties: { restaurantType: { const: 'sit-down' } },
                required: ['restaurantType'],
            },
        },
        { required: ['tip'] },
    ],
};
const vData5 = [
    {
        restaurantType: 'sit-down',
        total: 16.99,
        tip: 3.4,
    },
    {
        restaurantType: 'sit-down',
        total: 16.99,
    },
    {
        restaurantType: 'fast-food',
        total: 6.99,
    },
    { total: 5.25 },
];
testFunc(vData5, schema5);
