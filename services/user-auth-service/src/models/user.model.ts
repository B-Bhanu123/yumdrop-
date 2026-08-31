export type UserRole = 'CUSTOMER' | 'DRIVER' | 'RESTAURANT_OWNER' | 'ADMIN';

export interface UserAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface UserEntity {
  id: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  fullName: string;
  phoneNumber?: string;
  role: UserRole;
  isVerified: boolean;
  addresses: UserAddress[];
  createdAt: string;
  updatedAt: string;
}
