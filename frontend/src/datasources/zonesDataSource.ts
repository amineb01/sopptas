import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Zone } from '../models/Zone';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ZonesService } from '../services/zones.service';

export class ZonesDataSource implements DataSource<Zone> {

    private zonesSubject = new BehaviorSubject<Zone[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();
    public count$ = this.countSubject.asObservable();

    constructor(private zonesService: ZonesService) {}

    connect(collectionViewer: CollectionViewer): Observable<Zone[]> {
        return this.zonesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.zonesSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();

    }

    loadZones(filter = '',sortActive = 'asc',
                sortDirection = 'asc', pageIndex = 0, pageSize = 5) {

        this.loadingSubject.next(true);

        this.zonesService.getZones(filter, sortActive, sortDirection,
            pageIndex, pageSize).pipe(
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(result => {this.countSubject.next(result.length); this.zonesSubject.next(result)});
    }    
}