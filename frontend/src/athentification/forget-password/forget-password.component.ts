import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.sass']
})
export class ForgetPasswordComponent implements OnInit {
  private subscription: Subscription;
  forgetPasswordForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private authentificationService:AuthService, public router: Router) { }

  ngOnInit(): void {
    if(this.authentificationService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  get f() { return this.forgetPasswordForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.forgetPasswordForm.invalid) {
      return;
    }
    this.subscription = this.authentificationService.login(this.forgetPasswordForm.value.email, this.forgetPasswordForm.value.password)
    .subscribe(res=>{
      
      
    })
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.forgetPasswordForm.value, null, 4));
  }

  onReset(e) {
    this.submitted = false;
    this.forgetPasswordForm.reset();
  }

}
