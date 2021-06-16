import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reclamation } from 'src/models/Reclamation';
import { ReclamationsService } from 'src/services/reclamations.service';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-reclamations-details',
  templateUrl: './reclamations-details.component.html',
  styleUrls: ['./reclamations-details.component.sass']
})
export class ReclamationsDetailsComponent implements OnInit {
  private formSubscription: Subscription;
  private subscription: Subscription;
  currentUser

  public reclamation_id: string;
  public reclamation: any
  public reponseForm: FormGroup;
  public submitted: boolean = false;
  public assetsUrl = environment.assetsUrl;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private reclamationService: ReclamationsService,private authenticationService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authenticationService.currentUserValue();
    this.reponseForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });

    this.reclamation_id = this.route.snapshot.paramMap.get('id');
    this.subscription = this.reclamationService.getReclamationById(this.reclamation_id).subscribe(res=>{
      this.reclamation = res
      console.log(this.reclamation)
    })

  }

  onSubmit() {
    this.submitted = true;
    if (this.reponseForm.invalid) {
      return;
    }
    this.formSubscription = this.reclamationService.addResponse(this.reclamation_id ,this.reponseForm.value.message)
    .subscribe(res=>{
      this.reclamation.comments.push({_id: res.result.data._id,text: res.result.data.text,user:{name:this.currentUser['name']}})
      this.reponseForm.reset()
    })
  }
  deleteComment(id_comment){
    this.reclamationService.deleteComment(this.reclamation_id ,id_comment)
    .subscribe(res=>{
      // this.reclamation.comments.push({text: this.reponseForm.value.message})
      // this.reponseForm.reset()
      this.reclamation.comments = this.reclamation.comments.filter(x => x._id !== id_comment);
    })
  }


  ngOnDestroy(): void {
    if(this.formSubscription)this.formSubscription.unsubscribe();
    if(this.subscription)this.subscription.unsubscribe();
  }
}
