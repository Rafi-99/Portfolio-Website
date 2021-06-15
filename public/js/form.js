const form = document.querySelector('#email-form');

form.addEventListener('submit', s => {
    s.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const data = {
        name: name,
        email: email,
        message: message
    }

    const inputs = document.querySelectorAll('input');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type !== 'submit') {
            inputs[i].value = '';
        }
    }
    document.querySelector('textarea').value = '';

    fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => {
        console.log(res);
    });

    alert('Your email has been sent!');
});