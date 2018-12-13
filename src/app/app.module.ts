import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeadNavbarComponent } from './components/head-navbar/head-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/home/search/search.component';
import { LocalcallsservicesComponent } from './components/home/localcallsservices/localcallsservices.component';
import { RecommendationComponent } from './components/home/recommendation/recommendation.component';
import { CustomerReviewsComponent } from './components/home/customer-reviews/customer-reviews.component';
import { BusinessExpandingComponent } from './components/home/business-expanding/business-expanding.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { SubcategoriesComponent } from './components/subcategories/subcategories.component';
import { SharedService} from './services/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { MessagesService } from './services/messages.service';
import { VendorsComponent } from './components/vendors/vendors.component';
import { VendordetailsComponent } from './components/vendordetails/vendordetails.component';
import { SignupComponent } from './components/signup/signup.component';
import {RatingModule} from 'ngx-rating';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { LoginComponent } from './components/login/login.component';
import { CategoryComponent } from './components/category/category.component';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

import { SocialLoginModule, AuthServiceConfig } from 'angular4-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angular4-social-login';

import {  HttpModule } from '@angular/http';
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
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DistancePipe } from './filters/distance.pipe';
import { SortByDistancePipe } from './filters/sort-by-distance.pipe';
import { CategoryPipe } from './filters/category.pipe';
import { CityPipe } from './filters/city.pipe';
import { SearchPipe } from './filters/search.pipe';
import { HomeSearchPipe } from './filters/home-search.pipe';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { SortCityNamePipe } from './filters/sort-city-name.pipe';
import { SortByCategoryNamePipe } from './filters/sort-by-category-name.pipe';
import { DistanceMinMaxRangePipe } from './filters/distance-min-max-range.pipe';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { environment } from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { OrdersPipe } from './filters/orders.pipe';//for google maps

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('1063231160384-ql13qnaopedg5hekl8cb5pl1nkak2ec2.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('208589973195201')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeadNavbarComponent,
    FooterComponent,
    SearchComponent,
    LocalcallsservicesComponent,
    RecommendationComponent,
    CustomerReviewsComponent,
    BusinessExpandingComponent,
    HomeComponent,
    PagenotfoundComponent,
    SubcategoriesComponent,
    VendorsComponent,
    VendordetailsComponent,
    SignupComponent,
    LoginComponent,
    CategoryComponent,
    ContactusComponent,
    AboutusComponent,
    CareersComponent,
    ResetPassswordComponent,
    TermComponent,
    AdvertiseWithUsComponent,
    BlogComponent,
    AllCityComponent,
    HelpComponent,
    AboutClassifiedComponent,
    ClassifiedBlogComponent,
    PressContactComponent,
    AlladsComponent,
    DistancePipe,
    SortByDistancePipe,
    CategoryPipe,
    CityPipe,
    SearchPipe,
    HomeSearchPipe,
    SearchResultsComponent,
    SortCityNamePipe,
    SortByCategoryNamePipe,
    DistanceMinMaxRangePipe,
    OrdersPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RatingModule,
    CarouselModule.forRoot(),
    Ng2CarouselamosModule,
    ReactiveFormsModule,
    HttpModule,
    SocialLoginModule,
    NoopAnimationsModule,
    MatGridListModule,
    LazyLoadImageModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMap.API_KEY
    })
  ],
  providers: [
    SharedService,
    MessagesService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
