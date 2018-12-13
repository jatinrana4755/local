import { Injectable } from '@angular/core';
import {Headers,Http} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';


//import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  subcatid:any;
  id:any;
  name:any;
  email:any;
  phone:any;
  shop:any;
  website:any;
  location:any;
  address:any;
  vendor:any;
  hours:any;
  category:any;
  subcategory:any;
  desc:any;
  longitude:any;
  latitude:any;

  vendor_details=[];

  setdetails(vendor)
  {
    for(let i=0;i<vendor.length;i++)
    {
      this.vendor_details.push(vendor[i]);
    }
  }
  url = "https://cpanel.localcalls.in/";
  
  constructor(private http: HttpClient) { }

  shared_post(api, datum): any{
    return new Promise((resolve,reject)=>{
      let headers= new HttpHeaders();
      this.http.post(this.url+api, datum, {headers: headers}).subscribe(res=>{
        console.log("res");
        console.log(res);
        resolve(res);
      },(err)=>{
        console.log(" i am here error");
        console.log(err);
        resolve("Error");
      })
    })
  }
  
  shared_get(api): any{
    return new Promise((resolve,reject)=>{
      let headers= new HttpHeaders();
      this.http.get(this.url+api).subscribe(res=>{
        resolve(res);
      },(err)=>{
        reject(err);
      })
    })
  }

  



}
