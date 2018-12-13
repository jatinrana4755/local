import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services/data.service';
@Pipe({
  name: 'sortByDistance'
})
export class SortByDistancePipe implements PipeTransform {
Latitude:number;
Longitude:number;
distA:number;
distB:number;
  constructor(public data: DataService){
    this.Latitude=this.data.getLat();
    this.Longitude=this.data.getLon();
  }

distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
  transform(items: any[], condition?:any): any[] {
    if(condition){
      if(items !== undefined){
        items.sort((a: any, b: any) => {
          var latA=parseFloat(a.latitude);
          var lonA=parseFloat(a.longitude);
          var latB=parseFloat(b.latitude);
          var lonB=parseFloat(b.longitude);
          this.distA=this.distance(this.Latitude, this.Longitude, latA, lonA);
          this.distB=this.distance(this.Latitude, this.Longitude, latB, lonB);
          console.log('dist A '+ this.distA +' and dist B '+ this.distB);
          if (this.distA < this.distB) {
            console.log('return -1 dist A '+ this.distA +' and dist B '+ this.distB);
              return -1;
          } else if (this.distA > this.distB) {
            console.log('return 1 dist A '+ this.distA +' and dist B '+ this.distB);
              return 1;
          } else {
            console.log('return 0 dist A '+ this.distA +' and dist B '+ this.distB);
              return 0;
          }
          });
      }
        
      return items;
    }
    else{
      return items;
    }
    
    
  }

}
