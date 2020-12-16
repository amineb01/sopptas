import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Post } from '../models/post';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';

export class PostsDataSource implements DataSource<Post> {

    private postsSubject = new BehaviorSubject<Post[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private coursesService: PostsService) {}

    connect(collectionViewer: CollectionViewer): Observable<Post[]> {
        return this.postsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.postsSubject.complete();
        this.loadingSubject.complete();
    }

    loadPosts(filter = '',sortActive = 'asc',
                sortDirection = 'asc', pageIndex = 0, pageSize = 5) {

        this.loadingSubject.next(true);

        this.coursesService.getPosts(filter, sortActive, sortDirection,
            pageIndex, pageSize).pipe(
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(posts => this.postsSubject.next(posts));
    }    
}