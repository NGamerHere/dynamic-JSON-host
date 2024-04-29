const routerSender=(apiData:object)=>{
   const ds=[];
   for (let i:number=0;i<apiData.length;i++){
       ds.push({
           routeName:apiData[i].routeName,
           routePath:apiData[i].routePath,
           routeData:apiData[i].routeData,
           routeDescription:apiData[i].routeDescription,
           accessType:apiData[i].accessType
       })
   }
   return ds;
}
export default routerSender;