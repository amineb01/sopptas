import { Component, ComponentFactoryResolver, OnInit, ViewChild, ElementRef,  } from '@angular/core';
import { UsersService } from '../services/users.service';
import { UsersDataSource } from '../datasources/usersDataSource';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  dataSource: UsersDataSource;
  displayedColumns= ["_id",  "name", "email", "role"];

  constructor( private usersService: UsersService) {}

  ngOnInit() {
      this.dataSource = new UsersDataSource(this.usersService);
      this.dataSource.loadUsers( '', 'title', 'asc', 0, 5);
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
      this.dataSource.loadUsers(
          this.input.nativeElement.value,
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex,
          this.paginator.pageSize);
  }
}