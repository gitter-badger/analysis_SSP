import { Component,
				 OnInit,
				 Input } from '@angular/core';
import { Router,
         ActivatedRoute} from "@angular/router";
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  urlCol: string = "../assets/img/escudoCol.png";

  constructor(private router:Router,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
  	this.authenticationService.logout();
  }

  login(){
  	this.loading = true;
       this.authenticationService.login(this.model.username, this.model.password)
           .subscribe(result => {
               if (result === true) {
                   this.router.navigate(['/main']);
               } else {
                   this.error = 'Usuario o contraseña incorrectos';
                   this.loading = false;
               }
           });
  }

}
