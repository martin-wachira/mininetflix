import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { RegisterService } from '../home/register.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
    private service: RegisterService,
    private router: Router,
    private a_route: ActivatedRoute) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  // isValid(controlName) {
  //   return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  // }

  // login() {
  //   console.log(this.loginForm.value);

  //   if (this.loginForm.valid) {
  //     this.service.login(this.loginForm.value)
  //       .subscribe(
  //         data => {
  //           console.log(data);
  //           localStorage.setItem('token', data.toString());
  //           this.router.navigate(['/favorite']);
  //         },
  //         error => { },
  //       );
  //   }
  // }

  moveToRegister () {
    this.router.navigate(['../register'], {relativeTo: this.a_route});
  }

  login() {
    this.service.login(this.email, this.password);
    this.email = this.password = '';    
  }

}
