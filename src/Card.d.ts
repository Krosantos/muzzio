declare type Card= {
    id:string;
    partner?:{
        type:"partner" | "specific" | "none";
        query?: string;
    };
}
