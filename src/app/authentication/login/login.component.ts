import { MODULE_NAME } from './../../shared/constants/defines';
import { CustomErrorHandlerService } from './../../shared/services/custom-error-handler.service';
import { config } from 'src/config/pages-config';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, 
    private router: Router, private customErrorHandlerService: CustomErrorHandlerService) { 

    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

  }

  ngOnInit() {
  }

  submitLogin() {
    /** set form is submitted true */
    if (this.loginForm.valid) {
      this.authenticationService.authenticate(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
        this.router.navigate([config.accountManagement.route]);        
      }, error => {
          let err = this.customErrorHandlerService.getErrorDescription(MODULE_NAME.Authorization, error.error.errorCode, error.status);
        
      });
    }
  }

}
