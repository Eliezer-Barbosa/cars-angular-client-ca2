import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  // tslint:disable-next-line: object-literal-sort-keys
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  public showingMenu = false;

  constructor(private router: Router) { }

  public ngOnInit() {
  }

}
