export interface IBikerService {

    getBikerInfo(): Promise<any>;

    getOrderInfo(orderId: string): Promise<any>;

    getOrderHistories(orderId: string): Promise<any>;

    updateBikerStatusOn(): Promise<any>;

    updateBikerStatusOff(): Promise<any>;

    updateOrderStatusToReceived(orderId: string): Promise<any>;

    updateOrderStatusToShipping(orderId: string): Promise<any>;

    updateOrderStatusToArrived(orderId: string): Promise<any>;

    updateOrderStatusToSendSuccess(orderId: string): Promise<any>;

    createOrderCancelRequest(orderId: string, data: any): Promise<any>;
}