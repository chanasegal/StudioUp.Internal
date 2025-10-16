import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../Models/customer.model';
import { CustomerType } from '../Models/customerType.model';
import { SubscriptionType } from '../Models/subscriptionType.model';
import { PaymentOption } from '../Models/paymentOption.model';
import { HMO } from '../Models/HMO.model';
import { homeLinks } from '../Models/homeLinks';
@Injectable({
    providedIn: 'root'
})
export class homeLinksService {
    private baseUrl = "https://localhost:7101/api/internalHome"
    constructor(private http: HttpClient) { }

    getAllLinks(): Observable<Array<homeLinks>> {
        return this.http.get<Array<homeLinks>>(`${this.baseUrl}/GetAllLinks`)
    }
}