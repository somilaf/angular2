import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import {} from '@ryancavanaugh/alertify';
import { DumilsearchComponent } from '../dumilsearch/dumilsearch.component';
import { ServiceRequest } from "./servicerequiest";
import { ServiceRequestInterface } from "./servicerequiest"
import { ServiceRequiestDB } from "./servicerequiest.service";
import { ServiceCategoriesI } from "../servicerequiest/servicerequiest";
import { ServicerequiestreportComponent } from "./servicerequiestreport/servicerequiestreport.component";
@Component({
  selector: 'dp-servicerequiest',
  templateUrl: './servicerequiest.component.html',
  styleUrls: ['./servicerequiest.component.less'],
  providers: [ServiceRequiestDB]

})
export class ServicerequiestComponent implements OnInit {
  @Input() ServiceRequest: ServiceRequest = null;
  searchCriteria:string="servicerequiest";
  serviceRequiestForm: FormGroup;
  serviceCategoris: ServiceCategoriesI[] = [];
  categoryServices: ServiceCategoriesI[] = [];

  private formErrors = {
    customerFirstName: { errors: null, valid: false },
    customerLastName: { errors: null, valid: false },
    customerPhoneNumber: { errors: null, valid: false },
    serviceCategorie: { errors: null, valid: false },
    deviceBrand: { errors: null, valid: false },
    deviceModel: { errors: null, valid: false },
    deviceSerialNumber: { errors: null, valid: false },
    deviceInfo: { errors: null, valid: false },
    deviceParts: { errors: null, valid: false },
    deviceProblemDescription: { errors: null, valid: false },
    iAgree: { errors: null, valid: false }
  };
  private validationMessages = {
    customerFirstName: { 'required': 'Molimo Vas unestie Ime.', 'pattern': 'Ime može imati samo slova, minimum 2 karaktera.' },
    customerLastName: { 'required': 'Molimo Vas unestie Prezime.', 'pattern': 'Prezime može imati samo slova, minimum 2 karaktera.' },
    customerPhoneNumber: { 'required': 'Morate uneti broj telefona.', 'pattern': 'Broj telefona nije validan' },
    serviceCategorie: { 'required': 'Morate izabrati kategoriju.' },
    deviceBrand: { 'required': 'Polje ne sme biti prazno.' },
    deviceModel: { 'required': 'Polje ne sme biti prazno.' },
    deviceSerialNumber: { 'required': 'Molimo Vas unesite serijski broj.' },
    deviceInfo: { 'required': 'Polje ne sme biti prazno.' },
    deviceParts: { 'required': 'Polje ne sme biti prazno.' },
    deviceProblemDescription: { 'required': 'Polje ne sme biti prazno.' },
    iAgree: { 'pattern': '<- Morate prihvatiti pravila.' }
  };

  constructor(private fb: FormBuilder, private db: ServiceRequiestDB) { }
  ngOnInit() {
    alertify.success("Radi Kao");
    this.db.getServiceCategories().then((result) => {
      result.map((category) => {
        this.serviceCategoris.push(<ServiceCategoriesI>category);
      });

    }
    );
    this.buildForm();
    this.subcribeToChxChanges();
    this.subscribeToValidation(this.serviceRequiestForm, this.validateControlonChange);
  }


  buildForm(): void {
    this.serviceRequiestForm = this.fb.group({
      'customerFirstNameGroup': new FormGroup({
        'chxCustomerFirstName': new FormControl(),
        'customerFirstName': new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern('[a-zA-ZšŠđĐžŽčČćĆ\s\,]{3,}')])
      }),
      'customerLastNameGroup': new FormGroup({
        'chxCustomerLastName': new FormControl(),
        'customerLastName': new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern('[a-zA-ZšŠđĐžŽčČćĆ\s\,]{3,}')])
      }),
      'customerPhoneNumberGroup': new FormGroup({
        'chxCustomerPhoneNumber': new FormControl(),
        'customerPhoneNumber': new FormControl({ value: '', disabled: false },
          [Validators.required, Validators.pattern('[\s()+-]*([0-9][\s()+-]*){6,20}')])
      }),
      'serviceCategorie': new FormControl("", Validators.required),
      'deviceBrand': new FormControl("", Validators.required),
      'deviceModel': new FormControl("", Validators.required),
      'deviceSerialNumberGroup': new FormGroup({
        'chxDeviceSerialNumber': new FormControl(),
        'deviceSerialNumber': new FormControl({ value: '', disabled: false }, Validators.required)
      }),
      'deviceInfo': new FormControl("", Validators.required),
      'deviceParts': new FormControl("", Validators.required),
      'deviceProblemDescription': new FormControl("", Validators.required),
      'iAgree': new FormControl(false, Validators.pattern('true'))
    });
  }

  subscribeToValidation(formGroup: FormGroup, callback?: (control: FormControl, controlname: string, formErrors: any, validationMessages) => void) {

    if (formGroup instanceof FormGroup && formGroup !== null) {
      for (const control in formGroup.controls) {
        if (formGroup.get(control) instanceof FormControl) {
          const controlvalid = <FormControl>formGroup.get(control);
          if (controlvalid) {
            callback(controlvalid, control, this.formErrors, this.validationMessages);
          }
        }
        else if (formGroup.get(control) instanceof FormGroup) {
          const newFormGroup = formGroup.get(control);
          this.subscribeToValidation(<FormGroup>newFormGroup, callback);
        }
      }
    }

  }
  validateControlonChange(control: FormControl, controlname: string, formErrors?, validationMessages?): void {
    control.valueChanges
      .distinctUntilChanged()
      .debounceTime(1000)
      .subscribe(() => {
        if (control && !control.valid) {
          for (const error in control.errors) {
            formErrors[controlname]['valid'] = null;
            formErrors[controlname]['errors'] = [];
            formErrors[controlname]['errors'].push(
              validationMessages[controlname][error]
            );
          }
        }
        else if (control.valid) {
          formErrors[controlname] ? formErrors[controlname]['errors'] = null : false;
          formErrors[controlname] ? formErrors[controlname]['valid'] = true : false;
        }
      });
  }
  validateControlsOnSubmit(control: FormControl, controlname: string, formErrors?, validationMessages?): void {
    if (control && !control.valid) {
      for (const error in control.errors) {
        formErrors[controlname]['valid'] = null;
        formErrors[controlname]['errors'] = [];
        formErrors[controlname]['errors'].push(
          validationMessages[controlname][error]
        );
      }
    }
    else if (control.valid) {
      formErrors[controlname] ? formErrors[controlname]['errors'] = null : false;
      formErrors[controlname] ? formErrors[controlname]['valid'] = true : false;
    }
  }




  disableInput(chxBox: boolean, input: FormControl, controlname?: string) {
    if (chxBox) {
      console.log(chxBox);
      this.formErrors[controlname] ? this.formErrors[controlname]['errors'] = null : false;
      input.disable();
    }
    else {
      input.enable();
    }
  }

  selectCategory(category: ServiceCategoriesI, selectedCategory, selectedServices) {
    console.log(category);
    this.db.getCategorieServices(category.categoryId).then((result) => {
      result.map(<ServiceCategoriesI>(service) => {
        this.serviceRequiestForm.get("serviceCategorie").setValue(category.categoryId);
        this.categoryServices = [];
        this.categoryServices.push(service);
      });
      selectedServices.disabled = false;
      selectedCategory.textContent = category.categoryDescription;
    });
  }

  subcribeToChxChanges() {
    // initialize chxstreams
    this.serviceRequiestForm.controls["customerFirstNameGroup"].get("chxCustomerFirstName").valueChanges.subscribe((result) => {
      const controlname = "customerFirstName";
      this.disableInput(result, <FormControl>this.serviceRequiestForm.controls["customerFirstNameGroup"].get("customerFirstName"), controlname);
    });
    this.serviceRequiestForm.controls["customerLastNameGroup"].get("chxCustomerLastName").valueChanges.subscribe((result) => {
      const controlname = "customerLastName";
      this.disableInput(result, <FormControl>this.serviceRequiestForm.controls["customerLastNameGroup"].get("customerLastName"), controlname);
    });
    this.serviceRequiestForm.controls["customerPhoneNumberGroup"].get("chxCustomerPhoneNumber").valueChanges.subscribe((result) => {
      const controlname = "customerPhoneNumber";
      this.disableInput(result, <FormControl>this.serviceRequiestForm.controls["customerPhoneNumberGroup"].get("customerPhoneNumber"), controlname);
    });
    this.serviceRequiestForm.controls["deviceSerialNumberGroup"].get("chxDeviceSerialNumber").valueChanges.subscribe((result) => {
      const controlname = "deviceSerialNumber";
      this.disableInput(result, <FormControl>this.serviceRequiestForm.controls["deviceSerialNumberGroup"].get("deviceSerialNumber"), controlname);
    });

  }
  onSendServiceRequiest() {
    if (this.serviceRequiestForm.valid) {
      const tmpServiceRequiest = this.serviceRequiestForm.value;
      const tmp: ServiceRequestInterface = {
        customername: tmpServiceRequiest.customerFirstNameGroup.customerFirstName,
        customerlastname: tmpServiceRequiest.customerLastNameGroup.customerLastName,
        customerphone: tmpServiceRequiest.customerPhoneNumberGroup.customerPhoneNumber,
        categorytypeid: tmpServiceRequiest.serviceCategorie,
        devicetypeid: tmpServiceRequiest.serviceCategorie,
        devicemanufactor: tmpServiceRequiest.serviceCategorie,
        devicemodel: tmpServiceRequiest.serviceCategorie,
        deviceserial: tmpServiceRequiest.deviceSerialNumberGroup.deviceSerialNumber,
        deviceinfo: tmpServiceRequiest.deviceInfo,
        deviceparts: tmpServiceRequiest.deviceParts,
        problemdescription: tmpServiceRequiest.deviceProblemDescription,
      }
      this.ServiceRequest = new ServiceRequest(tmp);
  
    }
    // }643  ;/
    else {
      console.log("Nije Dobro");
      this.subscribeToValidation(this.serviceRequiestForm, this.validateControlsOnSubmit);
    }
  }
  getServiceRequiest(selectedServiceRequiest: ServiceRequest) {
    if (selectedServiceRequiest) {
      if (selectedServiceRequiest.dfirstname && selectedServiceRequiest.dfirstname !== "") {
        this.serviceRequiestForm.controls["customerFirstNameGroup"].get("chxCustomerFirstName").setValue(false);
        this.serviceRequiestForm.controls["customerFirstNameGroup"].get("customerFirstName").setValue(selectedServiceRequiest.dfirstname);
      }
      if (selectedServiceRequiest.dlastname && selectedServiceRequiest.dlastname !== "") {
        this.serviceRequiestForm.controls["customerLastNameGroup"].get("chxCustomerLastName").setValue(false);
        this.serviceRequiestForm.controls["customerLastNameGroup"].get("customerLastName").setValue(selectedServiceRequiest.dlastname);
      }
      if (selectedServiceRequiest.dphonenumber && selectedServiceRequiest.dphonenumber !== "") {
        this.serviceRequiestForm.controls["customerPhoneNumberGroup"].get("chxCustomerPhoneNumber").setValue(false);
        this.serviceRequiestForm.controls["customerPhoneNumberGroup"].get("customerPhoneNumber").setValue(selectedServiceRequiest.dphonenumber);
      }
    }
   alertify.confirm('Da li želite da editujete servisni nalog?', ()=>{ alert('Ok') });
  }
}
