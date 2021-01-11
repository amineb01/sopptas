import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ZonesService } from 'src/services/zones.service';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.sass']
})
export class UserFormDialogComponent implements OnInit, OnDestroy {

  UserForm: FormGroup;
  roles: any = [{ label: 'Administrateur', value: "admin" },
  { label: 'Citoyen', value: "citizen" },
  { label: 'Agent', value: "restricted" }]
  zones: any
  getSubscription: Subscription



  constructor(private formBuilder: FormBuilder, private ZonesService: ZonesService, private dialogRef: MatDialogRef<UserFormDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.getSubscription = this.ZonesService.getZonesForUser().subscribe(data => {
      this.zones = data
    })
    if (this.data) {

      this.UserForm = this.formBuilder.group({
        email: [this.data.user.email, [Validators.required, Validators.email]],
        password: ['', [Validators.minLength(6)]],
        name: [this.data.user.name, [Validators.required]],
        role: [this.data.user.role, [Validators.required]],
        zone: [this.data.user.zone._id, [Validators.required, Validators.minLength(6)]],

      })

    } else {
      this.UserForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        name: ['', [Validators.required]],
        role: ['', [Validators.required]],
        zone: ['', [Validators.required, Validators.minLength(6)]],

      })
    }

  }
  get f() { return this.UserForm.controls; }

  onValidClick(values) {
    this.dialogRef.close({ values: values, type: true })
  }
  onCancelClick(val, type): void {
    this.dialogRef.close({ name: val.name, type: type });
  }

  ngOnDestroy(): void {
    if (this.getSubscription) { this.getSubscription.unsubscribe() }
  }
}
