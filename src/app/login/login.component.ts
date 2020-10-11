import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServices } from '../services/login.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public mensaje="";
  constructor(private router: Router,private loginservice: LoginServices){ }

  ngOnInit(): void {
  }

  onSubmit(data) {

    console.log("adentro");
    console.log(data.value);
    this.loginservice.login(data.value).subscribe((res: any)=>{
if(res['resultado']==1){
  console.log(JSON.stringify(data.value));
    this.router.navigate(['/dashboard']);

}else{
  this.mensaje=res['mensaje'];
  $('#success-modal-preview').modal('show');

}

    }, error=>{
      alert(error.error)
    })
    
    

  

  }

}
