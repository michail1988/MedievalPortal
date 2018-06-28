import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'payment-info',
  templateUrl: './payment-info.component.html',
  styleUrls: ['./payment-info.component.css']
})
export class PaymentInfoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      window.scrollTo( 0, 0 )
  }

}
