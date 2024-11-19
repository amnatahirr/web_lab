
$(document).ready(function () {
    function handleOnSubmit(event) {
        event.preventDefault();
        let isValid = true;


        // Validate first name
        let firstName = $('#firstName');
        let firstNameInput = $('#firstNameInput');
        if (!firstName.val()) {
            firstNameInput.show();
            firstName.addClass('error');
            isValid = false;
        }

        // Validate last name
        let lastName = $('#lastName');
        let lastNameInput = $('#lastNameInput');
        if (!lastName.val()) {
            lastNameInput.show();
            lastName.addClass('error');
            isValid = false;
        }

        // Validate phone number
        let phone = $('#phone');
        let phoneInput = $('#phoneInput');
        if (!phone.val() || phone.val().length !== 11) {
            phoneInput.text('Please enter a valid 11-digit phone number.').show();
            phone.addClass('error');
            isValid = false;
        }

        // Validate username
        let username = $('#username');
        let usernameInput = $('#usernameInput');
        if (!username.val()) {
            usernameInput.show();
            username.addClass('error');
            isValid = false;
        }

        // Validate email
        let email = $('#email');
        let emailInput = $('#emailInput');
        if (!email.val()) {
            emailInput.show();
            email.addClass('error');
            isValid = false;
        }

        // Validate address
        let address = $('#address');
        let addressInput = $('#addressInput');
        if (!address.val()) {
            addressInput.show();
            address.addClass('error');
            isValid = false;
        }

        // Validate country
        let country = $('#country');
        let countryInput = $('#countryInput');
        if (!country.val()) {
            countryInput.show();
            country.addClass('error');
            isValid = false;
        }

        // Validate city
        let city = $('#city');
        let cityInput = $('#cityInput');
        if (!city.val()) {
            cityInput.show();
            city.addClass('error');
            isValid = false;
        }

        // Validate zip code
        let zip = $('#zip');
        let zipInput = $('#zipInput');
        if (!zip.val()) {
            zipInput.show();
            zip.addClass('error');
            isValid = false;
        }

        // If the form is valid, log the data (or proceed with form submission)
        if (isValid) {
            console.log("Email:", email.val());
            console.log("First Name:", firstName.val());
            console.log("Last Name:", lastName.val());
            console.log("Phone No:", phone.val());
            console.log("Address:", address.val());
            console.log("Country:", country.val());
            console.log("City:", city.val());
            console.log("Zip:", zip.val());
        }
    }

    // Attach the validation function to the form's submit event
    $('.needs-validation').on('submit', handleOnSubmit);
});

