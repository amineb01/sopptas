import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-athentification',
  templateUrl: './athentification.component.html',
  styleUrls: ['./athentification.component.scss']
})
export class AthentificationComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  signInForm: FormGroup;
  submitted: boolean = false;
  constructor(private formBuilder: FormBuilder, private authentificationService:AuthService) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() { return this.signInForm.controls; }

  onSubmit() {
    debugger
    this.submitted = true;
    if (this.signInForm.invalid) {
      return;
    }
    this.subscription = this.authentificationService.login(this.signInForm.value.email, this.signInForm.value.password)
    .subscribe(res=>console.log(res))
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInForm.value, null, 4));
  }

  onReset(e) {
    this.submitted = false;
    this.signInForm.reset();
  }

  ngOnDestroy(): void {
    if(this.subscription)this.subscription.unsubscribe();
  }
}
