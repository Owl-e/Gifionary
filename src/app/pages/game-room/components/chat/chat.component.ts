import { Component, HostListener, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RoomService } from 'src/app/core/services/room.service';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @Input() public room!: Room | undefined | null;
  @Input() public user!: User;

  constructor(private roomService: RoomService) { }

  public chatForm: FormGroup = new FormGroup({
    message: new FormControl('')
  });

  public async sendMessage(): Promise<void> {
    this.room?.messages.push({user: this.user, message: this.chatForm.get('message')?.value ?? ''});
    this.room && await this.roomService.updateRoom(this.room);
    this.chatForm.reset();
  }
}
