import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any, searchTerm?: any): any {
    if (!items) {
      return [];
    }
    if (!searchTerm) {
      return items;
    }
    searchTerm = searchTerm.toLowerCase();
    return items.filter( newData => {
      return newData.shop_name.toLowerCase().includes(searchTerm) ||
      newData.name.toLowerCase().includes(searchTerm);
    });
  }

}
