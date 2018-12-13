import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { SharedService } from './../../services/shared.service';
import { AuthorizationService } from './../../services/authorization.service';
import { AuthService } from 'angular4-social-login';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-head-navbar',
  templateUrl: './head-navbar.component.html',
  styleUrls: ['./head-navbar.component.css']
})
export class HeadNavbarComponent implements OnInit, AfterViewInit {
  loggedIn: any;
  is_logged = false;
  user: any;
  currentRoute: any;
  @ViewChild('logoImg') logo: ElementRef;

  constructor(private _router: Router, private auth: AuthorizationService, private authSocService: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.is_logged = true;
      this.user = user.name;
    }
  }

  ngAfterViewInit() {
    $(document).scroll(function() {
      const logo = document.getElementById('logoImg');
      const logoB = document.getElementById('logoImg1');
      const scrollTop = $(document).scrollTop();
      if (scrollTop > 40) {
        $('#navBar').addClass('affix');
      } else if (scrollTop < 40) {
        $('#navBar').removeClass('affix');
      }
      if (scrollTop > 300) {
        logo.style.display = 'none';
        logoB.style.display = 'inline-block';
        $('#navBar').addClass('light-nav');
      } else if (scrollTop < 300) {
        logoB.style.display = 'none';
        logo.style.display = 'inline-block';
        $('#navBar').removeClass('light-nav');
      }
    });
  }

  logout() {
    localStorage.clear();
    window.location.reload();
    this.is_logged = false;
  }

}
