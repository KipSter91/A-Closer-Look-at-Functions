'use strict';
//1) DEFAULT PARAMETERS
const bookingArr = [];

//ES6 version:
const createBooking = function (
  flightNum,
  numPasserengers = 1,
  //Important to follow the order if we want to use a parameter for an expression!!
  price = 199 * numPasserengers
) {
  //ES5 version with short circuit evaluation:
  //   numPasserengers ||= 1;
  //   price ||= 199;

  const booking = {
    flightNum,
    numPasserengers,
    price,
  };

  console.log(booking);
  bookingArr.push(booking);
};

//We are not able to skip any argument when we call the function!! We can do this to set the parameter to UNDEFINED:
createBooking('JH123', undefined, 1500);
createBooking('JH123');
createBooking('AB987', 2, 398);
createBooking('JH123', 4);
createBooking('');

//2) HOW WORKS ==> PASSING ARGUMENTS (VALUE VS. REFERENCE)

const flight = 'AB123';

const zsolt = {
  name: 'Zsolt Marku',
  passport: 14789654,
};

// const checkIn = (flightNum, passenger) => {
//   flightNum = 123;
//   passenger.name = 'Mr.' + passenger.name;
//   if (passenger.passport === 14789654) {
//     alert('Check in');
//   } else {
//     alert('Wrong passport!');
//   }
// };

// checkIn(flight, zsolt);
// console.log(flight);
// console.log(zsolt);

// Is the same as doing ==> see lectur about primitive and reference values
// const flightNum = flight;
// const passenger = zsolt;

const newPassport = person => {
  person.passport = Math.trunc(Math.random() * 100000000);
};
newPassport(zsolt);
console.log(zsolt);

// checkIn(flight, zsolt);

//3) FIRST-CLASS AND HIGHER-ORDER FUNCTIONS
//a) Functions accepting callback functions

const oneWord = str => {
  return str.replace(/ /g, '').toLowerCase();
};

const firstUpper = str => {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//Higher-order function: The transformer function call the cb and cb2 callback function
//JS uses callbacks all the time!!!
const transformer = (str, str2, cb, cb2) => {
  console.log(`The first original string: ${str}`);
  console.log(`The first transformed string: ${cb(str)}`);
  console.log(`The name of this callback function is: ${cb.name}`);
  console.log(`The second original string: ${str2}`);
  console.log(`The second transformed string: ${cb2(str2)}`);
  console.log(`The name of this callback function is: ${cb2.name}`);
};

transformer(
  'Javascript is beautiful',
  'This is a beautiful day',
  firstUpper,
  oneWord
);
