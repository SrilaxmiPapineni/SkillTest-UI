import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactListComponent } from './contact-list/contact-list.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'contacts'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'contacts',
    component: ContactListComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
