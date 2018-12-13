import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {
  city: any;
  url: any;
  categories: any;
  bannerImg: any;
  selectedCategory: any;
  selectedLocation: any;
  allData: any;
  searchTerm: any;
  vendor: any;
  subcategory: any;
  categoryName: any;
  // categorySelected = [];
  filterActive = false;
  id: any;
  name:any;
  email:any;
  mobile:any;
  data:any;
  Success:any;
  process = false;
  searchData = {
    'category_id': '',
    'shop_location': '',
    'search': ''
  };
  @ViewChild('searchUL') searchUL: ElementRef;
  @ViewChild('categoryDrop') categoryDrop: ElementRef;
  @ViewChild('locationDrop') locationDrop: ElementRef;
  @ViewChild('btnModal') btnModal: ElementRef;
  constructor(private homeService: HomeService, public router: Router, private dataService: DataService) { }

  ngOnInit() {
    this.getCity();
    this.getCategory();
    this.getBanner();
    // this.getAllData();
    this.PopUp();
    this.closePopup();
    // this.locationDrop.nativeElement.disabled = true;
    // this.categoryDrop.nativeElement.disabled = true;
  }

  ngAfterViewInit() {

  }

  showSuggestions() {
    // if (this.searchTerm === '') {
    //   this.searchUL.nativeElement.style.display = 'none';
    // } else {
    //   this.searchUL.nativeElement.style.display = 'block';
    // }
  }
  
  SupportRequest(){
    this.data ={
      "name":this.name,
      "email":this.email,
      "number":this.mobile
    }
   
    this.homeService.support_request(JSON.stringify(this.data)).subscribe(res => {
      localStorage.setItem('popup', res);
      this.Success = 'Succesfully Subscribed!';
      if(this.Success == 'Succesfully Subscribed!'){
        setTimeout(function(){
          $("#myModal").modal('hide');
      }, 5000);
      }
    });
  }
  
  closePopup(){
    if(this.Success == 'Succesfully Subscribed!'){
      setTimeout(function(){
        $("#myModal").modal('hide'); 
    }, 5000);
    }
  }
  PopUp(){
 
    if(localStorage.getItem('popup')){
       // do nothing
    } else{
      setTimeout(() => {
        $(document).ready(function(){
          $("#myModal").modal('show');
      });
      }, 2000);
    
  }
  }
  getCity() {
    this.homeService.getCities()
      .subscribe(city => {
        this.city = city;
        // console.log(this.city);
      });
  }
  selectCat(cat) {
    this.categoryName = cat.category;
    this.categoryDrop.nativeElement.innerText = cat.category;
    this.searchData.category_id = cat.id;
  }
  selectLoc(city) {
    this.locationDrop.nativeElement.innerText = city.city_name;
    this.searchData.shop_location = city.id;
  }
  getCategory() {
    this.homeService.getCategory()
      .subscribe(data => {
        this.categories = data;
        // console.log(this.categories);
      });
  }

  getBanner() {
    this.homeService.getBannerImages()
      .subscribe(img => {
        this.bannerImg = img;
        $(function() {
          $('.homeCarousel').slick({
            dots: true,
            infinite: true,
            speed: 700,
            autoplay: 'true',
            prevArrow: false,
            nextArrow: false,
            autoplaySpeed: 4000,
          });
        });
      });
  }

  fetchResults() {
    this.process = true;
    this.searchData.search = this.searchTerm;
    const data = JSON.stringify(this.searchData);
    this.homeService.searchTerm(data)
      .subscribe(res => {
        this.process = false;
        this.dataService.saveSeacrh(res, this.categoryName);
        if(this.searchTerm){
          this.router.navigate(['/searchResults', this.searchTerm]);
        }
        this.router.navigate(['/searchResults']);
      });

    // console.log(this.vendor);
    // if (this.vendor) {
    //   this.homeService.setVendorDetails(this.vendor);
    //   this.router.navigate(['/vendors', this.vendor.city, this.vendor.category, this.vendor.vendor_id]);
    //   this.vendor = '';
    // }
    // if (this.subcategory) {
    //   this.router.navigate(['/', this.subcategory[0].parent_category, this.subcategory[0].category, this.id]);
    //   this.subcategory = '';
    // }
  }

  // getAllData() {
  //   this.homeService.getAllData()
  //     .subscribe( data => {
  //       this.allData = data;
  //     });
  // }

  // selectItem(item, id, type) {
  //   this.searchTerm = item;
  //   this.id = id;
  //   this.searchUL.nativeElement.style.display = 'none';
  //   console.log('search', item, id, type);
  //   if (type === 'category') {
  //     this.vendor = '';
  //     const data = {
  //       'id': id
  //     };
  //     this.homeService.postVendors(JSON.stringify(data))
  //       .subscribe(res => {
  //         this.subcategory = res;
  //         res.map(newD => {
  //           this.categorySelected.push(newD.city);
  //         });
  //         const unique = this.categorySelected.filter( this.onlyUnique );
  //         this.city = unique;
  //         this.locationDrop.nativeElement.disabled = false;
  //         this.categoryDrop.nativeElement.innerText = res[0].parent_category;
  //       }, err => {
  //         this.btnModal.nativeElement.click();
  //       });
  //   } else {
  //     this.subcategory = '';
  //     const data = {
  //       'vendor_id': id
  //     };
  //     this.homeService.getVendorData(JSON.stringify(data))
  //       .subscribe(res => {
  //         this.vendor = res[0];
  //         console.log(res[0].parent_category, res[0].city);
  //         console.log(this.categoryDrop.nativeElement.innerText);
  //         this.categoryDrop.nativeElement.innerText = res[0].parent_category;
  //         this.locationDrop.nativeElement.innerText = res[0].city;
  //       });
  //   }
  // }
  // onlyUnique(value, index, self) {
  //     return self.indexOf(value) === index;
  // }

  //dummy data for displaying autocomplete searchbox.
  states=[
    'Uttar Pradesh',
    'Assam',
    'Arunanchal Pradesh',
    'Karnataka',
    'Kerla','Uttar Pradesh',
    'Assam',
    'Arunanchal Pradesh',
    'Karnataka',
    'Kerla','Uttar Pradesh',
    'Assam',
    'Arunanchal Pradesh',
    'Karnataka',
    'Kerla','Uttar Pradesh',
    'Assam',
    'Arunanchal Pradesh',
    'Karnataka',
    'Kerla','Uttar Pradesh',
    'Assam',
    'Arunanchal Pradesh',
    'Karnataka',
    'Kerla',
    'Tamilnadu'
  ];
  showDropDown=false;
  toggleDropDown(){
    this.showDropDown=!this.showDropDown;
  }

}
