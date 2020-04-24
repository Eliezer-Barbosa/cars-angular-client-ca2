import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Cars Angular';

  constructor(private router: Router) {}

    public exibindoNavbar() {
    return true;
  }
}
