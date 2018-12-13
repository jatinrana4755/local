import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  category: any;
  defaultImage = 'https://www.placecage.com/1000/1000';
  image = 'https://cpanel.localcalls.in/public/icon/{{cat.background}}';
  offset = 100;
  id: any;
  public loading:boolean;

  constructor(private homeservice:HomeService) { }

  ngOnInit() {
     this.getCategories();  
  }
 
   getCategories(){
     this.loading=true;
     this.homeservice.getCategory().subscribe(data => {
        this.category = data;
        this.loading=false;
        });
   }
  
}

