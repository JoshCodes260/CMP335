async function getBaconipsum() {
  // first build the API call string by starting with the URL
  let apiString = "https://baconipsum.com/api/";
  // next add the parameters to the string using the drop down lists
  let theNewParagraphs = document.getElementById("newParagraphs").value;
  let theNewType = document.getElementById("newType").value;
  apiString = apiString + "?type=" + theNewType + "&paras=" + theNewParagraphs;
  alert(apiString);  // show the API string

  // now make the API call to the web service using the string and store what is returned in response
  let response = await fetch(apiString);

  // finally, print the response in the letious formats
  document.getElementById("myRawData").innerHTML = "";   // clear what was previously shown
  document.getElementById("myFormattedData").innerHTML = "";   // clear what was previously shown
  document.getElementById("myEncryptedData").innerHTML = "";
  let jsonData = await response.json();  // read the response as JSON
  
  // stringify and print out the JSON object in the RawData section
  document.getElementById("myRawData").innerHTML = JSON.stringify(jsonData);
 
  // loop through the JSON object one paragraph at a time and print each in the FormattedData section


for (let para in jsonData) {

    document.getElementById("myFormattedData").innerHTML +=
        "<p>" + jsonData[para] + "</p>";

    let theNewEncrypt = document.getElementById("newEncrypt").value;

    if (theNewEncrypt == "caesar") {

        let shift = 3;
        let encryptedText = "";

        for (let i = 0; i < jsonData[para].length; i++) {

            let code = jsonData[para].charCodeAt(i);

            code = code + shift;

            encryptedText = encryptedText + String.fromCharCode(code);
        }

        document.getElementById("myEncryptedData").innerHTML +=
            "<p>" + encryptedText + "</p>";
    }

    else if (theNewEncrypt == "atbash") {

    let encryptedText = "";

    for (let i = 0; i < jsonData[para].length; i++) {

        let code = jsonData[para].charCodeAt(i);

        if (code >= 97 && code <= 122) {
            code = 122 - (code - 97);

            encryptedText = encryptedText + String.fromCharCode(code);
        }
        else {
            encryptedText = encryptedText + jsonData[para][i];
        }
    }

    document.getElementById("myEncryptedData").innerHTML +=
        "<p>" + encryptedText + "</p>";
}
}
  return true;
}
