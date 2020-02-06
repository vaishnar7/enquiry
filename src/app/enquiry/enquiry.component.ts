import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EnquiryService } from '../services/enquiry.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  title="Enquiry Listing";
  enquiries:any=[];
  searchForm;
  
  constructor(private router: Router,
    private enquiryService:EnquiryService,private formBuilder: FormBuilder) { 
      this.searchForm = this.formBuilder.group({
        firstName: new FormControl('',[
          Validators.required,
          Validators.minLength(1)
        ]),
      });
      
    }

  ngOnInit() {
    
    this.getEnquiries();
  }
  getEnquiries(){
    this.enquiryService.get()
    .subscribe(data=>{
      console.log("data",data);
  
      this.enquiries=data;
    });
  }
  addEnquiry(){
    this.router.navigate(['add']);
  }
  search(){
    

    this.enquiryService.search(this.searchForm.value)
    .subscribe((data:any)=>{
      console.log(data);
      this.enquiries=data;
    //console.log("success",data);
    //this.commonService.setItem('user',data.user);
    //this.router.navigate(['']);
    },err=>{
      alert(err.error.message);
      
    
    });
  }

}
