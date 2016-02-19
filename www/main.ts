/// <reference path="../node_modules/angular2/typings/browser.d.ts"/>

import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {HTTP_BINDINGS} from 'angular2/http'
import {ROUTER_PROVIDERS} from 'angular2/router'

import 'rxjs/add/operator/map';

bootstrap(AppComponent, [HTTP_BINDINGS, ROUTER_PROVIDERS]);
