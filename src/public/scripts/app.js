// This file contains client-side JavaScript to enhance our login form.
const loginForm = document.getElementById('login-form');

// Bind a "submit" event handler to the login form node. We can use this to
// make our own request to the server rather than relying on the normal browser
// behaviour.
if (loginForm) {
  // Utility function to redirect the user onwards.
  function redirect() {
    window.location = '/dashboard';
  }

  function login(form) {
    const formData = new FormData(form);

    // Make a POST request to the login endpoint. We are expecting JSON in
    // response rather than the HTML we would expect if the form was submitted
    // in the usual manner. The "credentials" property is required if we want to
    // set or send cookies.
    return fetch('/', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
    .then((res) => res.json())
    .then((res) => {
      // If the user is now signed in we can redirect to a protected route. If
      // something went wrong we show an error message. If the browser offers
      // support for the Credential Management API we can ask the browser to
      // suggest that it remembers the credentials used to successfully sign in
      // at this point.
      if (res.success) {
        if (navigator.credentials) {
          // Create a PasswordCredential instance from the form and ask the
          // browser to prompt the user to save it.
          const credential = new PasswordCredential(form);

          return navigator.credentials.store(credential)
          .then(redirect);
        }

        // No support for the Credential Management API so we can just continue
        // the journey.
        redirect();
      } else {
        const message = document.getElementById('message');

        message.innerHTML = res.message;
        message.classList.remove('sr-only');
      }
    });
  }

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Make a request to the login backend and handle the response.
    login(loginForm);
  });
}
