import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { TrainingType } from "../Models/trainingType.model";

@Injectable()
export class TrainingTypeService {
  apiUrl: string = "https://localhost:7101/api/TrainingType";
  constructor(private _http: HttpClient) { }
  getTrainingTypeById(id: number): Observable<TrainingType[]> {
    return this._http.get<TrainingType[]>(`${this.apiUrl}/GetTrainingTypeById/${id}`);
  }
  getAllTrainingType(): Observable<Array<TrainingType>> {
    return this._http.get<Array<TrainingType>>(`${this.apiUrl}/GetAllTrainingTypes`)
  }
  updatetrainType(trainingType: TrainingType): Observable<TrainingType> {
    return this._http.put(`${this.apiUrl}/UpdateTrainingType`, trainingType)
  }
  deleteTrainingType(id: number): Observable<Object> {
    return this._http.delete(`${this.apiUrl}/DeleteTrainingType/${id}`)
  }
  addTrainingType(trainingType: TrainingType): Observable<TrainingType> {
    return this._http.post(`${this.apiUrl}/AddTrainingType`, trainingType)
  }
}
