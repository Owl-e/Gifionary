import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  private colors: string[] = ['red', 'blue', 'purple', 'yellow', 'green'];

  public randomColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }
}
