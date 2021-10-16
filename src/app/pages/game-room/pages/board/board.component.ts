import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  public room: Room | undefined;
  public user!: User;
  private _room!: Subscription;
  private _user!: Subscription;

  constructor(
    private roomService: RoomService,
    private userService: UserService,
  ) { }

  public ngOnInit(): void {
    this._room = this.roomService.currentRoom$.subscribe(room => this.room = room);
    this._user = this.userService.currentUser$.subscribe(user => this.user = user);
  }

  public ngOnDestroy(): void {
    this._room.unsubscribe();
    this._user.unsubscribe();
  }
}
