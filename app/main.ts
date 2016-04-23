import {bootstrap}    from 'angular2/platform/browser';
import {AppComponent} from './components/app.component';
import { provide } from 'angular2/core';
import { Http, HTTP_PROVIDERS } from 'angular2/http';
import { AuthConfig, AuthHttp } from 'angular2-jwt';

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig({
          tokenName: 'jwt'
        }), http);
      },
      deps: [Http]
    })
  ]);
