import {Injectable} from 'angular2/core';
import {tokenNotExpired} from 'angular2-jwt';

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

    lock = new Auth0Lock('P1L6GWVSqm35XTmKjerP469mnj3Nactv',
        'unseen1980.eu.auth0.com');

    login() {
        this.lock.show((error: string, profile: Object, id_token: string) => {
            if (error) {
                console.log(error);
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
}