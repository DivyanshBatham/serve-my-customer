(function (global) {
    "use strict";

    // Initialize Firebase:
    const config = {
        "apiKey": "AIzaSyBZszF0_L1bEIqitLhVsnGD8cWVH7DTEdA",
        "authDomain": "serve-my-customer.firebaseapp.com",
        "databaseURL": "https://serve-my-customer.firebaseio.com",
        "projectId": "serve-my-customer",
        "storageBucket": "serve-my-customer.appspot.com",
        "messagingSenderId": "114889189758",
        "appId": "1:114889189758:web:74594a4211128f53d42b2f",
        "measurementId": "G-WZN78TLD58"
    }

    firebase.initializeApp(config);

    // const auth = firebase.auth();
    const firestore = firebase.firestore();

    document.addEventListener('DOMContentLoaded', (event) => {

        const body = document.querySelector('body');

        // Creating servemycustomer Element:
        const servemycustomer = document.createElement('div');
        servemycustomer.classList.add('serve-my-customer');


        // Creating Button Element:
        const button = document.createElement('button');
        button.innerHTML = "@";
        button.classList.add('serve-my-customer__button');

        // Creating Container Element:
        const container = document.createElement('div');
        container.innerHTML = `
        <div class="serve-my-customer__container__heading">Serve My Customer</div>
        <div>Hi there!</div>
        `;
        container.className = 'serve-my-customer__container';
        // container.className = 'serve-my-customer__container hide';

        // Adding Event Listerner to Button:
        button.addEventListener('click', (e) => {
            container.classList.toggle('hide');
            // auth.signInWithEmailAndPassword('divyansh.sunita@gmail.com', 'password')
            //     .then(user => console.log(user))
            //     .catch(err => console.error(err))
        })

        // Appending Button to Body:
        servemycustomer.appendChild(button);
        servemycustomer.appendChild(container);
        body.appendChild(servemycustomer);
    });
})(window);