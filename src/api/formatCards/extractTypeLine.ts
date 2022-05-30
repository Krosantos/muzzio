import get from "lodash/get"

const extractTypeLine = (card:RawCard):string=>{
    const main = get(card, 'type_line')
    const dfcs = card?.card_faces?.map(face=>face.type_line).join(" ") || ""

    return main || dfcs || ""
}

export default extractTypeLine