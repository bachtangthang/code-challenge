import { Options } from "src/interface/options.interface";
import { DataGateway } from "src/configuration/infrastructure.config";

export class DeleteBook {
  private readonly dataGateway: DataGateway;

  constructor(options: Options) {
    if (!options.infra.dataGateway) {
      throw new Error("DataGateway is required");
    }
    this.dataGateway = options.infra.dataGateway;
  }
  async execute(id: string): Promise<void> {
    try {
      // Validate input
      if (!id?.trim()) {
        throw new Error("Book ID is required");
      }

      // Check if book exists first
      try {
        await this.dataGateway.GetBook({ condition: { id } }, {});
      } catch (error) {
        throw new Error("Book not found");
      }

      // Delete the book
      await this.dataGateway.DeleteBook({ condition: { id } }, {});
    } catch (error: any) {
      throw new Error(
        `Failed to delete book: ${error?.message || "Unknown error"}`
      );
    }
  }
}
