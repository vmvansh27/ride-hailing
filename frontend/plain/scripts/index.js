//import { response } from "express";

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
    //document.querySelector("#change-para").innerText = "Para value changed With innserText!"

}

const postSignInData = async (e) => {
    e.preventDefault();

    const jsonData = {
        email: document.querySelector("#username-input-signin").value,
        password: document.querySelector("#password-input-signin").value
    };

    const headersData = buildHeaders();

    fetch("http://localhost:5000/users/login", {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: headersData
    })
    .then(response => response.json())
    .then(json => {
        console.log("Login response:", json);

        if (json.success) {
            const role = json.user.role; 
            const contentDiv = document.querySelector("#main-page");

            if (role === "rider") displayUserDashboard(contentDiv, json.user);
            else if (role === "driver") displayDriverDashboard(contentDiv, json.user);
            else alert("Unknown role from server");
        } else {
            alert("Login failed: " + (json.message || "Check credentials"));
        }
    })
    .catch(err => {
        console.error("Login error:", err);
        alert("Login error.");
    });
};


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

const displayDriverDashboard = async (conDiv, jsonData) => {
    // WIP: Displays driver dashboard.
    var driverDashboard = document.querySelector("#driver-dashboard");
    const driverNameInDashboard = document.querySelector("#name-driver-dashboard");
    driverNameInDashboard.innerHTML = jsonData.full_name;
    conDiv.innerHTML = driverDashboard.innerHTML;
    addVehicleButton = document.querySelector("#add-vehicle-driver-button");
    addVehicleButton.addEventListener('click', (e, jsonData) => {
        addVehiclePage = document.querySelector("#driver-add-vehicle");
        conDiv = document.querySelector("#main-page");
        conDiv.innerHTML = addVehiclePage.innerHTML;
    })

}

const displayUserDashboard = async (conDiv, jsonData) => {
    // WIP: Displays user dashboard
    var userDashboard = document.querySelector("#user-dashboard");
    const userNameInDashboard= document.querySelector("#name-user-dashboard");
    userNameInDashboard.innerHTML = jsonData.full_name;
    conDiv.innerHTML = userDashboard.innerHTML;
}

const displayRoles = async (conDiv) => {
    // Displays registration form
    var rolesPage = document.querySelector("#role-assignment");
    conDiv.innerHTML = rolesPage.innerHTML;
}

const handleAddVehicleSubmit = () => {
    //e.preventDefault();
    console.log("handleAddVehicle Top -------");
    const conDiv = document.querySelector("#main-page");
    console.log('conDiv is ');
    console.log(conDiv);
    const addVehicleForm = document.querySelector("#add-vehicle-form");
    console.log("addVehicleForm is ");
    console.log(addVehicleForm);
    const formJsonData = buildJsonData(addVehicleForm);
    console.log('form data is:')
    console.log(formJsonData);

//     const headersData = buildHeaders();
//     console.log("In handleAddVehicleSubmit()");

//     fetch("http://localhost:5000/vehicles/", {
//         method: "POST",
//         body: JSON.stringify(formJsonData),
//         headers: headersData
//     })
//     .then((response) => response.json())
//     .then((json) => console.log(json))
//     .catch(e => console.error(`Caught error: ${e.message}`));
    
//    console.log(formJsonData);

    
    /*WIP: Add POST request code to submit data from the add-vehicle-form.
    Assignee: Melwin*/
    
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
