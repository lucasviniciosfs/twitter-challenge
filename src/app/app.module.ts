import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { ModalComponent } from './modal/modal.component';
import { TimePipe } from './pipe/time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    TimePipe,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgbDatepickerModule
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
