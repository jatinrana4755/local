import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'homeSearch'
})
export class HomeSearchPipe implements PipeTransform {

  transform(items: any, searchTerm?: any): any {
    if (!items) {
      return [];
    }
    if (!searchTerm) {
      return items;
    }
    searchTerm = searchTerm.toLowerCase();
    return items.filter( newData => {
      return newData.table_name.toLowerCase().includes(searchTerm);
    });
  }

}
