import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Canteen,
  CanteenRegistration,
  CanteenStatus,
} from '../models/canteen.model';
import { FoodTypeEnum } from '../models/food-item.model';
import { User } from '../models/user.model';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-manage-canteen',
  templateUrl: './manage-canteen.component.html',
  styleUrls: ['./manage-canteen.component.css'],
})
export class ManageCanteenComponent implements OnInit {
  loggedUser: User = {
    FirstName: '',
    MiddleName: '',
    LastName: '',
    PhoneNumber: 0,
    Email: '',
    Password: '',
    UserType: 'customer',
  };
  newCanteen: Canteen = {
    Name: '',
    Id: -1,
    OwnerId: -1,
    Address: '',
    Description: '',
    WorkingHours: '',
    AverageRating: 0,
    Image: '',
    Deleted: false,
  };

  newCanteenRequest: CanteenRegistration = {
    Id: -1,
    OwnerId: -1,
    CanteenId: -1,
    Status: CanteenStatus.requested,
    Comments: '',
  };

  updatedCanteen: Canteen = {
    Name: '',
    Id: -1,
    OwnerId: -1,
    Address: '',
    Description: '',
    WorkingHours: '',
    AverageRating: 0,
    Image: '',
    Deleted: false,
  };
  canteenList: Canteen[] = [];
  canteenRequestList: Canteen[] = [];
  canteenRejectList: Canteen[] = [];
  canteenTableHeaders: string[] = [
    'Name',
    'Description',
    'Image',
    'Address',
    'Working Hours',
  ];

  addCanteenForm: FormGroup = new FormGroup({});
  updateCanteenForm: FormGroup = new FormGroup({});
  uploadedImageStr: string = '';
  imageUploading: boolean = false;
  deleteCanteenId: number = -1;

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    var isUserLogged = localStorage.getItem('isUserLogged');
    if (isUserLogged == 'true') {
      var userDetails = localStorage.getItem('loggedUser');
      this.canteenRequestList = [];
      this.loggedUser = JSON.parse(userDetails!.toString()) as User;
      this.addCanteenForm = this.formBuilder.group({
        Name: ['', Validators.required],
        Description: ['', Validators.required],
        Image: [''],
        AverageRating: [0],
        Address: [''],
        WorkingHours: [''],
        Comments: [''],
      });
      this.updateCanteenForm = this.formBuilder.group({
        Name: ['', Validators.required],
        Description: ['', Validators.required],
        Image: [''],
        AverageRating: [0],
        Address: [''],
        WorkingHours: [''],
      });
      if (this.loggedUser.UserType == 'owner') {
        this.backendService.getCanteensForUser(this.loggedUser.Id!).subscribe({
          next: (response: Canteen[]) => {
            this.canteenList = response;
          },
        });
        this.backendService.getPendingCanteens(this.loggedUser.Id!).subscribe({
          next: (response: Canteen[]) => {
            this.canteenRequestList = response;
          },
        });
        this.backendService.getRejectedCanteens(this.loggedUser.Id!).subscribe({
          next: (response: Canteen[]) => {
            this.canteenRejectList = response;
          },
        });
      }
    } else {
      this.router.navigate(['/']);
    }
  }

  getCurrentCanteenList() {
    this.backendService.getCanteensForUser(this.loggedUser.Id!).subscribe({
      next: (response: Canteen[]) => {
        this.canteenList = response;
      },
    });
    this.backendService.getPendingCanteens(this.loggedUser.Id!).subscribe({
      next: (response: Canteen[]) => {
        this.canteenRequestList = response;
      },
    });
    this.backendService.getRejectedCanteens(this.loggedUser.Id!).subscribe({
      next: (response: Canteen[]) => {
        this.canteenRejectList = response;
      },
    });
  }

  updateCanteen() {
    this.newCanteen = this.updateCanteenForm.value;
    this.newCanteen.OwnerId = this.loggedUser.Id!;
    if (this.uploadedImageStr == '') {
      this.newCanteen.Image = this.updatedCanteen.Image;
    } else {
      this.newCanteen.Image = this.uploadedImageStr;
    }
    this.backendService
      .updateCanteen(this.updatedCanteen.Id!, JSON.stringify(this.newCanteen))
      .subscribe({
        next: (response: any) => {
          console.log(JSON.stringify(response));
          this.getCurrentCanteenList();
          document.getElementById('updateItemModal')!.style.display = 'none';
        },
      });
    this.uploadedImageStr = '';
  }

  editCanteen(data: Canteen) {
    this.updatedCanteen = data;
    this.updateCanteenForm = this.formBuilder.group({
      Name: [data.Name, Validators.required],
      Description: [data.Description, Validators.required],
      Image: [''],
      AverageRating: [0],
      Address: [data.Address],
      WorkingHours: [data.WorkingHours],
    });
    document.getElementById('updateItemModal')!.style.display = 'block';
  }

  convertFileToBase64(event: Event) {
    this.imageUploading = true;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedImageStr = e.target?.result as string;
        console.log('Base64 Image:', this.uploadedImageStr);
      };
      reader.readAsDataURL(input.files[0]);
    }
    this.imageUploading = false;
  }

  setSpinner() {
    this.imageUploading = true;
  }

  deleteCanteen(data: Canteen) {
    this.deleteCanteenId = data.Id!;
    document.getElementById('deleteItemModal')!.style.display = 'block';
  }

  deleteItem() {
    this.backendService.deleteCanteen(this.deleteCanteenId).subscribe({
      next: (response: any) => {
        this.getCurrentCanteenList();
        document.getElementById('deleteItemModal')!.style.display = 'none';
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  cancelDelete() {
    document.getElementById('deleteItemModal')!.style.display = 'none';
  }

  addCanteen() {
    this.newCanteen = this.addCanteenForm.value;
    this.newCanteen.OwnerId = this.loggedUser.Id!;
    this.newCanteen.Image = this.uploadedImageStr;
    this.newCanteen.Status = CanteenStatus.requested;

    this.newCanteenRequest.OwnerId = this.loggedUser.Id!;
    this.newCanteenRequest.Comments = this.newCanteen.Comments;
    this.backendService
      .createCanteen(this.newCanteen, this.newCanteenRequest)
      .subscribe({
        next: (response: any) => {
          this.getCurrentCanteenList();
          document.getElementById('addItemModal')!.style.display = 'none';
          this.addCanteenForm = this.formBuilder.group({
            Name: ['', Validators.required],
            Description: ['', Validators.required],
            Image: [''],
            AverageRating: [0],
            Address: [''],
            WorkingHours: [''],
            Comments: [''],
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
