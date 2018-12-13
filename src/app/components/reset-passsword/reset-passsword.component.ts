import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-reset-passsword',
  templateUrl: './reset-passsword.component.html',
  styleUrls: ['./reset-passsword.component.css']
})
export class ResetPassswordComponent implements OnInit {
  process = false;
  @ViewChild ('alertModalBtn') alertModalBtn: ElementRef;
  data = {
    'hash': '',
    'password': '',
    'confirm_password': ''
  };
  message: any;
  err: any;
  hash: any;
  constructor( private authService: AuthorizationService, private router: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit() {
    this.process = true;
    this.data.hash = this.router.snapshot.params['hash'];
    this.authService.resetPassword(JSON.stringify(this.data))
      .subscribe(res => {
        this.process = false;
        this.message = JSON.stringify(res.message);
        this.err = '';
        this.alertModalBtn.nativeElement.click();
      }, err => {
        this.process = false;
        this.err = JSON.stringify(err.error.message);
        this.message = '';
        this.alertModalBtn.nativeElement.click();
      }
    );
  }
}
