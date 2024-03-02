import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../authServices/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;
  submit=false

  constructor(    
    private authService: AuthService ,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern('[0-9]{12}')]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(form: FormGroup|any) {
    const password = form.get('password').value;
    const confirmPassword = form.get('confirmPassword').value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  get form(){
    return this.registerForm.controls
  }

  register() {
    console.log(this.registerForm)
    this.submit= true
    if (this.registerForm.valid) {
      // Implement your registration logic here
      this.authService.register(this.registerForm.value).subscribe(
        (res:any)=>{
          console.log(res);
          this.router.navigate(['/login'])
        },
        (err:any)=>{
          console.log(err)
        }
      )
    }
  }

}
