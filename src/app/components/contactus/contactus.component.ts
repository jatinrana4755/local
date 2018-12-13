import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { DataService } from '../../services/data.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  contactFormBoolean:any;
  constructor(private data: DataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createContactForm();
  }
 
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  //mobilePattern= "^[6789]\d{9}$";
  contactForm:FormGroup;
  createContactForm(){
    this.contactForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
      contactNumber: ['', [Validators.required]],
      query: ['', [Validators.required]]
    });
  }
  get firstname1() { return this.contactForm.get('firstname'); }
  get lastname1() { return this.contactForm.get('lastname'); }
  get email1() { return this.contactForm.get('email'); }
  get contactNumber1() { return this.contactForm.get('contactNumber'); }
  get query1() { return this.contactForm.get('query'); }

  contactBoolean:boolean=false;
  contactRes:any;
  SubmitContactForm(){
    if(this.contactForm.valid){
      this.contactBoolean=false;
      var data={
        "fname":this.contactForm.get('firstname').value,
        "lname":this.contactForm.get('lastname').value,
        "email":this.contactForm.get('email').value,
        "mobile":this.contactForm.get('contactNumber').value,
        "query":this.contactForm.get('query').value
      };
      this.data.SubmitContactUs(JSON.stringify(data))
      .subscribe(res => {
        this.contactRes=res;
        swal(this.contactRes.message);
      },
      errmess => { 
        //this.subscribeError=errmess.json().message;
        //swal(this.subscribeError);
      });
    

    }
    else{
      this.contactBoolean=true;
    }
  }
}
