import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import {Router} from '@angular/router';
import User from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogin = true;
  user: User;
  loginService: LoginService;
  token: string;
  errorMessage: string;

  constructor(loginService: LoginService, private router: Router) {
    this.loginService = loginService;
  }

  ngOnInit() {
    this.user = {
      _id: '',
      name: '',
      email: '',
      password: '',
      role: 'user'
    };
  }

  changeTemplate() {
    this.isLogin = !this.isLogin;
  }

  tryLogin() {
    this.loginService.login(
      this.user
    ).subscribe(item => {
        if (!!item.success) {
          localStorage.setItem('token', item.token);
          localStorage.setItem('user_id', item.user['_id']);
          localStorage.setItem('user_name', item.user.name);
          this.router.navigateByUrl('/home');
        }
      },
      r => {
        this.errorMessage = r.error.message;
      });
  }

}
