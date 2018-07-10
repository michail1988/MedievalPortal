import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'workshops',
  templateUrl: './workshops.component.html',
  styleUrls: ['./workshops.component.css']
})
export class WorkshopsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      window.scrollTo(0, 0)
  }

}
