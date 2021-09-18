<<<<<<< HEAD
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
=======
import { Component, ElementRef, ViewChild } from '@angular/core';
>>>>>>> chat design
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GifKey } from 'src/app/core/modals/gif-key';
import { GifService } from 'src/app/core/services/gif.service';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public playerColor!: string;
  public welcomeGif!: Observable<string>;
  public playButtonText: string = 'JOUER';

  @ViewChild('roomInput') public roomCodeInput!: ElementRef<HTMLInputElement>;
  @ViewChild('nameInput') public nameInput!: ElementRef<HTMLInputElement>;

  constructor(
    private userService: UserService,
    public gifService: GifService,
    private roomService: RoomService
  ) {
    this.pickColor();
    this.welcomeGif = this.gifService.getRandomGif(GifKey.WELCOME).pipe(map(url => 'url(' + url + ')'));
  }

  public pickColor(): void {
    // TODO Link to a color picker
    this.playerColor = this.userService.randomColor();
  }

  public async play(): Promise<void> {
    const name: string = this.nameInput.nativeElement.value;
    const roomId: string = this.roomCodeInput.nativeElement.value;
    const user: User = {
      color: this.playerColor,
      name: name ?? this.userService.randomName(),
    };
    const room = roomId ? await this.roomService.joinRoom(user, roomId) : await this.roomService.createRoom(user)
  }
}
