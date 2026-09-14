// low and high range
var lowNumber;
var highNumber;

// holds all numbers entered
var myNumbers = [];


function setRange() {

    var theLowNumber =
        document.forms["rangeForm"]["lowNumber"].value;

    var theHighNumber =
        document.forms["rangeForm"]["highNumber"].value;


    if (theLowNumber == "") {

        alert("Please enter a low number.");

        return false;

    }

    else if (theHighNumber == "") {

        alert("Please enter a high number.");

        return false;

    }

    else if (Number(theLowNumber) >= Number(theHighNumber)) {

        alert("Low number must be less than high number.");

        return false;

    }

    else {

        lowNumber = Number(theLowNumber);

        highNumber = Number(theHighNumber);

        document.getElementById("rangeMessage").innerHTML =
            "Range is " + lowNumber + " to " + highNumber;

        return true;

    }

}


function validateANDadd() {

    var theNewNumber =
        document.forms["myForm"]["newNumber"].value;


    if (lowNumber == undefined || highNumber == undefined) {

        alert("Please set the range first.");

        return false;

    }

    else if (theNewNumber == "") {

        alert("Please enter a number.");

        return false;

    }

    else if (Number(theNewNumber) < lowNumber ||
             Number(theNewNumber) > highNumber) {

        alert("Number must be between " +
              lowNumber + " and " + highNumber);

        document.forms["myForm"]["newNumber"].value = "";

        return false;

    }

    else {

        // add number to array
        myNumbers.push(Number(theNewNumber));


        // add number to table
        var tableRef =
            document.getElementById("myList");

        (tableRef.insertRow(tableRef.rows.length)).innerHTML =
            theNewNumber;


        calculateResults();


        document.forms["myForm"]["newNumber"].value = "";

        return true;

    }

}


function calculateResults() {

    var total = 0;

    for (var i = 0; i < myNumbers.length; i++) {

        total = total + myNumbers[i];

    }

    var mean = total / myNumbers.length;


    for (var i = 0; i < myNumbers.length; i++) {

        for (var j = i + 1; j < myNumbers.length; j++) {

            if (myNumbers[i] > myNumbers[j]) {

                var temp = myNumbers[i];

                myNumbers[i] = myNumbers[j];

                myNumbers[j] = temp;

            }

        }

    }


    var median;

    var middle =
        Math.floor(myNumbers.length / 2);


    if (myNumbers.length % 2 == 1) {

        median = myNumbers[middle];

    }

    else {

        median =
            (myNumbers[middle - 1] +
             myNumbers[middle]) / 2;

    }

    var highestCount = 0;


    // find how many times the most common number appears
    for (var i = 0; i < myNumbers.length; i++) {

        var count = 0;

        for (var j = 0; j < myNumbers.length; j++) {

            if (myNumbers[i] == myNumbers[j]) {

                count = count + 1;

            }

        }


        if (count > highestCount) {

            highestCount = count;

        }

    }


    // build text containing all modes
    var modeText = "";


    for (var i = 0; i < myNumbers.length; i++) {

        var count = 0;


        for (var j = 0; j < myNumbers.length; j++) {

            if (myNumbers[i] == myNumbers[j]) {

                count = count + 1;

            }

        }


        // if this number is one of the modes
        if (count == highestCount) {

            // first number can always be added
            if (i == 0) {

                modeText = modeText + myNumbers[i];

            }

            // don't add the same number twice
            else if (myNumbers[i] != myNumbers[i - 1]) {

                if (modeText != "") {

                    modeText = modeText + ", ";

                }

                modeText = modeText + myNumbers[i];

            }

        }

    }

    document.getElementById("mean").innerHTML =
        mean.toFixed(2);

    document.getElementById("median").innerHTML =
        median.toFixed(2);

    document.getElementById("mode").innerHTML =
        modeText;

}


function clearList() {

    myNumbers = [];


    var tableRef =
        document.getElementById("myList");

    tableRef.innerHTML = " ";


    document.getElementById("mean").innerHTML =
        "";

    document.getElementById("median").innerHTML =
        "";

    document.getElementById("mode").innerHTML =
        "";

}