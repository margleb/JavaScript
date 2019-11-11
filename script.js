/**************************
* The Ternary Operator and Switch Statements
*/

var firstName = 'John';
var age = 16;

// Ternary operator
age >= 18 ? console.log(firstName + ' drinks beer.') : console.log(firstName + ' drinks juice.');

var drink = age >= 18 ? 'beer' : 'juice';
console.log(drink);

/* if(age >= 18) {
    var drink = 'beer';
} else {
    var drink = 'juice';
} */

// Switch statement
var job = 'teacher';
switch (job) {
    case 'teacher':
        console.log(firstName + ' teacher kids  how to code.');
        break;
    case 'driver':
        console.log(firstName + ' drives an uber in Lisbon');
        break;
    case 'designer':
        console.log(firstName + ' designs beatiful websites');
        break;
    default:
        console.log(firstName + ' does something else');
}
