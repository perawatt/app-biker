import { Injectable } from '@angular/core';
import { IBikerService } from './ibiker';
import { API_URL } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NativeService } from 'src/providers/navigateService';

@Injectable({
  providedIn: 'root'
})
export class BikerService implements IBikerService {

  async getBikerInfo(): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "GetBikerInfo/" + bikerId;
    return this.http.get(apiUrl).toPromise();
  }

  async getNewOrderInfo(orderId: string): Promise<any> {
    let apiUrl = this.baseUrl + "GetOrderRequestDetail/" + orderId;
    return this.http.get(apiUrl).toPromise();
  }

  async getOrderInfo(): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "GetUnfinishedOrder/" + bikerId;
  }

  async getOrderHistories(orderId: string): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "GetFinishOrder/" + bikerId;
    return this.http.get(apiUrl).toPromise();
  }

  async updateBikerStatusOn(): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "BikerWorkStatusTurnOn/" + bikerId;
    return this.http.put(apiUrl, {}).toPromise();
  }

  async updateBikerStatusOff(): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "BikerWorkStatusTurnOff/" + bikerId;
    return this.http.put(apiUrl, {}).toPromise();
  }

  async updateOrderStatusToReceived(orderId: string): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "BikerAcceptOrder/" + orderId + "/" + bikerId;
    return this.http.put(apiUrl, {}).toPromise();
  }

  async updateOrderStatusToShipping(orderId: string): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "OrderStatusUpdateToShipping/" + orderId + "/" + bikerId;
    return this.http.put(apiUrl, {}).toPromise();
  }

  async updateOrderStatusToArrived(orderId: string): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "OrderStatusUpdateToDestination/" + orderId + "/" + bikerId;
    return this.http.put(apiUrl, {}).toPromise();
  }

  async updateOrderStatusToSendSuccess(orderId: string): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "OrderStatusUpdateToDone/" + orderId + "/" + bikerId;
    return this.http.put(apiUrl, {}).toPromise();
  }

  async createOrderCancelRequest(orderId: string, data: any): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "CancelOrderRequest/" + orderId + "/" + bikerId;
    return this.http.post(apiUrl, data).toPromise();
  }

  private baseUrl: string = API_URL;
  constructor(private http: HttpClient, private svc: NativeService) { }
}
