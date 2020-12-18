import { Component, ComponentFactoryResolver, OnInit, ViewChild, ElementRef,  } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { PostsDataSource } from '../datasources/postsDataSource';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  dataSource: PostsDataSource;
  displayedColumns= ["userId", "id",  "title", "body"];

  constructor( private postsService: PostsService) {}

  ngOnInit() {
      this.dataSource = new PostsDataSource(this.postsService);
      this.dataSource.loadPosts( '', 'title', 'asc', 0, 5);
  }

  ngAfterViewInit() {

      // server-side search by creating an obsevable witch emit input content
      fromEvent(this.input.nativeElement,'keyup')
          .pipe(
              debounceTime(150),
              distinctUntilChanged(),
              tap(() => {
                  this.paginator.pageIndex = 0;
                  this.loadLessonsPage();
              })
          )
          .subscribe();

      // reset the paginator after sorting
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      // on sort or paginate events, load a new page
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }

  loadLessonsPage() {
      this.dataSource.loadPosts(
          this.input.nativeElement.value,
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex,
          this.paginator.pageSize);
  }
}