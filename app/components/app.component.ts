import {Component} from 'angular2/core';
import {ToolbarComponent} from './toolbar.component';
import {JokeComponent} from './joke.component';
import {AuthService} from '../services/auth.service';

@Component({
    selector: 'my-app',
    template: `
        <toolbar></toolbar>
        <joke *ngIf="auth.loggedIn()">
    `,
    directives: [ToolbarComponent, JokeComponent],
    providers: [AuthService]
})
export class AppComponent {
    constructor(private auth: AuthService) { }
}
