import { RuleTester } from '@typescript-eslint/utils/dist/eslint-utils/RuleTester';

import { cognitiveComplexity } from '../src/rules/definition/cognitive-complexity';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ruleTester.run('cognitive-complexity tests', cognitiveComplexity, {
  valid: [{ code: `function zero_complexity() {}` }],
  invalid: [
    {
      code: `function single_if() {
        if (x) {} // +1
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 1 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function if_else_complexity() {
        if (condition) {        // +1
        } else if (condition) { // +1
        } else {}               // +1
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 3 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function else_nesting() {
        if (condition) {      // +1
        } else {              // +1 (nesting level +1)
            if (condition) {} // +2
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 4 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function else_nested() {
        if (condition) {      // +1 (nesting level +1)
          if (condition) {    // +2
          } else {}           // +1
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 4 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function if_nested() {
        if (condition)          // +1 (nesting level +1)
          if (condition)        // +2 (nesting level +1)
            if (condition) {}   // +3
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 6 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function else_if_nesting() {
        if (condition) {         // +1
        } else if (condition) {  // +1 (nesting level +1)
          if (condition) {}      // +2
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 4 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function loops_complexity() {
        while (condition) {                 // +1 (nesting level +1)
          if (condition) {}                 // +2
        }

        do {                                // +1 (nesting level +1)
          if (condition) {}                 // +2
        } while (condition)

        for (i = 0; i < length; i++) {      // +1 (nesting level +1)
          if (condition) {}                 // +2

          for (i = 0; i < length; i++) {}  // +2
        }

        for (x in obj) {                    // +1 (nesting level +1)
          if (condition) {}                 // +2
        }

        for (x of obj) {                    // +1 (nesting level +1)
          if (condition) {}                 // +2
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 17 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function switch_complexity() {
        if (condition) {                 // +1 (nesting level +1)
          switch (expr) {                // +2 (nesting level +1)
            case "1":
              if (condition) {}          // +3
              break;
            case "2":
              break;
            default:
              foo();
          }
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 6 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function jump_statements_no_complexity() {
        if (condition)           // +1
          return;
        else if (condition)      // +1
          return 42;

        label:
        while (condition) {      // +1 (nesting level +1)
          if (condition)         // +2
            break;
          else if (condition)    // +1
            continue;
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 6 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function break_continue_with_label() {
        label:
        while (condition) {      // +1
          break label;           // +1
          continue label;        // +1
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 3 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function try_catch() {
        try {
          if (condition) {}      // +1
        } catch (someError) {    // +1 (nesting level +1)
          if (condition)  {}     // +2
        } finally {
          if (condition) {}      // +1
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 5 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function try_finally() {
        try {
          if (condition) {}      // +1
        } finally {
          if (condition) {}      // +1
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 2 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function and_or() {
        foo(1 && 2 && 3 && 4); // +1
        foo((1 && 2) && (3 && 4)); // +1
        foo(((1 && 2) && 3) && 4); // +1
        foo(1 && (2 && (3 && 4))); // +1
        foo(1 || 2 || 3 || 4); // +1
        foo(1 && 2 || 3 || 4); // +2
        foo(1 && 2 || 3 && 4); // +3
        foo(1 && 2 && !(3 && 4)); // +2
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 12 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function conditional_expression() {
        return condition ? trueValue : falseValue;
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 1 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function nested_conditional_expression() {
        x = condition1 ? (condition2 ? trueValue2 : falseValue2) : falseValue1 ; // +3
        x = condition1 ? trueValue1 : (condition2 ? trueValue2 : falseValue2)  ; // +3
        x = condition1 ? (condition2 ? trueValue2 : falseValue2) : (condition3 ? trueValue3 : falseValue3); // +5
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 11 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function complexity_in_conditions(a, b) {
        if (a && b) {                            // +1(if) +1(&&)
          a && b;                                // +1 (no nesting)
        }
        while (a && b) {}                        // +1(while) +1(&&)
        do {} while (a && b)                     // +1(do) +1(&&)
        for (var i = a && b; a && b; a && b) {}  // +1(for) +1(&&)  +1(&&)  +1(&&)
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 11 > 0. Refactor to increase testability.'],
    },
    {
      code: 'var arrowFunction = (a, b) => a && b;',
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 1 > 0. Refactor to increase testability.'],
    },
    {
      code: 'var functionExpression = function(a, b) { return a && b; }',
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 1 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      class A {
        method() {
          if (condition) {  // +1
            class B {}
          }
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 1 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      class A {
        constructor() {
          if (condition) {}  // +1
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 1 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      class A {
        set foo(x) {
          if (condition) {}  // +1
        }
        get foo() {
          if (condition) {}  // +1
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 2 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      class A {
        ['foo']() {
          if (condition) {}  // +1
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 1 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      export default function() {
        if (options) {}
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 1 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function nesting_func_with_complexity() { 
        if (condition) {}          // +1
        function nested_func() {   // (nesting level +1)
          if (condition) {}        // +2
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 3 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function two_level_function_nesting() {
        function nested1() {     
          function nested2() {    // (nesting +1)
            if (condition) {}     // +2
          }
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 3 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function two_level_function_nesting_2() {
        function nested1() {    
          if (condition) {}      // +1
          function nested2() {   // (nesting +1)
            if (condition) {}    // +2
          }
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 5 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function with_complexity_after_nested_function() {
        function nested_func() {   // (nesting level +1)
          if (condition) {}        // +2
        }
        if (condition) {}          // +1
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 3 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      function nested_async_method() {
        class X {
          async method() {
            if (condition) {}      // +1
          }
        }
      }`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 2 > 0. Refactor to increase testability.'],
    },
    {
      code: `
      (function(a) { 
        if (cond) {}
        return a;
      })(function(b) {return b + 1})(0);`,
      options: [{ limit: 0 }],
      errors: ['File cognitive complexity is above the limit 1 > 0. Refactor to increase testability.'],
    },
  ],
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ruleTester.run('cognitive-complexity 15', cognitiveComplexity, {
  valid: [
    {
      code: `
      function foo() {
        if (a) {             // +1 (nesting level +1)
          if (b) {           // +2 (nesting level +1)
            if (c) {         // +3 (nesting level +1)
              if (d) {       // +4 (nesting level +1)
                if (e) {}    // +5 (nesting level +1)
              }
            }
          }
        }
      }`,
    },
  ],
  invalid: [
    {
      code: `
      function foo() {
        if (a) {             // +1 (nesting level +1)
          if (b) {           // +2 (nesting level +1)
            if (c) {         // +3 (nesting level +1)
              if (d) {       // +4 (nesting level +1)
                if (e) {     // +5 (nesting level +1)
                  if (f) {}  // +6 (nesting level +1)
                }
              }
            }
          }
        }
      }`,
      options: [{ limit: 15 }],
      errors: ['File cognitive complexity is above the limit 21 > 15. Refactor to increase testability.'],
    },
  ],
});
