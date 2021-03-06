import { Component, OnInit } from '@angular/core';
import { SignUpService } from './sign-up.service';
import { Router } from '@angular/router';
import User from '../models/user.model';
import { Client } from '../models/client.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { PrivacyPolicyDialogComponent } from './privacy-policy-dialog/privacy-policy-dialog.component';
import { FormControl, Validators } from '@angular/forms';

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
  missingRequiredFields = false;
  privacyPolicyAuthorization = false;
  errorMessage = '';
  

  inputFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

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
      role: 'client'
    };
    this.client = {
      address: {
        postalCode: '',
        street: '',
        town: '',
        country: ''
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

  privacyPolicyCheck() {
    this.missingRequiredFields = false;
    if (this.inputFormControl.hasError('required') ||
        this.inputFormControl.hasError('minlength')) {
          this.missingRequiredFields = true;
        return;
      }
    this.openCreationDialog();
  }

  signUp() {
    delete this.client['_id'];
    this.signUpService.saveClient(this.client).subscribe(
      clientSuccess => {
      this.client._id = clientSuccess._id;
        this.signUpService.createUser(this.user).subscribe(
          userSuccess => {
            if (!!userSuccess.message) {
              localStorage.setItem('token', userSuccess.token);
              localStorage.setItem('user_id', userSuccess.user['_id']);
              localStorage.setItem('user_name', userSuccess.user.name);
              this.client.userId = userSuccess.user['_id'];
              this.signUpService.updateClient(this.client).subscribe(
                success => {
                  this.router.navigateByUrl('/home');
                }
              )
            }
          },
        userError => {
          this.errorMessage = userError.error;
          this.signUpService.deleteClient(this.client).subscribe();
        });
      }, 
      clientError => { 
        this.errorMessage = clientError.error.errors; 
      }
    );
  }

  openCreationDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '710px';
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
