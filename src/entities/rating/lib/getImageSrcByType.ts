import { getGifLink } from "./getGifLink";

export const getImageSrcByType = (url: string | null, type: string): string => {
  let imageSrc = "";

  if (url != null) {
    if (type === "video") {
      imageSrc = getGifLink(url);
    } else {
      imageSrc = url;
    }
  }

  return imageSrc;
};
