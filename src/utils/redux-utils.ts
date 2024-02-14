import { ICollection } from "../Types/collectionType";

export const transformData = (data: ICollection[]) => {
  console.log(data);
  if (data) {
    return data.map((document: ICollection) => {
      const transformedDocument: any = {};
      Object.keys(document).forEach((key) => {
        if (!document[key]) transformedDocument[key] = "";
        else if (key === "tags") {
          transformedDocument[key] = setTags(document[key]);
        } else if (
          Array.isArray(document[key]) &&
          document[key].length > 0 &&
          "name" in document[key][0]
        ) {
          transformedDocument[key] = document[key].map(
            (item: any) => item.name
          );
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
    if (tag.includes("spicy")) {
      tagsString += "spicy ";
    }
    if (tag.includes("vegan")) {
      tagsString += "vegan ";
    }
    if (tag.includes("vegetarian")) {
      tagsString += "vegetarian ";
    }
  });
  return tagsString.trim();
};
