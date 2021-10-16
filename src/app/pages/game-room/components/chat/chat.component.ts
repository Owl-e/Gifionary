import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RoomService } from 'src/app/core/services/room.service';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() public room!: Room;
  @Input() public user!: User;

  constructor(private roomService: RoomService) { }

  public async ngOnInit(): Promise<void> {
    console.log(this.user)
  }

  public chatForm: FormGroup = new FormGroup({
    message: new FormControl('')
  });

  public sendMessage(): void {
    this.room.messages.push({user: this.user, message: this.chatForm.get('message')?.value ?? ''})
    this.roomService.updateRoom(this.room);
    this.chatForm.reset();
  }
}
