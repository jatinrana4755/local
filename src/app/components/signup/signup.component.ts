import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'angular4-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angular4-social-login';
import { AuthorizationService } from './../../services/authorization.service';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { CustomValidationService } from '../../services/custom-validation.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  process = false;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  @ViewChild ('reqError') reqError: ElementRef;
  @ViewChild ('showConfirmation') showConfirmation: ElementRef;

  ngOnInit() {
  }

  // tslint:disable-next-line:max-line-length
  constructor(private authSocService: AuthService, private authService: AuthorizationService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  validation() {
    let status = false;
    if (this.signupForm.status === 'VALID') {
      status = true;
    }
    return status;
  }

  // tslint:disable-next-line:member-ordering
  createForm() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required ],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)] ],
      mobile: ['', [CustomValidationService.checkLimit(1000000000, 999999999999), Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]]
    });
  }

  hideError() {
    setTimeout(() => {
      this.reqError.nativeElement.style.display = 'none';
    }, 5000);
  }

  onSignupSubmit() {
    this.reqError.nativeElement.style.display = 'none';
    if (this.validation()) {
      this.process = true;
      this.authService.signup(JSON.stringify(this.signupForm.value))
      .subscribe(res => {
        this.process = false;
        this.showConfirmation.nativeElement.click();
        // console.log(res);
        // window.location.href = '/login';
      }, err => {
        this.signupForm.reset();
        this.process = false;
        this.reqError.nativeElement.innerText = err.error.message;
        this.reqError.nativeElement.style.display = 'block';
        this.hideError();
      });
    } else {
      this.reqError.nativeElement.innerText = 'All Fields are Mandatory';
      this.reqError.nativeElement.style.display = 'block';
      this.hideError();
    }
  }

  signInWithGoogle(): void {
    this.authSocService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(() => {
      this.authSocService.authState.subscribe(user => {
        localStorage.setItem('usersoc', JSON.stringify(user));
      });
      window.location.href = '/home';
    });
  }

  signInWithFB(): void {
    this.authSocService.signIn(FacebookLoginProvider.PROVIDER_ID)
    .then(() => {
      this.authSocService.authState.subscribe(user => {
        localStorage.setItem('usersoc', JSON.stringify(user));
      });
      window.location.href = '/home';
    });
  }
}
