import { Component, OnInit } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { Router } from '@angular/router';
import User from '../models/user.model';
import { Client } from '../models/client.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PrivacyPolicyDialogComponent } from './privacy-policy-dialog/privacy-policy-dialog.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isLogin = false;
  signUpService: SignUpService;
  user: User;
  client: Client;
  dialog: MatDialog;
  success = false;
  privacyPolicyAuthorization = false;

  constructor(signUpService: SignUpService, private router: Router, private myDialog: MatDialog) {
    this.signUpService = signUpService;
    this.dialog = myDialog;
  }

  ngOnInit() {
    this.user = {
      _id: '',
      name: '',
      email: '',
      password: '',
      role: 'user'
    };
    this.client = {
      address: {
        postalCode: '',
        street: '',
        town: ''
      },
      email: '',
      _id: '',
      name: '',
      phoneNumber: '',
      priority: Math.floor(Math.random() * (5 - 1)) + 1,
      vatNumber: '',
      userId: ''
    };
  }

  changeTemplate() {
    this.isLogin = !this.isLogin;
  }

  showSuccess() {
    this.success = true;
    setTimeout(() => this.success = false, 10000);
  }

  privacyPolicyCheck() {
    this.openCreationDialog();
  }

  signUp() {
    this.signUpService.createUser(
      this.user
    ).subscribe(item => {
      if (!!item.message) {
        this.client.userId = item.user['_id'];
        delete this.client['_id'];
        this.signUpService.saveClient(this.client).subscribe(client => {
          this.showSuccess();
          localStorage.setItem('token', item.token);
          localStorage.setItem('user_id', item.user['_id']);
          localStorage.setItem('user_name', item.user.name);
          this.router.navigateByUrl('/home');
        }, r => {
          alert(r.error);
        });
      }
    },
      r => {
        alert(r.error);
      });
  }

  openCreationDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '425px';
    dialogConfig.height = '550px';
    this.dialog
      .open(PrivacyPolicyDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(result => {
        if (!!result) {
          if (result.data) {
            this.signUp();
          } else {
            this.redirectToLogin();
          }
        }
      });
  }

  redirectToLogin() {
    this.router.navigateByUrl('/login');
  }

}
