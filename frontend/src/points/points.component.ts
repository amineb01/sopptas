import { Component, OnInit, ViewChild, ElementRef, OnDestroy, } from '@angular/core';
import { PointsService } from '../services/points.service';
import { ZonesService } from '../services/zones.service';
import { PointsDataSource } from '../datasources/pointsDataSource';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';
import { Zone } from 'src/models/Zone';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/shared/shared-component/delete-dialog/delete-dialog.component';

@Component({
    selector: 'app-points',
    templateUrl: './points.component.html',
    styleUrls: ['./points.component.sass']
})
export class PointsComponent implements OnInit, OnDestroy {
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    @ViewChild('input') input: ElementRef;
    DeleteSubscription: Subscription


    dataSource: PointsDataSource;
    displayedColumns = ["_id", "name", "latitude", "longitude", "actions"];
    private subscription: Subscription;
    public zonesList: Zone[] = [];
    selectedZoneId
    constructor(private PointsService: PointsService, private zonessService: ZonesService, private matDialog: MatDialog) { }

    ngOnInit() {
        this.dataSource = new PointsDataSource(this.PointsService);
        this.subscription = this.zonessService.getZones().subscribe(res => {
            this.zonesList = res
            if (this.zonesList.length > 0) {
                this.selectedZoneId = this.zonesList[0]._id
                this.dataSource.loadPoints(this.selectedZoneId, '', 'title', 'asc', 0, 5);
            }
        })
    }
    selectChanged(id) {
        this.selectedZoneId = id
        this.loadLessonsPage();

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

    loadLessonsPage() {
        this.dataSource.loadPoints(
            this.selectedZoneId,
            this.input.nativeElement.value,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    delete(id) {

        const dialogRef = this.matDialog.open(DeleteDialogComponent, {
            data: { title: "êtes sûr de vouloir supprimer cet enregistrement ?" },
            height: '136px',
            width: '600px'
        });

        dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result == true) {
                this.DeleteSubscription = this.PointsService.deletePoint(id).subscribe(res => {
                    this.loadLessonsPage()
                })

            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
        if (this.DeleteSubscription) { this.DeleteSubscription.unsubscribe() }

    }

}