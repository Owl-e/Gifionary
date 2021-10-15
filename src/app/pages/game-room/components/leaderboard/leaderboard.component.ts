import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
