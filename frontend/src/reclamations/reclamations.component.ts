import { Component, OnInit } from '@angular/core';
import { ReclamationsDataSource } from '../datasources/reclamationsDataSource';
import { Reclamation } from 'src/models/Reclamation';
import { ReclamationsService } from 'src/services/reclamations.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.sass']
})
export class ReclamationsComponent implements OnInit {
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  selector: string = '.main-panel-rec';
  pageNumber = 1;
  pageSize = 10;
  dataSource: ReclamationsDataSource;
  reclamationsList:Reclamation[]=[];
  constructor( private reclamationsService: ReclamationsService) {
  }

  ngOnInit() {
    this.dataSource = new ReclamationsDataSource(this.reclamationsService);
    this.dataSource.loadReclamations( this.pageNumber, this.pageSize );
    this.dataSource.connect().subscribe(res=>{
      let recs =[]
      if(res['message']=='success'){
        recs = res['results']['reclamations'].map(rec=> {
          rec['imagePath'] = `${environment.assetsUrl}${rec['image'].replace('uploads/','')}`
          return rec;
        })
      }
      
      this.reclamationsList= this.reclamationsList.concat(recs)
    })
  }
  
  getImages(startIndex, endIndex, _method) {
    this.reclamationsService.getReclamations( this.pageNumber, this.pageSize );
  }
  
  
  onScrollDown () {
    debugger

    this.pageNumber ++ ;
    this.dataSource.loadReclamations( this.pageNumber, this.pageSize );
  }
  
  onScrollUp(ev) {
    console.log('scrolled up!', ev);
  }
 
}