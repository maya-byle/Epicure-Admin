import { ICollection } from "../Types/collectionType";
import { DISH_TAGS } from "../resources/constants.ts";

export const transformData = (data: ICollection[]) => {
  if (data) {
    return data.map((document: ICollection) => {
      const transformedDocument: any = {};
      Object.keys(document).forEach((key) => {
        if (typeof document[key] === "boolean")
          transformedDocument[key] = document[key].toString();
        else if (!document[key]) transformedDocument[key] = "";
        else if (key === "tags")
          transformedDocument[key] = setTags(document[key]);
        else if (
          Array.isArray(document[key]) &&
          document[key].length > 0 &&
          "name" in document[key][0]
        ) {
          // Case: restaurants
          transformedDocument[key] = document[key]
            .map((item: any) => item.name)
            .join(", ");
        } else if (
          typeof document[key] === "object" &&
          "name" in document[key]
        ) {
          transformedDocument[key] = document[key]["name"];
        } else {
          transformedDocument[key] = document[key];
        }
      });
      return transformedDocument;
    });
  }
};

const setTags = (tags: string[]) => {
  let tagsString = "";
  tags.forEach((tag) => {
    if (tag.includes(DISH_TAGS.SPICY)) {
      tagsString += DISH_TAGS.SPICY;
    }
    if (tag.includes(DISH_TAGS.VEGAN)) {
      tagsString += DISH_TAGS.VEGAN;
    }
    if (tag.includes(DISH_TAGS.VEGETARIAN)) {
      tagsString += DISH_TAGS.VEGETARIAN;
    }
  });
  return tagsString.trim();
};
