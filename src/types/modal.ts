/* eslint-disable @typescript-eslint/no-explicit-any */
import { SVGProps } from "react";
import { IconType } from "react-icons";

// Enums
export enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    VENDOR = "VENDOR",
    CUSTOMER = "CUSTOMER",
}

export enum UserStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED",
    DELETED = "DELETED",
}

export enum PaymentStatus {
    PAID = "PAID",
    UNPAID = "UNPAID",
}

export enum DiscountStatus {
    PERCENTAGE = "PERCENTAGE",
    FIXED = "FIXED",
}

// NavItem interface
export interface NavItem {
    href: string;
    title: string;
    Icon: IconType;
    children?: NavItem[];
}

// IconSvgProps for SVG components
export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

// User interfaces
export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    admin?: IAdmin;
    vendor?: IVendor;
    customer?: ICustomer;
    onDelete?: string;
}

export interface IAdmin {
    id: string;
    name: string;
    email: string;
    image?: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: IUser;
}

export interface IVendor {
    status: string;
    vendor: any;
    id: string;
    name: string;
    email: string;
    shopName?: string;
    logo?: string;
    description?: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    products: IProduct[];
    orders: IOrder[];
    followers: IFollow[];
    user: IUser;
}

export interface ICustomer {
    id: string;
    name: string;
    email: string;
    image?: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
    orders: IOrder[];
    reviews: IReview[];
    follows: IFollow[];
    recentProductView: IRecentProductView[];
    user: IUser;
}

// Product interfaces
export interface IProduct {
    id: string;
    name: string;
    price: number;
    stockQuantity: number;
    description?: string;
    image: string[];
    flashSale?: boolean;
    discount?: number;
    categoryId: string;
    isDeleted: boolean;
    vendorId: string;
    orderDetails: IOrderDetail[];
    reviews: IReview[];
    recentProductView: IRecentProductView[];
    category: ICategory;
    vendor: IVendor;
}

export interface ICategory {
    id: string;
    label: string;
    name: string;
    image: string;
    products: IProduct[];
    createdAt: string;
    isDeleted: string;
}

// Order interfaces
export interface IOrder {
    coupon: string;
    deliveryAddress: string;
    id: string;
    customerId: string;
    vendorId: string;
    totalPrice: number;
    paymentStatus: PaymentStatus;
    transactionId: string;
    orderDetails: IOrderDetail[];
    customer: ICustomer;
    vendor: IVendor;
}

export interface IOrderDetail {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    pricePerUnit: number;
    order: IOrder;
    product: IProduct;
}

// Review interface
export interface IReview {
    vendorId: string;
    id: string;
    productId: string;
    customerId: string;
    rating: number;
    comment?: string;
    product: IProduct;
    customer: ICustomer;
}

// Follow interface
export interface IFollow {
    id: string;
    customerId: string;
    vendorId: string;
    customer: ICustomer;
    vendor: IVendor;
}

// Recent Product View interface
export interface IRecentProductView {
    id: string;
    customerId: string;
    productId: string;
    viewedAt: Date;
    customer: ICustomer;
    product: IProduct;
}

// Coupon interface
export interface ICoupon {
    id: string;
    code: string;
    discountStatus: DiscountStatus;
    discountValue: number;
    startDate: string;
    endDate: string;
    usedCount: number;
    isActive: boolean;
}
export interface ErrorSource {
    path: string;
    message: string;
}

export interface ErrorResponseData {
    status: boolean;
    message: string;
    errorSources: ErrorSource[];
    stack?: string;
}

export interface ErrorResponse {
    data: ErrorResponseData;
    status: boolean;
}

export interface CartItem extends IProduct {
    quantity: number;
}
