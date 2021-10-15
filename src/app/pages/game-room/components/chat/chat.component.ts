import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/models/message.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public users: User[] = [
    {
      name: 'Benoit',
      color: 'green',
      isEditing: false,
      photo: 'https://media-exp1.licdn.com/dms/image/C5603AQE_MZydFSoNrw/profile-displayphoto-shrink_200_200/0/1583853168305?e=1637193600&v=beta&t=Ap0MEDA780DVePLBu7xV5Uv5KqWiBnUHXyPv06W7imY',
      point: 150
    },
    {
      name: 'Ugo',
      color: 'red',
      isEditing: true,
      photo: 'https://media-exp1.licdn.com/dms/image/C5603AQE_MZydFSoNrw/profile-displayphoto-shrink_200_200/0/1583853168305?e=1637193600&v=beta&t=Ap0MEDA780DVePLBu7xV5Uv5KqWiBnUHXyPv06W7imY',
      point: 2
    },
    {
      name: 'Jean Emmannuel',
      color: 'black',
      isEditing: false,
      photo: 'https://media-exp1.licdn.com/dms/image/C5603AQE_MZydFSoNrw/profile-displayphoto-shrink_200_200/0/1583853168305?e=1637193600&v=beta&t=Ap0MEDA780DVePLBu7xV5Uv5KqWiBnUHXyPv06W7imY',
      point: 2974
    },
  ];

  public messages: Message[] = [
    {
      user: this.users[0],
      message: 'Super cool ce jeu, je suis un attardé mental'
    },
    {
      user: this.users[1],
      message: 'Une poutre'
    },
    {
      user: this.users[2],
      message: 'Du gravier'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
