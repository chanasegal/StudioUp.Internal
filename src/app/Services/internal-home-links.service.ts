import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { internalHomeLinks } from '../Models/InternalHomeLinks';

@Injectable({
  providedIn: 'root'
})
export class InternalHomeLinksServiceTsService {

  private baseUrl = "https://localhost:7101/api/internalHome"
  constructor(private http: HttpClient) { }
  getAllLinks(): Observable<Array<internalHomeLinks>> {
    return this.http.get<Array<internalHomeLinks>>(`${this.baseUrl}/GetAllLinks`)
  }
  updateInternalHomeLinks(internalHomeLinks: internalHomeLinks): Observable<internalHomeLinks> {
    console.log('update pay type  ', internalHomeLinks);

    return this.http.put(`${this.baseUrl}/update/${internalHomeLinks.id}`, internalHomeLinks)
  }
  deleteInternalHomeLink(id: number): Observable<Object> {
    console.log({id});
    
    return this.http.delete(`${this.baseUrl}/delete/${id}`)
  }

  addInternalHomeLinks(internalHomeLinks: internalHomeLinks): Observable<internalHomeLinks> {
    return this.http.post<internalHomeLinks>(`${this.baseUrl}/addLink`,internalHomeLinks)
  }
  
}
