import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/auth/shared/services/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  async loginUser(event: FormGroup): Promise<void> {
    const { email, password } = event.value;
    try {
      await this.authService.loginUser(email, password);
      this.router.navigate(['/']);
    } catch (err) {
      this.error = (err as Error).message;
    }
  }
}
