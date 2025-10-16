import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { trainingCustomersTypes } from '../Models/trainingCustomersTypes.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingCustomersTypesService {

  constructor(private _http: HttpClient) { }

  apiUrl: string = "https://localhost:7101/api/TrainingCustomersTypes";
  getAllTC(): Observable<Array<trainingCustomersTypes>> {    
    return this._http.get<Array<trainingCustomersTypes>>(`${this.apiUrl}/GetAllTrainingCustomerTypes`)
}
updateTCT(tc: trainingCustomersTypes): Observable<trainingCustomersTypes> {
console.log({tc});

    return this._http.put<trainingCustomersTypes>(`${this.apiUrl}/UpdateTrainingCustomerType`,tc )
}
deleteTC(id: number): Observable<Object> {
    return this._http.delete(`${this.apiUrl}/DeleteTrainingCustomerType/${id}`)
}
addTCT(tc: trainingCustomersTypes): Observable<trainingCustomersTypes> {
  console.log({tc});
  return this._http.post<trainingCustomersTypes>(`${this.apiUrl}/AddTrainingCustomerType`,tc)
}

}
