// signup.component.ts
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services//backend.service';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});
  user: User = {
    Name: '',
    PhoneNumber: 0,
    Email: '',
    Password: '',
    UserType: 'user',
  };
  signupSuccess = false;
  emailExists = false;
  signupError = '';

  constructor(private backendService: BackendService, 
    private formBuilder: FormBuilder, 
    private router: Router) {}
  
    ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/)]],
      PhoneNumber: ['', [Validators.required, Validators.pattern("[1-9][0-9 ]{9}")]],
      type: ['', Validators.required]      
    })
  }



  signup(): void {
    this.emailExists = false;
    this.user = this.signupForm.value;
    console.log(JSON.stringify(this.user));

    this.backendService.isEmailExists(this.user.Email).subscribe({next: (response: boolean) => {
if(response==true) {
  this.emailExists = true;
  this.signupError = 'Email address is already in use. Please use a different email.';
} else {
  this.backendService.createUser(this.user).subscribe((response: any) => {
    console.log(response);
    this.signupSuccess = true;
    console.log('Signup successful! Signup data:', JSON.stringify(this.user));
    this.router.navigate(['/login'])
  })
}
    },
    
    error: ()=> {}})
  }
}
