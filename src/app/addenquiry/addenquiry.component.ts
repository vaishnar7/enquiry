import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EnquiryService } from '../services/enquiry.service';

@Component({
  selector: 'app-addenquiry',
  templateUrl: './addenquiry.component.html',
  styleUrls: ['./addenquiry.component.css']
})
export class AddenquiryComponent implements OnInit {

  enquiryForm;

  constructor(private formBuilder: FormBuilder,
  
    private router:Router,private enquiryService:EnquiryService)  {
      this.enquiryForm = this.formBuilder.group({
        firstName: new FormControl('',[
          Validators.required,
          Validators.minLength(3)
        ]),
        lastName: new FormControl('',[
          Validators.required,
          Validators.minLength(3)
        ]),
        email: new FormControl('',[
          Validators.required,
          Validators.minLength(3)
        ]),
        phone: new FormControl('',[
          Validators.required,
          Validators.minLength(3)
        ]),
        comment: new FormControl('',[
          Validators.required,
          Validators.minLength(3)
        ]),
      }); 
    }
     

  ngOnInit() {}
    get(name){
      return this.enquiryForm.get(name);
    }
    hasError(name){
      return this.get(name).errors && (this.get(name).dirty || this.get(name).touched)
    }
    add(){
      if(!this.enquiryForm.valid){
        console.log(this.enquiryForm);
        alert("You have an error")
        //this.commonService.showError();
        return;
      }
      this.enquiryService.saveEnquiry(this.enquiryForm.value)
      .subscribe(data=>{
        this.router.navigate([''])
      },err=>{
        alert(err.error.message);
        
      
      });
    }
}