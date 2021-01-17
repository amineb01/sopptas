import { Component, OnInit, ViewChild, ElementRef, OnDestroy, } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { CategoriesDataSource } from '../datasources/categoriesDataSource';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge, fromEvent, Subscription } from 'rxjs';
import { CategoriesFormDialogComponent } from './categories-form-dialog/categories-form-dialog.component';
import { DeleteDialogComponent } from 'src/shared/shared-component/delete-dialog/delete-dialog.component';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit, OnDestroy {
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild('input') input: ElementRef;

	dataSource: CategoriesDataSource;
	displayedColumns = ["_id", "nom", "Actions"];
	addSubscription: Subscription
	editSubscription: Subscription
	DeleteSubscription: Subscription


	constructor(private CategoriesService: CategoriesService, private matDialog: MatDialog) { }

	ngOnInit() {
		this.dataSource = new CategoriesDataSource(this.CategoriesService);
		this.dataSource.loadCategories('', 'title', 'asc', 0, 5);
	}

	ngAfterViewInit() {

		// server-side search by creating an obsevable witch emit input content
		fromEvent(this.input.nativeElement, 'keyup')
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
	addCat() {
		const dialogRef = this.matDialog.open(CategoriesFormDialogComponent, { height: "200px", width: "550px" });

		dialogRef.afterClosed().subscribe(result => {
			if (result.type) {
				this.addSubscription = this.CategoriesService.addCategory(result.name).subscribe(res => {
					//todo
					this.loadLessonsPage()
				})

			}
		});
	}

	edit(cat) {
		const dialogRef = this.matDialog.open(CategoriesFormDialogComponent, { 
			data: { name: cat.name},
			height: "200px", width: "550px" });

		dialogRef.afterClosed().subscribe(result => {
			if (result.type) {
				cat.name = result.name
				this.editSubscription = this.CategoriesService.editCategory(cat).subscribe(res => {
					//todo
					this.loadLessonsPage()
				})

			}
		});
	}
	delete(id){
		const dialogRef = this.matDialog.open(DeleteDialogComponent, { 
      data: { title: "êtes sûr de vouloir supprimer cet enregistrement ?" },
			height: '136px',
			width: '600px'
		});

		dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result == true) {
        this.DeleteSubscription = this.CategoriesService.deleteCategory(id).subscribe(data => {
					this.loadLessonsPage()

        })

      }
    });
	}


	loadLessonsPage() {
		this.dataSource.loadCategories(
			this.input.nativeElement.value,
			this.sort.active,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);
	}

	ngOnDestroy(): void {
		if(this.addSubscription){this.addSubscription.unsubscribe()}
		if(this.editSubscription){this.editSubscription.unsubscribe()}
		if(this.DeleteSubscription){this.DeleteSubscription.unsubscribe()}


	}

}