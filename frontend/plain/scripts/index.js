const handleRoleFormSubmit = async () => {
    console.log("reached role form submit handler");
    conDiv = document.querySelector("#main-page");
    console.log(document.querySelector("#rider").checked);
    console.log(document.querySelector("#driver").checked);
    const regForm = document.querySelector("#role-form");
    var role = ""
    if (document.querySelector("#rider").checked){
        role = "rider";
        console.log(role);
        displayUserDashboard(conDiv);
    }
    if(document.querySelector("#driver").checked){
        role = "driver";
        console.log(role);
        displayDriverDashboard(conDiv);
    }
    else {
        console.log("No option selected");
    }
    
    postRegisterData(regForm);
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

const postRegisterData = async (regForm) => {
    //const regForm = document.querySelector("#role-form");
    /*let role = "";
    if (document.querySelector("#rider").checked){
        console.log("rider");
        //displayUserDashboard(conDiv);
        role = "rider";
    }
    else if(document.querySelector("#driver").checked){
        console.log("driver");
        //displayDriverDashboard(conDiv);
        role = "driver";
    }*/
    const jsonData = buildJsonData(regForm);
    console.log(jsonData);
    const headersData = buildHeaders();
    fetch("http://localhost:5000/users/register", {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: headersData
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
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
            //postRegisterData(e);
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

const buildJsonData = (form) => {
    const jsonData = {};
    for(const pair of new FormData(form).entries()){
        jsonData[pair[0]] = pair[1];
        console.log(pair[0]," is ",pair[1]);
    }
    if (jsonData["role"] == "rider")
        jsonData["license_number"] = null;
    return jsonData;
}

const buildHeaders = (authorization = null) => {
    const headers = {
        "Content-Type": "application/json",
        "Authorization": (authorization) ? authorization : "Bearer TOKEN_MISSING"
    };
    return headers;
}