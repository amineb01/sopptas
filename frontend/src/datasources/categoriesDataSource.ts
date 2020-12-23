import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Category } from '../models/Category';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CategoriesService } from '../services/categories.service';

export class CategoriesDataSource implements DataSource<Category> {

    private categoriesSubject = new BehaviorSubject<Category[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private categoriesService: CategoriesService) {}

    connect(collectionViewer: CollectionViewer): Observable<Category[]> {
        return this.categoriesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.categoriesSubject.complete();
        this.loadingSubject.complete();
    }

    loadCategories(filter = '',sortActive = 'asc',
                sortDirection = 'asc', pageIndex = 0, pageSize = 5) {

        this.loadingSubject.next(true);

        this.categoriesService.getCategories(filter, sortActive, sortDirection,
            pageIndex, pageSize).pipe(
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(result => this.categoriesSubject.next(result['result']['categories']));
    }    
}