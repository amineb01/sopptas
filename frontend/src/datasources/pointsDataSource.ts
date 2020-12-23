import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Point } from '../models/Point';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PointsService } from '../services/points.service';

export class PointsDataSource implements DataSource<Point> {

    private zonesSubject = new BehaviorSubject<Point[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private zonesService: PointsService) {}

    connect(collectionViewer: CollectionViewer): Observable<Point[]> {
        return this.zonesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.zonesSubject.complete();
        this.loadingSubject.complete();
    }

    loadPoints(filter = '',sortActive = 'asc',
                sortDirection = 'asc', pageIndex = 0, pageSize = 5) {

        this.loadingSubject.next(true);

        this.zonesService.getPoints(filter, sortActive, sortDirection,
            pageIndex, pageSize).pipe(
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(result => this.zonesSubject.next(result['points']));
    }    
}