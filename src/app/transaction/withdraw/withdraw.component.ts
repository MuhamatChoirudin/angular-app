import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { TransactionRestapiService } from 'src/app/services/transaction-restapi.service';
import { Router } from '@angular/router';
import { AccountRestapiService } from 'src/app/services/account-restapi.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  @Input()
  withdraw ={accountNumber:'',anDebit:'', amount:'', transactionType:''};
  Accounts:any=[];
  constructor(private restapi: TransactionRestapiService, private router:Router,private location:Location, private restapi1: AccountRestapiService) { }

  ngOnInit() {
    if(localStorage.getItem("customerNumber") === null){
      this.router.navigate(['auth']);
    }
    
    const cif = localStorage.getItem("customerNumber");
    this.loadAccountsBy(cif);

  }


  goBack() : void {
    this.location.back();
  }
  loadAccountsBy(customerNumber) {
    return this.restapi1.getAccountsBy(customerNumber).subscribe((data: {}) => {
        this.Accounts = data["data"];
    });
  }
  create(){
    this.restapi.withdraw(this.withdraw).subscribe((data:{}) => {
      this.withdraw = data["data"];
      this.router.navigate(['transaction/list'])
    })
  }


}
