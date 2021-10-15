import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable()
export class RoomService {

  private readonly ROOM_COLLECTION: string = 'room';

  constructor(private firestore: AngularFirestore) {}

  public async createRoom(user: User): Promise<Room> {
    const room: Room = {
      users: []
    }
    const document: DocumentReference<Room> = await this.firestore.collection<Room>(this.ROOM_COLLECTION).add(room);
    room.id = document.id;
    return this.joinRoom(user, room.id);
  }

  public async joinRoom(user: User, roomId: string): Promise<Room> {
    const doc = await this.firestore.collection<Room>(this.ROOM_COLLECTION).doc(roomId).get().toPromise();
    console.log(doc.data);
    const room: Room | undefined = doc.data();
    return room ? room : await this.createRoom(user);
  }
}
