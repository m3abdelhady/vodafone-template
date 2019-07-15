import { MODULE_NAME } from './../../shared/constants/defines';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { config } from 'src/config/pages-config';
import { AuthenticationService } from './../authentication.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  invalidMsg: any = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private customErrorHandlerService: ErrorHandlerService,
              private authenticationService: AuthenticationService, private translate: TranslateService) {

    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

  }
  validateEmail() {
    if (this.loginForm.controls['email'].errors && this.loginForm.controls['email'].errors
      && this.loginForm.controls['email'].errors.email &&
      (this.loginForm.controls['email'].dirty || this.loginForm.controls['email'].touched)) {
        this.translate.get('Authorization.Login.invalidMail').subscribe((data) => {
          this.invalidMsg = data;
        });
    } else {
      this.invalidMsg = '';
    }
  }
  submitLogin() {
    /** call authenticated service with valid credentials */
      this.authenticationService.authenticate(this.loginForm.value.email, this.loginForm.value.password).subscribe(res => {
        this.router.navigate([config.accountManagement.route]);
      });
  }

}
