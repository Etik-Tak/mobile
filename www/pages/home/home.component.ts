import {Component} from 'angular2/core';

@Component({
    selector: 'etik-tak-main',
    template: `
        <p>{{ stateText }}</p>
    `
})

export class HomeComponent {

    stateText: string = "Logget ud!";
}
