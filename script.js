var selectedRow = null; 

// Show Alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className} alert-dismissible fade show`;
    div.appendChild(document.createTextNode(message));

    // Add a close button
    const button = document.createElement("button");
    button.className = "btn-close";
    button.setAttribute("data-bs-dismiss", "alert");
    button.setAttribute("aria-label", "Close");
    div.appendChild(button);

    // Insert alert into the DOM
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    // Remove alert after 3 seconds
    setTimeout(() => {
        if (div) {
            div.remove();
        }
    }, 3000);
}

// Clear All Fields
function clearField(){
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNo").value = "";
}

// Add Data
document.querySelector("#student-form").addEventListener("submit", (e) =>{
    e.preventDefault();
    
    // Get Form Values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rollNo = document.querySelector("#rollNo").value;

    // Validate
    if(firstName === "" || lastName === "" || rollNo === ""){
        showAlert("Please fill in all fields", "danger");
    } else {
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${rollNo}</td>
            <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Student Added", "success");
        } else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            selectedRow = null;
            showAlert("Student Info Edited", "info");
        }

        clearField();
    }
});

// Edit Data
document.querySelector("#student-list").addEventListener("click", (e) =>{
    const target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
        showAlert("Please edit your info", "info");
    }
});



// Delete Data
document.querySelector("#student-list").addEventListener("click",(e) =>{
    const target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});
