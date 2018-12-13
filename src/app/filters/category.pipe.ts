import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return [];
    }
    if (!args) {
      return value;
    }
    return value.filter(filtereddata => {
      return filtereddata.parent_category === args;
    });
  }
}
