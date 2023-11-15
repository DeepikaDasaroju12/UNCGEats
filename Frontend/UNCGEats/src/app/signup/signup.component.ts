// signup.component.ts
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services//backend.service';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});
  user: User = {
    FirstName: '',
    MiddleName: '',
    LastName: '',
    PhoneNumber: 0,
    Email: '',
    Password: '',
    UserType: 'customer',
  };
  signupSuccess = false;
  emailExists = false;
  signupError = '';

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      MiddleName: [''],
      LastName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/),
        ],
      ],
      PhoneNumber: [
        '',
        [Validators.required, Validators.pattern('[1-9][0-9 ]{9}')],
      ],
      UserType: ['', Validators.required],
    });
  }

  cancelSignup(): void {
    this.router.navigate(['/']);
  }

  signup(): void {
    this.emailExists = false;
    this.user = this.signupForm.value;
    console.log(JSON.stringify(this.user));

    this.backendService.isEmailExists(this.user.Email).subscribe({
      next: (response: boolean) => {
        if (response == true) {
          this.emailExists = true;
          this.signupError =
            'Email address is already in use. Please use a different email.';
          alert(this.signupError);
        } else {
          this.backendService
            .createUser(this.user)
            .subscribe((response: any) => {
              console.log(response);
              this.signupSuccess = true;
              console.log(
                'Signup successful! Signup data:',
                JSON.stringify(this.user)
              );
              this.router.navigate(['/login']);
            });
        }
      },

      error: () => {},
    });
  }
}
