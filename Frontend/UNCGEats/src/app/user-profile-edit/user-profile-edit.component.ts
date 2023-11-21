import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css'],
})
export class UserProfileEditComponent implements OnInit {
  loggedUser: User = {
    FirstName: '',
    MiddleName: '',
    LastName: '',
    PhoneNumber: 0,
    Email: '',
    Password: '',
    UserType: 'customer',
  };
  userForm: FormGroup = new FormGroup({});
  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  imageUploading: boolean = false;
  uploadedImageStr: string = '';
  previousImageStr?: string = '';
  currentImageStr?: string = '';
  userEmail: string = '';
  ngOnInit(): void {
    var isUserLogged = localStorage.getItem('isUserLogged');
    if (isUserLogged == 'true') {
      var userDetails = localStorage.getItem('loggedUser');
      this.loggedUser = JSON.parse(userDetails!.toString()) as User;
      this.userForm = this.formBuilder.group({
        Id: [this.loggedUser.Id],
        FirstName: [this.loggedUser.FirstName, Validators.required],
        MiddleName: [this.loggedUser.MiddleName],
        LastName: [this.loggedUser.LastName, Validators.required],
        Email: [this.loggedUser.Email, [Validators.required, Validators.email]],
        Password: [
          this.loggedUser.Password,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/),
          ],
        ],
        PhoneNumber: [
          this.loggedUser.PhoneNumber,
          [Validators.required, Validators.pattern('[1-9][0-9 ]{9}')],
        ],
        UserType: [this.loggedUser.UserType, Validators.required],
        ProfilePic: [''],
      });
      this.userForm.controls['Email'].disable();
      this.previousImageStr = this.loggedUser.ProfilePic;
      this.currentImageStr = this.loggedUser.ProfilePic;
      this.userEmail = this.loggedUser.Email;
    } else {
      this.router.navigate(['/']);
    }
  }

  convertFileToBase64(event: Event) {
    this.imageUploading = true;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImageStr = e.target?.result as string;
        this.currentImageStr = this.uploadedImageStr;
      };
      reader.readAsDataURL(input.files[0]);
    }
    this.imageUploading = false;
  }

  setSpinner() {
    this.imageUploading = true;
  }

  updateUser() {
    this.loggedUser = this.userForm.value;
    if (this.uploadedImageStr == '') {
      this.loggedUser.ProfilePic = this.previousImageStr;
    } else {
      this.loggedUser.ProfilePic = this.uploadedImageStr;
    }
    this.loggedUser.Email = this.userEmail;
    console.log(JSON.stringify(this.loggedUser));
    this.backendService.updateUser(this.loggedUser).subscribe({
      next: (response: any) => {
        if (response['success'] == true) {
          localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
          this.router.navigate(['/userlanding/editProfile']);
        } else {
          alert(response['error']);
        }
      },
    });
  }

  cancelEdit() {
    this.router.navigate(['/userlanding/viewCanteens']);
  }
}
