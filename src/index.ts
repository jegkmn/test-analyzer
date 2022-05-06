// should trigger too many deps rule
// class MyClass {
//     constructor(private test: string, private test1: string, private test2: string, private test3: string, private test4: string) {
//         console.log('created')
//     }
// }
//
// should not trigger too many deps rule
// class Test {
//     private test: string;
//
//     constructor() {
//         this.test = 'asd';
//     }
// }
//
//
// class MyClass {
//     public test: number;
//     public test1: number;
//     constructor() {
//         if (true) {
//             const xd = new Test();
//         }
//         const xd1 = new Test();
//     }
//
//     static hello() {
//         return "Hello!!";
//     }
// }
//
// class MyClass {
//     constructor() {
//         const xd1 = 'tests';
//     }
// }
//
//
// new MyClass();
// new MyClass();
// new Test();
// new Test();
//
// should trigger hidden deps rule
// export function test() {
//     const variable1 = new MyClass();
// }
//
// const test = 1;
// switch (1) {
//     case 1:
//         switch (test) {
//             case 1:
//                 switch (test) {
//                     case 1:
//                         switch (test) {
//                             case 1:
//                                 break;
//                             default:
//                                 break;
//                         }
//                         break;
//                     default:
//                         break;
//                 }
//                 break;
//             default:
//                 break;
//         }
//         break;
//     default:
//         break;
// }
//
// if (true) {
//     if ('1' === 3) {
//         if (null == null) {
//             for (let i = 0; i < 10; i++) {
//                 if(true) {
//                     if(true) {
//                         console.log(2);
//                     } else {
//                         console.log(2);
//                     }
//                 } else {
//                     console.log(2);
//                 }
//             }
//         } else {
//             console.log(2);
//         }
//     }
// }
//
// export function gautiDataIrLaika(): string {
//     const test = new MyClass();
//     test.test = -4;
//     test.test1 = 5
//     test.test2 = 100;
//
//     if (test.test) {
//         return 'Naktis';
//     }
//     if (test.test1) {
//         return 'Rytas';
//     }
//     if (test.test2) {
//         return 'Diena';
//     }
// }
//
// export function gautiDataIrLaika(): string {
//     const test = new MyClass();
//     test.test1 = -4;
//
//     if (test.test1) {
//         return 'Naktis';
//     }
//     if (test.test1) {
//         return 'Naktis';
//     }
//     if (test.test1) {
//         return 'Naktis';
//     }
//     // if (test.test1) {
//     //     return 'Rytas';
//     // }
//     // if (test.test2) {
//     //     return 'Diena';
//     // }
//     // if (true) {
//     //     return 'xdddd';
//     // }
//
//     return 'Test';
// }