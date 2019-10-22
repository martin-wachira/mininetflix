import { Pipe, PipeTransform } from '@angular/core';
import { IMovie } from './movie';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: IMovie[], searchText: string): IMovie[] {
    if(!items || !searchText){
      return items;
    }

    return items.filter(item => 
      item.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
  }

}
