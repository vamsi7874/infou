import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactinfouComponent } from './components/contactinfou/contactinfou.component';
import { ServicesComponent } from './components/services/services.component';
import { SignedupscrrenComponent } from './components/signedupscrren/signedupscrren.component';
import { InfoAboutComponent } from './components/info-about/info-about.component';

export const routes: Routes = [
    {path:"scheduler",component:ContactinfouComponent},{path : "services" ,component : ServicesComponent},
    {path : "home" ,component : SignedupscrrenComponent},{path : "about" ,component : InfoAboutComponent}
    
];
