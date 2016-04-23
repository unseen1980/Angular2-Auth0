import {Component, OnInit} from 'angular2/core';
import {AuthHttp} from 'angular2-jwt';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {CanActivate} from 'angular2/router';

// interface User {
//     id: number,
//     name: string,
//     image: string
// }

@Component({
    selector: 'joke',
    template: `
    <pre>{{joke}}</pre>
  `
})
@CanActivate(() => tokenNotExpired())
export class JokeComponent implements OnInit {
    joke;
    constructor(private authHttp: AuthHttp) { }
    ngOnInit() {
        this.authHttp.get('https://api.chucknorris.io/jokes/random')
            .map(res => res.json())
            .subscribe(
            joke => this.joke = joke,
            error => console.log(error)
            );
    }
}