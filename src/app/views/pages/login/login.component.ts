import { Component, OnInit } from '@angular/core';
import {AuthService} from '../authServices/auth.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;
  rememberme = false;
  constructor(
    private authService: AuthService ,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
    this.checkRemember()
  }

  checkRemember(){
    const remember = localStorage.getItem('ac');
    if(remember){
      this.rememberme = true;
      const ac = decodeURIComponent(escape(window.atob(remember)))
      this.loginForm.patchValue(JSON.parse(ac));
    }
  }

  login() {
    if (!this.loginForm.valid) {
      // Implement your login logic here
      console.log('Invalid', this.loginForm)
      return 
    }


    this.authService.login(this.loginForm.value).subscribe(
      response => {
        if(this.rememberme){
          const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(this.loginForm.value))))
          localStorage.setItem('ac', b64)
        }else{
          localStorage.removeItem('ac')
        }
        localStorage.setItem('authToken',response?.user?.token)
        localStorage.setItem('refreshToken',response?.user?.refreshToken)
        this.router.navigate(['/dashboard'])
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }

}
