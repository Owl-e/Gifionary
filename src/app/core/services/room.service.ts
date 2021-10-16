import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';

@Injectable()
export class RoomService {

  private readonly ROOM_COLLECTION: string = 'room';
  private readonly USER_SUB_COLLECTION: string = 'user';

  constructor(private firestore: AngularFirestore, private router: Router) {}

  public async createRoom(room: Room): Promise<Room> {
    delete room.users;
    const document: DocumentReference<Room> = await this.firestore.collection<Room>(this.ROOM_COLLECTION).add(room);
    return { ...room, id: document.id };
  }

  public getRoomById(id: string): Observable<Room | undefined> {
    const document: AngularFirestoreDocument<Room> = this.firestore.collection<Room>(this.ROOM_COLLECTION).doc(id);
    return document.snapshotChanges().pipe(
      switchMap(({payload}) => document.collection<User>(this.USER_SUB_COLLECTION).snapshotChanges().pipe(
        map(userActions => payload.id ? ({
          ...payload.data(),
          id: payload.id,
          users: userActions.map(action => ({
            ...action.payload.doc.data(),
            id: action.payload.doc.id
          }))
        }) as Room : undefined)
      ))
    );
  }

  public async updateRoom(room: Partial<Room>): Promise<void> {
    const roomDoc: AngularFirestoreDocument<Room> = this.firestore.collection<Room>(this.ROOM_COLLECTION).doc(room.id);
    const userCollection: AngularFirestoreCollection<User> = roomDoc.collection<User>(this.USER_SUB_COLLECTION);
    const users: User[] = room.users ?? [];
    delete room.users;
    return Promise.all([roomDoc.update(room), ...users.map(user => {
      const id: string = user.id ?? this.firestore.createId();
      delete user.id;
      return userCollection.doc(id).update(user);
    })]).then();
  }

  public async joinRoom(user: User, roomId: string): Promise<boolean> {
    const roomDoc: AngularFirestoreDocument<Room> = this.firestore.collection<Room>(this.ROOM_COLLECTION).doc(roomId);
    if (!(await roomDoc.get().toPromise()).exists) Promise.resolve(false);
    return roomDoc.collection<User>(this.USER_SUB_COLLECTION)
      .add(user)
      .then(document => user.id = document.id)
      .then();
  }

  public async leaveRoom(user: User, roomId: string): Promise<void> {
    console.log(user)
    return this.firestore.collection<Room>(this.ROOM_COLLECTION)
      .doc(roomId)
      .collection<User>(this.USER_SUB_COLLECTION)
      .doc(user.id)
      .delete();
  }
}
