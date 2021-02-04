import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from '../models/Zone';

@Injectable({
  providedIn: 'root'
})
export class ZonesService {

  constructor(private http: HttpClient) { }

  getZones( filter = '', sortActive= 'title',  sortOrder = 'asc', pageNumber = 0, pageSize = 5):  Observable<Zone[]> {
    console.log('filter '+filter+' sortOrder '+' sortActive '+sortActive +' sortOrder '+sortOrder+' pageNumber '+pageNumber+' pageSize '+pageSize  )
    return this.http.get<Zone[]>('zones', {
        params: new HttpParams()
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('_start', (pageSize*pageNumber).toString())
            .set('_limit', pageSize.toString())
    });
  }
  getZonesForUser(){
    return this.http.get<any>('zones', {})
  }
  addZone(name){
    return this.http.post<any>('zones', { name: name })

  }
  editZone(zone){
    return this.http.put<any>(`zones/${zone._id}`, { name: zone.name })
  }
  deleteZone(id){
    return this.http.delete<any>(`zones/${id}`,{})
  }
  

}
