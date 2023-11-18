import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user.model'; // Import the UserService
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loginFailed = false;
  user: User = {
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Password: '',
    PhoneNumber: 0,
    Email: '',
    UserType: '',
  };

  errorMessage = '';
  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      UserType: ['owner', Validators.required],
    });
  }

  cancelLogin(): void {
    this.router.navigate(['/']);
  }

  login(): void {
    this.loginFailed = false;
    this.user = this.loginForm.value;
    console.log(JSON.stringify(this.user));

    this.backendService
      .loginUser(this.user.Email, this.user.Password, this.user.UserType)
      .subscribe({
        next: (response: Record<string, any>) => {
          var data: Map<String, any> = new Map(Object.entries(response));
          if ((data.get('loginResponse') as boolean) == true) {
            // this.loginFailed = false;
            var userData = data.get('userData');
            localStorage.setItem('isUserLogged', 'true');
            localStorage.setItem('loggedUser', JSON.stringify(userData));
            this.backendService.updateUserLastLogged(userData['Id']).subscribe({
              next: (response: Record<string, any>) => {
                this.router.navigate(['/userlanding']);
              },
              error: () => {},
            });

            // this.router.navigate(['/canteen'])
          } else {
            // this.backendService.createUser(this.user).subscribe((response: any) => {
            //   console.log(response);
            //   console.log('Signup successful! Signup data:', JSON.stringify(this.user));
            //   this.router.navigate(['/login'])
            // })
            this.loginFailed = true;
            this.errorMessage = data.get('userData');
            // console.log(this.errorMessage, JSON.stringify(this.user));
            alert(this.errorMessage);
          }
        },

        error: () => {},
      });
  }
}
