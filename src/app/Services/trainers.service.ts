import { Injectable } from "@angular/core";
import { Trainer } from "../Models/trainer.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";




@Injectable()
export class TrainerService {

  
    apiUrl: string = "/api/TrainerControllers";

    constructor(private _http: HttpClient) {}
    addTrainer(trainer: Trainer):Observable<Trainer> {   
         console.log(trainer)

        return this._http.post<Trainer>(`${this.apiUrl}/addTrainer`,trainer,
          {headers: { 'content-type': "application/json" }} )    }

    getTrainerFromServer(): Observable<Trainer[]> {
        return this._http.get<Trainer[]>(`${this.apiUrl}/getAllTrainers`);
    }
    getTrainerById(id: number): Observable<Trainer> {
        return this._http.get<Trainer>(`${this.apiUrl}/getTrainerById/${id}`);
    }
    filterTrainers(firstName?: string, lastName?: string, mail?: string): Observable<Trainer[]> {
        let params = new HttpParams();
        
        if (firstName) params = params.set('firstName', firstName.trim());
        if (lastName) params = params.set('lastName', lastName.trim());
        if (mail) params = params.set('mail', mail.trim());
        console.log(mail);
        return this._http.get<Trainer[]>(`${this.apiUrl}/filter`, { params });    ;
    }
    updateTrainer(trainer: Trainer): Observable<boolean> {
        return this._http.put<boolean>(`${this.apiUrl}/updateTrainer`, trainer, {
            headers: { 'Content-Type': 'application/json' }
        }).pipe(
            map(response => response), 
            catchError(error => {
                return of(false); 
            })
        );
    }
    
}




