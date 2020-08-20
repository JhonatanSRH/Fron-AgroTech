import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Post } from 'app/models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private Urlcrear: string;
  private Urlguardar: string;
  private Urlborrar: string;

  constructor(private http: HttpClient) {
    this.Urlcrear = `${environment.Urllocalhost}/post/posts`;
    this.Urlguardar = `${environment.Urllocalhost}/post/cultivo`;


  }

  public crear(user: string, titulo: string) {
    return this.http.post<any>(this.Urlcrear, { "username": user, "titulo": titulo });
  }

  public cargar(nom1: string, nom2: string, nom3: string, nom4: string, nom5: string, nom6: string, nom7: string, nom8: string, nom9: string, nom10: string, nom11, nom12) {
    return this.http.post<any>(this.Urlguardar, {
      "id_cultivo": nom1,
      "nombre_cultivo": nom2,
      "id_post": nom3,
      "descripcion_cultivo": nom4,
      "url_imagen": "",
      "numero_temperatura": nom5,
      "id_municipio": nom6,
      "nombre_departamento": nom7,
      "nombre_municipio": nom8,
      "edad_cosecha": nom9,
      "densidad_cultivo": nom10,
      "productos":nom11,
      "actividades":nom12
    });
  }

  public findAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.Urlcrear);
  }

  public delete(evento: string) {
    return this.http.delete<void>(this.Urlcrear + "?post=" + evento);
  }

  public consulta(user: string) {
    return this.http.get<any>(this.Urlguardar + "?post=" +  user );
  }

}