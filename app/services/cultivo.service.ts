import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Cultivo } from 'app/models/cultivo';

@Injectable({
  providedIn: 'root'
})
export class CultivoService {
  private CultivoUrl: string;
  private CultivoUrlSave: string;
  private CultivoUrlUpdate: string;
  private CultivoUrlDelete: string;
  private CultivoUrlId: string;
  private CultivoDownloadImagenUrl: string;
  private CultivoDownloadAnexoUrl: string;
  private CultivoUrlTasaOcupacion: string;
  private CultivoUrlfindByNombre: string;


  constructor(private http: HttpClient) {
    this.CultivoUrl = `${environment.Urllocalhost}/cul/cultivos`;
    this.CultivoUrlSave = `${environment.Urllocalhost}/Cultivo/addCultivo`;
    this.CultivoUrlUpdate = `${environment.Urllocalhost}/Cultivo/updateCultivo`;
    this.CultivoUrlDelete = `${environment.Urllocalhost}/Cultivo/delete/`;
    this.CultivoUrlId = `${environment.Urllocalhost}/Cultivo/`;
    this.CultivoDownloadImagenUrl = `${environment.Urllocalhost}/Cultivo/download/`;
    this.CultivoDownloadAnexoUrl = `${environment.Urllocalhost}/Cultivo/downloadAnexo/`;
    this.CultivoUrlTasaOcupacion = `${environment.Urllocalhost}/Cultivo/tasaOcupacion/`;
    this.CultivoUrlfindByNombre = `${environment.Urllocalhost}/Cultivo/allFindByNombre/`;
  }

  public findAll(): Observable<Cultivo[]> {
    return this.http.get<Cultivo[]>(this.CultivoUrl);
  }

  public save(Cultivo: Cultivo) {
    return this.http.post<Cultivo>(this.CultivoUrlSave, Cultivo);
  }

  getId(idCultivo: string) {
    return this.http.get<Cultivo>(this.CultivoUrlId + idCultivo);
  }

  public update(Cultivo: Cultivo) {
    return this.http.put<Cultivo>(this.CultivoUrlUpdate, Cultivo);
  }

  public delete(Cultivo: Cultivo) {
    return this.http.delete<void>(this.CultivoUrlDelete + Cultivo.id_cultivo);
  }

  uploadFile(file: File, nombreCultivo: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${environment.Urllocalhost}/Cultivo/upload/` + nombreCultivo, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  uploadFileAnexo(file: File, idAnexo: number, nombreCultivo: string): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', `${environment.Urllocalhost}/Cultivo/uploadAnexo/` + idAnexo + '/' + nombreCultivo, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  getImage(nombre: string, ruta: string): Observable<Blob> {
    return this.http
      .get(this.CultivoDownloadImagenUrl + nombre + "/" + ruta, {
        responseType: "blob"
      });
  }

  downloadFileAnexo(id: number, nombre: string, ruta: string): Observable<Blob> {
    return this.http
      .get(this.CultivoDownloadAnexoUrl + id + "/" + nombre + "/" + ruta, {
        responseType: "blob"
      });
  }

  tasaOcupacion(idCultivo : number, date : number) {
    return this.http.get<number>(this.CultivoUrlTasaOcupacion + idCultivo + "/" + date);
  }

  public findByNombre(nombreCultivo : string): Observable<Cultivo[]> {
    return this.http.get<Cultivo[]>(this.CultivoUrlfindByNombre+nombreCultivo);
  }

}
