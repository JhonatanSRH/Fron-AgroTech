import { Component, OnInit } from '@angular/core';
import { Post } from 'app/models/post';
import { Router } from '@angular/router';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-page4',
  templateUrl: './page4.component.html',
  styleUrls: ['./page4.component.css']
})
export class Page4Component implements OnInit {

  posts: Post[];
  login: boolean=false;
  constructor(
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.posteas();
    if(localStorage.getItem("idlogin")=="true"){
      this.login=true;
    }
  }

  posteas(){
    this.postService.findAll().subscribe(data => {
      this.posts = data;
    });
  }

  delete(evento: Post) {
    this.postService.delete(evento.id).subscribe(result => { // Success
      console.log('Se ha eliminado un evento');
      this.posteas();
    },
      (error) => {
        console.error('No se puede eliminar, eliminar primero las funciones del Evento');
      }
    );
  }

  funcionByEvento(evento: Post) {
    localStorage.setItem("idEvento", "" + evento.id);
    this.router.navigate(['/page3']);


  }


}
