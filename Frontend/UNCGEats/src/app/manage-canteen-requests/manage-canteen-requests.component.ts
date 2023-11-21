import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { CanteenRegistration, CanteenStatus } from '../models/canteen.model';
import { Canteen } from '../models/canteen.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-manage-canteen-requests',
  templateUrl: './manage-canteen-requests.component.html',
  styleUrls: ['./manage-canteen-requests.component.css'],
})
export class ManageCanteenRequestsComponent implements OnInit {
  constructor(
    private backendService: BackendService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  activeRequests: CanteenRegistration[] = [];
  approvedRequests: CanteenRegistration[] = [];
  rejectedRequests: CanteenRegistration[] = [];
  registrationStatusList = ['Requested', 'Approved', 'Rejected'];
  tableHeaders = ['Created', 'Owner', 'Canteen', 'Status', 'Comments'];
  ngOnInit(): void {
    var isUserLogged = localStorage.getItem('isUserLogged');
    if (isUserLogged == 'true') {
      this.backendService.getActiveCanteenRequests().subscribe({
        next: (response: CanteenRegistration[]) => {
          this.activeRequests = response;
          console.log(JSON.stringify(this.activeRequests));
          for (let request of this.activeRequests) {
            this.backendService.getCanteen(request.CanteenId).subscribe({
              next: (response: Canteen) => {
                request.Canteen = response;
              },
            });
            this.backendService.getUser(request.OwnerId).subscribe({
              next: (response: User) => {
                request.Owner = response;
              },
            });
          }
        },
      });

      this.backendService.getApprovedCanteenRequests().subscribe({
        next: (response: CanteenRegistration[]) => {
          this.approvedRequests = response;
          for (let request of this.approvedRequests) {
            this.backendService.getCanteen(request.CanteenId).subscribe({
              next: (response: Canteen) => {
                request.Canteen = response;
              },
            });
            this.backendService.getUser(request.OwnerId).subscribe({
              next: (response: User) => {
                request.Owner = response;
              },
            });
          }
        },
      });

      this.backendService.getRejectedCanteenRequests().subscribe({
        next: (response: CanteenRegistration[]) => {
          this.rejectedRequests = response;
          for (let request of this.rejectedRequests) {
            this.backendService.getCanteen(request.CanteenId).subscribe({
              next: (response: Canteen) => {
                request.Canteen = response;
              },
            });
            this.backendService.getUser(request.OwnerId).subscribe({
              next: (response: User) => {
                request.Owner = response;
              },
            });
          }
        },
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  updateData() {
    this.backendService.getActiveCanteenRequests().subscribe({
      next: (response: CanteenRegistration[]) => {
        this.activeRequests = response;
        console.log(JSON.stringify(this.activeRequests));
        for (let request of this.activeRequests) {
          this.backendService.getCanteen(request.CanteenId).subscribe({
            next: (response: Canteen) => {
              request.Canteen = response;
            },
          });
          this.backendService.getUser(request.OwnerId).subscribe({
            next: (response: User) => {
              request.Owner = response;
            },
          });
        }
      },
    });

    this.backendService.getApprovedCanteenRequests().subscribe({
      next: (response: CanteenRegistration[]) => {
        this.approvedRequests = response;
        for (let request of this.approvedRequests) {
          this.backendService.getCanteen(request.CanteenId).subscribe({
            next: (response: Canteen) => {
              request.Canteen = response;
            },
          });
          this.backendService.getUser(request.OwnerId).subscribe({
            next: (response: User) => {
              request.Owner = response;
            },
          });
        }
      },
    });

    this.backendService.getRejectedCanteenRequests().subscribe({
      next: (response: CanteenRegistration[]) => {
        this.rejectedRequests = response;
        for (let request of this.rejectedRequests) {
          this.backendService.getCanteen(request.CanteenId).subscribe({
            next: (response: Canteen) => {
              request.Canteen = response;
            },
          });
          this.backendService.getUser(request.OwnerId).subscribe({
            next: (response: User) => {
              request.Owner = response;
            },
          });
        }
      },
    });
  }

  updateRegistrationStatus(request: CanteenRegistration, status: string) {
    var canteen: Canteen = request.Canteen!;
    request.Canteen = undefined;
    request.Owner = undefined;
    request.Status = status as CanteenStatus;
    canteen.Status = status as CanteenStatus;
    this.backendService
      .approveOrRejectCanteenRequest(request, canteen)
      .subscribe({
        next: (response: any) => {
          this.updateData();
        },
      });
  }
}
