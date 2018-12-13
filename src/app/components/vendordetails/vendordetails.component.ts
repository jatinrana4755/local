import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SharedService } from './../../services/shared.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from './../../services/data.service';
import { HomeService } from './../../services/home.service';
import { AuthorizationService } from './../../services/authorization.service';

// import { Ng2CarouselamosModule } from 'ng2-carouselamos';

declare var $: any;
@Component({
  selector: 'app-vendordetails',
  templateUrl: './vendordetails.component.html',
  styleUrls: ['./vendordetails.component.css']
})
export class VendordetailsComponent implements OnInit, AfterViewInit {
  
  vendor:any;
  vendor_id:any;
  vendordata:any;
  items: Array<any> = [];
  name: any;
  subcatid: any;
  id: any;
  email: any;
  phone: any;
  hours: any;
  shopname: any;
  location: any;
  longitude:any;
  latitude:any;
  website: any;
  desc: any;
  vendorname: any;
  category: any;
  address: any;
  imagedata: any;
  starsCount: any;
  relatedads: any;
  adsparam: any;
  stars = 5;
  review: any;
  errorReview: any;
  resReview: any;
  reviewAll: any;
  process = false;
  rating: any;
  messageLoginError = '';
  counterClick = 0;
  imgdata = {
    'vendor_id': ''
  };
  reviewPost = {
    'id': ''
  };userFinal

  @ViewChild('closeReviewModal') closeReviewModal: ElementRef;
  @ViewChild('confirmBtn') confirmBtn: ElementRef;
  @ViewChild('reviewModalButton') reviewModalButton: ElementRef;
  @ViewChild('viewComments') viewComments: any;
  constructor(private router:ActivatedRoute,
    private route:Router,
    private dataservice: DataService,
    private homeService: HomeService,
    private shared: SharedService,
    private authService: AuthorizationService ) {

      

    this.name = this.shared.name;
    this.id = this.shared.id;
    this.email = this.shared.email;
    this.phone = this.shared.phone;
    this.shopname = this.shared.shop;
    this.location = this.shared.address;
    this.website = this.shared.website;
    this.vendorname = this.shared.vendor;
    this.hours = this.shared.hours;
    this.desc = this.shared.desc;
    this.category = this.shared.category;
    this.address = this.shared.location;
    this.subcatid = this.shared.subcatid;
    
    
  }

 

  currentLat: any;
  currentLong: any;
  increaseStats:any;


  ngOnInit() {
    this.vendor = this.router.snapshot.paramMap.get('id');
    this.vendor_id = {
      "vendor_id":this.vendor
    } 
    this.getVendorDetails();
    
    
    this.homeService.increaseStats().subscribe(
      data=> {
    this.increaseStats=data;
      }
    )
  }

  ngAfterViewInit() {


  }

  getReviews() {
    // console.log('qwertdfgh',this.reviewPost);
    this.homeService.fetchRating(JSON.stringify(this.reviewPost))
      .subscribe(res => {
        console.log('revier', res);
        this.reviewAll = res;
        if (res.length > 4) {
          this.rating = res.splice(0, 4);
        } else {
          this.rating = this.reviewAll;
        }
      });
  }

  getVendorDetails(){
    this.homeService.getVendorData(JSON.stringify(this.vendor_id)).subscribe(res => {
      // console.log(res);
    this.vendordata = res;
    this.vendordata = this.vendordata[0];
    // console.log('qwertyu', this.vendordata[0]);
    this.imgdata.vendor_id = this.vendordata.id;
    this.reviewPost.id = this.vendordata.id;
    this.longitude = this.vendordata.longitude;
    this.latitude =this.vendordata.latitude;
    
    this.getRelatedAds(this.latitude, this.longitude, this.vendordata.subcategory);
    this.getReviews();
    this.getImage();
    });
  }

  showAllComment() {
    this.counterClick++;
    const rem = this.counterClick % 2;
    if (this.rating.length <= this.reviewAll.length) {
      this.rating = [...this.rating, ...this.reviewAll];
    }
    this.viewComments.nativeElement.style.display = 'none';
  }

  getRelatedAds(latitude, longitude,subcategory) {
    const adsparam = {
      'lat': localStorage.getItem('Lat'), //will work on https only
      'lon': localStorage.getItem('Lon'),
      'subcategory':subcategory
    };
    const data = JSON.stringify(adsparam);
    // console.log(data);
    this.dataservice.RelatedAds(data)
      .subscribe(res => {
        this.relatedads = JSON.parse(res._body);
        // console.log('sdf',res);
      });
  }

  getImage() {
    return this.dataservice.VendorImage(JSON.stringify(this.imgdata)).subscribe(res => {
      this.imagedata = res;
      $(document).ready(function () {
        $('.slider-for').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: '.your-class'
        });
        $('.your-class').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: '.slider-for',
          dots: true,
          centerMode: true,
          focusOnSelect: true
        });
      });
    });
  }

  checkLogin() {
    if (this.authService.isLogged()) {
      this.reviewModalButton.nativeElement.click();
    } else {
      this.messageLoginError = 'Login to post a review';
      this.confirmBtn.nativeElement.click();
    }
  }

  postVendorReview() {
    this.process = true;
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('vendor', this.vendordata.id);
    const data = {
      user_id : parseInt(user.id, 0),
      vendor_id : parseInt(this.vendordata.id, 0),
      rating : this.stars,
      review : this.review
    };
    const review = JSON.stringify(data);
    this.homeService.postVendorReview(review).subscribe(res => {
      this.process = false;
      this.resReview = res.message;
      this.closeReviewModal.nativeElement.click();
      this.confirmBtn.nativeElement.click();
      this.getReviews();
    }, err => {
      this.errorReview = err.error.message;
      this.confirmBtn.nativeElement.click();
      this.closeReviewModal.nativeElement.click();
      this.process = false;
    }
    );
  }

  hyphenateUrlParams(str:string){
    return str.replace(' ', '-');
  }
  replace(str:string){
   return str.replace(/\s/g,'-');
 }

 
  getDetails(ven) {
    if (ven) {
      this.homeService.setVendorDetails(ven)
      this.route.navigate(['/vendors',ven.city,this.hyphenateUrlParams(ven.subcategory),this.replace(ven.shop_name), ven.vendor_id]);
      window.location.reload();
    }

  }
  Latitude:number;
  Longitude:number;
  label?: string;
  zoom:number=14;
  showMap() {
  // show details
  //alert('show map clicked');
  // console.log('latitude of vendor ', this.latitude + ' longitude '+this.longitude);
  this.Latitude=parseFloat(this.latitude);
  this.Longitude=parseFloat(this.longitude);
  this.label=this.vendordata.shop_name;
    // console.log(this.label + ' Labelname');
  }
}
