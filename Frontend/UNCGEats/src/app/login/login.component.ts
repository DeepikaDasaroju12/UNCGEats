import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model'; // Import the UserService
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loginFailed = false;
  user : User = {
    Name:'',
    Password: '',
    PhoneNumber: 0,
    Email: '',
    UserType: ''
  }

  errorMessage = '';
  constructor(private backendService: BackendService, 
    private formBuilder: FormBuilder, 
    private router: Router){}

    ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Password: ['', Validators.required],
      type: ['owner', Validators.required]
    });
  }
  

  login(): void {
    this.loginFailed = false;
    this.user = this.loginForm.value;
    console.log(JSON.stringify(this.user));

    this.backendService.isUserValid(this.user.Name, this.user.Password).subscribe({next: (response: boolean) => {
if(response==true) {
  // this.loginFailed = false;

  this.router.navigate(['/canteen'])
  // this.router.navigate(['/canteen'])
  } else {
  // this.backendService.createUser(this.user).subscribe((response: any) => {
  //   console.log(response);
  //   console.log('Signup successful! Signup data:', JSON.stringify(this.user));
  //   this.router.navigate(['/login'])
  // })
  this.loginFailed = true;
  this.errorMessage = 'Invalid username or password. Please try again.';
  // console.log(this.errorMessage, JSON.stringify(this.user));
  console.log(this.errorMessage)
  }
    },
    
    error: ()=> {}})
  }
}
