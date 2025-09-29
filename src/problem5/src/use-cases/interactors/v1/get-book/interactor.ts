import { DataGateway } from "src/configuration/infrastructure.config";
import { BookEntity } from "src/entities";
import { Options } from "src/interface/options.interface";

export class GetBook {
  private readonly dataGateway: DataGateway;
  constructor(options: Options) {
    if (!options.infra.dataGateway) {
      throw new Error("DataGateway is required");
    }
    this.dataGateway = options.infra.dataGateway;
  }
  async getById(id: string): Promise<BookEntity> {
    try {
      if (!id?.trim()) {
        throw new Error("Book ID is required");
      }

      const book = await this.dataGateway.GetBook({ condition: { id } }, {});
      return book;
    } catch (error: any) {
      throw new Error(
        `Failed to get book: ${error?.message || "Unknown error"}`
      );
    }
  }
}
