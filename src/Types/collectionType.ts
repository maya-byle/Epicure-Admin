export type IDocumentPopulate = {
  _id: string;
  name: string;
};

export type IChef = {
  _id: string;
  name: string;
  description: string[];
  image: string;
  restaurants: IDocumentPopulate[];
  status: string;
};

export type IDish = {
  _id: string;
  name: string;
  description: string;
  image: string;
  restaurant: IDocumentPopulate;
  tags: string[];
  price: number;
  status: string;
};

export type IRestaurant = {
  _id: string;
  name: string;
  image: string;
  chef: IDocumentPopulate;
  status: string;
};

export type ApiResponse = {
  message: string;
  data: IRestaurant[] | IChef[] | IDish[];
};

export type ICollection = IChef | IDish | IRestaurant;
