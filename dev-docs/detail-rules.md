## Detail JS & TS styleguide
The format check is using eslint and prettier.

For detail infos, it is here

### ESLint Default
> Warning: Long content, 177 Rules

- `accessor-pairs` 
  If setter is defined, getter should be defined too
- `array-bracket-spacing`
  A space should exist between elements of arrays
- `block-scoped-var`
  Cannot read variable outside the block scope
- `brace-style`
  Brace should in the same line of if, while, for, etc. *AKA Java Style*
- `camelcase` 
  Variable using camelCase
- `comma-spacing`
  Whitespaces after comma,
- `comma-style`
  Comma in the end of the line instead the start in the newline [Rule comma-style]
- `complexity`
  Complexity should be less than 9
- `computed-property-spacing`
  No spaces in the start and end of array destruction
- `curly`
  Curly braces surround code block scope
- `dot-location`
  Dot should in the same line of properties
- `dot-notation`
  Use dot to get location instead style of square brackets
- `eol-last`
  Use LF EOL
- `eqeqeq`
  Use strict equals to avoid force type transforming *Allow null*
- `no-array-constructor`
  No array constructor
- `no-caller`
  No arguments.caller or arguments.callee
- `no-catch-shadow`
  No catch shadows
- `no-class-assign`
  No class assignments
- `no-cond-assign`
  No assignments in conditions [What is it](#cond-assign)
- `no-console`
  Do not use console
- `no-const-assign`
  No assignments of const
- `no-constant-condition`
  No constant condition like if(true) and if(false)
- `no-control-regex`
  No control characters in RegExp
- `no-debugger`
  No debugger
- `no-delete-var`
  No delete variable
- `no-div-regex`
  No RegExps like a division assignment
- `no-dupe-keys`
  No duplicate keys in object
- `no-dupe-args`
  No duplicate arguments in function
- `no-duplicate-case`
  No duplicate case in switch
- `no-else-return`
  No else if a return statement in if statement
- `no-empty`
  No empty code block scope
- `no-empty-character-class`
  No empty square brackets in RegExp
- `no-empty-label`
  No empty label
- `no-eq-null`
  No using equals to null
- `no-eval`
  No eval
- `no-ex-assign`
  No error assignment
- `no-extend-native`
  No extending native object prototypes
- `no-extra-bind`
  No extra function binding
- `no-extra-boolean-cast`
  No extra boolean cast
- `no-extra-parens`
  No extra parens
- `no-extra-semi`
  No extra semicolons
- `no-fallthrough`
  No switch case fallthrough
- `no-floating-decimal`
  No float decimal
- `no-func-assign`
  No function assignments
- `no-implicit-coercion`
  No Implicit Coercion
- `no-implied-eval`
  No implied eval, e.g. new Function, setTimeout with a string param
- `no-inner-declarations`
  No inner declarations of functions
- `no-invalid-regexp`
  No invalid RegExp
- `no-invalid-this`
  No invalid this or global this
- `no-irregular-whitespace`
  No irregular whitespace
- `no-iterator
  No using \_\_iterator\_\_ property
- `no-label-var`
  label cannot be same as variable
- `no-labels`
  No labels
- `no-lone-blocks`
  No empty blocks
- `no-lonely-if`
  No a lonely if in else statement
- `no-loop-func`
  Do not use functions in loop (if using variables outside the scope)
- `no-mixed-spaces-and-tabs`
  Using spaces, no tabs
- `no-multi-spaces`
  No multiple spaces
- `no-multi-str`
  No multiple line string, using backslash instead
- `no-multiple-empty-lines`
  Empty lines should be 2 lines at most
- `no-native-reassign`
  No overwrite native object
- `no-negated-in-lhs`
  No negated in lhs
- `no-new`
  No lonely new
- `no-new-func`
  No new Function
- `no-new-object`
  No new Object, use braces
- `no-new-require`
  No new require
- `no-new-wrappers`
  No creating wrappers with new
- `no-obj-calls`
  No call object
- `no-octal`
  Using 0o prefix instead 0 prefix to use OCT
- `no-octal-escape`
  No 0o prefix to use OCT
- `no-param-reassign`
  No parameter reassignment
- `no-proto`
  Do not use \_\_proto\_\_
- `no-redeclare`
  No redeclare
- `no-regex-spaces`
  No RegExp spaces
- `no-self-compare`
  No self compare
- `no-spaced-func`
  No spaced function call
- `no-sparse-arrays`
  No spared arrays
- `no-throw-literal`
  No throwing types different from Error
- `no-undef-init`
  No undefined initial assignment
- `no-undefined`
- `no-unexpected-multiline`
  No unexpected multiline
- `no-unneeded-ternary`
  No unneeded ternary
- `no-unreachable`
  No unreachable codes
- `no-unused-expressions`
- `no-unused-vars`
- `no-use-before-define`
- `no-useless-call`
- `no-void`
- `no-var`
  No var, use let or const
- `no-warning-comments`
  No todo and fixme
- `callback-return`
  No callback return
- `generator-star-spacing`
- `guard-for-in`
- `handle-callback-err`
- `id-length`
- `indent`
  Indent 2 spaces
- `key-spacing`: [0, { `beforeColon`: false, `afterColon`: true }],//对象字面量中冒号的前后空格
- `new-cap`
  A new expression should having an upper-cased letter
- `new-parens`
  Brackets in new
- `quotes`
  Use single quotes
- `quote-props`
  Use single quote props
- `radix`
  parseInt have a radix param
- `semi`
  Use semi
- `space-return-throw-case`
  Spaces after throw case
- `strict`
  Use strict
- `use-isnan`
  No equal NaN, use isNaN
- `valid-typeof`
  Use valid values of typeof
- `vars-on-top`
  Var declare on the top of a code block scope
- `wrap-iife`
  Use correct IIFE wrap [What is it](#wrap-iife)
- `yoda`
  No yoda expression

[Rule comma-style]: https://eslint.org/docs/rules/comma-style

#### Cond Assign
Condition assign, i.e. using an assignment for condition.

A **wrong** example
```javascript
/* code, code, code... */
if ((_v = v) === 1) {
  console.log(_v); // eslint-disable-line no-console
} else {
  console.warn(_v); // eslint-disable-line no-console
}
```

A **correct** example
```javascript
/* code, code, code... */
const _v = v;
if (_v === 1) {
  console.log(_v); // eslint-disable-line no-console
} else {
  console.warn(_v); // eslint-disable-line no-console
}
```

#### Wrap IIFE
IIFE: Immediately Invoked Function Expression. For IIFE definitions, 
go to [MDN](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) for more information

As default value of ESLint, IIFE wrap should be made the *return* effect clear.
Bracket should be surrounded in the out, instead surrounded the function

A **wrong** example
```javascript
(function (window) {
  window.document.getElementById('cookie').innerHTML = 'delicious';
  return window;
})(window);
```

Some **correct** examples
```javascript
(function (window) {
  window.document.getElementById('cookie').innerHTML = 'delicious';
  return window;
} (window));

// Examples following will not return anything in fact
void (function (window) {
  window.document.getElementById('cookie').innerHTML = 'delicious';
  return window;
} (window));

~(function (window) {
  window.document.getElementById('cookie').innerHTML = 'delicious';
  return window;
} (window));
```