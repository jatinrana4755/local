import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { SharedService } from '../../../services/shared.service';
import { Router } from '@angular/router';
import { HomeService } from '../../../services/home.service';
declare var $: any;
@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit, AfterViewInit {
  starsCount: any = 4;
  constructor(public dataService: DataService,private shared:SharedService,private router:Router,private home:HomeService) { }
  trendingRes: any;
  featuredRes: any;
  firstTrending: any;
  secondTrending: any;

  transferdata(id,name,phone,website,location,address,hours,category,subcategory,desc)
  {
    this.shared.id = id;
    this.shared.shop = name;
    this.shared.phone = phone;
    this.shared.website = website;
    this.shared.location = location;
    this.shared.address = address;
    this.shared.hours = hours;
    this.shared.vendor = category;
    this.shared.category = subcategory;
    this.shared.desc = desc;
  }

  ngOnInit() {
    this.dataService.TrendingAdds()
    .subscribe(res => {
      this.trendingRes = res;
      $(function() {
        $('.trendingCarousel').slick({
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          speed: 700,
          rows: 2,
          autoplay: 'true',
          autoplaySpeed: 4000,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                dots: true,
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                speed: 700,
                rows: 2,
                autoplay: 'true',
                autoplaySpeed: 4000,
              }
            },
            {
              breakpoint: 600,
              settings: {
                dots: true,
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                speed: 700,
                prevArrow: false,
                nextArrow: false,
                rows: 2,
                autoplay: 'true',
                autoplaySpeed: 4000,
              }
            },
            {
              breakpoint: 480,
              settings: {
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                speed: 700,
                rows: 2,
                prevArrow: false,
                nextArrow: false,
                autoplay: 'true',
                autoplaySpeed: 4000,
              }
            }]
        });
      });
    },
    err => {
      console.error(err.json());
    });

    this.dataService.FeaturedAdds()
    .subscribe(res => {
      // console.log('qwertygfd',res);
      this.featuredRes = res;
      $(function() {
        $('.featuredCarousel').slick({
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          speed: 700,
          autoplay: 'true',
          autoplaySpeed: 4000,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                dots: true,
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                speed: 700,
                autoplay: 'true',
                autoplaySpeed: 4000,
              }
            },
            {
              breakpoint: 600,
              settings: {
                dots: true,
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                prevArrow: false,
                nextArrow: false,
                speed: 700,
                autoplay: 'true',
                autoplaySpeed: 4000,
              }
            },
            {
              breakpoint: 480,
              settings: {
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                prevArrow: false,
                nextArrow: false,
                speed: 700,
                autoplay: 'true',
                autoplaySpeed: 4000,
              }
            }]
        });
      });
    },
    err => {
      console.error(err.json());
    });
  }

  ngAfterViewInit() {

  }
  hyphenateUrlParams(str:string){
    return str.replace(' ', '-');
  }
 
  replace(str:string){
   return str.replace(/\s/g,'-');
 }
 getDetails(ven){
   if(ven){

    this.router.navigate(['/vendors',ven.city,this.hyphenateUrlParams(ven.subcategory),this.replace(ven.shop_name), ven.vendor_id]);
   }
 }


}
