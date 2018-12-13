import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from './../../services/shared.service';
import { Router } from '@angular/router';
import { ActivatedRoute,Params } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { MessagesService } from './../../services/messages.service';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent implements OnInit {
  public getAllCategory: any = ["Restaurants", "Medical", "Wedding Services", "Daily Needs", "Health and Personal Care","Automobile","Services & Repair","Travel & Ticketing","Electronics"]

offset = 100;
id:any;
name:any;  
data:any; 
subcategory:any;
cover_image:any;
img:any;
subLength: any;
public loading:boolean;
sub:any
allData=[]
a=[];
p=[];
url
counter = 0;
newSub: any;
errorCase = false;
@ViewChild('loadMoreBtn') loadMoreBtn: ElementRef;

constructor(private router:ActivatedRoute,private home:HomeService){}


ngOnInit(){
 this.id = this.router.snapshot.params['id'];
 
 this.name = this.router.snapshot.params['name'];
 this.data = {
  "parent_category_id": this.id
}
console.log(this.data)
 this.getSubcategories();
 this.sub=this.home.getSubImages()
 console.log(this.sub)
this.setCover()
}


hyphenateUrlParams(str:string){
  return str.replace(' ', '-');
}
getSubcategories(){
  this.loading=true;
  this.home.postSubCategory(JSON.stringify(this.data)).subscribe(data => {
    this.subcategory = data.splice(1);
    console.log(this.subcategory);
    this.subLength = this.subcategory.length;
    this.newSub = this.subcategory.splice(0, 16);
    this.a=data[0].cover_image;
    this.p=data[0].category;
    this.url=data[0].category_url
    
    this.loading=false;
    this.errorCase = false;
    // this.subcategory.splice(0,1);
  
  }, err => {
    this.loading=false;
    this.errorCase = true;
  });

}
getMore() {
  this.counter++;
  const num = this.counter * 16;
  const newSub = this.subcategory.splice(0, num);
  this.newSub = [...this.newSub, ...newSub];
  console.log(this.newSub.length, this.subLength);

  if (this.newSub.length >= this.subLength) {
    this.loadMoreBtn.nativeElement.style.display = 'none';
  }
}

setCover(){
  console.log(this.img)
  if(this.img){
    this.home.setSubImages(this.img)

  }
}
}
