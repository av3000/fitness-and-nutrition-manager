import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginUser(event: FormGroup) {
    console.log(event.value);
  }
}
