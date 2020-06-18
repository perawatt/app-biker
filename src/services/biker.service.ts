import { Injectable } from '@angular/core';
import { IBikerService } from './ibiker';
import { API_URL } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NativeService } from 'src/providers/NativeService';

@Injectable({
  providedIn: 'root'
})
export class BikerService implements IBikerService {

  async getBikerInfo(): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "GetBikerInfo/" + bikerId;
    return this.http.get(apiUrl).toPromise();
  }

  async getNewOrderInfo(): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "GetOrderRequestDetail/" + bikerId;
    return this.http.get(apiUrl).toPromise();
  }

  async getOrderInfo(): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "GetUnfinishedOrder/" + bikerId;
    return this.http.get(apiUrl).toPromise();
  }

  async getOrderHistoryInfo(orderId: string): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "GetFinishOrder/" + bikerId + "/" + orderId;
    return this.http.get(apiUrl).toPromise();
  }

  async getOrderHistories(date: Date): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "GetFinishOrder/" + bikerId;
    if (date) apiUrl += "?date=" + date.toISOString();
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
    let apiUrl = this.baseUrl + "BikerAcceptOrder/" + bikerId + "/" + orderId;
    return this.http.put(apiUrl, {}).toPromise();
  }

  async updateOrderStatusToShipping(orderId: string): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "OrderStatusUpdateToShipping/" + bikerId + "/" + orderId;
    return this.http.put(apiUrl, {}).toPromise();
  }

  async updateOrderStatusToArrived(orderId: string): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "OrderStatusUpdateToDestination/" + bikerId + "/" + orderId;
    return this.http.put(apiUrl, {}).toPromise();
  }

  async updateOrderStatusToSendSuccess(orderId: string): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "OrderStatusUpdateToDone/" + bikerId + "/" + orderId;
    return this.http.put(apiUrl, {}).toPromise();
  }

  async createOrderCancelRequest(orderId: string, data: any): Promise<any> {
    var bikerId = await this.svc.GetBikerId();
    let apiUrl = this.baseUrl + "CancelOrderRequest/" + bikerId + "/" + orderId;
    return this.http.post(apiUrl, data).toPromise();
  }

  private baseUrl: string = API_URL;
  constructor(private http: HttpClient, private svc: NativeService) { }
}
