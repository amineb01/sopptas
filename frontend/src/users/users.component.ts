import { Component, ComponentFactoryResolver, OnInit, ViewChild, ElementRef,  } from '@angular/core';
import { UsersService } from '../services/users.service';
import { UsersDataSource } from '../datasources/usersDataSource';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge, fromEvent, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';
import { DeleteDialogComponent } from 'src/shared/shared-component/delete-dialog/delete-dialog.component';
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
  displayedColumns= [ "name", "email", "role", "actions"];
  addSubscription: Subscription
  DeleteSubscription: Subscription
  editSubscription: Subscription
  constructor( private usersService: UsersService, private matDialog: MatDialog) {}

  ngOnInit() {
      this.dataSource = new UsersDataSource(this.usersService);
      this.dataSource.loadUsers( '', 'title', 'asc', 1, 5);
  }

  ngAfterViewInit() {

      // server-side search by creating an obsevable witch emit input content
      
      fromEvent(this.input.nativeElement,'keyup')
          .pipe(
              debounceTime(150),
              distinctUntilChanged(),
              tap(() => {
                  this.paginator.pageIndex = 1;
                  this.loadLessonsPage();
              })
          )
          .subscribe();

      // reset the paginator after sorting
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 1);

      // on sort or paginate events, load a new page
      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadLessonsPage())
      )
      .subscribe();
  }

  addUser(){
    const dialogRef = this.matDialog.open(UserFormDialogComponent, { height: "400px", width: "550px" });

		dialogRef.afterClosed().subscribe(result => {
			if (result.values) {
				this.addSubscription = this.usersService.addUser(result.values).subscribe(res => {
                    //todo
					this.loadLessonsPage()
				})

			}
		});
  }

  delete(id) {
    const dialogRef = this.matDialog.open(DeleteDialogComponent, {
        data: { title: "êtes sûr de vouloir supprimer cet enregistrement ?" },
        height: '136px',
        width: '600px'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result == true) {
            this.DeleteSubscription = this.usersService.deleteUser(id).subscribe(data => {
                this.loadLessonsPage()

            })

        }
    });
}
edit(user) {
    const dialogRef = this.matDialog.open(UserFormDialogComponent, {
        data: { user: user },
        height: "400px", width: "550px"
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result.type) {
            // zone.name = result.name
            this.editSubscription = this.usersService.editUser(result.values, user._id).subscribe(res => {
                //todo
                this.loadLessonsPage()
            })

            

        }
    });
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