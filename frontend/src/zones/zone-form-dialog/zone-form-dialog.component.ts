import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-zone-form-dialog',
  templateUrl: './zone-form-dialog.component.html',
  styleUrls: ['./zone-form-dialog.component.sass']
})
export class ZoneFormDialogComponent implements OnInit {

  ZoneForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<ZoneFormDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    if (this.data) {
      this.ZoneForm = this.formBuilder.group({
        name: [this.data.name, [Validators.required]]
      });
    }else{
      this.ZoneForm = this.formBuilder.group({
        name: ['', [Validators.required]]
      });
    }
    
  }
  get f() { return this.ZoneForm.controls; }

  onValidClick(values){
      this.onCancelClick(values,true)
  }
  onCancelClick(val,type): void {
    this.dialogRef.close({name:val.name, type: type});
  }


}
