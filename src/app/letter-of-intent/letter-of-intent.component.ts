import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'letter-of-intent',
  templateUrl: './letter-of-intent.component.html',
  styleUrls: ['./letter-of-intent.component.css']
})
export class LetterOfIntentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      window.scrollTo(0, 0)
  }

}
