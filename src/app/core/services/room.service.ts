import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { Room } from 'src/app/shared/models/room.model';
import { User } from 'src/app/shared/models/user.model';
import { UserService } from './user.service';

@Injectable()
export class RoomService {

  private readonly ROOM_COLLECTION: string = 'rooms';
  private readonly USER_SUB_COLLECTION: string = 'users';

  private currentRoomSubject$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) { }

  public get currentRoom$(): Observable<Room | undefined> {
    return this.currentRoomSubject$.pipe(
      switchMap(id => id ? this.getRoomById(id) : of(undefined))
    );
  }

  public updateCurrentRoomId(room: string): void {
    this.currentRoomSubject$.next(room);
  }

  public async joinRoom(room: Room): Promise<Room> {
    const user: User = await this.userService.currentUser$.pipe(first()).toPromise();
    room.id ??= this.firestore.createId();
    room.users ??= [];
    room.users.push(user);
    await this.updateRoom(room);
    return room;
  }

  public getRoomById(id: string): Observable<Room | undefined> {
    const roomDoc: AngularFirestoreDocument<Room> = this.firestore.collection<Room>(this.ROOM_COLLECTION).doc(id);
    const userCollection: AngularFirestoreCollection<User> = roomDoc.collection<User>(this.USER_SUB_COLLECTION);
    return roomDoc.snapshotChanges().pipe(
      switchMap(snap => snap.payload.exists
        ? roomDoc.valueChanges({ idField: 'id' }).pipe(
          switchMap(room => userCollection.snapshotChanges().pipe(
            map(snaps => ({ ...room, users: snaps.map(({payload}) => ({
              ...payload.doc.data(), id: payload.doc.id
            }))}))
          ))
        )
        : of(undefined)
      )
    );
  }

  public updateRoom({...room}: Partial<Room>): Promise<void> {
    const roomId: string = room.id ?? this.firestore.createId();
    const users: User[] = room.users ?? [];
    delete room.users, delete room.id;
    const roomDoc: AngularFirestoreDocument<Room> = this.firestore.collection<Room>(this.ROOM_COLLECTION).doc(roomId);
    const userCollection: AngularFirestoreCollection<User> = roomDoc.collection<User>(this.USER_SUB_COLLECTION);
    return roomDoc.get().pipe(
      switchMap(snapshot => snapshot.exists
        ? roomDoc.update(room)
        : roomDoc.set(room)
      ),
      switchMap(() => Promise.all(users.map(({...user}) => {
        const id: string = user.id ?? this.firestore.createId();
        delete user.id;
        return userCollection.doc(id).set(user);
      })))
    ).toPromise().then();
  }

}
