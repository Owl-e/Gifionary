import { Component, Input, OnInit } from '@angular/core';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {
  @Input() public users: User[] | undefined = [];
  @Input() public room!: Room | undefined | null;
}
