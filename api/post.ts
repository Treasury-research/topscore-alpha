import { v4 as uuidv4 } from "uuid";

export const createPostMetadata = (content: string, profileName: string) => {
  return {
    version: "1.0.0",
    mainContentFocus: "TEXT_ONLY",
    metadata_id: uuidv4(),
    content,
    locale: "en",
    external_url: null,
    image: null,
    imageMimeType: null,
    name: `Post by @${profileName}`,
    attributes: [],
    tags: [],
    appId: "Topscore",
  };
};
