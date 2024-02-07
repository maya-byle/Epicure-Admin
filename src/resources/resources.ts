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
  image: "image",
  name: "name",
  description: "description",
  chef: "chefName",
  status: "status",
};

export const LINKS_RESOURCES = [
  { herf: "/chefs", name: "Chefs", type: CHEF_RESOURCES },
  { herf: "/dishes", name: "Dishes", type: DISH_RESOURCES },
  { herf: "/restaurants", name: "Restaurants", type: RESTAURANT_RESOURCES },
];

export const ACTIONS_RESOURCES = {
  FETCH_DATA: "FETCH_DATA",
  ADD_DATA: "ADD_DATA",
  UPDATE_DATA: "UPDATE_DATA",
  DELETE_DATA: "DELETE_DATA",
};
