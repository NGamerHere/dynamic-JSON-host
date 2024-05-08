function handle404(req: any, res: any, next: any) {
   res.status(404).render("404");
}
export default handle404;