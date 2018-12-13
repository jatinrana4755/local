import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'city'
})
export class CityPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return [];
    }
    if (!args) {
      return value;
    }
    return value.filter(filtereddata => {
      return filtereddata.city === args;
    });
  }

}
