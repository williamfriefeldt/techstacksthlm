import { Pipe } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe extends Pipe {
  public transform(array: any[] | null, searchTerm: string[]): typeof array {
    if (array) {
      return array.filter((item) => {
        const values: string[] = [].concat.apply([], Object.values(item));
        return searchTerm.every((term: string) =>
          values.find((value: string) =>
            value.toLowerCase().includes(term.toLowerCase())
          )
        );
      });
    }

    return [];
  }
}
