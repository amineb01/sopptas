import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/Reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationsService {


  constructor(private http: HttpClient) { }

  getReclamations(pageNumber, pageSize): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>('reclamations', {
      params: new HttpParams()
        .set('page', pageNumber.toString())
        .set('limit', pageSize.toString())
    });
  }

  getReclamationById(id): Observable<Reclamation> {
    return this.http.get<Reclamation>('reclamations/' + id)
  }

  addResponse(id, comment): Observable<any> {
    return this.http.put<Reclamation>('reclamations/' + id, { comment: comment })
  }

  deleteComment(id, id_comment): Observable<Reclamation> {

    return this.http.delete<Reclamation>('reclamations/' + id + "/" + id_comment)
  }



}

