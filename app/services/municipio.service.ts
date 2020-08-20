import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Municipio } from 'app/models/municipio';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  private Url: string;


  constructor(private http: HttpClient) {
    this.Url = `${environment.Urllocalhost}/cul/municipios`;

  }

  public findAll(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(this.Url);
  }

}