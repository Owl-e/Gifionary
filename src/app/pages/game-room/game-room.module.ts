import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { GameRoomRoutingModule } from './game-room-routing.module';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ChatComponent } from './chat/chat.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
    SharedModule
  ],
  exports: [
    COMPONENTS,
    GameRoomRoutingModule
  ]
})
export class GameRoomModule { }
