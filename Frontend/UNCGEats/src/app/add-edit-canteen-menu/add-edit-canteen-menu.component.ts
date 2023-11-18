import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { BackendService } from '../services/backend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Canteen } from '../models/canteen.model';
import { FoodItem, FoodTypeEnum } from '../models/food-item.model';

@Component({
  selector: 'app-add-edit-canteen-menu',
  templateUrl: './add-edit-canteen-menu.component.html',
  styleUrls: ['./add-edit-canteen-menu.component.css'],
})
export class AddEditCanteenMenuComponent implements OnInit {
  selectedCanteen: number = -1;
  uploadedImageStr: string = '';
  loggedUser: User = {
    FirstName: '',
    MiddleName: '',
    LastName: '',
    PhoneNumber: 0,
    Email: '',
    Password: '',
    UserType: 'customer',
  };
  menuTableHeaders: string[] = [
    'Name',
    'Description',
    'Price',
    'Image',
    'FoodType',
    'Ingredients',
    'Calories',
  ];

  foodTypes: string[] = [FoodTypeEnum.nv, FoodTypeEnum.v, FoodTypeEnum.vg];
  menuData: FoodItem[] = [];

  newFoodItem: FoodItem = {
    Name: '',
    RestaurantId: this.selectedCanteen,
    Description: '',
    Price: 0,
    Image: '',
    Reviews: [],
    AverageRating: 0,
    FoodType: FoodTypeEnum.vg,
    Ingredients: '',
    Calories: 0,
  };

  updateFoodItem: FoodItem = {
    Name: '',
    RestaurantId: this.selectedCanteen,
    Description: '',
    Price: 0,
    Image: '',
    Reviews: [],
    AverageRating: 0,
    FoodType: FoodTypeEnum.vg,
    Ingredients: '',
    Calories: 0,
  };

  deleteFoodItemId: number = -1;

  addFoodItemForm: FormGroup = new FormGroup({});
  updateFoodItemForm: FormGroup = new FormGroup({});

  canteenList: Canteen[] = [];

  imageUploading: boolean = false;

  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    var isUserLogged = localStorage.getItem('isUserLogged');
    if (isUserLogged == 'true') {
      var userDetails = localStorage.getItem('loggedUser');
      this.loggedUser = JSON.parse(userDetails!.toString()) as User;
      if (this.loggedUser.UserType == 'owner') {
        this.backendService.getCanteensForUser(this.loggedUser.Id!).subscribe({
          next: (response: Canteen[]) => {
            this.canteenList = response;
          },
        });
      }
      this.addFoodItemForm = this.formBuilder.group({
        Name: ['', Validators.required],
        RestaurantId: ['', Validators.required],
        Description: ['owner', Validators.required],
        Price: [0, Validators.required],
        Image: [''],
        Reviews: [[]],
        AverageRating: [0],
        FoodType: [FoodTypeEnum.nv],
        Ingredients: [''],
        Calories: [0],
      });
      this.updateFoodItemForm = this.formBuilder.group({
        Name: ['', Validators.required],
        RestaurantId: ['', Validators.required],
        Description: ['owner', Validators.required],
        Price: [0, Validators.required],
        Image: [''],
        Reviews: [[]],
        AverageRating: [0],
        FoodType: [FoodTypeEnum.nv],
        Ingredients: [''],
        Calories: [0],
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  getCanteenMenu() {
    this.backendService.getCanteenMenu(this.selectedCanteen).subscribe({
      next: (response: FoodItem[]) => {
        console.log(response);
        this.menuData = response;
      },
    });
  }

  addMenuItem() {
    this.newFoodItem = this.addFoodItemForm.value;
    this.newFoodItem.RestaurantId = this.selectedCanteen;
    this.newFoodItem.Image = this.uploadedImageStr;
    console.log(JSON.stringify(this.newFoodItem));
    this.backendService.createFoodItem(this.newFoodItem).subscribe({
      next: (response: any) => {
        console.log(JSON.stringify(response));
        this.getCanteenMenu();
        document.getElementById('addItemModal')!.style.display = 'none';
      },
    });
  }

  updateMenuItem() {
    this.newFoodItem = this.updateFoodItemForm.value;
    this.newFoodItem.RestaurantId = this.selectedCanteen;
    this.newFoodItem.Image = this.uploadedImageStr;
    this.backendService
      .updateFoodItem(this.updateFoodItem.Id!, JSON.stringify(this.newFoodItem))
      .subscribe({
        next: (response: any) => {
          console.log(JSON.stringify(response));
          this.getCanteenMenu();
          document.getElementById('updateItemModal')!.style.display = 'none';
        },
      });
  }

  deleteMenuItem(data: FoodItem) {
    this.deleteFoodItemId = data.Id!;
    document.getElementById('deleteItemModal')!.style.display = 'block';
  }

  deleteItem() {
    this.backendService.deleteFoodItem(this.deleteFoodItemId).subscribe({
      next: (response: any) => {
        this.getCanteenMenu();
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

  editMenuItem(data: FoodItem) {
    this.updateFoodItem = data;
    this.updateFoodItemForm = this.formBuilder.group({
      Name: [data.Name, Validators.required],
      RestaurantId: ['', Validators.required],
      Description: [data.Description, Validators.required],
      Price: [data.Price, Validators.required],
      Image: [''],
      Reviews: [[]],
      AverageRating: [0],
      FoodType: [data.FoodType],
      Ingredients: [data.Ingredients],
      Calories: [data.Calories],
    });
    document.getElementById('updateItemModal')!.style.display = 'block';
  }

  convertFileToBase64(event: Event) {
    this.imageUploading = true;
    console.log('Image Uploading SEt');
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
    console.log('image uploading released');
  }

  setSpinner() {
    this.imageUploading = true;
  }
}
