export interface ServiceCategoriesI{
  categoryId:number;
  categoryDescription:string;
}

export interface ServiceRequestInterface {
    serviceformid?: number;
    customername?: string;
    customerlastname?: string;
    customerphone?: number;
    categorytypeid: number;
    devicetypeid: number;
    devicemanufactor: string;
    devicemodel: string;
    deviceserial: string;
    deviceinfo: string;
    deviceparts: string;
    problemdescription: string;
    serviceformdate?:string;
}


export class ServiceRequest {
    private servicerequiestid?: number;
    private firstname?: string = null;
    private lastname?: string = null;
    private phonenumber?: number = null;
    private servicerequiestdate?:string=null;
    private categoryid: number;
    private serviceid: number;
    private devicename: string;
    private devicemodel: string;
    private serialnumber: string;
    private deviceinfo: string;
    private extraparts: string;
    private problemdescription: string;
    constructor(ServiceRequestInterface: ServiceRequestInterface) {
        this.servicerequiestid = ServiceRequestInterface.serviceformid;
        this.firstname = ServiceRequestInterface.customername;
        this.lastname = ServiceRequestInterface.customerlastname;
        this.phonenumber = ServiceRequestInterface.customerphone;
        this.categoryid = ServiceRequestInterface.categorytypeid;
        this.serviceid = ServiceRequestInterface.devicetypeid;
        this.devicename = ServiceRequestInterface.devicemanufactor;
        this.devicemodel = ServiceRequestInterface.devicemodel;
        this.serialnumber = ServiceRequestInterface.deviceserial;
        this.deviceinfo = ServiceRequestInterface.deviceinfo;
        this.extraparts = ServiceRequestInterface.deviceparts;
        this.problemdescription = ServiceRequestInterface.problemdescription;
        this.servicerequiestdate= ServiceRequestInterface.serviceformdate;
    }

    toFormData(): FormData {
        var data = new FormData;
        for (var i in this) {
            if (typeof (this[i]) !== "function" && this[i] !== null) {
                let j = i;
                switch (j) {
                    case "firstname":
                        data.append('CustomerName', this[i]);
                        break;
                    case "lastname":

                        data.append('CustomerLastName', this[i]);
                        break;
                    case "phonenumber":

                        data.append('CustomerPhone', this[i]);
                        break;
                    case "categoryid":

                        data.append('CategoryTypeId', this[i]);
                        break;
                    case "serviceid":

                        data.append('DeviceTypeId', this[i]);
                        break;
                    case "devicename":
                        data.append('DeviceManufactor', this[i]);
                        break;
                    case "devicemodel":
                        data.append('DeviceModel', this[i]);
                        break;
                    case "serialnumber":
                        data.append('DeviceSerial', this[i]);
                        break;
                    case "deviceinfo":
                        data.append('DeviceInfo', this[i]);
                        break;
                    case "extraparts":
                        data.append('DeviceParts', this[i]);
                        break;
                    case "problemdescription":
                        data.append('ProblemDescription', this[i]);
                        break;
                    default:
                        break;
                }
            };
        }
        return data;
    }
    get dfirstname(): string {
        return this.firstname !== null ? this.firstname : null;
    }
    get dlastname(): string {
        return this.lastname !== null ? this.lastname : null;
    }
    get dphonenumber(): string {
        return this.phonenumber !== null ? this.phonenumber.toString() : null;
    }
    get dcategoryid(): string {
        return this.categoryid.toString();
    }
    get ddevicename(): string {
        return this.devicename;
    }
    get ddevicemodel(): string {
        return this.devicemodel;
    }
    get dserialnumber(): string {
        return this.serialnumber;
    }

    get ddeviceinfo(): string {
        return this.deviceinfo;
    }
    get dextraparts(): string {
        return this.extraparts;
    }
    get dproblemdescription(): string {
        return this.problemdescription;
    }
}