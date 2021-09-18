import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable()
export class RoomService {

  private readonly ROOM_COLLECTION: string = 'room';

  constructor(private firestore: AngularFirestore) {}

  public async createRoom(): Promise<Room> {
    const room: Room = {
      users: []
    }
    const document: DocumentReference<Room> = await this.firestore.collection<Room>(this.ROOM_COLLECTION).add(room);
    room.id = document.id;
    return room;
  }

  public async joinRoom(user: User, roomId: string): Promise<Room | undefined> {
    const doc = await this.firestore.collection<Room>(this.ROOM_COLLECTION).doc(roomId).get().toPromise();
    console.log(doc.data);
    return doc.data();
  }

}
