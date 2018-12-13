import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SubcategoriesComponent } from './components/subcategories/subcategories.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { VendordetailsComponent } from './components/vendordetails/vendordetails.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CategoryComponent } from './components/category/category.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { CareersComponent } from './components/careers/careers.component';
import { ResetPassswordComponent } from './components/reset-passsword/reset-passsword.component';
import { TermComponent } from './components/term/term.component';
import { AdvertiseWithUsComponent } from './components/advertise-with-us/advertise-with-us.component';
import { BlogComponent } from './components/blog/blog.component';
import { AllCityComponent } from './components/all-city/all-city.component';
import { HelpComponent } from './components/help/help.component';
import { AboutClassifiedComponent } from './components/about-classified/about-classified.component';
import { ClassifiedBlogComponent } from './components/classified-blog/classified-blog.component';
import { PressContactComponent } from './components/press-contact/press-contact.component';
import { AlladsComponent } from './components/allads/allads.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

const routes: Routes = [
  { path: 'subcategories/:id', component: SubcategoriesComponent },
  { path: ':url/:category/:id', component: VendorsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'category', component: CategoryComponent},
  { path: 'vendors/:city/:category/:vendorname-id/:id', component: VendordetailsComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'contactus', component: ContactusComponent },
  { path: 'careers', component: CareersComponent },
  { path: 'resetPassword', component: ResetPassswordComponent },
  { path: 'term', component:TermComponent},
  { path: 'advertiseWithUs', component: AdvertiseWithUsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'allCity', component: AllCityComponent },
  { path: 'help', component: HelpComponent },
  { path: 'aboutClassified', component: AboutClassifiedComponent },
  { path: 'classifiedBlog', component:ClassifiedBlogComponent},
  { path: 'pressContact', component:PressContactComponent},
  { path: 'allAds', component:AlladsComponent},
  { path: 'searchResults/:term', component: SearchResultsComponent },
  { path: 'searchResults', component: SearchResultsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule,
  ]
})
export class AppRoutingModule {
  
}
