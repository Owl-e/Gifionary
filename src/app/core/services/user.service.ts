import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Injectable()
export class UserService {
  public user!: User;
  private colors: string[] = ['red', 'blue', 'purple', 'yellow', 'green'];
  private names: string[] = ['Jeff'];

  constructor() {
    this.user = this.randomUser();
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
