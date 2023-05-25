## This repository is using a very old version of Angular! It was build in 2016, so the technology has evolved considerably since then. Consider exploring projects that use newer versions of Angular.


# Example of Auth0 authentication service in Angular2 + Nodejs + Express.

0. Backend: **NodeJS, express, express-jwt**
0. Frontend: **Angular2, Typescript, Bootstrap**

# Instalation

0. Clone repository
0. Run npm install
0. Register in auth0.com
0. Create an app and a few test users
0. In app->settings add http://localhost:3001 in Allowed Callback URLs, Allowed Logout URLs, Allowed Origins (CORS)
0. Edit variable authenticate in server/app.js with your keys
0. Edit variable lock in client/src/app.ts with your keys
0. Run gulp play
0. Visit http://www.localhost:3001
0. Check console in developer tools for responses
0. Enjoy!

# Todo

0. Add livereload
1. Split app.ts in separate files

# Credits

0. Todd Motto, https://toddmotto.com/angular-2-authentication
1. Auth0 blog, https://auth0.com/docs/quickstart/spa/angular2/no-api
2. Ionic blog, http://blog.ionic.io/ionic-2-and-auth0/

## License

The content of this project is licensed under the [MIT license](http://opensource.org/licenses/mit-license.php).

