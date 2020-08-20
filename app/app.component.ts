import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { User } from './models/user';
import { UserService } from './services/user.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    user :User;

    private _router: Subscription;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor( private renderer : Renderer2, private router: Router, @Inject(DOCUMENT,) private document: any, private element : ElementRef, public location: Location,
    private serviceUser : UserService) {}
    ngOnInit(
    ) {
        this.user = new User();
    }

    onSubmit(){
        console.log(this.user);
        this.serviceUser.signup(this.user).subscribe(result => { // Success
            localStorage.setItem("idlogin", "" + true);
            localStorage.setItem("idUser", "" + result.username);
            this.gotoList();
          },
            (error) => {
              console.error('');
            }
          );
    }

    onSubmit2(){
        console.log(this.user)
        this.serviceUser.login(this.user).subscribe(result => { // Success
            localStorage.setItem("idlogin", "" + true);
            localStorage.setItem("idUser", "" + result['user'].username);
            this.gotoList();
          },
            (error) => {
              console.error('');
            }
          );
    }


    gotoList() {
      window.location.reload();
    }


}
