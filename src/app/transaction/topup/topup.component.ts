import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TransactionRestapiService } from 'src/app/services/transaction-restapi.service';
import { AccountRestapiService } from 'src/app/services/account-restapi.service';
import { Transaction } from 'src/app/entity/transaction-model';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.component.html',
  styleUrls: ['./topup.component.css']
})
export class TopupComponent implements OnInit {
  Accounts:any=[];
  @Input()
  topup ={accountNumber:'',anCredit:'', amount:'', transactionType:'', };
  
  constructor(private restapi: TransactionRestapiService, private router:Router, private location: Location, private restapi1: AccountRestapiService) { }

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
  create(){
    this.restapi.topup(new Transaction(null, null, null, this.topup.anCredit, this.topup.amount, "TopUp", this.topup.anCredit)).subscribe((data:{}) => {
      this.topup = data["data"];
      this.router.navigate(['transaction/list']);
      console.log(this.topup);
    })
  }

  goBack() : void {
    this.location.back();
  }

}
