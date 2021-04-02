import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Board } from './board/board.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    Board
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
