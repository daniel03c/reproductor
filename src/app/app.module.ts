import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InjectionSessionInterceptor } from './core/interceptors/injection-session.interceptor';

@NgModule({
  declarations: [
    //Todo: En declaraciones puede ser: componentes, directiva, pipes...
    AppComponent,
  ],
  imports: [
    //Todo: Solo se importan otros modules
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InjectionSessionInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
