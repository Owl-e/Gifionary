import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GifService } from 'src/app/core/services/gif.service';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';
import { GifKey } from 'src/app/shared/models/gif-key';
import { Room } from 'src/app/shared/models/room.model';

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

  public placeHolderId: string;

  constructor(
    private userService: UserService,
    private gifService: GifService,
    private roomService: RoomService,
    private router: Router,
    firestore: AngularFirestore
  ) {
    this.placeHolderId = firestore.createId();
    this.pickColor();
    this.welcomeGif = this.gifService.getRandomGif(GifKey.WELCOME).pipe(map(url => `url(${url})`));
    this.defaultName = userService.randomName();
  }

  public pickColor(): void {
    this.playerColor = this.userService.randomColor();
  }

  public async play(): Promise<void> {
    this.userService.updateUser({
      color: this.playerColor,
      name: this.nameInput ?? this.defaultName,
      point: 0
    });
    const room: Room = await this.roomService.joinRoom({
      id: this.roomCodeInput ?? this.placeHolderId,
      messages: []
    });
    return this.router.navigate(['game', room.id]).then();
  }
}
