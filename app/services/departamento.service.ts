import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cultivo } from 'app/models/cultivo';
import { Observable } from 'rxjs';
import { Departamento } from 'app/models/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private Url: string;


  constructor(private http: HttpClient) {
    this.Url = `${environment.Urllocalhost}/cul/departamentos`;

  }

  public findAll(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.Url);
  }

}