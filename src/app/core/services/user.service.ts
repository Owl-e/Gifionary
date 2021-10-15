import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private colors: string[] = ['red', 'blue', 'purple', 'yellow', 'green'];
  private names: string[] = ['Jeff'];

  public randomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  public randomName(): string {
    return this.names[Math.floor(Math.random() * this.names.length)];
  }
}
