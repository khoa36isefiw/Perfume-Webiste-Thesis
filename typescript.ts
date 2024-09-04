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

// access modifiers
/**
 * public
 * private
 * protected: lớp con không thể truy cập thuộc tính của thằng cha
 */

class Employee {
    public empName: string;
    empCode: string;
    constructor(empCode: string, empName: string) {
        this.empCode = empCode;
        this.empName = empName;
    }
}

let emp = new Employee('123', '433');
console.log('Before changing: ', emp);
emp.empCode = '456';
emp.empName = 'Kei TS';
console.log('After changing emp: ', emp);

class Fan {
    private price: string;
    private name: string;
    constructor(price: string, name: string) {
        this.price = price;
        this.name = name;
    }
}

const fan = new Fan('1200', 'Senko');
console.log('before: ', fan);
// fan.price = '1250'; // error
// fan.name = 'Senko-san'; // error
// console.log('after: ', fan);

console.log();

class Employee2 {
    public empName: string;
    protected empCode: string; // lớp con không thể  truy cập thuộc tính của lớp cha

    constructor(empName: string, empCode: string) {
        this.empName = empName;
        this.empCode = empCode;
    }
}

class SalesEmployee extends Employee2 {
    private department: string;
    constructor(name: string, code: string, department: string) {
        super(name, code);
        this.department = department;
    }
}

let empSale = new SalesEmployee('Kei', '123', 'Sales');

console.log('before: ', empSale);
// empSale.empName = 'KEI TS'; // can change
// empSale.empCode = '001'; // can't change
// empSale.department = 'IT'; // cant change
// console.log('after: ', empSale); // cant run
console.log();

// readonly - immutable / không thể thay đổi được nó
// chỉ độc không delete/update được
// readonly khác gì với constant?
// const: thao tác với variables
// readonly: thao tác với lập trình hướng đối tượng, thao tác với một đối tượng, interface
class Person1 {
    readonly birthDate: Date;
    constructor(birthDate: Date) {
        this.birthDate = birthDate;
    }
}

let person1 = new Person1(new Date(2024, 12, 25));
console.log('person1: ', person1);
// person1.birthDate = new Date(2024, 12, 22); // error

// getter, setter in ts

class Person2 {
    private _age: number;
    firstName: string;
    lastName: string;

    constructor(_age: number, firstName: string, lastName: string) {
        this._age = _age;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // getter
    get age() {
        return this._age;
    }

    // setter
    set age(age2: number) {
        if (age2 < 0 || age2 > 150) {
            throw Error('Invalid age');
        }
        this._age = age2;
    }
}

let per2 = new Person2(18, 'Kei', 'TS');
console.log('before changing: ', per2);
per2.age = 69;
console.log('after changing: ', per2);

// extends: inheritance in ts
class Person3 {
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName(): string {
        return this.firstName + this.lastName;
    }

    describe(): string {
        return `This is ${this.firstName} and ${this.lastName}.`;
    }
}

// inheritance
class Employee3 extends Person3 {
    private _jobTitle: string;
    constructor(firstName: string, lastName: string, _jobTitle: string) {
        // call the constructor of the Person class
        super(firstName, lastName);
        this._jobTitle = _jobTitle;
    }

    get jobTitle() {
        return this._jobTitle;
    }

    // override
    // gọi cha rồi mới chạy con?
    // gọi hàm cha đã bị override bởi hàm class con thông qua supper
    describe(): string {
        return `${super.describe()} from parent class - Describe Kei is learning TS`;
    }
}

let employee = new Employee3('Kei', 'TS', 'Front-end Dev');
console.log('get fullName: ', employee.getFullName());
console.log('describe: ', employee.describe());
console.log('job title: ', employee.jobTitle);

// Static Methods and Properties

// Để truy cập 1 thuộc tính <ClassName>.<StaticMember>
// không cần new Object

class Circle {
    // properties
    static pi: number = 3.14;
    public testPi: number = 69;

    // methods
    static calculateArea(radius: number): number {
        return this.pi * radius * radius;
    }
}

console.log('Pi: ', Circle.pi);
console.log('Area: ', Circle.calculateArea(69));
// console.log('testPi: ', Circle.testPi); // error

// Abstract Class
abstract class Employee39 {
    constructor(private firstName: string, private lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // abstract method
    abstract getSalary(): number;

    // normal method

    get fullName(): string {
        return this.firstName + this.lastName;
    }

    compenstationStatement(): string {
        return `${this.fullName} makes ${this.getSalary} a month`;
    }
}

class FullTimeEmp extends Employee39 {
    constructor(firstName: string, lastName: string, private salary: number) {
        super(firstName, lastName);
        this.salary = salary;
    }

    getSalary() {
        return this.salary;
    }
}

class Constractor extends Employee39 {
    constructor(firstName: string, lastName: string, private rate: number, private hours: number) {
        super(firstName, lastName);
        this.hours = hours;
        this.rate = rate;
    }

    getSalary() {
        return this.rate * this.hours;
    }
}

const test1 = new FullTimeEmp('Kei', 'TS', 1000);
console.log('test1: ', test1);

const test2 = new Constractor('Kei', 'TS', 3.69, 100);
console.log('test2: ', test2);
