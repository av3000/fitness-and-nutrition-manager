import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthFormComponent } from './containers/auth-form/auth-form.component';

import { AuthService } from './services/auth/auth.service';

import { AuthGuard } from './guards/auth.guard';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [AuthFormComponent],
  exports: [AuthFormComponent],
})
export class SharedModule {
  // This method is used to provide the AuthService to the AuthModule.
  // Register and Login modules are both importing SharedModule, so we need to avoid duplicate providers.
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [AuthService, AuthGuard],
    };
  }
}
