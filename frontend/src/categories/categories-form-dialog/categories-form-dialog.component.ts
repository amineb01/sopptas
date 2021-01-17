import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-categories-form-dialog',
  templateUrl: './categories-form-dialog.component.html',
  styleUrls: ['./categories-form-dialog.component.sass']
})
export class CategoriesFormDialogComponent implements OnInit {
  categorieForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CategoriesFormDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    if (this.data) {
      this.categorieForm = this.formBuilder.group({
        name: [this.data.name, [Validators.required]]
      });
    }else{
      this.categorieForm = this.formBuilder.group({
        name: ['', [Validators.required]]
      });
    }
    
  }
  get f() { return this.categorieForm.controls; }

  onValidClick(values){
      this.onCancelClick(values,true)
  }
  onCancelClick(val,type): void {
    this.dialogRef.close({name:val.name, type: type});
  }

}
