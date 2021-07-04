const Ajv = require('ajv');

const ajv = new Ajv();

function testFunc(vData, schema) {
    for (const data of vData) {
        const validate = ajv.validate(schema, data);
        console.log(validate);
    }
}

console.log('JSON Pointer');
// read: https://example.com/schemas/address#/properties/street_address
const schema1 = {
    $id: 'https://example.com/schemas/address',

    type: 'object',
    properties: {
        street_address: { type: 'string' }, // mean this {type: "string"}
        city: { type: 'string' },
        state: { type: 'string' },
    },
    required: ['street_address', 'city', 'state'],
};

console.log('Name Anchor');
// read: https://example.com/schemas/address#street_address
const schema2 = {
    $id: 'https://example.com/schemas/address',

    type: 'object',
    properties: {
        street_address: {
            $id: '#street_address',
            type: 'string',
        }, // mean this { $id: '#street_address', type: 'string',}
        city: { type: 'string' },
        state: { type: 'string' },
    },
    required: ['street_address', 'city', 'state'],
};

// !!need to figure out
console.log('Retrieval URI');
// read: https://example.com/schemas/address
const schema3 = {
    type: 'object',
    properties: {
        street_address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
    },
    required: ['street_address', 'city', 'state'],
};

console.log('$id & $ref');
console.log('$id');
// read: https://example.com/schemas/address
// schema5 is better than schema4
const schema4 = {
    $id: '/schemas/address',

    type: 'object',
    properties: {
        street_address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
    },
    required: ['street_address', 'city', 'state'],
};

const schema5 = {
    $id: 'https://example.com/schemas/address',

    type: 'object',
    properties: {
        street_address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
    },
    required: ['street_address', 'city', 'state'],
};

console.log('$ref');
const schema6 = {
    id: 'http://example.com/schema/customer',
    type: 'object',
    properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        shipping_address: { $ref: '/schema/address' },
        billing_address: { $ref: '/schema/address' },
    },
    required: ['first_name', 'last_name', 'shipping_address', 'billing_address'],
};

console.log('definitions');
const schema7 = {
    id: 'http://example.com/schema/customer',
    type: 'object',
    properties: {
        first_name: { $ref: '#/definitions/name' },
        last_name: { $ref: '#/definitions/name' },
        shipping_address: { $ref: '/schema/address' },
        billing_address: { $ref: '/schema/address' },
    },
    required: ['first_name', 'last_name', 'shipping_address', 'billing_address'],

    definitions: {
        name: { type: 'string' },
    },
};

console.log('Recursion');
const schema8 = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        children: { type: 'array', items: { $ref: '#' } },
    },
};
const vData8 = [
    {
        name: 'Elizabeth',
        children: [
            {
                name: 'Charles',
                children: [
                    {
                        name: 'William',
                        children: [{ name: 'George' }, { name: 'Charlotte' }],
                    },
                    {
                        name: 'Harry',
                    },
                ],
            },
        ],
    },
];
testFunc(vData8, schema8);

console.log('Bundle');
const schema9 = {
    $id: 'https://example.com/schemas/customer',

    type: 'object',
    properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        shipping_address: { $ref: '/schemas/address' },
        billing_address: { $ref: '/schemas/address' },
    },
    required: ['first_name', 'last_name', 'shipping_address', 'billing_address'],

    definitions: {
        address: {
            $id: '/schemas/address',

            type: 'object',
            properties: {
                street_address: { type: 'string' },
                city: { type: 'string' },
                state: { $ref: '#/definitions/state' },
            },
            required: ['street_address', 'city', 'state'],

            definitions: {
                state: { enum: ['CA', 'NY', '... etc ...'] },
            },
        },
    },
};
