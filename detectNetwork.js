// Given a credit card number, this function should return a string with the 
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy! 
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  // Once you've read this, go ahead and try to implement this function, then return to the console.
  var trueCard = [];

  if (isDiners(cardNumber)) {
  	return "Diner's Club";
  }
  if (isAmerican(cardNumber)) {
  	return 'American Express';
  }
  if (isVisa(cardNumber)) {
  	trueCard = isVisa(cardNumber);
  }
  if (isMastercard(cardNumber)) {
  	return 'MasterCard';
  }
  if (isDiscover(cardNumber)) {
  	return 'Discover';
  }
  if (isMaestro(cardNumber)) {
  	return 'Maestro';
  }
  if (isUnionPay(cardNumber)) {
  	return 'China UnionPay';
  }
  if (isSwitch(cardNumber)) {
  	if (trueCard.length > 0) {
  		var potentialCard = isSwitch(cardNumber);
  		if (potentialCard[1].length > trueCard[1].length) {
  			trueCard = potentialCard;
  		}
  	}
  	else {
  		trueCard = isSwitch(cardNumber);
  	}

  }
  return trueCard[0];
};

function isDiners(cardNumber) {
	var prefix = parseInt(cardNumber.slice(0,2));

	if(cardNumber.length === 14) {
		if (prefix===38 || prefix===39) {
			return true;
		}

	}
	return false;
}

function isAmerican(cardNumber) {

	var prefix = parseInt(cardNumber.slice(0,2));

	if(cardNumber.length === 15) {
		if(prefix===34 || prefix===37) {
			return true;
		}

	}
	return false;
}



function isVisa(cardNumber) {

  var prefixString = cardNumber.slice(0,1);	

  if (parseInt(prefixString)===4) {
  	if (cardNumber.length == 13 || cardNumber.length ==16 || cardNumber.length ==19) {
  		return ['Visa', prefixString];
  	}

}
return false;
}


function isMastercard(cardNumber) {

  var prefix = parseInt(cardNumber.slice(0,2));

  if (cardNumber.length==16) {
  	if (prefix > 50 && prefix < 56) {
  		return true;
  	}

}
return false;
}


function isDiscover(cardNumber) {
 //Discover always has a prefix of 6011, 644-649, or 65, and a length of 16 or 19.

  var prefixFour = parseInt(cardNumber.slice(0,4));
  var prefixThree = parseInt(cardNumber.slice(0,3));
  var prefixTwo = parseInt(cardNumber.slice(0,2));

  if (cardNumber.length===16 || cardNumber.length===19) {
  	if (prefixFour===6011 || (prefixThree > 643 && prefixThree <650) || prefixTwo===65) {
  		return true;
  	}

  }
  return false;

}

function isMaestro(cardNumber) {
//Maestro always has a prefix of 5018, 5020, 5038, or 6304, and a length of 12-19.

  var prefixFour = parseInt(cardNumber.slice(0,4));

  if (cardNumber.length > 11 && cardNumber.length < 20) {
  	if (prefixFour===5018 || prefixFour===5020 || prefixFour===5038 || prefixFour===6304) {
  		return true;
  	}
  }
  return false;

}

function isUnionPay(cardNumber){
	var prefixSix = parseInt(cardNumber.slice(0,6));
	var prefixThree = parseInt(cardNumber.slice(0,3));
	var prefixFour = parseInt(cardNumber.slice(0,4));

	if (cardNumber.length > 15 && cardNumber.length<20) {
		if ((prefixSix > 622125 && prefixSix <622926) || (prefixThree > 623 && prefixThree <627) || (prefixFour > 6281 && prefixFour <6289)) {
			return true;
		}

	}
	return false;

}

function isSwitch(cardNumber) {

	//create array of lengths
	//create array of prefixes
	//for each item i length array, check if cardnumber is that length
	//if so, for each item in prefix array, check if the cardNumber's digits match that 
	//if so, return array of Switch, with that prefix that matched

	var arrayLengths = [16,18,19];
	var arrayPrefix = [4903, 4905, 4911, 4936, 564182, 633110, 6333, 6759];

	for (var i=0; i<arrayLengths.length; i++) {

		if (cardNumber.length===arrayLengths[i]) {

			for (var z=0; z<arrayPrefix.length; z++) {

				var prefix = arrayPrefix[z].toString();
				var slicedNum = cardNumber.slice(0,prefix.length);
				if (slicedNum===prefix) {
					return ['Switch', ''+prefix];
				}
			}

		}
	}
	return false;

}
/*

China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.

Heads up! Switch and Visa seem to have some overlapping card numbers - in any apparent conflict, you should choose the network with the longer prefix.

Visa always has a prefix of 4 and a length of 13, 16, or 19.
MasterCard always has a prefix of 51, 52, 53, 54, or 55 and a length of 16.

*/
