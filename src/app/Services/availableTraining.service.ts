import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AvailableTraining } from "../Models/availableTraining.model";

@Injectable()
export class AvailableTrainingService {
    apiUrl: string = "api/AvailableTraining";
    constructor(private _http: HttpClient) {}

    getAvailableTrainingByTrainingId(id: number): Observable<AvailableTraining> {
        return this._http.get<AvailableTraining>(`${this.apiUrl}/GetByTrainingId/${id}`);
    }
   
}
