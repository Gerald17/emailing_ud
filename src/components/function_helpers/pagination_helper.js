export function getIndex(page){
    if(page === 1){
        return 0;
    }else{
        return (page*15) - 15;
    }
}

 