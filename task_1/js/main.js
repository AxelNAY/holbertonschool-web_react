var teacher1 = {
    firstName: 'Alice',
    lastName: 'Johnson',
    fullTimeEmployee: true,
    location: 'Paris',
    contract: true
};
var teacher2 = {
    firstName: 'Bob',
    lastName: 'Smith',
    fullTimeEmployee: false,
    yearsOfExperience: 10,
    location: 'London',
    contract: false,
    specialty: 'Mathematics'
};
var director1 = {
    firstName: 'David',
    lastName: 'Brown',
    fullTimeEmployee: true,
    location: 'Berlin',
    numberOfReports: 5,
    contract: true
};
var printTeacher = function (firstName, lastName) {
    return "".concat(firstName.charAt(0), ". ").concat(lastName);
};
var StudentClass = /** @class */ (function () {
    function StudentClass(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    StudentClass.prototype.workOnHomework = function () {
        return 'Currently working';
    };
    StudentClass.prototype.displayName = function () {
        return this.firstName;
    };
    return StudentClass;
}());
var student = new StudentClass("John", "Doe");
console.log(student.displayName());
console.log(student.workOnHomework());
console.log(printTeacher("John", "Doe"));
console.log(printTeacher("Alice", "Smith"));
console.log(director1);
console.log(teacher1);
console.log(teacher2);
