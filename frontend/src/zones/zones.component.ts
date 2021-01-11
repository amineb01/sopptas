import { Component, OnInit, ViewChild, ElementRef, } from '@angular/core';
import { ZonesService } from '../services/zones.service';
import { ZonesDataSource } from '../datasources/zonesDataSource';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge, fromEvent, Subscription } from 'rxjs';
import { ZoneFormDialogComponent } from './zone-form-dialog/zone-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/shared/shared-component/delete-dialog/delete-dialog.component';

@Component({
	selector: 'app-zones',
	templateUrl: './zones.component.html',
	styleUrls: ['./zones.component.sass']
})
export class ZonesComponent implements OnInit {
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild('input') input: ElementRef;

	dataSource: ZonesDataSource;
	displayedColumns = ["_id", "name", "Actions"];
	addSubscription: Subscription
	editSubscription: Subscription
	DeleteSubscription: Subscription

	constructor(private ZonesService: ZonesService, private matDialog: MatDialog) { }

	ngOnInit() {
		this.dataSource = new ZonesDataSource(this.ZonesService);
		this.dataSource.loadZones('', 'title', 'asc', 0, 5);
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
	addZone() {
		const dialogRef = this.matDialog.open(ZoneFormDialogComponent, { height: "200px", width: "550px" });

		dialogRef.afterClosed().subscribe(result => {
			if (result.type) {
				this.addSubscription = this.ZonesService.addZone(result.name).subscribe(res => {
					//todo
					this.loadLessonsPage()
				})

			}
		});
	}
	edit(zone) {
		const dialogRef = this.matDialog.open(ZoneFormDialogComponent, {
			data: { name: zone.name },
			height: "200px", width: "550px"
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result.type) {
				zone.name = result.name
				this.editSubscription = this.ZonesService.editZone(zone).subscribe(res => {
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
				this.DeleteSubscription = this.ZonesService.deleteZone(id).subscribe(data => {
					this.loadLessonsPage()

				})

			}
		});
	}

	loadLessonsPage() {
		this.dataSource.loadZones(
			this.input.nativeElement.value,
			this.sort.active,
			this.sort.direction,
			this.paginator.pageIndex,
			this.paginator.pageSize);
	}
}