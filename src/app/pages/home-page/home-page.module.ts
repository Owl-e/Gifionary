import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserService } from 'src/app/core/services/user.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    SharedModule,
  ]
})
export class HomePageModule { }
