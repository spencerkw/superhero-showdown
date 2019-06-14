import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CharacterSelectionComponent } from './characterselection/characterselection.component';
import { BattleComponent } from './battle/battle.component';
import { CardComponent } from './card/card.component';
import { HealthComponent } from './health/health.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { ShodownService } from './shodownservice.service';


const appRoutes: Routes = [
  {path: "", redirectTo:"/home", pathMatch:"full"},
  {path: "home", component: HomepageComponent},
  {path: "hero-select", component: CharacterSelectionComponent},
  {path: "shodown", component: BattleComponent},
  {path: "**", redirectTo:"/home"}
]

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CharacterSelectionComponent,
    BattleComponent,
    CardComponent,
    HealthComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ApiService, ShodownService],
  bootstrap: [AppComponent]
})
export class AppModule { }
