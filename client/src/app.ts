import {bootstrap} from 'angular2/platform/browser';
import {Component, View, provide} from 'angular2/core';
import {RouteConfig, Router, APP_BASE_HREF, ROUTER_PROVIDERS, ROUTER_DIRECTIVES, CanActivate} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {AuthHttp, AuthConfig, tokenNotExpired, JwtHelper} from 'angular2-jwt';

declare var Auth0Lock;

@Component({
  selector: 'public-route'
})
@View({
  template: `<h1>Hello from a public route</h1>`
})
class PublicRoute { }

@Component({
  selector: 'private-route'
})
@View({
  template: `<h1>Hello from private route</h1>`
})
@CanActivate(() => tokenNotExpired())
class PrivateRoute { }

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES],
  template: `    
    <div class="container-fluid">
      <div class="jumbotron">
        <h1>Angular2 + Auth0</h1>    
        <hr>
        <p>
          <button class="btn btn-primary btn-lg" *ngIf="!loggedIn()" (click)="login()">Login</button>
          <button class="btn btn-primary btn-lg" *ngIf="loggedIn()" (click)="logout()">Logout</button>
          <button class="btn btn-primary btn-lg" [routerLink]="['./PublicRoute']">Public Route</button>
          <button class="btn btn-primary btn-lg" *ngIf="loggedIn()" [routerLink]="['./PrivateRoute']">Private Route</button>
          <router-outlet></router-outlet>
          <button class="btn btn-primary btn-lg" (click)="getThing()">Get Thing</button>
          <button class="btn btn-primary btn-lg" *ngIf="loggedIn()" (click)="tokenSubscription()">Show Token from Observable</button>
          <button class="btn btn-primary btn-lg" (click)="getSecretThing()">Get Secret Thing</button>
          <button class="btn btn-primary btn-lg" *ngIf="loggedIn()" (click)="useJwtHelper()">Use Jwt Helper</button>
        </p>
      </div>
    </div>
  `
})

@RouteConfig([
  { path: '/public-route', component: PublicRoute, as: 'PublicRoute' },
  { path: '/private-route', component: PrivateRoute, as: 'PrivateRoute' }
])

export class App {
  lock = new Auth0Lock('Client ID', 'Domain');
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: Http, public authHttp: AuthHttp) { }

  login() {
    this.lock.show((err: string, profile: string, id_token: string) => {
      if (err) {
        throw new Error(err);
      }
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);
    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

  getThing() {
    this.http.get('http://localhost:3001/ping')
      .subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('Complete')
      );
  }

  getSecretThing() {
    this.authHttp.get('http://localhost:3001/secured/ping')
      .subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('Complete')
      );
  }

  tokenSubscription() {
    this.authHttp.tokenStream.subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('Complete')
    );
  }

  useJwtHelper() {
    var token = localStorage.getItem('id_token');

    console.log(
      this.jwtHelper.decodeToken(token),
      this.jwtHelper.getTokenExpirationDate(token),
      this.jwtHelper.isTokenExpired(token)
    );
  }
}


bootstrap(App, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig(), http);
    },
    deps: [Http]
  }),
  provide(APP_BASE_HREF, { useValue: '/' })
]);
