import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { User } from '../models/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UsersService } from '../services/users.service';

export class UsersDataSource implements DataSource<User> {

    private usersSubject = new BehaviorSubject<User[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private usersService: UsersService) {}

    connect(collectionViewer: CollectionViewer): Observable<User[]> {
        return this.usersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.usersSubject.complete();
        this.loadingSubject.complete();
    }

    loadUsers(filter = '',sortActive = 'asc',
                sortDirection = 'asc', pageIndex = 0, pageSize = 5) {

        this.loadingSubject.next(true);

        this.usersService.getUsers(filter, sortActive, sortDirection,
            pageIndex, pageSize).pipe(
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(result => this.usersSubject.next(result['results']['users']));
    }    
}