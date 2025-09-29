import Controller from "./interface/controller.interface";
declare class App {
    private app;
    constructor(controllers: Controller[]);
    private initializeMiddlewares;
    private initializeRoutes;
    private initializeErrorHandling;
    start(port?: number): Promise<void>;
}
export default App;
//# sourceMappingURL=app.d.ts.map