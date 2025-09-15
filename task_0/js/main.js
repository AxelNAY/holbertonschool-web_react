// Create two student objects and store them in an array
var student1 = {
    firstName: 'John',
    lastName: 'Doe',
    age: 21,
    location: 'New York'
};
var student2 = {
    firstName: 'Jane',
    lastName: 'Smith',
    age: 22,
    location: 'Los Angeles'
};
var studentsList = [student1, student2];
// Function to render the table rows dynamically
function renderTable() {
    var tableBody = document.querySelector('#studentsTable tbody');
    studentsList.forEach(function (student) {
        var row = document.createElement('tr');
        var firstNameCell = document.createElement('td');
        firstNameCell.textContent = student.firstName;
        var locationCell = document.createElement('td');
        locationCell.textContent = student.location;
        row.appendChild(firstNameCell);
        row.appendChild(locationCell);
        tableBody.appendChild(row);
    });
}
// Call the renderTable function when the window loads
window.onload = function () {
    renderTable();
};
