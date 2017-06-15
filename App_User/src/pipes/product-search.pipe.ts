import { Pipe, PipeTransform } from '@angular/core';

import { Product } from '../models/product.model';

@Pipe({
    name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {
    transform(product: Product[], searchString: string): any {
        let matches: Product[] = [];

        if (!searchString) {
            return product;
        }

        product.forEach(function (product) {
            if (product.productName.match(new RegExp(searchString, 'i'))) {
                matches.push(product);
            }
        });

        return matches;
    }
}