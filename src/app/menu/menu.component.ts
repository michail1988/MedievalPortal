import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
//http://cssmenumaker.com/menu/modern-accordion-menu#
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  isAdmin() {
      let admintoken = localStorage.getItem( 'admintoken' );
      return ( admintoken );
  }

}
