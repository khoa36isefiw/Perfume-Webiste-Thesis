import { lchown } from 'fs';

// hello world
const mess: string = 'hello world';
console.log(mess);

// ép kiểu
const sum = (x: number, y: number) => {
    return x + y;
};

console.log(sum(2, 3));

// typescript types

const nameTypes: string = 'Kei';
console.log('length: ', nameTypes.length);
console.log('upperCase: ', nameTypes.toLocaleUpperCase());

// type annotations
let count: number = 1; // :number -> annotations

console.log(count); //1
// count = 'KeI'; // error --> count is a number

// preference datat-ypes
let arrayInTS: string[] = ['1', '3', '4']; // mảg chỉ chứa string
// arrayInTS.push(69); // can't push
arrayInTS.push('can push');
console.log(arrayInTS);

// type inference || type annotation

// type inference: tự động đoán type
// type annotation: định nghĩa type, ép buộc chính xác
let arrayInTS2 = ['1', '3', '4', 4]; // mảg chỉ chứa string
arrayInTS2.push('can push');
console.log(arrayInTS2);

// boolean type
let isNumber: boolean = false;
let isBoolean: boolean = false;
isBoolean = true;

// object type
let infor: object = {
    name: 'kei',
    age: 18,
};

console.log(infor);

// khai báo object
let information: {
    name: string;
    age: number;
} = {
    name: 'Kei',
    age: 18,
};
// information.address = "Long An"; // error

// array type, xét về mặt kiểu dữ liệu thì nó cũng là một object

// mixed types -> truyền nhiều kiểu dũ liệu vào mảng
let testArray: (string | number)[] = [1, 69, '69'];
testArray.push('899');
console.log(testArray);
// hoặc
let testArray2 = [1, 69, '69'];

//tuple
// khi khai báo như vậy thì các giá trị truyền vào phải có datatype giống như đã khai báo
let skill: [number, string, boolean] = [1, 'string', true];

// optional elements in tuple
// có hoặc không cũng được, và optional luôn phải đặt cuối
let skill2: [string, number?, boolean?] = ['must have'];
