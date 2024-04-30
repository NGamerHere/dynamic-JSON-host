const routeNameSender=(apiData:object)=>{
    const ds=[];
    for (let i:number=0;i<apiData.length;i++){
        ds.push({
            routeName:apiData[i].routeName
        })
    }
    return ds;
}
export default routeNameSender;