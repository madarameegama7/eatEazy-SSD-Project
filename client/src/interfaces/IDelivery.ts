export interface Idelivery {
  DeliveryId: string;
  OrderId: string;
  DeliveryPersonId: string;
  AssignedAt: Date;
  DeliveredAt: Date;
  DeliveryStatus: "Assigned" | "In_Transit" | "Delivered" | "Failed";
}
