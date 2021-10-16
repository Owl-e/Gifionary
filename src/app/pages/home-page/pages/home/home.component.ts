import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GifService } from 'src/app/core/services/gif.service';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';
import { GifKey } from 'src/app/shared/models/gif-key';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public playerColor!: string;
  public defaultName: string = '';
  public welcomeGif!: Observable<string>;
  public playButtonText: string = 'JOUER';

  public roomCodeInput!: string;
  public nameInput!: string;

  constructor(
    public userService: UserService,
    public gifService: GifService,
    private roomService: RoomService,
    private router: Router
  ) {
    this.pickColor();
    this.welcomeGif = this.gifService.getRandomGif(GifKey.WELCOME).pipe(map(url => 'url(' + url + ')'));
    this.defaultName = userService.randomName();
  }

  public pickColor(): void {
    // TODO Link to a color picker
    this.playerColor = this.userService.randomColor();
  }

  public async play(): Promise<void> {
    this.userService.updateUser({
      color: this.playerColor,
      name: this.nameInput ?? this.defaultName,
      point: 0
    });
    const id: string = this.roomCodeInput ?? (await this.roomService.createRoom({
      messages: [],
      users: []
    })).id ?? '';
    return this.router.navigate(['game', id]).then();
  }
}
