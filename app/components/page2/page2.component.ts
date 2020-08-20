import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CultivoService } from 'app/services/cultivo.service';
import { Cultivo } from 'app/models/cultivo';
import { Departamento } from 'app/models/departamento';
import { Municipio } from 'app/models/municipio';
import { DepartamentoService } from 'app/services/departamento.service';
import { MunicipioService } from 'app/services/municipio.service';
import { TipoProducto } from 'app/models/tipo-producto';
import { TipoProductoService } from 'app/services/tipo-producto.service';
import { PostService } from 'app/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  cultivos: Cultivo[];
  departamentos: Departamento[];
  municipios: Municipio[];
  tipo_productos: TipoProducto[];
  zona: number=0;
  cul:string="";

  constructor(private fb: FormBuilder,
    private cultivoService: CultivoService,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private tipoProductoService: TipoProductoService,
    private postService: PostService,
    private router: Router,
    
    ) { }

  registerForm = this.fb.group({
    ncultivo: [''],
    des: [''],
    temperatura: [''],
    departamento: [''],
    municipio: [''],
    edad: [''],
    densidad: [''],
    productos: this.fb.array([]),
    actividades: this.fb.array([]),
    telefonos: this.fb.array([])
  });

  ngOnInit(): void {
    this.cultivoService.findAll().subscribe(data => {
      this.cultivos = data;
    });
    this.departamentoService.findAll().subscribe(data => {
      this.departamentos = data;
    });
    this.municipioService.findAll().subscribe(data => {
      this.municipios = data;
    });
    this.tipoProductoService.findAll().subscribe(data => {
      this.tipo_productos = data;
    });

    this.cul=localStorage.getItem("idcultivo");
    console.log(this.cul);

  }


  agregarProductos() {
    const productoFormGroup = this.fb.group({
      nombre_producto: '',
      descripcion: '1'
    });
    this.productos.push(productoFormGroup);
  }

  removerProducto(indice: number) {
    this.productos.removeAt(indice);
  }

  get productos() {
    return this.registerForm.get('productos') as FormArray;
  }


  agregarActividades() {
    const actividadesFormGroup = this.fb.group({
      nombre_accion: '',
      descripcion: ''
    });
    this.actividades.push(actividadesFormGroup);
  }

  removerActividades(indice: number) {
    this.actividades.removeAt(indice);
  }

  get actividades() {
    return this.registerForm.get('actividades') as FormArray;
  }


  get ncultivo() {
    return this.registerForm.get('ncultivo');
  }

  get des() {
    return this.registerForm.get('des');
  }

  get temperatura() {
    return this.registerForm.get('temperatura');
  }

  get departamento() {
    return this.registerForm.get('departamento');
  }

  get municipio() {
    return this.registerForm.get('municipio');
  }

  get edad() {
    return this.registerForm.get('edad');
  }

  get densidad() {
    return this.registerForm.get('densidad');
  }

  submit() {

    if (!this.registerForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }


    var dep= this.registerForm.get('departamento').value;
    var zon = this.departamentos.find(codigo_departamento => codigo_departamento.codigo_departamento === dep.trim());

    var cult= this.registerForm.get('ncultivo').value;
    var zon1 = this.cultivos.find(cultivo => cultivo.id_cultivo == cult.trim());

    var mun= this.registerForm.get('municipio').value;
    var zon2 = this.municipios.find(municipio => municipio.id_municipio  == mun.trim());


    this.postService.cargar(cult,zon1.nombre_cultivo,this.cul,this.registerForm.get('des').value,
    this.registerForm.get('temperatura').value,this.registerForm.get('municipio').value,zon.nombre_departamento,
    zon2.nombre_municipio,this.registerForm.get('edad').value,this.registerForm.get('densidad').value,
    this.registerForm.get('productos').value,this.registerForm.get('actividades').value
     ).subscribe(data => {
      console.log(data);

      this.router.navigate(['/page3']);
    });


    console.log(this.registerForm.value);

  }



  Onzona(idmun: number) {
    var b = false;
    if (this.departamentos != null) {
 
     
        if (idmun == this.zona) {
          b = true;
        }
      
      
    }
    return b;
  }


  cargarZona() {
    var b = false;
    if (this.departamentos != null) {
      var dep= this.registerForm.get('departamento').value;
      if(dep!=""){
       
        var zona = this.departamentos.find(codigo_departamento => codigo_departamento.codigo_departamento === dep.trim());
        
        if (zona.id_zona!=null) {
          b = true;
          this.zona=zona.id_zona;
        }
      }
      
    }
    return b;
  }

  cargarDescripcion() {
    var b = false;
    if (this.tipo_productos != null) {
      var dep= this.registerForm.get('productos').value;
      if(dep!=""){
        console.log(dep[0]);
        var zona = dep.find(productos => productos.producto);
        //console.log(zona);
       /* if (zona.id_zona!=null) {
          b = true;
          this.zona=zona.id_zona;
        }*/
      }
      
    }
    return b;
  }

}
