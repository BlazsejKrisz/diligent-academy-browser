

function showRegisterForm(){
  const formContainer = document.querySelector(".form-container")
  formContainer.innerHTML = "";

  createRegisterForm(formContainer)

}

function handleRegister(username, password){
  const newUser = {
    username,
    password
  }

  fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

function createRegisterForm(formContainer){
  const registerForm = document.createElement("form")
  registerForm.classList.add("login-form")

  const title = document.createElement("h1")
  title.innerHTML = "Sign up here"

  const userNameDiv = document.createElement("div")
  userNameDiv.classList.add("form-group")
  const userNameLabel = document.createElement("label")
  userNameLabel.innerHTML = "Username"
  userNameLabel.htmlFor = "username-input"
  const userNameInput = document.createElement("input")
  userNameInput.type = "text"
  userNameInput.name = "username"
  userNameInput.id = "username-input"
  userNameInput.required = true;
  userNameDiv.appendChild(userNameLabel)
  userNameDiv.appendChild(userNameInput)


  const passwordDiv = document.createElement("div")
  passwordDiv.classList.add("form-group")
  const passwordLabel = document.createElement("label")
  passwordLabel.innerHTML = "Password"
  passwordLabel.htmlFor = "username-input"
  const passwordInput = document.createElement("input")
  passwordInput.type = "password"
  passwordInput.name = "password"
  passwordInput.id = "password-input"
  passwordInput.required = true;
  passwordDiv.appendChild(passwordLabel)
  passwordDiv.appendChild(passwordInput)

  const registerButton = document.createElement("button")
  registerButton.classList.add("register-btn")
  registerButton.innerHTML = `<a href="/login">Sign up</a>`
  registerButton.addEventListener("click", () => {
    if(userNameInput.value && passwordInput.value){

      handleRegister(userNameInput.value, passwordInput.value)
    }
  })

  registerForm.appendChild(title)
  registerForm.appendChild(userNameDiv)
  registerForm.appendChild(passwordDiv)
  registerForm.appendChild(registerButton)

  formContainer.appendChild(registerForm)
}

function handleLogin(){
  
}

function main(){

}

main()