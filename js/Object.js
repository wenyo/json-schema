const Ajv = require('ajv');

const ajv = new Ajv();

function testFunc(vData, schema) {
    for (const data of vData) {
        const validate = ajv.validate(schema, data);
        console.log(validate);
    }
}

console.log('object');
const schema1 = { type: 'object' };
const vData1 = [
    {
        key: 'value',
        another_key: 'another_value',
    },
    {
        Sun: 1.9891e30,
        Jupiter: 1.8986e27,
        Saturn: 5.6846e26,
        Neptune: 10.243e25,
        Uranus: 8.681e25,
        Earth: 5.9736e24,
        Venus: 4.8685e24,
        Mars: 6.4185e23,
        Mercury: 3.3022e23,
        Moon: 7.349e22,
        Pluto: 1.25e22,
    },
    {
        0.01: 'cm',
        1: 'm',
        1000: 'km',
    },
    ['An', 'array', 'not', 'an', 'object'],
];
testFunc(vData1, schema1);

console.log('properties');
const schema2 = {
    type: 'object',
    properties: {
        number: { type: 'number' },
        street_name: { type: 'string' },
        street_type: { enum: ['Street', 'Avenue', 'Boulevard'] },
    },
};
const vData2 = [
    { number: 1600, street_name: 'Pennsylvania', street_type: 'Avenue' },
    { number: '1600', street_name: 'Pennsylvania', street_type: 'Avenue' },
    { number: 1600, street_name: 'Pennsylvania' },
    {},
    { number: 1600, street_name: 'Pennsylvania', street_type: 'Avenue', direction: 'NW' },
];
testFunc(vData2, schema2);

console.log('Pattern Properties');
const schema3 = { type: 'object', patternProperties: { '^S_': { type: 'string' }, '^I_': { type: 'number' } } };
const vData3 = [
    { S_25: 'This is a string' },
    { I_0: 42 },
    { S_0: 42 },
    { I_42: 'This is a string' },
    { keyword: 'value' },
];
testFunc(vData3, schema3);

console.log('Addtional Properties');
const schema4 = { ...schema2, additionalProperties: false };
const schema4_2 = { ...schema2, additionalProperties: { type: 'string' } };
const vData4 = [
    { number: 1600, street_name: 'Pennsylvania', street_type: 'Avenue' },
    { number: 1600, street_name: 'Pennsylvania', street_type: 'Avenue', direction: 'NW' },
    { number: 1600, street_name: 'Pennsylvania', street_type: 'Avenue', office_number: 201 },
];
testFunc(vData4, schema4);
testFunc(vData4, schema4_2);

console.log('Required Properties');
const schema5 = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        address: { type: 'string' },
        telephone: { type: 'string' },
    },
    require: ['name', 'email'],
};
const vData5 = [
    {
        name: 'William Shakespeare',
        email: 'bill@stratford-upon-avon.co.uk',
    },
    {
        name: 'William Shakespeare',
        email: 'bill@stratford-upon-avon.co.uk',
        address: 'Henley Street, Stratford-upon-Avon, Warwickshire, England',
        authorship: 'in question',
    },
    {
        name: 'William Shakespeare',
        address: 'Henley Street, Stratford-upon-Avon, Warwickshire, England',
    },
    {
        name: 'William Shakespeare',
        address: 'Henley Street, Stratford-upon-Avon, Warwickshire, England',
        email: null,
    },
];
testFunc(vData5, schema5);

console.log('Property name');

const schema6 = {
    type: 'object',
    propertyNames: {
        pattern: '^[A-Za-z_][A-Za-z0-9_]*$',
    },
};

const vData6 = [{ _adhjkjhkj: 'value' }, { '0adhjkjhkj': 'value' }];
testFunc(vData6, schema6);

console.log('Size');
const schema7 = {
    type: 'object',
    minProperties: 2,
    maxProperties: 3,
};
const vData7 = [{}, { a: 0 }, { a: 0, b: 0 }, { a: 0, b: 0, c: 1, d: 5 }];
testFunc(vData7, schema7);
