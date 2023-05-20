
export interface PhoneProfile {
    id: number;
    nameProduct: string;
    yearOfManufacture: string;
    price: number;
    image: string;
    docs: string;
}

export interface PhoneStateProps {
    phone: PhoneProfile[];
    detailPhone: PhoneProfile;
    error: object | string | null;
}
