function displayUsers() {
    $.ajax({
        url: "https://reqres.in/api/users?page=2",
        method: "GET",
        dataType: "json",
        success: function(response) {
            console.log("Fetched users:", response);  s
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

    $.each(data.data, function(id, user) {
        usersList.append(
            `<div class="col-md-3 mb-4 mt-4">
                <h4>${user.first_name}</h4>
                <p>${user.email}</p>
                <img src="${user.avatar}" class="mt-4" alt="avatar" style="width:200px; height:200px">
                <div class="mt-4">
                    <button class="btn btn-info btn-sm mr-2 btn-edit" data-id="${user.id}">Edit</button>
                    <button class="btn btn-danger btn-sm mr-2 btn-del" data-id="${user.id}">Delete</button>
                </div>
            </div>`
        );
    });

    console.log("UI updated with users");  
}

function handleFormSubmission(event) {
    event.preventDefault();

    var userId = $("#createBtn").attr("data-id");  
    var firstName = $("#first_name").val();
    var lastName = $("#last_name").val();
    var email = $("#email").val();
    var avatar = $("#avatar").val();

    var requestData = { first_name: firstName, last_name: lastName, email: email, avatar: avatar };

    if (userId) {
        
        $.ajax({
            url: "https://reqres.in/api/users/" + userId,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(requestData),  
            success: function() {
                console.log("User updated successfully");
                displayUsers();  
            },
            error: function(error) {
                console.error("Error updating user:", error);
            }
        });
    } else {
        
        $.ajax({
            url: "https://reqres.in/api/users",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(requestData),  // Convert object to JSON string
            success: function() {
                console.log("User created successfully");
                displayUsers();  // Refresh the user list after creation
            },
            error: function(error) {
                console.error("Error creating user:", error);
            }
        });
    }
}

function editUser() {
    var userID = $(this).attr("data-id");  
    $.ajax({
        url: "https://reqres.in/api/users/" + userID,
        method: "GET",
        success: function(response) {
            var user = response.data;
            $("#first_name").val(user.first_name);  
            $("#last_name").val(user.last_name);
            $("#email").val(user.email);
            $("#avatar").val(user.avatar);
            $("#createBtn").html("Update").attr("data-id", user.id);  
        },
        error: function(error) {
            console.error("Error fetching user:", error);
        }
    });
}

function deleteUser() {
    var userID = $(this).attr("data-id"); 
    $.ajax({
        url: "https://reqres.in/api/users/" + userID,
        method: "DELETE",
        success: function() {
            console.log("Deleted user successfully");
            displayUsers();  
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

   
    $("#clearBtn").on("click", function (e) {
        e.preventDefault();
        $("#clearBtn").hide();  
        $("#createBtn").removeAttr("data-id");  
        $("#createBtn").html("Create");  
        $("#first_name").val(""); 
        $("#last_name").val("");
        $("#email").val("");
        $("#avatar").val("");
    });
});
