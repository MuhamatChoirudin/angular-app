import { Injectable } from '@angular/core';
import { Observable , of} from 'rxjs';

import {Customer} from '../entity/customer-model';
import {Customers} from '../data/customer-data';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  getCustomers() : Observable<Customer[]> {
    return of (Customers);
  }

  // getCustomers():Customer[]{
  //   return Customers;
  // }
  getCustomerBy(customerNumber:number) : Observable<Customer> {
    return of (Customers.find(customer => customer.customerNumber === customerNumber));
  }
}