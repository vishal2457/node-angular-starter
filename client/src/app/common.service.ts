import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import * as crypto from "crypto-js";
import swal from "sweetalert2";


@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor(private http: HttpClient) {}
  private serviceData: any;
  //Staging server
 // private nodeApi = "http://stagingServer:9050";
  //local server
  public nodeApi = "http://localhost:9050";
  public serverDocumentPath = `${this.nodeApi}/resources`;
  prefix = `$yourProject${this.nodeApi}_authToken`;
  encryptString: String = ""
  pageLimit = 10;

  private extractData(res) {
    this.serviceData = res;
    if (this.serviceData.status == false) {
    }
    return this.serviceData || {};
  }

  decryptData(data) {
    var bytes = crypto.AES.decrypt(data, this.encryptString );
    var code = bytes.toString(crypto.enc.Utf8);
    return parseInt(code);
  }

  encryptData = (data) => {
    console.log(data, "this data");
    
    let stingiFiedData = JSON.stringify(data)
    var encryptedData = crypto.AES.encrypt(
      stingiFiedData,
      this.encryptString
    ).toString();
    return encryptedData;
  };

  showAlert(type) {
    //Add custom at the end of the string with a '-'(Your notification-custom) to fire custom alert
    var isCustom = type.includes("custom");
    if (isCustom) {
      var message = type.split("-")[0];
      type = "custom";
    }
    switch (type) {
      case "Deleted":
        swal.fire({
          title: "Deleted",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        break;
      case "Inserted":
        swal.fire({
          title: "Inserted",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        break;
      case "Updated":
        swal.fire({
          title: "Updated",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        break;
      case "custom":
        swal.fire({
          text: message,
        });
        break;
      case "confirmDelete":
        return swal.fire({
          title: "Are you sure",
          text: "You won't be able to revert this",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
        });

      default:
        swal.fire({
          title: "Some error occurred",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
        break;
    }
  }

  sendRequestToNode(params) {
    if(params.postData){ 
      var dataToBeSent;
      if(params.postData.formData)dataToBeSent = params.postData.formData
      else dataToBeSent = {data:this.encryptData(params.postData) } 
    }
    params.url = this.nodeApi; // override node api
    var resArr;
    if (params.method && params.method == "postdata") {
      var Url = params.url + "/" + params.path;
      var body = params.queryParam;
      resArr = this.http.post(Url, body);
    } else if (params.method && params.method == "post") {
      resArr = this.http
        .post(params.url + "/" + params.path, dataToBeSent) // define a variable server_url to assign the requested url
        .pipe(map(this.extractData));
    } else if (params.method && params.method == "delete") {
      resArr = this.http
        .delete(params.url + "/" + params.path) // define a variable server_url to assign the requested url
        .pipe(map(this.extractData));
    } else if (params.method && params.method == "put") {
      resArr = this.http.put(params.url + "/" + params.path, params.postData); // define a variable server_url to assign the requested url
      // .map(this.extractData);
    } else {
      resArr = this.http.get(params.url + "/" + params.path, {
        params: params.queryParam,
      })
    }
    return resArr;
  }

  getToken() {
    return localStorage.getItem(this.prefix);
  }

  loggedIn() {
    return !!localStorage.getItem(this.prefix);
  }

}
