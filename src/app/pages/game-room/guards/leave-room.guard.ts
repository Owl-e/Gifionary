import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate } from '@angular/router';
import { first } from 'rxjs/operators';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { BoardComponent } from '../pages/board/board.component';

@Injectable({
  providedIn: 'root'
})
export class LeaveRoomGuard implements CanDeactivate<BoardComponent> {

  constructor(private roomService: RoomService, private userService: UserService) { }

  public async canDeactivate(_: BoardComponent, currentRoute: ActivatedRouteSnapshot): Promise<true> {
    const user: User = await this.userService.currentUser$.pipe(first()).toPromise();
    await this.roomService.leaveRoom(user, currentRoute.params['id']);
    return true;
  }

}
