import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories( filter = '', sortActive= 'title',  sortOrder = 'asc', pageNumber = 0, pageSize = 5):  Observable<Category[]> {
    console.log('filter '+filter+' sortOrder '+' sortActive '+sortActive +' sortOrder '+sortOrder+' pageNumber '+pageNumber+' pageSize '+pageSize  )
    return this.http.get<Category[]>('categories', {
        params: new HttpParams()
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('_start', (pageSize*pageNumber).toString())
            .set('_limit', pageSize.toString())
    });
  }
  addCategory(name){
    return this.http.post<any>('categories', { name: name })

  }
  editCategory(cat){
    return this.http.put<any>(`categories/${cat._id}`,{ name: cat.name })

  }
  deleteCategory(id){
    return this.http.delete<any>(`categories/${id}`,{})
  }

}
