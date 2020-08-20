import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { GalleryImage } from 'app/models/gallery-image';
import { GalleryService } from '../../services/gallery.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PostService } from 'app/services/post.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements  OnInit, OnDestroy  {

  public image: GalleryImage;
  private subscription: Subscription;
  login: boolean=false;
  nUser: string="";

  titulo: string="";
  


  constructor(
    private postService: PostService,
    private router: Router,
    private ref: ChangeDetectorRef,
    private readonly galleryService: GalleryService
    
  ) { }

  ngOnInit(): void {
    this.galleryService.createGallery();
    this.getImageSelected();
    this.nUser=localStorage.getItem("idUser");
    if(localStorage.getItem("idlogin")=="true"){
      this.login=true;
    }
  
  }

  getImageSelected(): void {
    this.subscription = this.galleryService
      .getImageSelected()
      .subscribe(image => {
        this.image = image;
        console.log(this.image);
       // this.ref.detectChanges();
      });
  }

  changeImg(move: number): void {
    const position = this.image.position + move;
    this.galleryService.selectImage(position);
  }

  public closeAlert() {
    console.log('si');
}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(){
    console.log("si");
    this.postService.crear(this.nUser,this.titulo).subscribe(data => {
      console.log(data);
      localStorage.setItem("idcultivo", "" + data[0].id);
      this.router.navigate(['/page2']);
    });

    
  }

}
