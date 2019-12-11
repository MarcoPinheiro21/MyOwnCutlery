import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: string;
  role: string;
  homeService: HomeService;

  constructor(homeService: HomeService) {
    this.homeService = homeService;
  }

  ngOnInit() {
    this.username = localStorage.getItem('user_name');
    this.homeService.getRoleByToken(localStorage.getItem('token')).subscribe(item => {
      localStorage.setItem('user_privileges', JSON.stringify(item.privileges));
      this.role = item.role;
    });
  }

}
