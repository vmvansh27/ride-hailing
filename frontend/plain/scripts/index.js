const handleRoleFormSubmit = async () => {
    console.log("reached role form submit handler");
    conDiv = document.querySelector("#main-page");
    console.log(document.querySelector("#rider").checked);
    console.log(document.querySelector("#driver").checked);
    if (document.querySelector("#rider").checked){
        console.log("rider");
        displayUserDashboard(conDiv);
    }
    if(document.querySelector("#driver").checked){
        console.log("driver");
        displayDriverDashboard(conDiv);
    }
    else {
        console.log("No option selected");
    }
}
const displayLogin = async () => {
    console.log("reached display login");
    var loginPage = document.querySelector("#signin-register");
    contentDiv = await document.querySelector("#main-page");
    contentDiv.innerHTML = loginPage.innerHTML;
    handleLogin(contentDiv);

}

const postSignInData = async (e) => {
    const infoForm = document.querySelector("#info-form");
    e.preventDefault();
    
    
}

const postRegisterData = async (e) => {
    const infoForm = document.querySelector("#info-form");

}


const handleLogin = async (conDiv) => {
    const infoForm = document.querySelector("#info-form");
    if(infoForm) {
        const formSignInBtn = document.querySelector("#submit-input-signin");
        formSignInBtn.addEventListener('click', (e) => {
            console.log("reached signin");
            postSignInData(e);

        })
        const formRegisterBtn = document.querySelector("#submit-input-register");
        formRegisterBtn.addEventListener('click', (e) => {
            postRegisterData(e);
            displayRoles(conDiv);
            console.log("Register Button Pressed")
        })
    }
}



const displayDriverDashboard = async (conDiv) => {
    var driverDashboard = document.querySelector("#driver-dashboard");
    conDiv.innerHTML = driverDashboard.innerHTML;
}

const displayUserDashboard = async (conDiv) => {
    var userDashboard = document.querySelector("#user-dashboard");
    conDiv.innerHTML = userDashboard.innerHTML;
}

const displayRoles = async (conDiv) => {
    var rolesPage = document.querySelector("#role-assignment");

    conDiv.innerHTML = rolesPage.innerHTML;
}

