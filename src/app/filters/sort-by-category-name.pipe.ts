import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByCategoryName'
})
export class SortByCategoryNamePipe implements PipeTransform {

  transform(items: any[], args?: any): any[] {
    if(!items)
    {
      return [];
    }
    else{
      items.sort((a: any, b: any) => {
    
        if (a.category.toUpperCase() < b.category.toUpperCase()) {
            return -1;
        } else if (a.category.toUpperCase() > b.category.toUpperCase()) {
            return 1;
        } else {
            return 0;
        }
        });
        return items;
      
    }
  }

}
