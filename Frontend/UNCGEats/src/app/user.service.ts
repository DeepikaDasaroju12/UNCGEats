import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: { username: string, password: string }[] = [];
  private uniqueEmails: string[] = [];

  constructor() { }

  // Add a new user with a username and password
  addUser(userData: any): void {
    this.users.push(userData);
    this.uniqueEmails.push(userData.email);
  }

  // Check if a user with the given username and password exists
  isUserValid(username: string, password: string): boolean {
    return this.users.some(user => user.username === username && user.password === password);
  }

  // Check if a user with the given email already exists
  isEmailExists(email: string): boolean {
    return this.users.some((user: any) => user.email === email);
  }
}
