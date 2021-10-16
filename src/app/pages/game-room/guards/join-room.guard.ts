import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { first, map, tap } from 'rxjs/operators';
import { RoomService } from 'src/app/core/services/room.service';

@Injectable({
  providedIn: 'root'
})
export class JoinRoomGuard implements CanActivate {

  constructor(private roomService: RoomService, private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    console.log(route.params['id']) 
    return this.roomService.getRoomById(route.params['id']).pipe(first(), tap(console.log), map(room => !!room)).toPromise()
      .then(exist => exist || this.router.navigate(['home']));
  }
  
}
