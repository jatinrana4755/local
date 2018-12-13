import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-allads',
  templateUrl: './allads.component.html',
  styleUrls: ['./allads.component.css']
})
export class AlladsComponent implements OnInit {
  @ViewChild ('vendorList') vendors: ElementRef;
  @ViewChild ('callBtn') callBtn: ElementRef;
  @ViewChild ('gridView') gridView: ElementRef;
  @ViewChild ('listView') listView: ElementRef;
  offset = 100;
  category: any;
  minRange: any = 1000;
  maxRange: any = 6000;
  Bool = true;
  id: any;
  data: any;
  name: any;
  vendordata: any;
  initialData: any;
  vendor: any;
  selectedCategory: any;
  hide = false;
  term: any;
  vendorR: any;
  sortByDistanceCondition:boolean;
  findInRangeCondition:boolean;
  minDistanceRange:number=10;
public loading: boolean;

  constructor(private router:Router,  private route: ActivatedRoute, private homeService: HomeService) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    this.vendor= this.route.snapshot.params['vendor'];

    this.name = this.route.snapshot.params['name'];
    this.data = {
      'id': this.id
    };
    this.getCategories();
    if(this.id){
      this.getVendor();
    }
    if(!this.id){
      this.getAllAds();
    }
  }

  collapseIconRotate(btn) {
    const element = btn.srcElement.childNodes['1'];
    element.classList.toggle('collapse-ico-r');
  }

  getCategories() {
    this.homeService.getCategory()
      .subscribe(data => { this.category = data; });
  }

  getAllAds() {
    this.loading = true;
    this.homeService.getAllAds()
      .subscribe(data => {
        this.hide = true;
        this.initialData = data;
        this.vendordata = this.initialData;
        this.loading = false;

      });
  }

  onResize(event) {
    console.log( event.target.innerWidth );
    const element = document.getElementsByClassName('btn-filter');
    console.log(element.length);
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
  // Restaurants
  filters(data, event) {
    this.selectedCategory = data;
    const a = document.getElementsByClassName('category-li');
    for (let i = 0; i < a.length; i++) {
      a[i].classList.remove('category-li-clicked');
  }
    event.target.classList.add('category-li-clicked');
  }

  getSubCategories(id) {
    const parentCategory = {
      'parent_category_id': id
    };
    this.homeService.postSubCategory(JSON.stringify(parentCategory))
      .subscribe(data => {
      } );
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
    this.homeService.postVendors(JSON.stringify(this.data))
      .subscribe(data => {
         this.vendordata = data;
    });
  }

  search() {
    console.log(this.term, this.vendordata);
    const newData = this.initialData.filter(ad => {
      return ad.shop_name.toLowerCase().trim() === this.term.toLowerCase().trim() ||
            ad.parent_category.toLowerCase().trim() === this.term.toLowerCase().trim() ||
            ad.vendor_name.toLowerCase().trim() === this.term.toLowerCase().trim();
    });
    console.log(newData);
    this.vendordata = newData;
  }

  reset() {
    if (this.term === '') {
      this.vendordata = this.initialData ;
    }
  }
}
