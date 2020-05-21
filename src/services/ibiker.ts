export interface IBikerService {

    getBikerInfo(): Promise<any>;

    getNewOrderInfo(orderId: string): Promise<any>;

    getOrderInfo(orderId: string): Promise<any>;

    getOrderHistoryInfo(orderId: string): Promise<any>;

    getOrderHistories(date: Date): Promise<any>;

    updateBikerStatusOn(): Promise<any>;

    updateBikerStatusOff(): Promise<any>;

    updateOrderStatusToReceived(orderId: string): Promise<any>;

    updateOrderStatusToShipping(orderId: string): Promise<any>;

    updateOrderStatusToArrived(orderId: string): Promise<any>;

    updateOrderStatusToSendSuccess(orderId: string): Promise<any>;

    createOrderCancelRequest(orderId: string, data: any): Promise<any>;
}