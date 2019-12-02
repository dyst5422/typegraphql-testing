import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  InsertEvent,
} from "typeorm";
import { User } from "../entities/User";

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

  listenTo() {
    return User;
  }

  afterUpdate(event: UpdateEvent<User>) {
    console.log(`ON UPDATE: `, event.entity);
  }

  afterInsert(event: InsertEvent<User>) {
    console.log(`ON INSERT: `, event.entity);
  }

  // afterRemove(event: RemoveEvent<User>) {
  //   console.log(`ON REMOVE: `, event.entity);
  // }

  // afterLoad(entity: User, event: LoadEvent<User>) {
  //   console.log(`ON LOAD: `, entity);
  // }

}
