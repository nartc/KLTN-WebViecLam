import { Component, OnInit } from '@angular/core';
import { User_Account } from 'src/app/_models/user_account';
import { Observable } from "rxjs";
import { UserAccountService } from '../../../../_services/candidate/user-account.service';
import { Router } from '@angular/router';
import { SaveJobpostService } from 'src/app/_services/candidate/save-jobpost.service';
import {JobPostSummary} from 'src/app/_models/jobPostSummary';
import { ToastService } from 'src/app/_services/toast-service.service';
@Component({
  selector: 'app-savejob',
  templateUrl: './savejob.component.html',
  styleUrls: ['./savejob.component.scss']
})
export class SavejobComponent implements OnInit {
  user_account: User_Account;
  saveJobPost: Observable<JobPostSummary[]>;
  public pageNo: number=0;
  public pages: Array<number>;
  constructor(
    private userAccountService: UserAccountService,
    private saveJobpostService: SaveJobpostService,
    private router: Router,
    public toastService: ToastService
  ) { }
  setPage(i, event:any){
    event.preventDefault();
    this.pageNo = i;
    this.getSaveJobPost();
  }

  ngOnInit(): void {
    this.getSaveJobPost();
    this.user_account = new User_Account();
    this.userAccountService.getAccounts()
      .subscribe(data => {
        console.log(data)
        this.user_account = data;
      }, error => console.log(error));
  }
  isSavedJobPostEmpty(): boolean {
    let keys = Object.keys(this.saveJobPost);
    if (keys.length) { return false; }
    else return true;
  }
  getSaveJobPost(){
    this.saveJobpostService.getSaveJobPost(this.pageNo).subscribe(
      data=> {
        console.log(data);
        this.saveJobPost=data['content'];
        this.pages= new Array(data['totalPages'])
      },
      (error)=> {
        console.log(error.error.message)
      }
    );
  }
  deleteSaveJobPost(id: number,dangerTpl,successTpl) {
    this.saveJobpostService.deleteSaveJobPost(id)
      .subscribe(
        data => {
          console.log(data);
          this.getSaveJobPost();
          this.toastService.show(successTpl, { classname: 'bg-success text-light ', delay: 6000 });
        },
        error => {
          console.log(error);
          this.toastService.show(dangerTpl, { classname: 'bg-danger text-light', delay: 6000 });
        }
      );

  }


}
