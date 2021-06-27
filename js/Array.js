const Ajv = require('ajv');

const ajv = new Ajv();

function testFunc(vData, schema) {
    for (const data of vData) {
        const validate = ajv.validate(schema, data);
        console.log(validate);
    }
}

console.log('Array');
const schema1 = { type: 'array' };
const vData1 = [[1, 2, 3, 4, 5], [3, 'ss', { key: 'value' }], { key: 'value' }];
testFunc(vData1, schema1);

console.log('List validation');
const schema2 = { type: 'array', items: { type: 'number' } };
const vData2 = [[1, 2, 3, 3], [1, 2, 3, '3'], []];
testFunc(vData2, schema2);

console.log('Tuple validation');
const schema3 = {
    type: 'array',
    items: [
        { type: 'number' },
        { type: 'string' },
        { enum: ['Street', 'Avenue', 'Boulevard'] },
        { enum: ['NW', 'NE', 'SW', 'SE'] },
    ],
};
const vData3 = [
    [1600, 'Pennsylvania', 'Avenue', 'NW'],
    [24, 'Sussex', 'Drive'],
    ["Palais de l'Élysée"],
    [10, 'Downing', 'Street'],
    [1600, 'Pennsylvania', 'Avenue', 'NW', 'Washimgton'],
];
testFunc(vData3, schema3);

console.log('additional Items: boolean');
const schema4 = { ...schema3, additionalItems: false };
testFunc(vData3, schema4);

console.log('additional Items: type');
const schema5 = { ...schema3, additionalItems: { type: 'string' } };
testFunc(vData3, schema5);

console.log('contains');
const schema6 = { type: 'array', contains: { type: 'number' } };
const vData6 = [
    ['life', 'unit', 'www', 42],
    ['life', 'unit', 'www'],
    [1, 2, 3, 4, 5],
];
testFunc(vData6, schema6);

console.log('Length');
const schema7 = { type: 'array', minItems: 2, maxItems: 3 };
const vData7 = [[], [1], [1, 2], [1, 2, 3], [1, 2, 3, 4]];
testFunc(vData7, schema7);

console.log('Uniqueness');
const schema8 = { type: 'array', uniqueItems: true };
const vData8 = [[1, 2, 3, 4, 5, 6], [1, 2, 2, 3, 4], []];
testFunc(vData8, schema8);
