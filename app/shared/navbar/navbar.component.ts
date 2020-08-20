import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    login: boolean = false;

    constructor() {

    }

    ngOnInit() {
        if (localStorage.getItem("idlogin") == "true") {
            this.login = true;
        }
    }

    salir() {
        console.log("aqui");
        localStorage.setItem("idlogin", "" + false);
        localStorage.setItem("idUser", "" + "");
        window.location.reload();
    }

}
