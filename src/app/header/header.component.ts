import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
//http://cssreset.com/creating-fixed-headers-with-css/
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isAdmin() {
      let admintoken = localStorage.getItem( 'admintoken' );
      return ( admintoken );
  }
}
