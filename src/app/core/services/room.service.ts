import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable()
export class RoomService {

  private readonly ROOM_COLLECTION: string = 'room';

  constructor(private firestore: AngularFirestore) {}

  public async createRoom(user: User): Promise<Room> {
    const room: Room = {
      users: [user],
      messages: []
    };
    const collection: AngularFirestoreCollection<Room> = this.firestore.collection<Room>(this.ROOM_COLLECTION);
    const document: DocumentReference<Room> = await collection.add(room);
    room.id = document.id;
    return room;
  }

  public async joinRoom(user: User, roomId: string): Promise<Room> {
    console.log(user, roomId)
    const doc: AngularFirestoreDocument<Room> = await this.firestore.collection<Room>(this.ROOM_COLLECTION).doc<Room>(roomId);
    const room: Room | undefined = await this.getRoomById(roomId).pipe(first()).toPromise();
    console.log(room)
    if (room) {
      room.users.push(user);
      await doc.update(room);
      return room;
    }
    return this.createRoom(user);
  }

  public getRoomById(id: string): Observable<Room | undefined> {
    return this.firestore.collection<Room>(this.ROOM_COLLECTION).doc(id).valueChanges({idField: 'id'});
  }

  public async updateRoom(room: Partial<Room>): Promise<void> {
    return this.firestore.collection<Room>(this.ROOM_COLLECTION).doc(room.id).update(room);
  }
}
