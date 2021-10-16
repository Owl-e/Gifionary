import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { JoinRoomGuard } from './guards/join-room.guard';
import { BoardComponent } from "./pages/board/board.component";

const ROUTES: Routes = [
  { path: ':id', component: BoardComponent, canActivate: [JoinRoomGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'prefix' }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class GameRoomRoutingModule {}
