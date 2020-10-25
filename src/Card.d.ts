declare type Card= {
    id:string;
    partnerQuery?:{
        type:"partner" | "specific" | "none";
        query?: string;
    };
    count:number;
    isUnlimited: boolean;
    sideboardCount:number;
    attributes: {[attribute:string]:boolean};
    cmc:number;
    colors:string[];
    cost:string;
    identity:string[];
    imageUrl:string;
    name:string;
    reverseUrl:string;
    type:string;
}
