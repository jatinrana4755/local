import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public dataService:DataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createSubscribeEmailForm();
  }
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  subscribeEmailForm:FormGroup;
  createSubscribeEmailForm(){
    this.subscribeEmailForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]]
    });
  }
  get email() { return this.subscribeEmailForm.get('email'); }
  subscribeError:string;
  subscribedText:string;
  subscribeEmail(){
    if(this.subscribeEmailForm.valid){
      //function for subscribing email
    console.log(this.subscribeEmailForm.get('email').value);
    this.dataService.SubscribeEmail(this.subscribeEmailForm.get('email').value)
    .subscribe(res => {
      this.subscribeError=null;
      this.subscribedText=res.message;
      swal(this.subscribedText);
    },
    errmess => { 
      this.subscribedText=null;
      this.subscribeError=errmess.json().message;
      swal(this.subscribeError);
    });
    }
    
  }

}
