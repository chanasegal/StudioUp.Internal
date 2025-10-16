import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/Models/customer.model';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CustomerService } from 'src/app/Services/customers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
})
export class CustomersListComponent implements OnInit {
  customers: Customer[] = [];
  displayedCustomers: Customer[] = [];
  selectedCustomerId?: number;
  addCust?:boolean
  
  private searchTerms = new Subject<{ firstName: string, lastName: string, email: string }>();
  currentPage = 1;
  itemsPerPage = 10; 

  constructor(private _customerService: CustomerService, private _router: Router) { }

  ngOnInit(): void {
    this.setupSearch();
    this.loadCustomers();
  }

  navigateToAddCustomer(): void {
    //this._router.navigate(['/add-customer']);
    this.addCust=true

  }

  filterBySearch(name: string, email: string): void {
    const nameParts = name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || ''; // handling middle names as well

    this.searchTerms.next({ firstName, lastName, email });
}

  setupSearch() {
    this.searchTerms.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(({ firstName, lastName, email }) => {
        return this._customerService.filterCustomers(firstName, lastName, email);
      })
    ).subscribe(data => {
      this.customers = data;
      this.currentPage = 1;
      this.updateDisplayedCustomers();
    });
  }

  loadCustomers(): void {
    this._customerService.getCustomertFromServer().subscribe(customers => {
      this.customers = customers;
      this.updateDisplayedCustomers();
    });
  }

  updateDisplayedCustomers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedCustomers = this.customers.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.customers.length) {
      this.currentPage++;
      this.updateDisplayedCustomers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedCustomers();
    }
  }

  selectCust(custId: number): void {
    this.selectedCustomerId = custId;
  }

}
