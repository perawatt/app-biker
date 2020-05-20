import { Injectable } from '@angular/core';
import { IBikerService } from './ibiker';
import { API_URL } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BikerService implements IBikerService {

  getBikerInfo(): Promise<any> {
    let apiUrl = this.baseUrl + "GetBikerInfo/" + this.bikerId;
    return this.http.get(apiUrl).toPromise();
  }

  getOrderInfo(orderId: string): Promise<any> {
    let apiUrl = this.baseUrl + "GetUnfinishOrder/" + orderId + "/" + this.bikerId;
    return this.http.get(apiUrl).toPromise();
  }

  getOrderHistories(orderId: string): Promise<any> {
    let apiUrl = this.baseUrl + "GetFinishOrder/" + this.bikerId;
    return this.http.get(apiUrl).toPromise();
  }

  updateBikerStatusOn(): Promise<any> {
    let apiUrl = this.baseUrl + "BikerWorkStatusTurnOn/" + this.bikerId;
    return this.http.put(apiUrl,{}).toPromise();
  }

  updateBikerStatusOff(): Promise<any> {
    let apiUrl = this.baseUrl + "BikerWorkStatusTurnOff/" + this.bikerId;
    return this.http.put(apiUrl,{}).toPromise();
  }

  updateOrderStatusToReceived(orderId: string): Promise<any> {
    let apiUrl = this.baseUrl + "BikerAcceptOrder/" + orderId + "/" + this.bikerId;
    return this.http.put(apiUrl,{}).toPromise();
  }

  updateOrderStatusToShipping(orderId: string): Promise<any> {
    let apiUrl = this.baseUrl + "OrderStatusUpdateToShipping/" + orderId + "/" + this.bikerId;
    return this.http.put(apiUrl,{}).toPromise();
  }

  updateOrderStatusToArrived(orderId: string): Promise<any> {
    let apiUrl = this.baseUrl + "OrderStatusUpdateToDestination/" + orderId + "/" + this.bikerId;
    return this.http.put(apiUrl,{}).toPromise();
  }

  updateOrderStatusToSendSuccess(orderId: string): Promise<any> {
    let apiUrl = this.baseUrl + "OrderStatusUpdateToDone/" + orderId + "/" + this.bikerId;
    return this.http.put(apiUrl,{}).toPromise();
  }
  
  createOrderCancelRequest(orderId: string, data: any): Promise<any> {
    let apiUrl = this.baseUrl + "CancelOrderRequest/" + orderId + "/" + this.bikerId;
    return this.http.post(apiUrl, data).toPromise();
  }

  private bikerId: string = "1";
  private baseUrl: string = API_URL;
  constructor(private http: HttpClient) { }
}
