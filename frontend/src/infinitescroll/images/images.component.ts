import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { ImagesDataSource } from '../../datasources/imagesDataSource';
import { Image } from '../../models/image';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.sass']
})
export class ImagesComponent implements OnInit {

  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  selector: string = '.main-panel';
  pageNumber = 0;
  pageSize = 100;
  dataSource: ImagesDataSource;
  imagesList:Image[]=[];
  constructor( private imagesService: ImagesService) {
  }

  ngOnInit() {
    this.dataSource = new ImagesDataSource(this.imagesService);
    this.dataSource.loadImages( this.pageNumber, this.pageSize );
    this.dataSource.connect().subscribe(res=>this.imagesList= this.imagesList.concat(res))
  }
  
  getImages(startIndex, endIndex, _method) {
    this.imagesService.getImages( this.pageNumber, this.pageSize );
  }
  
  
  onScrollDown () {
    this.pageNumber ++ ;
    this.dataSource.loadImages( this.pageNumber, this.pageSize );
  }
  
  onScrollUp(ev) {
    console.log('scrolled up!', ev);
  }
 
}