
var loginBtn = document.querySelector("button");
var signupBtn = document.querySelector("p a");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var errorParag = loginBtn.nextElementSibling;


var validation ={
    userName: {
        isValid : false,
        regex : /^[a-zA-Z_]{4,}$/
    },
    email : {
        isValid : false,
        regex : /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    password :{
        isValid : false,
        regex : /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    }
}

var database = [];

if(localStorage.getItem("users")){
    database = JSON.parse(localStorage.getItem("users"));
}

loginBtn.addEventListener("click", function(e){
    if(validateLoginInput(email.value, password.value)){
        errorParag.classList.add("d-none");
        createHomePage();
    }
    else{
        errorParag.classList.remove("d-none");
    }

});


function clear(){
    document.body.innerHTML = "";
    for(var input in validation){
        validation[input].isValid = false;
    }
}

function createHomeContainer(){
    var newContainer = document.createElement("div");
    newContainer.setAttribute("class", "container my-5 text-center");
    return newContainer;
}

function createHomeGroup(){
    var newGroup = document.createElement("div");
    newGroup.setAttribute("class", "group m-auto w-75 p-5");
    return newGroup;
}

function createHomeH1(text){
    var newH1 = document.createElement("h1");
    var newContent = document.createTextNode(text);
    newH1.appendChild(newContent);
    return newH1;
}

function createLogoutBtn(){
    var newElement = document.createElement("div");
    newElement.setAttribute("class", "p-3");
    var newBtn = document.createElement("button");
    newBtn.setAttribute("class", "btn btn-danger d-block ms-auto");
    var newContent = document.createTextNode("Logout");
    newBtn.appendChild(newContent);
    newBtn.addEventListener("click", createLoginForm);
    newElement.appendChild(newBtn);
    return newElement;
}

function createFormContainer(type){
    var newContainer = document.createElement("div");
    newContainer.setAttribute("class", "container my-5");
    newContainer.appendChild(createGroup(type));
    return newContainer;
}

function isInputsValid(){
    for(var input in validation){
        if(validation[input].isValid == false) return false;
    }
    return true;
}

function showValidationError(){
    for(var input in validation){
        if(validation[input].isValid == false){
            if(input == "userName") pErrName.classList.remove("d-none");
            else if(input == "email") pErrEmail.classList.remove("d-none");
            else pErrPass.classList.remove("d-none");
        }
    }
}

function validateSignUpInput(input){
    if(validation[input.id].regex.test(input.value)){
        validation[input.id].isValid = true;
        if(input.id == "userName"){
            pErrName.classList.add("d-none");
        }
        else if(input.id == "email"){
            pErrEmail.classList.add("d-none");
        }
        else{
            pErrPass.classList.add("d-none");
        }
    }
    else {
        validation[input.id].isValid = false;
        if(input.id == "userName"){
            pErrName.classList.remove("d-none");
        }
        else if(input.id == "email"){
            pErrEmail.classList.remove("d-none");
        }
        else{
            pErrPass.classList.remove("d-none");
        }
    }
}

var currentUserName;
function validateLoginInput(email, pass){
    for(var i = 0; i < database.length; ++i){
        if(database[i].userEmail == email && database[i].userPassword == pass){
            currentUserName = database[i].userName;
            return true;
        }       
    }
    return false;
}

function isDuplicateEmail(email){
    for(var i = 0; i < database.length; ++i){
        if(database[i].userEmail == email){
            return true;
        }
    }
    return false;
}

function createUser(name, email, password){
    var user ={
        userName : name,
        userEmail : email,
        userPassword : password
    }
    return user;
}

var pErrName;
var pErrPass;
var pErrEmail;
var emailExist;

function createGroup(type){
    var newGroup = document.createElement("div");
    newGroup.setAttribute("class", "group m-auto w-75 p-5 text-center");
    newGroup.appendChild(createH1("Smart Login System"));
    if(type == "signup") newGroup = makeSignupGroup(newGroup, type);
    else newGroup = makeLoginGroup(newGroup, type);
    return newGroup;
}

function makeSignupGroup(newGroup, type){
    var userName = createInput("Enter your name", "userName");
    userName.addEventListener("blur", function(e){
        validateSignUpInput(userName);
    });
    newGroup.appendChild(userName);
    pErrName = createErrParag("Name should have at least 4 characters.");
    newGroup.appendChild(pErrName);

    var userEmail = createInput("Enter your email", "email");
    userEmail.addEventListener("blur", function(e){
        validateSignUpInput(userEmail);
    });
    newGroup.appendChild(userEmail);
    pErrEmail = createErrParag("You must enter a valid email");
    newGroup.appendChild(pErrEmail);

    var userPass = createInput("Enter your password", "password");
    userPass.addEventListener("blur", function(e){
        validateSignUpInput(userPass);
    });
    newGroup.appendChild(userPass);
    pErrPass = createErrParag("Minimum eight characters, at least one uppercase letter, one lowercase letter and one number");
    newGroup.appendChild(pErrPass);
    var btn = createButton(type);
    btn.addEventListener("click", function(e){
        if(isInputsValid()){
            if(isDuplicateEmail(userEmail.value)){
                emailExist.classList.remove("d-none");
            }
            else{
                database.push(createUser(userName.value, userEmail.value, userPass.value));
                localStorage.setItem("users", JSON.stringify(database));
                clear();
                createSignUpForm();
            } 
        }
        else{
            showValidationError();
        }
    });
    newGroup.appendChild(btn);
    emailExist = createErrParag("Email Already Exist");
    newGroup.appendChild(emailExist);
    newGroup.appendChild(createParagraph("Already have an account? ", "login"));
    return newGroup;
}


function makeLoginGroup(newGroup, type){
    var email = createInput("Enter your email", "email");
    newGroup.appendChild(email);
    var password = createInput("Enter your password", "password");
    newGroup.appendChild(password); 
    var loginBtn = createButton(type);
    loginBtn.addEventListener("click", function(e){
        if(validateLoginInput(email.value, password.value)){
            errorParag.classList.add("d-none");
            createHomePage();
        }
        else{
            errorParag.classList.remove("d-none");
        } 
    });
    newGroup.appendChild(loginBtn);
    errorParag = createErrParag("Email or Password is not correct");
    newGroup.appendChild(errorParag);
    newGroup.appendChild(createParagraph("Don't have an account? ", "Sign Up"));
    return newGroup;
}


function createH1(text){
    var newh1 = document.createElement("h1");
    var newContent = document.createTextNode(text);
    newh1.appendChild(newContent);
    return newh1;
}

function createInput(placeholder, id){
    var newInput = document.createElement("input");
    if(id == "password") newInput.setAttribute("type", "password");
    else newInput.setAttribute("type", "text");
    newInput.setAttribute("class", "form-control my-3");
    newInput.setAttribute("placeholder", placeholder);
    newInput.setAttribute("id", id);
    return newInput;
}

function createButton(btnName){
    var newBtn = document.createElement("button");
    newBtn.setAttribute("class", "btn btn-outline-info w-100 my-3");
    if(btnName == "login") var newContent = document.createTextNode("Login");
    else var newContent = document.createTextNode("Sign Up");
    newBtn.appendChild(newContent);
    return newBtn;
}

function createParagraph(text, navBtn){
    var newParag = document.createElement("p");
    newParag.setAttribute("class", "text-white");
    var newContent = document.createTextNode(text);
    newParag.appendChild(newContent);
    newParag.appendChild(createAnchor(navBtn));
    return newParag;
}

function createAnchor(text){
    var newAnchor = document.createElement("a");
    newAnchor.setAttribute("class", "text-white");
    var newContent = document.createTextNode(text);
    newAnchor.appendChild(newContent);
    newAnchor.addEventListener("click", function(e){
        if(text == "login") createLoginForm();
        else createSignUpForm();
    });
    return newAnchor;
}

function createErrParag(text){
    var newParag = document.createElement("p");
    newParag.setAttribute("class", "text-danger d-none");
    var newContent = document.createTextNode(text);
    newParag.appendChild(newContent);
    return newParag;
}

function createSignUpForm(){
    clear();
    document.body.append(createFormContainer("signup"));
}

function createLoginForm(){
    clear();
    document.body.append(createFormContainer("login"));
}

function createHomePage(){
    clear();
    document.body.append(createLogoutBtn());
    var homeContainer = createHomeContainer();
    var homeGroup = createHomeGroup();
    var homeH1 = createHomeH1("Welcome " + currentUserName);
    homeGroup.appendChild(homeH1);
    homeContainer.appendChild(homeGroup);
    document.body.append(homeContainer);
}

signupBtn.addEventListener("click", function(e){
    createSignUpForm();
})




