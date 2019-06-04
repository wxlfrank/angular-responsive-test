import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  QueryList,
  AfterViewInit,
  ContentChildren,
  ElementRef
} from '@angular/core';
import {
  MatMenu,
  MatMenuTrigger,
  MatMenuItem,
  MatMenuPanel
} from '@angular/material/menu';
import { String2Any } from '../common';

export interface SubMenu {
  id: string;
  label: string;
  menus: Menu[];
}
export class Menu {
  link: string;
  subMenu: SubMenu;
  constructor(
    public id: string,
    public label: string,
    option: string | SubMenu
  ) {
    if (typeof option === 'string') {
      this.link = option;
    } else {
      this.subMenu = option;
    }
  }
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() color: string;
  topMenus: Menu[];
  subMenus: SubMenu[];
  id2MatMenu: String2Any<MatMenu> = null;
  @ViewChildren(MatMenu) set matMenus(matMenus: MatMenu[]) {
    const hash: String2Any<MatMenu> = {};
    matMenus.forEach(item => {
      // tslint:disable-next-line:no-string-literal
      const ref: ElementRef = item['_elementRef'];
      hash[ref.nativeElement.id] = item;
    });
    setTimeout(() => {
      this.id2MatMenu = hash;
    });
  }
  // @ViewChildren(MatMenuTrigger) triggers: QueryList<MatMenuTrigger>;
  @Input() set menus(menus: Menu[]) {
    this.topMenus = menus;
    const subMenus: SubMenu[] = [];
    menus.forEach(v => this.findSubMenus(v.subMenu, subMenus));
    this.subMenus = subMenus;
  }

  private findSubMenus(subMenu: SubMenu, subMenus: SubMenu[]) {
    if (subMenu != null) {
      subMenus.push(subMenu);
      if (subMenu.menus != null) {
        subMenu.menus.forEach(m => this.findSubMenus(m.subMenu, subMenus));
      }
    }
  }
  constructor() {}

  ngOnInit() {}
}
