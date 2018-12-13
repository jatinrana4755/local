import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortCityName'
})
export class SortCityNamePipe implements PipeTransform {

  transform(items: any[], args?: any): any[] {
    if(!items)
    {
      return [];
    }
    else{
      items.sort((a: any, b: any) => {
    
        if (a.city_name < b.city_name) {
            return -1;
        } else if (a.city_name > b.city_name) {
            return 1;
        } else {
            return 0;
        }
        });
        return items;
      
    }
  }

}
