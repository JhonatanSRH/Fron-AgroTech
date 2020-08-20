import { Component, OnInit } from '@angular/core';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.css']
})
export class Page3Component implements OnInit {
  cul:string="";

  descripcion_cultivo:string="";
  nombre_cultivo:string="";
  nombre_municipio:string="";
  numero_temperatura:string="";
  densidad_cultivo:string="";
  edad_cosecha:string="";
  nombre_departamento:string="";


  constructor(
    private postService: PostService,
  ) { }

  ngOnInit(): void {
    this.cul=localStorage.getItem("idEvento");
    this.postService.consulta(this.cul).subscribe(result => { // Success
      console.log(result['dato_cultivo']['0']);
      this.descripcion_cultivo=result['dato_cultivo']['0'].descripcion_cultivo;
      this.nombre_cultivo=result['dato_cultivo']['0'].nombre_cultivo;
      this.nombre_departamento=result['dato_cultivo']['0'].nombre_departamento;
      this.nombre_municipio=result['dato_cultivo']['0'].nombre_municipio;
      this.numero_temperatura=result['dato_cultivo']['0'].numero_temperatura;
      this.densidad_cultivo=result['dato_cultivo']['0'].densidad_cultivo;
      this.edad_cosecha=result['dato_cultivo']['0'].edad_cosecha;
      
    },
      (error) => {
        console.error('No se puede eliminar, eliminar primero las funciones del Evento');
      }
    );
  }

}
