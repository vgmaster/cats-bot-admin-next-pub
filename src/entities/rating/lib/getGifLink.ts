export const getGifLink = (videoUrl: string): string => {
  const urlWithoutMP4InPath = videoUrl.replace("mp4/", "");
  const urlWithoutExtension = urlWithoutMP4InPath.replace(".mp4", "");

  const gifUrl = urlWithoutExtension + ".gif";
  return gifUrl;
};
