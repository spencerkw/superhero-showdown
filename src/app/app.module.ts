import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CharacterselectionComponent } from './characterselection/characterselection.component';
import { BattleComponent } from './battle/battle.component';
import { CardComponent } from './card/card.component';
import { HealthComponent } from './health/health.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CharacterselectionComponent,
    BattleComponent,
    CardComponent,
    HealthComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
