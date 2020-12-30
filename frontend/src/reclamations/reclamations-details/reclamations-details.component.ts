import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reclamation } from 'src/models/Reclamation';
import { ReclamationsService } from 'src/services/reclamations.service';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reclamations-details',
  templateUrl: './reclamations-details.component.html',
  styleUrls: ['./reclamations-details.component.sass']
})
export class ReclamationsDetailsComponent implements OnInit {
  private formSubscription: Subscription;
  private subscription: Subscription;

  public reclamation_id: string;
  public reclamation: Reclamation=null;
  public reponseForm: FormGroup;
  public submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private reclamationService: ReclamationsService) { }

  ngOnInit(): void {
    
    this.reponseForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    this.reclamation_id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.reclamationService.getReclamationById(this.reclamation_id).subscribe(res=>{
      this.reclamation = res
      this.reclamation['imagePath'] = `${environment.assetsUrl}${this.reclamation['image'].replace('uploads/','')}`
    })

  }

  onSubmit() {
    this.submitted = true;
    if (this.reponseForm.invalid) {
      return;
    }
    this.formSubscription = this.reclamationService.addResponse(this.reponseForm.value.message)
    .subscribe(res=>{
      
    })
  }


  ngOnDestroy(): void {
    if(this.formSubscription)this.formSubscription.unsubscribe();
    if(this.subscription)this.subscription.unsubscribe();

  }
}
