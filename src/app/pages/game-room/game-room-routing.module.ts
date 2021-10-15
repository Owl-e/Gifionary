import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardComponent } from "./pages/board/board.component";

const ROUTES: Routes = [
    { path: '', component: BoardComponent, pathMatch: 'full' }
];
  
@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class GameRoomRoutingModule {}