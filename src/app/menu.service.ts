import { Injectable } from '@angular/core';
import { Menu } from './menu/menu.component';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor() {}

  leftMenu: Menu[] = [
    new Menu('top1', 'TOP', {
      id: 'children1',
      label: 'Children',
      menus: [new Menu('secondary1', 'ChildItem', '')]
    }),
    new Menu('top1', 'TOP1', '')
  ];
  getLeftMenu(): Menu[] {
    return this.leftMenu;
  }

  getRightMenu() {
    return [];
  }
}
