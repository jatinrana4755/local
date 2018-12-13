
import { DataService } from '../app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'app';
  
  constructor(public data: DataService,private router:Router) {}
  ngOnInit() {
    this.findMe();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }
Latitude:any;
Longitude:any;
  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((successCallback) =>
        {
          //alert('inside success callback');
        //this.showPosition(position);
        console.log('inside succes callback');
        this.Latitude = successCallback.coords.latitude;
        this.Longitude = successCallback.coords.longitude;
        console.log('Latitude '+this.Latitude);
        console.log('Longitude '+this.Longitude);
        this.data.UpdateLocation(this.Latitude,this.Longitude);
        }
        ,(errorCallback) =>
        {
          console.log(errorCallback);
        },{timeout:10000, enableHighAccuracy: true});
       } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  
}
