import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoProducto } from 'app/models/tipo-producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  private Url: string;


  constructor(private http: HttpClient) {
    this.Url = `${environment.Urllocalhost}/cul/productos`;

  }

  public findAll(): Observable<TipoProducto[]> {
    return this.http.get<TipoProducto[]>(this.Url);
  }

}