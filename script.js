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
