import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-localcallsservices',
  templateUrl: './localcallsservices.component.html',
  styleUrls: ['./localcallsservices.component.css']
})
export class LocalcallsservicesComponent implements OnInit {

  cat: any;
  response = false;
  categoriesResponse: any;
  catImage: any;

  constructor(private homeService: HomeService, private router: Router ) { }

  ngOnInit() {
    this.getCategories();
  }
  getCategories() {
    this.homeService.getCategory()
      .subscribe(data => {
        this.categoriesResponse = data;
        $(function() {
          $('.categoryCarousel').slick({
            dots: false,
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true,
            speed: 700,
            rows: 2,
            autoplay: 'true',
            autoplaySpeed: 4000,
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  dots: false,
                  slidesToShow: 4,
                  slidesToScroll: 4,
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
                  dots: false,
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  prevArrow: false,
                  nextArrow: false,
                  infinite: true,
                  speed: 700,
                  rows: 2,
                  autoplay: 'true',
                  autoplaySpeed: 4000,
                }
              },
              {
                breakpoint: 480,
                settings: {
                  dots: false,
                  slidesToShow: 2,
                  slidesToScroll: 2,
                  infinite: true,
                  prevArrow: false,
                  nextArrow: false,
                  speed: 700,
                  rows: 2,
                  autoplay: 'true',
                  autoplaySpeed: 4000,
                }
              }]
          });
        });
      }, err => {
        this.response = false;
      });
  }
  openSubcategory(cat) {
    if (cat) {
      this.router.navigate(['/subcategories', cat.id]);
    }
  }
  redirectSubCategory(cat) {

  }



}
