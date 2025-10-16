import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../Models/customer.model';
import { CustomerType } from '../Models/customerType.model';
import { SubscriptionType } from '../Models/subscriptionType.model';
import { PaymentOption } from '../Models/paymentOption.model';
import { HMO } from '../Models/HMO.model';
@Injectable({
  providedIn: 'root'
})
export class PaymentOptionService {
  private baseUrl = "https://localhost:7101/api/PaymentOption"
  constructor(private http: HttpClient) { }
  getAllPaymentOption(): Observable<Array<PaymentOption>> {
    return this.http.get<Array<PaymentOption>>(`${this.baseUrl}/GetPaymentOptions`)
  }
  updatePaymentOption(paymentOption: PaymentOption): Observable<PaymentOption> {
    console.log('update pay type  ', paymentOption);

    return this.http.put(`${this.baseUrl}/UpdatePaymentOption`, paymentOption)
  }
  deletePaymentOptions(id: number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/DeletePaymentOptionById/${id}`)
  }

  addPaymentOption(paymentOption: PaymentOption): Observable<PaymentOption> {
    return this.http.post<PaymentOption>(`${this.baseUrl}/CreatePaymentOption`,paymentOption)
// private baseUrl = "https://localhost:7101/api/PaymentOption"
//   constructor(private http:HttpClient) { }
//   getAllPaymentOption():Observable<Array<PaymentOption>>{
//     return this.http.get<Array<PaymentOption>>(`${this.baseUrl}/GetPaymentOptions`)
  }
}