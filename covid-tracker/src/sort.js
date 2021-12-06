export const sortData=(data) => {
    const sortedData= [...data];

    sortedData.sort((a,b) => {
        if(a.active > b.active) {
            return -1;
    
        }
        else{
            return 1;
        }
    });
    return sortedData;
};