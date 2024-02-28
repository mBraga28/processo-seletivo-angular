import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegisterComponent {
  registerForm: FormGroup | any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.usersService.createUser(this.registerForm.value)
        .subscribe({
          next: () => {
            this.toastService.showSuccess('Cadastro realizado com sucesso!');
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.toastService.showError(`Erro ao registrar: ${err.message}`);
          }
        });
    } else {
      this.toastService.showError('Preencha todos os campos obrigatórios corretamente.');
    }
  }

}

