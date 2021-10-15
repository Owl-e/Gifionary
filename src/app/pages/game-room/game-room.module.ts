import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './pages/board/board.component';
import { GameRoomRoutingModule } from './game-room-routing.module';
import { ChatComponent } from './components/chat/chat.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { SandboxComponent } from './components/sandbox/sandbox.component';

const COMPONENTS = [
  BoardComponent,
  ChatComponent,
  LeaderboardComponent,
  SandboxComponent
]

@NgModule({
  declarations: [
    COMPONENTS
  ],
  imports: [
    CommonModule,
    GameRoomRoutingModule,
    SharedModule,
  ],
  exports: [
    COMPONENTS,
    GameRoomRoutingModule
  ]
})
export class GameRoomModule { }
