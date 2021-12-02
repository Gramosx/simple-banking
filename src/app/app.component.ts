import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from './core/data';
import { User } from './core/user.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'banking';
  showFiller = false;
  users: User[] = [];
  constructor(
    private _router: Router,
    private _changeDectory: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.users = user;
  }
  openUserDetails(element: User) {
    this._router.navigate(['/', element.id]);
  }
}
