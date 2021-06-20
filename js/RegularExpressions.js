// build regular expressions
var re = /ab+c/;
var re2 = new RegExp('ab+c');

// pattern
// "\"
// \b : word boundary
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
console.log('5', /\d+?/.test('123abc'));

// "." : Matches any character except line break characters
console.log('----Dot----');
console.log('1', /.n/.test('nay'));
console.log('2', /.n/.test('an'));
console.log('3', /.n/.test('banana'));

// (x) : Capturing Parentheses
console.log('----(x)----');
console.log('1', /(foo) (bar) \1 \2/.test('foo bar foo bar'));
console.log('2', /(foo) (bar) \1 \2/.test('foo bar foo'));

// ??? need to figure out ???
// (?:x) : Non-Capturing Parentheses
console.log('----(?:x)----');
console.log('1', 'foo'.match(/(foo)/));
console.log('2', 'foo'.match(/foo/));

// x(?=y) : matches x which is followed with y
console.log('----x(?=y)----');
const test = /Jack(?=Spark)/;
console.log('1', 'JackSpark'.match(test));
console.log('2', 'JackDpark'.match(test));
console.log('3', 'JackFrost66'.match(/Jack(?=Sprat|Frost)/));

// x(?!y) : matches x which isn't followed with y
console.log('----x(?!y)----');
console.log('1', /\d+(?!\.)/.exec('3.141'));

// x|y : matches x or y
console.log('----x|y----');
console.log('1', /green|red/.exec('green apple'));
console.log('2', /green|red/.exec('red apple'));

// x{n} : matches x * n times ( n need to be positive int)
console.log('----x{n}----');
console.log('1', /a{2}/.exec('candy'));
console.log('2', /a{2}/.exec('caandy'));
console.log('3', /a{2}/.exec('caaandy'));

// x{n,m} : matches x * n~m times
console.log('----x{n,m}----');
console.log('1', /a{1,3}/.exec('candy'));
console.log('2', /a{1,3}/.exec('caaandy'));
console.log('3', /a{1,3}/.exec('caaaaaaaandy'));

// [xyz] : matches x or y or z
console.log('----[xyz]----');
console.log('1', /[a-d]/.exec('brisketab'));
console.log('2', /[a-d]/.exec('city'));
console.log('3', /[a-z]+/.exec('test.i.ng'));
console.log('4', /[\w]+/.exec('test.i.ng'));

// [\b] : 倒退字元
// \b : word boundary
console.log(`----\b----`);
console.log('1', /\bm/.exec('moon'));
console.log('2', /oo\b/.exec('moon'));
console.log('3', /oon\b/.exec('moon'));

// \B : not word boundary
console.log(`----\B----`);
console.log('1', /\B.../.exec('nanday'));

// \d : equal [0-9]
console.log(`----\d----`);
console.log(/\d/.exec('B2 is the suite number'));

// \D : equal [^0-9]
console.log(`----\D----`);
console.log(/\D/.exec('B2 is the suite number'));

// \s : equal [ \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]
console.log(`----\s----`);
console.log(/\s\w*/.exec('foo bar'));

// \S : equal [^ \f\n\r\t\v\u00a0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]
console.log(`----\S----`);
console.log(/\S\w*/.exec('foo bar'));

// \w : equal [A-Za-z0-9_]
console.log(`----\w----`);
console.log(/\w/.exec('foo bar'));
console.log(/\w/.exec('$5.88'));

// \W : equal [A-Za-z0-9_]
console.log(`----\W----`);
console.log(/\W/.exec('foo bar'));
console.log(/\W/.exec('$5.88'));

// \n : n is positive int
console.log('----\n----');
console.log('1', /apple(,)\sorange\1/.exec('apple, orange, cherry, peach.'));
const test2 = /apple(,)\sorange\1/.exec('apple, orange, cherry, peach.');

// \xhh : 16進制
// \ddd : 3個 8進制

// \c : U+000D
// \r : U+000D
// \f : U+000C
// \n : U+000A
// \t : U+0009 tab
// \v : U+000B vertical tab
// \0 : U+0000 NULL

/** RegExp methods & String methods */
const test3 = RegExp(/Chapter (\d+).\d*/);
const test4 = RegExp(/Chapter (\d+).\d*/, 'g');
const word = 'Chapter 3.4';
// RegExp methods
// exec() : null or array
console.log(test3.exec(word));
// test() : true or false
console.log(test3.test(word));

// String methods
// match() : null or array
console.log(word.match(test3));

// search() : int, -1
console.log(word.search(test3));
console.log(word[word.search(test3)]);

// str.replace(regexp|substr, newSubstr|function) : new string
var str = 'Twas the night before Xmas...';
var newstr = str.replace(/xmas/i, 'Christmas');
console.log(newstr);

var re = /apples/gi;
var str = 'Apples are round, and apples are juicy.';
var newstr = str.replace(re, 'oranges');
console.log(newstr);

var re = /(\w+)\s(\w+)/;
var str = 'John Smith';
var newstr = str.replace(re, '$2, $1');
console.log(newstr);

// need figure out
function replacer(match, p1, p2, p3, offset, string) {
    // p1 is nondigits, p2 digits, and p3 non-alphanumerics
    console.log(match, p1, p2, p3, offset, string);
    return [p1, p2, p3].join(' - ');
}
var newString = '@@abc1234'.replace(/([^\d]*)(\d*)([^\w]*)/, replacer);
console.log(newString);
