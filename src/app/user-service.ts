import { Injectable } from '@angular/core';

export class User {
  userId: number = 0;
  fullname: string = '';
  email: string = '';
  password: string = '';
  city: string = '';
  gender: string = '';
  phonenumber: string = '';
  isAgree: boolean = false;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
   private storageKey = 'AngularUser';
    private loginKey = 'LoggedInUser';

  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  constructor() {}
  
  

  getUsers(): User[] {
    const storedUsers = localStorage.getItem(this.storageKey);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }
  saveUsers(users: User[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  registerUser(newUser: User): void {
    const users = this.getUsers();
    newUser.userId = users.length + 1;
    users.push(newUser);
    this.saveUsers(users);
  }
  deleteUser(userId: number): void {
    const users = this.getUsers().filter(u => u.userId !== userId);
    this.saveUsers(users);
  }
  updateUser(updatedUser: User): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.userId === updatedUser.userId);
    if (index !== -1) {
      users[index] = updatedUser;
      this.saveUsers(users);
    }
  }
   login(email: string, password: string): User | null {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
     if (user) {
      localStorage.setItem(this.loginKey, JSON.stringify(user)); // Optional
      return user;
    }
    return null;
    // return user || null;
  }
   getLoggedInUser(): User | null {
    const user = localStorage.getItem(this.loginKey);
    return user ? JSON.parse(user) : null;
  }
   logout(): void {
    localStorage.removeItem(this.loginKey);
  }
  
}
