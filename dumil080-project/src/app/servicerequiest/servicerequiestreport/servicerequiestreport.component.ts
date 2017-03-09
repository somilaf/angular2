import { Component, OnInit, Input } from '@angular/core';

import { ServiceRequest } from '../servicerequiest';
import { ServiceRequiestDB } from '../servicerequiest.service'
@Component({
  selector: 'dp-servicerequiestreport',
  templateUrl: './servicerequiestreport.component.html',
  styleUrls: ['./servicerequiestreport.component.less']
})
export class ServicerequiestreportComponent implements OnInit {
  @Input() serviceRequiest: ServiceRequest;
  constructor(private dbmodule: ServiceRequiestDB) { }
  ngOnInit() {
    this.dbmodule.getServiceRequiest(1).then((value) => {
      this.serviceRequiest = value;
    }
    );
  }
  serServiceRequiest() {

  }

}
