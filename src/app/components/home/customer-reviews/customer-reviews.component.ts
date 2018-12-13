import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-customer-reviews',
  templateUrl: './customer-reviews.component.html',
  styleUrls: ['./customer-reviews.component.css']
})
export class CustomerReviewsComponent implements OnInit {
 stats:any;
  constructor(private home:HomeService) { }

  ngOnInit() {

    this.home.getStats().subscribe(res => {
     this.stats =res;
    });
  }

}
