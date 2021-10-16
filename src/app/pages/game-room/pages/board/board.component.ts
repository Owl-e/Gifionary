import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';
import { LeaveRoomGuard } from '../../guards/leave-room.guard';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public room$!: Observable<Room | undefined>;
  public user$!: Observable<User>;
  private roomId!: string;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private userService: UserService,
  ) { }
  
  public async ngOnInit(): Promise<void> {
    this.user$ = this.userService.currentUser$;
    this.roomId = (await this.route.params.pipe(first()).toPromise())['id'];
    this.room$ = this.route.params.pipe(
      switchMap(param => this.roomService.getRoomById(param['id']))
    );
    return this.roomService.joinRoom(await this.user$.pipe(first()).toPromise(), this.roomId).then();
  }
}
