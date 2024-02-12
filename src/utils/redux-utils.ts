import { ICollection, IChef } from "../Types/collectionType";

export const transformData = (data: ICollection) => {
  if ((<IChef>data).restaurants) {
    const chefs = (<IChef>data).restaurants.map((chef) => ({
      ...chef,
      restaurants:
        (<IChef>data).restaurants.length > 0
          ? (<IChef>data).restaurants[0].title
          : [],
    }));
    return chefs;
  }
  return data;
};

// export const transformDishData = (data: BackendDish[]): Section => {
//   const collection = data.map((dish) => ({
//     title: dish.title,
//     image: dish.image,
//     description: dish.ingredients.join(", "),
//     foodIcon: getFoodIcon(dish.tags[0]),
//     price: dish.price,
//   }));

//   return collection;
// };

// export const transformRestaurantData = (data: BackendRestaurant[]): Section => {
//   const collection = data.map((restaurant) => ({
//     title: restaurant.title,
//     image: restaurant.image,
//     subtitle: restaurant.chef.title,
//     rating: getRatingImage(restaurant.rating),
//   }));

//   return collection;
// };
