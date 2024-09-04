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

// enum: liệt kê 1 nhóm các giá trị hằng số
enum API_STATUS { // constant
    PEDING, // index: 0
    FULFILLED, // index: 1
    REJECTED, // index: 2
}

// string enum
enum STRING_ENUM { // constant
    PEDING = 'PEDING', // index: 0
    FULFILLED = 'FULFILLED', // index: 1
    REJECTED = 'REJECTED', // index: 2
}

// ANY TYPES, không check type của data === don't check data type
//
let namev2: any = 'Kei';
namev2 = 69;
console.log(namev2); //69

// Void >< Any
// không trả về gì cả
// use with function, không cần trả về return
const handleLogs = (message: string): void => {
    console.log(message);
};

// data type - never
// không bao giờ trả ra giá trị
// dùng khi chắc chắn rằng một điều gì đó không bao giờ xảy ra

function handleException(str: string): never {
    throw Error(str);
}

// handleException('error message'); // quăng ra lỗi: error message

// union type: gộp nhiều kiểu dữ liệu lại
// ex: a: string | number | boolean

function addNumberOrString(a: string | number, b: string | number) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }

    if (typeof a === 'string' && typeof b === 'string') {
        return a.concat(b);
    }
    throw new Error('Parameters must be numbers or strings');
}

console.log('Test a: ', addNumberOrString(6, 9));

// Type Aliases for union
type addNumString = string | number;
function addNumberOrString2(a: addNumString, b: addNumString) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }

    if (typeof a === 'string' && typeof b === 'string') {
        return a.concat(b);
    }
    throw new Error('Parameters must be numbers or strings');
}

console.log('Test a: ', addNumberOrString2('2', '4'));

// function in ts
// optional parameters
const sum1 = (a: number, b: number, c?: number) => {
    // para c: is optional, not required
    if (c) return a + b + c;
    return a + b;
};

console.log('sum1: ', sum1(1, 2, 5));

// rest
// 1 function chỉ dùng được 1 toán tử rest
// chỉ sử dụng với array type
// phải là tham số cuối cùng trong danh sách tham số

// class
class Person {
    //social security network
    ssn: string;
    firstName: string;
    lastName: string;

    constructor(ssn: string, firstName: string, lastName: string) {
        this.ssn = ssn;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // get full name
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
}
const kei = new Person('123', 'Kei', 'TS');
console.log('class kei: ', kei); // object
console.log('full name: ', kei.getFullName());
