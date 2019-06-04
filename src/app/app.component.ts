import { Component } from '@angular/core';
import { MenuService } from './menu.service';
import { Menu } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  leftMenu: Menu[];
  rightMenu: Menu[];
  constructor(private menuServcie: MenuService) {
    this.leftMenu = menuServcie.getLeftMenu();
    this.rightMenu = menuServcie.getRightMenu();
  }
  title = 'angular-responsive-test';
  showMenu() {
    console.log('show menu');
  }
}
