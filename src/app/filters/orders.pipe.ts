import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orders'
})
export class OrdersPipe implements PipeTransform {

  transform(array: any, orderProperty: string): any {
    if(!array )
    {
      return [];
    }
    if(!orderProperty)
    {
      return array;
    }
    array.sort((a: any, b: any) => {
      if (a[orderProperty].toLowerCase() < b[orderProperty].toLowerCase()) {
        return -1;
      } else if (a[orderProperty].toLowerCase() > b[orderProperty].toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
  }


