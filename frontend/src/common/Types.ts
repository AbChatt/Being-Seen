export interface Donation {
  donor: string;
  youth: string;
  amount: number;
  date: string;
}

export interface Merchant {
  name: string;
  username: string;
  profilePicture: string;
  dateOfBirth: string;
  storeLocation: string;
  storeName: string;
  email: string;
}

export interface Donor {
  name: string;
  username: string;
  organization: string;
  profilePicture: string;
  dateOfBirth: string;
  anonymize: boolean;
  donations: Donation[];
}

export interface PublicYouth {
  name: string;
  username: string;
  profilePicture: string;
  story: string;
  savingPlan: string;
  dateOfBirth: string;
  donations: Donation[];
}

export interface PrivateYouth extends PublicYouth {
  creditBalance: number;
}

export interface Product {
  name: string;
  description: string;
  picture: string;
  merchant: string;
  price: number;
}
