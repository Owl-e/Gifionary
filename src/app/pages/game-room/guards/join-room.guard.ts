import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { RoomService } from 'src/app/core/services/room.service';

@Injectable({
  providedIn: 'root'
})
export class JoinRoomGuard implements CanActivate {

  constructor(private roomService: RoomService, private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.roomService.getRoomById(route.params['id']).pipe(
      first(),
      map(room => !!room),
      tap(isRoom => !isRoom && this.router.navigate(['/']))
    );
  }

}
