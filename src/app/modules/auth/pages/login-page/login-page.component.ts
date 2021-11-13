import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  formLogin: FormGroup = new FormGroup({});
  errorSesion: boolean = false;

  constructor(
    private asAuthService: AuthService,
    private cookie: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12),
      ]),
    });
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value;

    this.asAuthService.sendCredentials(email, password).subscribe(
      (ResponseOk) => {
        //Cuando las credenciales son correctas codigos http >= 200 < 400
        console.log('Sesion iniciada correctamente', ResponseOk);
        const { tokenSession, data } = ResponseOk;
        this.cookie.set('token', tokenSession, 4, '/');
        this.router.navigate(['/', 'tracks']);
      },
      (err) => {
        //Errores con código http >= 400
        this.errorSesion = true;
        console.log('Correo o contraseña no validas');
      }
    );

    //console.log(' *** ', body);
  }
}
