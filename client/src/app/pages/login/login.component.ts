import {
  Component,
  OnInit
} from '@angular/core';
import {
  CommonService
} from 'src/app/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private commonService: CommonService, private fb: FormBuilder) {}
  formType: String = 'login';
  loginForm: FormGroup;
  registerForm: FormGroup;
  authenticated: Boolean = false;
  ngOnInit() {
    this.buidForm();
  }

  buidForm(){
    //login form
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })

    //registeration form
    this.registerForm = this.fb.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  loginUser() {
    this.commonService.sendRequestToNode({
      method: 'post',
      path: 'users/login',
      postData: this.loginForm.value
    }).then(data => {
     
      
    })
  }

  registerUser() {
    this.commonService.sendRequestToNode({
      method: 'post',
      path: 'users/register',
      postData: this.registerForm.value
    }).subscribe(data => {
      console.log(data, "this is data");
    })
  }

  changeFormType() {
    this.formType == 'login' ? this.formType = 'register' : this.formType = 'login';
  }

}
