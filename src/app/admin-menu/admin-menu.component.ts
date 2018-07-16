import { Component, OnInit } from '@angular/core';
import { Config } from "app/utils/config";

@Component({
  selector: 'admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isShowArticles() {
      return Config.isShowArticles();
  }
  
  isShowNews() {
      return Config.isShowNews();
  }
  
  isShowSchedules() {
      return Config.isShowSchedule();
  }
  
  isShowWorkshops() {
      return Config.isShowWorkshops();
  }
}
