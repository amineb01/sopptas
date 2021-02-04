import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers( filter = '', sortActive= 'title',  sortOrder = 'asc', pageNumber = 1, pageSize = 5):  Observable<User[]> {
    console.log('filter '+filter+' sortOrder '+' sortActive '+sortActive +' sortOrder '+sortOrder+' pageNumber '+pageNumber+' pageSize '+pageSize  )
    return this.http.get<User[]>('users', {
        params: new HttpParams()
            .set('filter', filter)
            .set('sortOrder', sortOrder)
            .set('_start', (pageNumber).toString())
            .set('_limit', pageSize.toString())
    });
  }
  addUser(values){
    return this.http.post<any>('users', values)
  }
  deleteUser(id){
    return this.http.delete<any>(`users/${id}`,{})
  }
  editUser(user, id){
    return this.http.put<any>(`users/${ id }`, user)
  }
}
