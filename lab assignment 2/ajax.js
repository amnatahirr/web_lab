const API_TOKEN = "94d7c2ad222aa47e08b6dffb397b474c7b92a7eef55cbdec27bdd866b154f2a7"; 

function displayUsers() {
    $.ajax({
        url: "https://gorest.co.in/public/v2/users",
        method: "GET",
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        },
        dataType: "json",
        success: function(response) {
            console.log("Fetched users:", response);
            handleResponse(response); 
        },
        error: function(error) {
            console.error("Error fetching users:", error);
        },
    });
}


function handleResponse(data) {
    var usersList = $("#listUsers");
    usersList.empty();

    $.each(data, function(id, user) {
        const statusBadge = user.status === "active" 
            ? `<span class="badge bg-success toggle-status" data-id="${user.id}" data-status="active" style="cursor:pointer;">Active</span>` 
            : `<span class="badge bg-danger toggle-status" data-id="${user.id}" data-status="inactive" style="cursor:pointer;">Inactive</span>`;

        usersList.append(
            `<div class="col-md-3 mb-4 mt-4 p-4" style="height:280px; width:300px; background-color:lightgray; margin-right: 20px;">
                <h4>${user.name}</h4>
                <p>${user.email}</p>
                <p style="color:blue">${user.gender}</p>
                ${statusBadge}
                <div class="mt-4">
                    <button class="btn btn-info btn-sm mr-2 btn-edit" data-id="${user.id}">Edit</button>
                    <button class="btn btn-danger btn-sm mr-2 btn-del" data-id="${user.id}">Delete</button>
                </div>
            </div>`
        );
    });

    console.log("UI updated with users");
}


function toggleUserStatus() {
    const userId = $(this).attr("data-id");
    const currentStatus = $(this).attr("data-status");
    const newStatus = currentStatus === "active" ? "inactive" : "active";

    $.ajax({
        url: `https://gorest.co.in/public/v2/users/${userId}`,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        },
        contentType: "application/json",
        data: JSON.stringify({ status: newStatus }),
        success: function() {
            console.log(`User status updated to ${newStatus}`);
            const userCard = $(`#listUsers .toggle-status[data-id='${userId}']`);
            userCard.attr("data-status", newStatus);
            if (newStatus === "active") {
                userCard.removeClass("bg-danger").addClass("bg-success").text("Active");
            } else {
                userCard.removeClass("bg-success").addClass("bg-danger").text("Inactive");
            }
        },
        error: function(error) {
            console.error("Error updating user status:", error);
        }
    });
}


function handleFormSubmission(event) {
    event.preventDefault();

    var userId = $("#createBtn").attr("data-id");  
    var name = $("#first_name").val() + " " + $("#last_name").val();
    var email = $("#email").val();
    var gender = $("input[name='gender']:checked").val(); 
    var status = "active"; 
    var requestData = { name: name, email: email, gender: gender, status: status };
    console.log("Request Data for Creation:", requestData); 

    if (userId) {
        $.ajax({
            url: "https://gorest.co.in/public/v2/users/" + userId,
            method: "PUT",
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            },
            contentType: "application/json",
            data: JSON.stringify(requestData),
            success: function() {
                console.log("User updated successfully");
                displayUsers();  
            },
            error: function(error) {
                console.error("Error updating user:", error.responseJSON);
            }
        });
    } else {
        $.ajax({
            url: "https://gorest.co.in/public/v2/users",
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_TOKEN}`
            },
            contentType: "application/json",
            data: JSON.stringify(requestData),
            success: function() {
                console.log("User created successfully");
                displayUsers();  
            },
            error: function(error) {
                console.error("Error creating user:", error.responseJSON);
            }
        });
    }
}

function editUser() {
    var userID = $(this).attr("data-id");  
    $.ajax({
        url: "https://gorest.co.in/public/v2/users/" + userID,
        method: "GET",
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        },
        success: function(response) {
            var user = response;
            var names = user.name.split(" ");
            $("#first_name").val(names[0]);  
            $("#last_name").val(names[1]);
            $("#email").val(user.email);
            $("input[name='gender'][value='" + user.gender + "']").prop("checked", true);
            $("#createBtn").html("Update").attr("data-id", user.id);  
        },
        error: function(error) {
            console.error("Error fetching user:", error);
        }
    });
}

function deleteUser(event) {
    event.preventDefault();
    var userID = $(this).attr("data-id"); 
    $.ajax({
        url: "https://gorest.co.in/public/v2/users/" + userID,
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${API_TOKEN}`
        },
        success: function() {
            console.log("Deleted user successfully");
            $(`#listUsers .col-md-3 .btn-del[data-id='${userID}']`).closest('.col-md-3').remove();
        },
        error: function(error) {
            console.error("Error deleting user:", error);
        }
    });
}

$(document).ready(function() {
    displayUsers();  
    $("#createForm").submit(handleFormSubmission);
    $(document).on("click", ".btn-edit", editUser);  
    $(document).on("click", ".btn-del", deleteUser);
    $(document).on("click", ".toggle-status", toggleUserStatus);
    $("#clearBtn").on("click", function (e) {
        e.preventDefault(); 
        $("#createBtn").removeAttr("data-id");  
        $("#createBtn").html("Create");  
        $("#first_name").val(""); 
        $("#last_name").val("");
        $("#email").val("");
    });
});
