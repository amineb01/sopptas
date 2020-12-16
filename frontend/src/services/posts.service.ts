import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts( filter = '', sortActive= 'title',  sortOrder = 'asc', pageNumber = 0, pageSize = 5):  Observable<Post[]> {
    console.log('filter '+filter+' sortOrder '+' sortActive '+sortActive +' sortOrder '+sortOrder+' pageNumber '+pageNumber+' pageSize '+pageSize  )
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
        params: new HttpParams()
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('_start', (pageSize*pageNumber).toString())
            .set('_limit', pageSize.toString())
    });
  }

}
