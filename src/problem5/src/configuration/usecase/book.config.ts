import { DataGateway } from "src/configuration/infrastructure.config";
import * as createBook from "src/use-cases/interactors/v1/create-book/interactor";
import * as getBook from "src/use-cases/interactors/v1/get-book/interactor";
import * as updateBook from "src/use-cases/interactors/v1/update-book/interactor";
import * as deleteBook from "src/use-cases/interactors/v1/delete-book/interactor";
import * as listBooks from "src/use-cases/interactors/v1/list-book/interactor";

export class CreateBook extends createBook.CreateBook {
  constructor() {
    super({ infra: { dataGateway: new DataGateway() } });
  }
}

export class GetBook extends getBook.GetBook {
  constructor() {
    super({ infra: { dataGateway: new DataGateway() } });
  }
}

export class UpdateBook extends updateBook.UpdateBook {
  constructor() {
    super({ infra: { dataGateway: new DataGateway() } });
  }
}

export class DeleteBook extends deleteBook.DeleteBook {
  constructor() {
    super({ infra: { dataGateway: new DataGateway() } });
  }
}

export class ListBooks extends listBooks.ListBooks {
  constructor() {
    super({ infra: { dataGateway: new DataGateway() } });
  }
}
