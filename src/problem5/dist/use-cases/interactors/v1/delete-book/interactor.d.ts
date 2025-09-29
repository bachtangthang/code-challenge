import { Options } from "src/entities/options.entity";
export declare class DeleteBook {
    private readonly dataGateway;
    constructor(options: Options);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=interactor.d.ts.map