interface Teacher {
    readonly firstName: string;
    readonly lastName: string;
    fullTimeEmployee: boolean;
    yearsOfExperience?: number;
    location: string;

    [propName: string]: any;
}

const teacher1: Teacher = {
    firstName: 'Alice',
    lastName: 'Johnson',
    fullTimeEmployee: true,
    location: 'Paris',
    contract: true
};

const teacher2: Teacher = {
    firstName: 'Bob',
    lastName: 'Smith',
    fullTimeEmployee: false,
    yearsOfExperience: 10,
    location: 'London',
    contract: false,
    specialty: 'Mathematics'
};

interface Directors extends Teacher {
    numberOfReports: number;
}

const director1: Directors = {
    firstName: 'David',
    lastName: 'Brown',
    fullTimeEmployee: true,
    location: 'Berlin',
    numberOfReports: 5,
    contract: true
};

interface printTeacherFunction {
    (firstName: string, lastName: string): string;
}

const printTeacher: printTeacherFunction = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}. ${lastName}`;
};

interface StudentConstructor {
    new (firstName: string, lastName: string): StudentInterface;
}

interface StudentInterface {
    workOnHomework(): string;
    displayName(): string;
}

class StudentClass implements StudentInterface {
    firstName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    workOnHomework(): string {
        return 'Currently working';
    }

    displayName(): string {
        return this.firstName;
    }
}

const student = new StudentClass("John", "Doe");
console.log(student.displayName());
console.log(student.workOnHomework());
console.log(printTeacher("John", "Doe"));
console.log(printTeacher("Alice", "Smith"));
console.log(director1);
console.log(teacher1);
console.log(teacher2);
