const editApiRouteSender= (apiRoute) => {
    return {
        routeName: apiRoute.routeName,
        routePath: apiRoute.routePath,
        routeData: apiRoute.routeData,
    }
}
export default editApiRouteSender;