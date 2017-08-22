# web-summer-camp-2017-workshop

This repository contains the code for the "Building a better login" workshop at
[Web Summer Camp 2017][wsc]. It is organised with branches corresponding to
different exercises but the hope is that we can all progress from `master`
without the need to check out an existing branch.

## Setup

If you are not participating via the virtual machine distributed by the Web
Summer Camp organisers you will need to set up the project manually. The demo
app has a couple of prerequisites:

- Node.js 6+
- npm (5+ recommended)
- Chrome 60+

Once your system meets those prerequisites you can set up the project locally:

- `git clone git@github.com:jamesallardice/web-summer-camp-2017-workshop.git`
- `cd web-summer-camp-2017-workshop`
- `npm install`
- `npm start`

By default this will start the app on port 7400.

## Structure

The application is a simple demo and therefore does not always follow best
practices. A brief overview of the structure is as follows:

- `src/index.js` - main entry point. Starts an [Express][express] app and
  defines a number of routes.
- `src/views/` - HTML templates written in [Pug][pug] (formerly known as Jade).
  These are rendered by the route handlers in `src/index.js`.
- `src/public/scripts/app.js` - client-side entry point. All of the client-side
  JavaScript lives in this one file.
- `config/default.js` - Default configuration values.

## Exercises

We are going to start with a simple login form and enhance it with various
techniques. Most of these techniques revolve around helping the browser to help
the user. If you get stuck you can checkout the branch related to the exercise
(such as `exercise-1`) but ask for help before jumping ahead!

### Exercise 1

Most modern browsers provide form autofill functionality. HTML now provides a
way for developers to hint at the expected value of a form field and the browser
can use this information to make a better decision about the value to provide.

- Add the [`autocomplete` attribute][ac] to the login form fields. Think about
  the most appropriate values in this case using the list in the previous spec.

### Exercise 2

One of the first things we can do improve the user experience of our login form
ourselves, rather than by assisting the browser, is to allow asynchronous
submission instead of relying only on the traditional form post which requires
a full page load. Since we're focused on modern browsers we have the luxury of
using [`fetch`][fetch] rather than the old-school XMLHttpRequest.

- Update the `/login` POST route handler to handle requests that accept JSON
  responses. You can extend the object passed to the `res.format` call here.

- Bind a `submit` event handler to the form in `src/public/scripts/app.js` and
  send the field values to the server with `fetch`.

### Exercise 3

It's time to start working with the [Credential Management API][cmapi]! When a
user successfully signs in we can suggest to the browser that it asks the user
to store the credentials used so that we can retrieve them later.

- Update the successful `fetch` response handler in `src/public/scripts/app.js`
  to store credentials. You can use the `PasswordCredential` constructor and the
  `navigator.credentials.store` method.

### Exercise 4

Now that we have got some stored credentials we can retrieve when the login page
loads. If we successfully retrieve credentials we can automatically submit the
`fetch` request to the server and log the user in without them having to
interact with the form at all.

- Add a DOM ready event handler on the login page in `src/public/scripts/app.js`
  and retrieve a stored password credential. You can use the
  `navigator.credentials.get` method.

- Submit the `fetch` request with the stored credentials. You will probably need
  to make some changes in `src/public/scripts.app.js` to differentiate between
  form submit events and page load events.

[wsc]: http://2017.websummercamp.com/
[express]: https://expressjs.com/
[pug]: https://pugjs.org/api/getting-started.html
[ac]: https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill
[fetch]: https://developer.mozilla.org/en/docs/Web/API/Fetch_API
[cmapi]: https://developers.google.com/web/fundamentals/security/credential-management/
