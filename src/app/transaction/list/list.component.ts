import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionRestapiService } from 'src/app/services/transaction-restapi.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  Transactions:any=[];
  constructor(private router:Router,private restapi: TransactionRestapiService) { }

  ngOnInit() {
    if(localStorage.getItem("customerNumber") === null){
      this.router.navigate(['auth']);

      
    }
    const cif = localStorage.getItem("customerNumber");
    this.loadTransactionBy(cif);

  }

  loadTransactionBy(customerNumber) {
    return this.restapi.getTransactionsBy(customerNumber).subscribe((data:{})=>{
      this.Transactions= data["data"];
    });
    
  }

}
