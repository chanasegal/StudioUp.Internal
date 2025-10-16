import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { TrainingCustomer } from "../Models/trainingCustomer.model";
import { CalanderAvailableTraining } from "../Models/calanderAvailableTraining.model";

@Injectable()
export class TrainingCustomerService {
    apiUrl: string = "api/TrainingCustomer";
    constructor(private _http: HttpClient) {}

   getAllTC():Observable<Array<TrainingCustomer>>{
    return this._http.get<Array<TrainingCustomer>>(`${this.apiUrl}/allCT`)

}
    getTrainingByCustomerId(id: number): Observable<TrainingCustomer[]> {
        return this._http.get<TrainingCustomer[]>(`${this.apiUrl}/GetTraningCustomerByCustomerId/${id}`);
    }
    getAllRegisteredTrainingsDetails():Observable<CalanderAvailableTraining[]>{
        return this._http.get<CalanderAvailableTraining[]>(`${this.apiUrl}/GetAllRegisteredTrainingsDetails`);
    }
    filterCustomersTrainingDeatails(past?: boolean, future?: boolean, startDate?: string, endDate?: string):Observable<CalanderAvailableTraining[]>{
        let params = new HttpParams();

        if (past !== undefined) {
            params = params.set('past', past.toString());
        }
        if (future !== undefined) {
            params = params.set('future', future.toString());
        }
        if (startDate) {
            params = params.set('StratDate', startDate);
        }
        if (endDate) {
            params = params.set('EndDate', endDate);
        }
        return this._http.get<CalanderAvailableTraining[]>(`${this.apiUrl}/FilterCustomersTrainingDeatails`, { params });
    }
    updateTC(tc:TrainingCustomer):Observable<TrainingCustomer>{
        
        return this._http.put<TrainingCustomer>(`${this.apiUrl}/${tc.id}`,tc,
          {headers: { 'content-type': "application/json" }}
        )
      }
      deleteTC(id:number):Observable<Object>{
        return this._http.delete(`${this.apiUrl}/delete/${id}`)
      }
      
}
