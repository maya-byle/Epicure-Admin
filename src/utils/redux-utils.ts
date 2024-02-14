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
