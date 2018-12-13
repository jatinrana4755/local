import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services/data.service';
@Pipe({
  name: 'distance'
})
export class DistancePipe implements PipeTransform {
  constructor(public data: DataService){
    this.Latitude=this.data.getLat();
    this.Longitude=this.data.getLon();
  }
Latitude:number;
Longitude:number;
dist:number;
distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
  transform(items: any[], range?: any, condition ? :any): any[] {
    if(condition){
      if(!items){
        return [];
      }
      if(!range){
        return items;
      }
      else{
        
        return items.filter(item => {
          var lat=parseFloat(item.latitude);
          var lon=parseFloat(item.longitude);
          console.log('locations lat '+lat+' lon '+lon);
          console.log('locations Lati '+this.Latitude+' Long '+this.Longitude);
          this.dist=this.distance(this.Latitude, this.Longitude, lat, lon);
          console.log('distance from pipe '+this.dist);
          return this.dist <= range;
        });
      }
    }
    else{
      return items;
    }

    
  }

}
