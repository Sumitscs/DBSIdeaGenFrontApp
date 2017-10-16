import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { IdeaComponent }  from './idea.component';
import { IdeaService } from './idea.service';

@NgModule({
  imports: [     
        BrowserModule,
		HttpModule,
		ReactiveFormsModule
  ],
  declarations: [
        AppComponent,
		IdeaComponent
  ],
  providers: [
        IdeaService
  ],
  bootstrap: [
        AppComponent
  ]
})
export class AppModule { }
