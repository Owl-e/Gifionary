import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinRoomGuard } from './game-room/guards/join-room.guard';

const ROUTES: Routes = [
  { path: 'home', loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule) },
  { path: 'game/:id', loadChildren: () => import('./game-room/game-room.module').then(m => m.GameRoomModule), canActivate: [JoinRoomGuard] },
  { path: 'game', redirectTo: 'home' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class PagesModule { }
