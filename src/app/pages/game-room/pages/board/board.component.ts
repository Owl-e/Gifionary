import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Room } from 'src/app/shared/models/room.model';
import { RoomService } from 'src/app/core/services/room.service';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  public room$!: Observable<Room | undefined>;
  public user!: User;
  private roomId!: string;

  constructor(private route: ActivatedRoute, private roomService: RoomService, private userService: UserService) { }
  
  public async ngOnInit(): Promise<void> {
    this.user = this.userService.user;
    this.roomId = (await this.route.params.pipe(first()).toPromise())['id'];
    this.room$ = this.route.params.pipe(
      switchMap(param => this.roomService.getRoomById(param['id'])),
    );
    return this.roomService.joinRoom(this.user, this.roomId).then();
  }
}
