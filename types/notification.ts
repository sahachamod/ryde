export type NotificationType = "email" | "sms" | "push" | "in_app";
export type NotificationStatus = "sent" | "delivered" | "failed" | "pending";

export interface Notification {
    id: string;
    type: NotificationType;
    recipientId: string;
    recipientEmail?: string;
    recipientPhone?: string;
    subject: string;
    message: string;
    status: NotificationStatus;
    sentAt?: string;
    deliveredAt?: string;
    createdAt: string;
}

export interface NotificationTemplate {
    id: string;
    name: string;
    type: NotificationType;
    subject: string;
    body: string;
    variables: string[];
    createdAt: string;
    updatedAt: string;
}

export interface SendNotificationData {
    type: NotificationType;
    recipientId: string;
    templateId?: string;
    subject: string;
    message: string;
    variables?: Record<string, string>;
}
