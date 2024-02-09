export type IChef = {
  _id: string;
  name: string;
  description: string[];
  image: string;
  restaurant: string[];
  status: string;
};

export type IDish = {
  _id: string;
  name: string;
  description: string[]; //TODO: match from db
  image: string;
  restaurant: string;
  tags: string[];
  price: number;
  status: string;
};

export type IRestaurant = {
  _id: string;
  name: string;
  description: string;
  image: string;
  chef: string;
  status: string;
};

export type ApiResponse = {
  message: string;
  data: IRestaurant | IChef | IDish;
};

export type ICollection = IChef | IDish | IRestaurant;
