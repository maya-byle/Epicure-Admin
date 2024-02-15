import RESOURCES from "./resources.ts";

export const CHEF_RESOURCES = {
  _id: "id",
  name: "name",
  description: "description",
  image: "image",
  restaurants: "restaurants",
  status: "status",
};

export const DISH_RESOURCES = {
  _id: "id",
  name: "name",
  ingredients: "ingredients",
  image: "image",
  restaurant: "restaurant",
  tags: "tags",
  price: "price",
  status: "status",
};

export const RESTAURANT_RESOURCES = {
  _id: "id",
  name: "name",
  image: "image",
  chef: "chef",
  rank: "rank",
  status: "status",
};

export const USER_RESOURCES = {
  _id: "id",
  name: "name",
  email: "email",
  role: "role",
  status: "status",
};

export const LINKS_RESOURCES = [
  { herf: "/chefs", name: "Chefs", type: CHEF_RESOURCES },
  { herf: "/dishes", name: "Dishes", type: DISH_RESOURCES },
  { herf: "/restaurants", name: "Restaurants", type: RESTAURANT_RESOURCES },
  { herf: "/users", name: "Users", type: USER_RESOURCES },
];

//////////// TABLE ////////////
export const TABLE_CONSTANTS = {
  ROUTE_ERROR: RESOURCES.ROUTE_ERROR,
};

//////////// ROUTES ////////////
export const ROUTES = {
  HOME_PAGE: "/",
  CONTENT_PAGE: "/:routeName",
  LOGIN_PAGE: "/login",
};

//////////// REDUX ////////////
export const STATUS_CODE = {
  IDLE: "idle",
  REJECTED: "rejected",
  LOADING: "loading",
};

//////////// SESSION TOKEN ////////////
export const USERTOKEN = "userToken";
