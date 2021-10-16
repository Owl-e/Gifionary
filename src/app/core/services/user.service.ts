import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable()
export class UserService {
  private userSubject!: BehaviorSubject<User>;

  private colors: string[] = ['red', 'blue', 'purple', 'yellow', 'green'];
  private names: string[] = ['MyNameIsJeff', 'ThomasTheTrain', 'BondJamesBond', 'IamIronMan'];

  constructor() {
    this.userSubject = new BehaviorSubject(this.randomUser());
  }

  public get currentUser$(): Observable<User> {
    return this.userSubject.asObservable();
  }

  public updateUser(user: User): void {
    this.userSubject.next(user);
  }

  public randomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  public randomName(): string {
    return this.names[Math.floor(Math.random() * this.names.length)];
  }

  public randomUser(): User {
    return {
      color: this.randomColor(),
      name: this.randomName()
    };
  }
}
