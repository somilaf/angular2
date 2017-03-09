import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { APP_PATHS } from "../shared/rxpaths";
import { ServiceCategoriesI } from "../servicerequiest/servicerequiest";
import { ServiceRequest } from './servicerequiest';
import { ServiceRequestInterface } from './servicerequiest'
@Injectable()
export class ServiceRequiestDB {
    private seacrhUrl: string = null;
    constructor(private http: Http) { }

    // Mocking Object querying for all ServiceCategoryies

    getServiceCategories(): Promise<ServiceCategoriesI[]> {
        //   this.seacrhUrl=APP_PATHS.SERVER_PATH+APP_PATHS.SERVICE_CATEGORIES+"all_Categories_Ajax";
        //   return this.http.get(this.seacrhUrl);
        return new Promise((resolve, reject) => {
            window.setTimeout(() => {
                resolve(
                    [
                        <ServiceCategoriesI>{ categoryId: 1, categoryDescription: "ItUredjaji" },
                        <ServiceCategoriesI>{ categoryId: 2, categoryDescription: "Elektronike" },
                    ]
                );
            }, 1000);
        });
    }

    // Mocking Object for querying for  Services filtered by Category

    getCategorieServices(categoryId): Promise<ServiceCategoriesI[]> {
        //   this.seacrhUrl=APP_PATHS.SERVER_PATH+APP_PATHS.SERVICE_CATEGORIES+"all_Categories_Ajax";
        //   return this.http.get(this.seacrhUrl);
        return new Promise((resolve, reject) => {
            if (categoryId === 1) {
                window.setTimeout(() => {

                    resolve(
                        [
                            <ServiceCategoriesI>{ categoryId: 1, categoryDescription: "ItUredjaji" },
                            <ServiceCategoriesI>{ categoryId: 2, categoryDescription: "Elektronike" },
                        ]
                    );
                }, 1000);
            }
        });
    }

    // Mocking Object for querying for single ServiceRequest

    getServiceRequiest(serviceId): Promise<ServiceRequest> {
        return new Promise((resolve, reject) => {
            if (serviceId) {
                window.setTimeout(() => {
                    resolve(
                        new ServiceRequest({
                            serviceformid: 1,
                            customername: 'Milos',
                            customerlastname: 'Djokovic',
                            customerphone: parseInt('0642991025'),
                            categorytypeid: 2,
                            devicetypeid: 1,
                            devicemanufactor: "Hp",
                            devicemodel: "Envy",
                            deviceserial: '1231321',
                            deviceinfo: "Redovan Servis",
                            deviceparts: "Punjac",
                            problemdescription: "Ne daje sliku",
                            serviceformdate: "22.11.1983"
                        })
                    );
                }, 1000);
            }
        });
    }

}


