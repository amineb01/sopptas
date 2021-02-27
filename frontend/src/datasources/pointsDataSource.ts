import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Point } from '../models/Point';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PointsService } from '../services/points.service';

export class PointsDataSource implements DataSource<Point> {

    private pointsSubject = new BehaviorSubject<Point[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.countSubject.asObservable();

    constructor(private pointsService: PointsService) {}

    connect(collectionViewer: CollectionViewer): Observable<Point[]> {
        return this.pointsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.pointsSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();

    }

    loadPoints(zoneId, filter = '',sortActive = 'asc',
                sortDirection = 'asc', pageIndex = 1, pageSize = 10) {

        this.loadingSubject.next(true);
        if (pageIndex == 0) {
            pageIndex = 1
        }else{
            pageIndex++
        }
        this.pointsService.getPoints(zoneId, filter, sortActive, sortDirection,
            pageIndex, pageSize).pipe(
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(result => { this.countSubject.next(result.count  ); this.pointsSubject.next(result.points)});
    }    
}