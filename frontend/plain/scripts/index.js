const handleRoleFormSubmit = async () => {
    /*
    handleRoleFormSubmit() is called when the register button is clicked in
    the register form. It performs  */
    console.log("reached role form submit handler");
    conDiv = document.querySelector("#main-page");
    console.log(document.querySelector("#rider").checked);
    console.log(document.querySelector("#driver").checked);
    const regForm = document.querySelector("#role-form");
    var role = ""
    if (document.querySelector("#rider").checked){
        role = "rider";
        console.log(role);
    }
    else if(document.querySelector("#driver").checked){
        role = "driver";
        console.log(role);
    }
    else {
        console.log("No option selected");
        return;
    }
    
    postRegisterData(regForm);
}
const displayLogin = async () => {
    /* displayLogin() overwrites the contents of main=page with the contents of
       signin-register using DOM and displays the signin/register page */
    console.log("reached display login");
    var loginPage = document.querySelector("#signin-register");
    contentDiv = await document.querySelector("#main-page");
    contentDiv.innerHTML = loginPage.innerHTML;
    handleLogin(contentDiv);

}

const postSignInData = async (e) => {
    /* WIP
    POSTs sign0in data to REST API provided by backend to check sign-in */
    const infoForm = document.querySelector("#info-form");
    e.preventDefault();
    displayUserDashboard(document.querySelector("#main-page"));
    
}

const postRegisterData = async (regForm) => {
    /*
    Gets data from the registration form and POSTs it to the REST api provided
    by the backend. This creates a new user (updates the database).
     */
    console.log("POSTing register data...")
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
    displayLogin();
}


const handleLogin = async (conDiv) => {
    /* Handles the sign-in/register page and either tries signing-in or opens
       the registration page depending on the button pressed.
    */

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
    // WIP: Displays driver dashboard.
    var driverDashboard = document.querySelector("#driver-dashboard");
    conDiv.innerHTML = driverDashboard.innerHTML;
}

const displayUserDashboard = async (conDiv) => {
    // WIP: Displays user dashboard
    var userDashboard = document.querySelector("#user-dashboard");
    conDiv.innerHTML = userDashboard.innerHTML;
}

const displayRoles = async (conDiv) => {
    // Displays registration form
    var rolesPage = document.querySelector("#role-assignment");
    conDiv.innerHTML = rolesPage.innerHTML;
}

const buildJsonData = (form) => {
    // Helper function to build JSON data from HTML form.
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
    // Helper function to build headers for JSON data.
    const headers = {
        "Content-Type": "application/json",
        "Authorization": (authorization) ? authorization : "Bearer TOKEN_MISSING"
    };
    return headers;
}