async function ButtonHasBeenClicked() {
  let userName = document.getElementById("userName").value;
  let password = document.getElementById("password").value;

  console.log("userName:" + userName)
  console.log("password:" + password)

  validateEmail(userName);
  fetchFromFakeApi(password);
}

async function validateEmail(userName) {
  console.log("validateEmail START")
  // check if it contains @ and .
  const pattern = /[a-z]+[@][a-z]+\.[a-z]+/;
  let regext = new RegExp(pattern);

  var result = regext.test(userName);

  if (result == false) {
    window.alert("Please enter a valid email");
  } else {
    showUserName(userName);
  }
  console.log("validateEmail END")
}

function showUserName(userName) {
  let showDiv = document.querySelector("#emailResult");
  showDiv.innerHTML = userName + ",just tried to log in";
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
