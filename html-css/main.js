//todo
// can toggle have 1 or more css
// what is an API video - if extra time
// read https://www.geeksforgeeks.org/javascript/javascript-fetch-method/
// 

const myBtn = document.getElementById("myBtn");
const userNameTextBox = document.getElementById("userName");
const passwordTextBox = document.getElementById("password");

myBtn.addEventListener("click", tryToLogIn);
userNameTextBox.addEventListener("input", (event) => {
  validateInput(event);
  toggleResultMessage();
});
passwordTextBox.addEventListener("input", (event) => {
  validateInput(event);
  toggleResultMessage();
});

function validateInput(event) {
  let inputValue = event.target.value;
  console.log("ID:" + event.target.id);

  if (isInputValid(inputValue)) {
    event.target.classList.remove("invalidInputBox");

    if (event.target.id == "userName") {
      const usernameInputErrorMessage = document.getElementById("userNameInputFieldErrorMessage");
      usernameInputErrorMessage.classList.remove("visible");
    }
    if (event.target.id == "password") {
      const passwordInputFieldErrorMessage = document.getElementById("passwordInputFieldErrorMessage");
      passwordInputFieldErrorMessage.classList.remove("visible");
    }

  } else {
    event.target.classList.add("invalidInputBox");

    if (event.target.id == "userName") {
      const usernameInputErrorMessage = document.getElementById("userNameInputFieldErrorMessage");
      usernameInputErrorMessage.classList.add("visible");
    }
    if (event.target.id == "password") {
      const passwordInputFieldErrorMessage = document.getElementById("passwordInputFieldErrorMessage");
      passwordInputFieldErrorMessage.classList.add("visible");
    }
  }
}

function isInputValid(inputValue) { return (inputValue != null && inputValue.trim().length > 0) }

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