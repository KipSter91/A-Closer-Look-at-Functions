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
//'LOWER' level functions
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

const namesToWelcome = ['Jonas', 'Maria', 'Barbara'];

const high5 = () => {
  const emoji = '✌️';
  console.log(emoji);
  return emoji;
};
const welcomeAll = () => {
  for (const names of namesToWelcome) console.log(names + ` ` + high5());
};

welcomeAll();

// document.body.addEventListener('click', high5);

// namesToWelcome.forEach(high5);

//4) FUNCTIONS RETURNING FUNCTIONS
const greet = greeting => {
  return name => {
    console.log(greeting + ' ' + name);
  };
};

greet('Szia')('Barbara');

const greetSzia = greet('Szia');
greetSzia('Zsolti');

//THE CALL AND APPLY METHODS
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(1234, 'Barbara Marku');
lufthansa.book(5678, 'Zsolt Marku');
console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

//Call method
book.call(lufthansa, 9999, 'Matyas Horvath');
console.log(lufthansa.bookings);

book.call(eurowings, 7878, 'Timea Nagy');
console.log(eurowings.bookings);

const wizzair = {
  airline: 'Wizz Air Hungary Airlines',
  iataCode: 'W6',
  bookings: [],
};

book.call(wizzair, 4545, 'Peter Molnar');
console.log(wizzair.bookings);

//Apply method
const flightData = [1212, 'Jozsef Nemeth'];
// book.apply(wizzair, flightData);
//this above is the same as this below, in modern Javascript is more common the code below with the spread operator
book.call(wizzair, ...flightData);
console.log(wizzair.bookings);

//Bind method
const bookLF = book.bind(lufthansa);
const bookEW = book.bind(eurowings);
const bookWZZ = book.bind(wizzair);

bookWZZ(768, 'Janos Kiss');
console.log(wizzair.bookings);

const bookWZZ123 = book.bind(wizzair, 123);
bookWZZ123('Barbara Marku');

//With event listeners
wizzair.planes = 150;
wizzair.buyPlane = function () {
  // console.log(this);
  this.planes++;
  console.log(this.planes);
};

const buyplane = wizzair.buyPlane;
document
  .querySelector('.buy')
  .addEventListener('click', buyplane.bind(wizzair));

//Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.21);
console.log(addVAT(1500));

//Challenge with function in function method
const addTaxRate = rate => value => {
  return value + value * rate;
};

const addVAT2 = addTaxRate(0.21);

console.log(addVAT2(1500));

console.log('Coding challenge 1'.padStart(35, '+').padEnd(55, '+'));
///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    this.instuction = '(Write option number)';
    const answer = prompt(`${this.question + '\n' + this.options.join('\n') + '\n' + this.instuction}`)
    if (isNaN(answer) || answer === '' || answer > this.answers.length - 1 || answer < 0) {
      alert(`Invalid input, please ${this.instuction.toLowerCase().slice(1, -1)}.`)
    } else {
      this.answers[answer]++
      this.displayResults(this.answers)
      this.displayResults(`'${this.answers}'`)
    }
  },
  displayResults(type = []) {

    if (typeof type === 'string') {
      console.log(`Poll results are: ${type.slice(1, -1)}.`);
    } else {
      console.log(type);
    }
  }
};

const answerPoll = poll.registerNewAnswer;
document.querySelector('.poll').addEventListener('click', answerPoll.bind(poll));

const displayResults = poll.displayResults;
displayResults(`[1, 5, 3, 9, 6, 1]`);
displayResults([1, 5, 3, 9, 6, 1]);

//IIFE (Immediately Invoked Function Expressions)
const runOnce = () => {
  console.log('This will never run again');
}

runOnce();
//IIFE (standard)
(function () {
  console.log('This will never run again');
  //Encapsulated variable in the function scope, there is no access to this data from the global scope, it's private data
  const isPrivate = 23;
})
  ();
//IIFE (arrow)
(() => { console.log('This will ALSO never run again'); })()

//block to create a scope
{
  const isPrivate = 23;
  var isPublic = 23;
}

console.log(isPublic);


//CLOSURES
//function execute once
const secureBooking = () => {
  let passengerCount = 0;
  passengerCount++
  console.log(passengerCount);
}

secureBooking();
secureBooking();
secureBooking();
//function with for-loop
const secureBooking2 = (passenger) => {

  for (let i = 1; i <= passenger; i++) {
    console.log(`${i} passenger`);
  }
};

secureBooking2(4)

//CLOSURE FUNCTION
const secureBooking3 = () => {
  let passengerCount = 0;
  return () => {
    passengerCount++;
    console.log(`${passengerCount} passenger`);
  }
}

const booker = secureBooking3();

booker();
booker();
booker();
booker();

console.dir(booker)

//Example 1)
let a;

const b = () => {
  const c = 10;
  a = () => {
    console.log(c * 3);
  }
}

const d = () => {
  const f = 500;
  a = () => {
    console.log(f * 2);
  }
}

b();
a();
console.dir(a);

//Re-assigned 'a' function
d();
a();
console.dir(a);

//Example 2)
const boardPassengers = (n, wait) => {
  const perGroup = n / 3;
  setTimeout(() => {
    console.log(`We are boarding now all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passangers`);
  }, wait * 1000)
  console.log(`Boarding will start in ${wait} seconds`);
}

// boardPassengers(240, 5)

console.log('Coding challenge 2'.padStart(35, '+').padEnd(55, '+'));

(() => {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', () => {
    header.style.color = 'blue'
  })
})()
