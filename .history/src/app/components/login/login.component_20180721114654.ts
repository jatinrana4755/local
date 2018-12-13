import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'angular4-social-login';
import { Router } from '@angular/router';
import { AuthorizationService } from './../../services/authorization.service';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angular4-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  pwdResetForm:FormGroup;
  forgetemail:any;
  data:any;
  forgetres:any;
  process = false;
  user: any;
  loggedIn: any;
  @ViewChild ('reqError') reqError: ElementRef;
  @ViewChild ('reqError2') reqError2: ElementRef;
  // tslint:disable-next-line:max-line-length
  constructor(private authSocService: AuthService, private authService: AuthorizationService, public router: Router, private fb: FormBuilder) {
    this.createForm();
    this.createPwdResetForm();
  }

  ngOnInit() {
  }

  validation() {
    let status = false;
    if (this.loginForm.status === 'VALID') {
      status = true;
    }
    return status;
  }

  hideError() {
    setTimeout(() => {
      this.reqError.nativeElement.style.display = 'none';
    }, 5000);
  }

  hideError2() {
    setTimeout(() => {
      this.reqError2.nativeElement.style.display = 'none';
    }, 5000);
  }

  onLoginSubmit() {
    this.reqError.nativeElement.style.display = 'none';
    const data = this.loginForm.value;
    if (this.validation()) {
      this.process = true;
      this.authService.login(JSON.stringify(data))
      .subscribe(res => {
        this.process = false;
        if (res) {
          localStorage.setItem('user', JSON.stringify(res));
          window.location.href = '/';
        }
      }, err => {
        this.process = false;
        this.loginForm.reset();
        this.reqError.nativeElement.innerText = err.error.message;
        this.reqError.nativeElement.style.display = 'block';
        this.hideError();
      }
    );
    } else {
      this.reqError.nativeElement.innerText = 'Enter Valid Login ID Password';
      this.reqError.nativeElement.style.display = 'block';
      this.hideError();
    }
  }

// tslint:disable-next-line:member-ordering
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

  createPwdResetForm(){
    this.pwdResetForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required])
    });
  }
  signInWithGoogle(): void {
    this.authSocService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(() => {
      this.authSocService.authState.subscribe(user => {
        localStorage.setItem('user', JSON.stringify(user));
      });
      window.location.href = '/';
    });
  }

  signInWithFB(): void {
    this.authSocService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then(() => {
      this.authSocService.authState.subscribe(user => {
        localStorage.setItem('user', JSON.stringify(user));
      });
      window.location.href = '/';
    });
  }


  forget_password(){
    this.reqError2.nativeElement.style.display = 'none';
    if (this.pwdResetForm.status === 'VALID') {
      this.data = {
        "email":this.forgetemail
      }
      this.authService.forgetpassword(JSON.stringify(this.data)).subscribe(res => {
        this.forgetres = "Success! Check your email to reset password.";
        console.log(res);
      },err => {
        this.reqError2.nativeElement.innerText = 'Something went wrong';
        this.reqError2.nativeElement.style.display = 'block';
        this.hideError2();
      });      
    }
    else{
      this.reqError2.nativeElement.innerText = 'Enter valid email ID';
      this.reqError2.nativeElement.style.display = 'block';
      this.hideError2();
    }
  }
}
