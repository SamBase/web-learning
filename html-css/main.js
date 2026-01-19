//todo
// can toggle have 1 or more css
// what is an API video - if extra time
// read https://www.geeksforgeeks.org/javascript/javascript-fetch-method/
// 

const myBtn = document.getElementById("myBtn");
const userNameTextBox = document.getElementById("userName");

// myBtn.addEventListener("click", () =>{ButtonHasBeenClicked();
//   tryToLogIn();
// });
myBtn.addEventListener("click", tryToLogIn);
userNameTextBox.addEventListener("input", (event) => {
  validateInput(event);
  toggleResultMessage();
});

async function ButtonHasBeenClicked() {
  let userName = document.getElementById("userName").value;
  let password = document.getElementById("password").value;

  console.log("userName:" + userName)
  console.log("password:" + password)

  validateUserName(userName);
  // fetchFromFakeApi(password);
}

async function validateUserName(userName) {
  console.log("validateUserName START");
  let temp = userName;
  if (temp.trim().length < 1) {
    console.error("FAILED");
    showResult(false, userName);
  } else {
    console.log("SUCCESS");
    showResult(true, userName);
  }

  console.log("validateUserName END");
}

function showResult(success, userName) {
  console.log("showResult START");
  let showDiv = document.querySelector("#result");
  showDiv.style.display = 'block';

  // reset state
  showDiv.classList.remove("success", "error");

  let message = ""
  if (success == true) {
    message = userName + ",just tried to log in";
    showDiv.classList.add("success");
  } else {
    message = "Failed to login";
    showDiv.classList.add("error");
  }
  showDiv.textContent = message;
  console.log("showResult END");
}

async function fetchFromFakeApi(number) {
  console.log("fetchFromFakeApi START")
  let fetchResultHTML = document.getElementById("fetchResult");
  // console.log("fetchResultHTML:" + fetchResultHTML.innerHTML);

  fetch('https://jsonplaceholder.typicode.com/todos/' + number)
    .then(response => {
      console.log("1st then");
      console.log("respone is: ");
      console.log(response);

      if (response.status != 200) {
        console.error("cannot hit the url");
      } else {
        let responseJson = response.json();
        console.log("responseJson:" + responseJson.then(j => { console.log(JSON.stringify(j)); }));
        return responseJson;
      }
    })
    .then(json => {
      console.log("2nd then");
      console.log(JSON.stringify(json));
      console.log(JSON.stringify(json, null, 2));
      console.log("2nd then json");
      fetchResultHTML.innerHTML = JSON.stringify(json, null, 2);
    }).catch(err => {
      console.error("Something went wrong when trying to fetch info from url");
      console.error(err);
    });
  console.log("fetchFromFakeApi END")
}

function validateInput(event) {
  let inputValue = event.target.value;

  if (inputValue.length < 1) {
    event.target.classList.add("invalidInputBox");
  } else {
    event.target.classList.remove("invalidInputBox");
  }
}

function toggleResultMessage() {
  const showDiv = document.querySelector("#result");
  showDiv.style.display = 'none';
}

async function tryToLogIn() {
  console.log("tryToLogIn --START");
  const htmlElement = document.getElementById("logInResult");
  try {
    htmlElement.textContent = "Loading...";
    myBtn.disabled = true;

    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');

    console.log(response);
    if (response.ok) {
      htmlElement.textContent = "Login Success";
    } else {
      htmlElement.textContent = "Login Failed";
    }
  } catch (error) {
    console.log("Error occured woops:" + error);
    htmlElement.textContent = error;
  } finally {
    myBtn.disabled = false;
  }
  console.log("tryToLogIn --END");
}