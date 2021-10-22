export interface Donation {
  donor: string;
  youth: string;
  amount: number;
  date: string;
}

export interface PublicYouth {
  name: string;
  username: string;
  image: string;
  story: string;
  savingPlan: string;
  donations: Donation[];
  dob: string;
}

export interface PrivateYouth extends PublicYouth {
  credits: number;
}

export interface Product {
  name: string;
  description: string;
  picture: string;
  owner: string;
  price: string;
}
