import get from "lodash/get";

type ProcessedFaces = {
  face: RawCard["card_faces"][number];
  imageUrl: string;
  reverseUrl?: string;
};

type GetTransformData = (cardFaces: RawCard["card_faces"]) => ProcessedFaces;
const getTransformData: GetTransformData = (cardFaces) => {
  return {
    face: get(cardFaces, 0),
    imageUrl: get(cardFaces, [0, "image_uris", "border_crop"]),
    reverseUrl: get(cardFaces, [1, "image_uris", "border_crop"]),
  };
};

type ProcessCardFaces = (card: RawCard) => ProcessedFaces;
const getDfcData: ProcessCardFaces = (card) => {
  const result = {
    face: get(card, ["card_faces", 0]),
    imageUrl: get(card, ["card_faces", 0, "image_uris", "border_crop"]),
    reverseUrl: get(card, ["card_faces", 1, "image_uris", "border_crop"]),
  };

  result.face.name = get(card, "name");
  result.face.type_line = get(card, "type_line");
  return result;
};

const processCardFaces: ProcessCardFaces = (card) => {
  const { card_faces: cardFaces, layout, image_uris: imageUris } = card;

  if (layout === "transform") return getTransformData(cardFaces);
  if (layout === "modal_dfc") return getDfcData(card);
  if (layout === "reversible_card") return getTransformData(cardFaces);
  return {
    face: card,
    imageUrl: get(imageUris, "border_crop"),
  };
};

export default processCardFaces;
