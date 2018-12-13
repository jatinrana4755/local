import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from './../../services/shared.service';
import { Router } from '@angular/router';
import { ActivatedRoute,Params } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {
  @ViewChild ('vendorList') vendors: ElementRef;
  @ViewChild ('callBtn') callBtn: ElementRef;
  @ViewChild ('gridView') gridView: ElementRef;
  @ViewChild ('listView') listView: ElementRef;
  offset = 100;
  cities: any;
  minRange: any = 1000;
  maxRange: any = 6000;
  minDistanceRange:number=10;
  Bool = true;
  id: any;
  data: any;
  name: any;
  catid: any;
  bannerdata: any;
  subcategory: any;
  vendordata: any;
  initialData: any;
  distanceRange = 100;
  sortByDistanceCondition: boolean;
  findInRangeCondition: boolean;
  selectedCity: any;
  hide = false;
  errorCase = false;
  term: any;
public loading: boolean;

  constructor(private router: ActivatedRoute, private homeService: HomeService,
    private shared:SharedService, private dataService: DataService,private route:Router) {
    //this.findMe();
  }

  // show=true;
  ngOnInit() {
    // this.get_subcategories();
    // this.show=true;
    this.id = this.router.snapshot.params['id'];
    console.log(this.id)
    this.name = this.router.snapshot.params['name'];
    this.catid = this.router.snapshot.params['catid']
    this.data = {
      'id': this.id
    };
    this.subcategory = {
      "parent_category_id":this.catid
    }
    this.getCities();
    this.getVendor();
    this.getbannerfromsubcategory();
    console.log(this.bannerdata);
  
  }

   transferdata(subcatid,id,name,email,phone,shop,website,location,address,vendors,hours,category,desc,lon,lat){
     this.shared.subcatid = subcatid;
     this.shared.id = id;
     this.shared.name = name;
     this.shared.email = email;
     this.shared.phone = phone;
     this.shared.shop = shop;
     this.shared.website = website;
     this.shared.location = location;
     this.shared.address = address;
     this.shared.vendor =vendors;
     this.shared.hours = hours;
     this.shared.category = category;
     this.shared.desc = desc;
     this.shared.longitude=lon;
     this.shared.latitude=lat;
   }
   getDetails(ven){
    console.log(ven);
    if (ven) {
      this.homeService.setVendorDetails(ven);
      this.route.navigate(['/vendors',ven.city,this.hyphenateUrlParams(ven.category),this.replace(ven.shop_name), ven.vendor_id]);
    }

  }

 hyphenateUrlParams(str:string){
     return str.replace(' ', '-');
   }
  
   replace(str:string){
    return str.replace(/\s/g,'-');
  }


  getbannerfromsubcategory(){
    this.homeService.postSubCategory(JSON.stringify(this.subcategory)).subscribe(
      data => {
        this.bannerdata = data[0];
      }
    );
  } 

  collapseIconRotate(btn) {
    const element = btn.srcElement.childNodes['1'];
    element.classList.toggle('collapse-ico-r');
    // element.classList.toggle('collapse-ico-r');
  }

  getCities() {
    this.homeService.getCities()
      .subscribe(data => { this.cities = data; });
  }

  changeView(bool) {
    const element = this.vendors.nativeElement;
    if (bool) {
      element.classList.add('vendor-card-grid');
      this.gridView.nativeElement.classList.add('active');
      this.listView.nativeElement.classList.remove('active');
      element.classList.remove('vendor-card-list');
    } else {
      element.classList.remove('vendor-card-grid');
      this.listView.nativeElement.classList.add('active');
      this.gridView.nativeElement.classList.remove('active');
      element.classList.add('vendor-card-list');
    }
  }

  getVendor() {
    this.loading = true;
    this.homeService.postVendors(JSON.stringify(this.data))
      .subscribe(data => {
        this.hide = true;
        this.vendordata = data;
        this.initialData = this.vendordata;
        this.loading = false;
        this.errorCase = false;
        //console.log(data);
    }, err => {
      this.loading = false;
      this.errorCase = true;
    });
  }

  filters(data, event) {
    this.selectedCity = data;
    const a = document.getElementsByClassName('category-li');
    for (let i = 0; i < a.length; i++) {
      a[i].classList.remove('category-li-clicked');
  }
    event.target.classList.add('category-li-clicked');
  }
  
  Latitude:any;
Longitude:any;
/*findMe() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((successCallback) =>
      {
        //alert('inside success callback');
      //this.showPosition(position);
      this.Latitude = successCallback.coords.latitude;
      this.Longitude = successCallback.coords.longitude;
      console.log('Latitude '+this.Latitude);
      console.log('Longitude '+this.Longitude);
      //this.data.UpdateLocation(this.Latitude,this.Longitude);
      }
      ,(errorCallback) =>
      {
        console.log(errorCallback);
      },{timeout:10000, enableHighAccuracy: true});
     } else {
    alert("Geolocation is not supported by this browser.");
  }
}*/
 
}
