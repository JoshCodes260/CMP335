function checkWord() {

    // Get the word from the form
    let word = document.forms["rangeForm"]["newWord"].value;

    // Get the algorithm choice
    let algorithm = document.forms["rangeForm"]["algorithm"].value;

    // Get the case sensitivity choice
    let caseChoice = document.forms["rangeForm"]["caseChoice"].value;


    // Check if a word was entered
    if (word == "") {

        alert("Please enter a word.");

        return;
    }


    // Check if an algorithm was picked
    if (algorithm == "") {

        alert("Please select an algorithm.");

        return;
    }


    // Check if case sensitivity was picked
    if (caseChoice == "") {

        alert("Please select case sensitive or case insensitive.");

        return;
    }


    // Make another version of the word to check
    let wordToCheck = word;


    // If case insensitive, make it lowercase
    if (caseChoice == "insensitive") {

        wordToCheck = word.toLowerCase();

    }


    let answer;


    // Use Algorithm 1
    if (algorithm == "1") {

        answer = algorithm1(wordToCheck);

    }


    // Use Algorithm 2
    if (algorithm == "2") {

        answer = algorithm2(wordToCheck);

    }


    // Use Algorithm 3
    if (algorithm == "3") {

        answer = algorithm3(wordToCheck);

    }


    // Make an object
    let result = {

        word: word,

        algorithm: algorithm,

        palindrome: answer

    };


    // Put result in Algorithm 1 list
    if (algorithm == "1") {

        document.getElementById("algorithm1List").innerHTML =
            document.getElementById("algorithm1List").innerHTML +
            result.word + ": " + result.palindrome + "<br>";

    }


    // Put result in Algorithm 2 list
    if (algorithm == "2") {

        document.getElementById("algorithm2List").innerHTML =
            document.getElementById("algorithm2List").innerHTML +
            result.word + ": " + result.palindrome + "<br>";

    }


    // Put result in Algorithm 3 list
    if (algorithm == "3") {

        document.getElementById("algorithm3List").innerHTML =
            document.getElementById("algorithm3List").innerHTML +
            result.word + ": " + result.palindrome + "<br>";

    }

}



function algorithm1(word) {

    let backwards = "";


    // Start at the last letter and move backwards
    for (let i = word.length - 1; i >= 0; i--) {

        backwards = backwards + word[i];

    }


    // Compare the word to the backwards word
    if (word == backwards) {

        return true;

    }
    else {

        return false;

    }

}



function algorithm2(word) {

    let first = 0;

    let last = word.length - 1;


    // Keep checking letters until the middle
    while (first < last) {


        if (word[first] != word[last]) {

            return false;

        }


        first = first + 1;

        last = last - 1;

    }


    return true;

}



function algorithm3(word) {

    let palindrome = true;


    for (let i = 0; i < word.length; i++) {


        if (word[i] != word[word.length - 1 - i]) {

            palindrome = false;

        }

    }


    return palindrome;

}



function clearList1() {

    document.getElementById("algorithm1List").innerHTML = "";

}



function clearList2() {

    document.getElementById("algorithm2List").innerHTML = "";

}



function clearList3() {

    document.getElementById("algorithm3List").innerHTML = "";

}