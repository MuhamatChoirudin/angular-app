import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Account } from 'src/app/entity/account-model';
import { AccountRestapiService } from 'src/app/services/account-restapi.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  @Input()
  listAccount : Account[];

  @Output()
  selectedAccount : EventEmitter<Account> = new EventEmitter();
  constructor(private restapi: AccountRestapiService) { }

  ngOnInit() {

    // if(!this.listAccount){
    //   console.log('list customer kosong, querying...');
    //   this.restapi.getAccountsBy(123445).subscribe(
    //     result=>this.listAccount = result
    //   );
    // }
  }

  select(index: number){
    const selected : Account = this.listAccount[index];
    this.selectedAccount.emit(selected);
  }


}
