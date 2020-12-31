import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Reclamation } from '../models/Reclamation';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ReclamationsService } from '../services/reclamations.service';

export class ReclamationsDataSource implements DataSource<Reclamation> {

    private reclamationsSubject = new BehaviorSubject<Reclamation[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private reclamationService: ReclamationsService) {}

    connect(): Observable<Reclamation[]> {
        return this.reclamationsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.reclamationsSubject.complete();
        this.loadingSubject.complete();
    }

    loadReclamations(pageIndex = 1, pageSize = 10) {

        this.loadingSubject.next(true);

        this.reclamationService.getReclamations(pageIndex , pageSize ).pipe(
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(results => this.reclamationsSubject.next(results['results']['reclamations']));
    }    
}