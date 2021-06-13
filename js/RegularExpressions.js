// build regular expressions
var re = /ab+c/;
var re2 = new RegExp('ab+c');

// pattern
// "\"
// \b : border
const sBackslash1 = /\bter\b/;
console.log('----sBackslash1----');
console.log('1', sBackslash1.test('interest')); // false
console.log('2', sBackslash1.test('in ter est')); // true

// a* : matches "a" 0 or more than 1 time
// a\* : matches "a*"
console.log('----sBackslash2----');
console.log('1', /aaaa*/g.test('caaady'));
console.log('2', /a\*/.test('caaady'));

// \\ : matches "\"
console.log('----sBackslash3----');
console.log('1', /[\\]/.test('>\\<'));

// "^" : prefix
console.log('----Prefix----');
console.log('1', /^A/.test('anA'));
console.log('2', /^A/.test('An E'));

// "$" :suffix
console.log('----Suffix----');
console.log('1', /A$/.test('anA'));
console.log('2', /A$/.test('An E'));

// "*" : matches word 0 or more than 1 time
console.log('----Star sign----');
console.log('1', /bo*/g.test('A ghost booooed')); // boooo
console.log('2', /bo*/g.test('A bird warbled')); // b
console.log('3', /bo*/g.test('A goat grunted'));

// "+" : matches word more than 1 time
console.log('----Plus sign----');
console.log('1', /a+/g.test('caaady'));

// "?" : matches word 0 or 1 time
console.log('----Question mark----');
console.log('1', /e?le?/.test('angel'));
console.log('2', /e?le?/.test('angle'));
console.log('3', /e?le?/.test('oslo'));
console.log('4', /\d+/.test('123abc'));
console.log('4', /\d+?/.test('123abc'));

// "." : Matches any character except line break characters
console.log('----Dot----');
console.log('1', /.n/.test('nay'));
console.log('1', /.n/.test('an'));
console.log('1', /.n/.test('banana'));

// (x)
console.log('----(x)----');
console.log('1', /(foo) (bar) \1 \2/.test("foo bar foo bar"))
console.log('1', /(foo) (bar) \1 \2/.test("foo bar foo"))