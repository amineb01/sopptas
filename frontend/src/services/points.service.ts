import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Point } from '../models/Point';

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  constructor(public http: HttpClient) { }

  getPoints( id_zone, filter = '', sortActive= 'title',  sortOrder = 'asc', pageNumber = 0, pageSize = 5):  Observable<Point[]> {
    console.log('filter '+filter+' sortOrder '+' sortActive '+sortActive +' sortOrder '+sortOrder+' pageNumber '+pageNumber+' pageSize '+pageSize  )
    return this.http.get<Point[]>('points/by_zone/'+id_zone, {
        params: new HttpParams()
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('_start', (pageNumber).toString())
            .set('_limit', pageSize.toString())
    });
  }
  deletePoint(id){
    return this.http.delete<any>(`points/${id}`,{})
  }

}
