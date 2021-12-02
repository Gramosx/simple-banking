import { Injectable } from '@angular/core';
import { user } from '../data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUserById(userId: number) {
    return user.find((x) => x.id == userId);
  }
}
