import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate } from '@angular/router';
import { first } from 'rxjs/operators';
import { RoomService } from 'src/app/core/services/room.service';
import { UserService } from 'src/app/core/services/user.service';
import { BoardComponent } from '../pages/board/board.component';

@Injectable({
  providedIn: 'root'
})
export class LeaveRoomGuard implements CanDeactivate<BoardComponent> {

  constructor(private roomService: RoomService, private userService: UserService) { }

  public async canDeactivate(_: BoardComponent, currentRoute: ActivatedRouteSnapshot): Promise<true> {
    await this.roomService.leaveRoom(await this.userService.currentUser$.pipe(first()).toPromise(), currentRoute.params['id']);
    return true;
  }
  
}
