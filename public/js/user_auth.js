$(document).ready(function () {
    $('#register-form').find('button').click(function () {
        $.post('/register', $('#reg-form').serialize(), function (answer) {
            if (answer.success) {
                window.location.href = '/auth';
                return;
            }
            console.log(answer);
        });
    });

    $('#login-form-container').find('button').click(function () {
        $.post('/authorization', $('#login-form').serialize(), function (answer) {
            if (answer.success) {
                window.location.href = '/auth';
                return;
            }
            console.log(answer);
        });
    });
});

function register() {
    $('#register-form').show();
}

function login() {
    $('#login-form-container').show();
}

function logout() {
    $.get('/logout', function () {
        window.location.href = '/auth';
    })
}