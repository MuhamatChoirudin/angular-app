import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { TransactionRestapiService } from 'src/app/services/transaction-restapi.service';
import { Router } from '@angular/router';
import { AccountRestapiService } from 'src/app/services/account-restapi.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  Accounts:any=[];
  @Input()
  transfer ={accountNumber:'',anDebit:'', amount:'', transactionType:''};
  constructor(private restapi: TransactionRestapiService, private router:Router,private location:Location, private restapi1: AccountRestapiService) { }

  ngOnInit() {
    if(localStorage.getItem("customerNumber") === null){
      this.router.navigate(['auth']);
    }
    
    const cif = localStorage.getItem("customerNumber");
    this.loadAccountsBy(cif);
  }

  loadAccountsBy(customerNumber) {
    return this.restapi1.getAccountsBy(customerNumber).subscribe((data: {}) => {
        this.Accounts = data["data"];
    });
  }
  create(customer){
    this.restapi.transfer(this.transfer).subscribe((data:{}) => {
      this.transfer = data["data"];
      this.router.navigate(['transaction/list'])
    })
  }

  goBack() : void {
    this.location.back();
  }
}
