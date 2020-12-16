import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  getImages( pageNumber = 0, pageSize = 5 ):  Observable<Image[]> {
    return this.http.get<Image[]>('https://jsonplaceholder.typicode.com/photos', {
      params: new HttpParams()
      .set('_start', (pageSize * pageNumber).toString())
      .set('_limit', pageSize.toString())
    });
  }

}

