import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private Url: string;
  private Urllogin: string;
  articulos = null;


  constructor(private http: HttpClient) {
    this.Url = `${environment.Urllocalhost}/user/signup`;
    this.Urllogin = `${environment.Urllocalhost}/user/login`;

  }

  public signup(user: User){
    return this.http.post<User>(this.Url,user);
  }

  public login(user: User){
    return this.http.post<any>(this.Urllogin,{"email":user.email,"password":user.password});
  }


}