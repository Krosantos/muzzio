/* eslint-disable camelcase */
// The raw card object, as provided by Scryfall

type Face = {
    colors: string[];
    image_uris: {
        border_crop: string;
    };
    mana_cost: string;
    name: string;
    type_line:string;
}

type RelatedObject = {
    id:string;
    name: string;
    type_line: string;
    component: string;
}

declare type RawCard = {
    all_parts:RelatedObject[];
    id:string;
    card_faces: Face[];
    colors: string[];
    cmc:number;
    color_identity: string[];
    layout:string;
    mana_cost:string;
    name:string;
    oracle_text:string;
    type_line:string;
    image_uris:{
        border_crop: string;
    };
}
