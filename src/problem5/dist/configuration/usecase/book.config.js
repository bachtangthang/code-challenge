"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListBooks = exports.DeleteBook = exports.UpdateBook = exports.GetBook = exports.CreateBook = void 0;
const infrastructure_config_1 = require("src/configuration/infrastructure.config");
const createBook = __importStar(require("src/use-cases/interactors/v1/create-book/interactor"));
const getBook = __importStar(require("src/use-cases/interactors/v1/get-book/interactor"));
const updateBook = __importStar(require("src/use-cases/interactors/v1/update-book/interactor"));
const deleteBook = __importStar(require("src/use-cases/interactors/v1/delete-book/interactor"));
const listBooks = __importStar(require("src/use-cases/interactors/v1/list-book/interactor"));
class CreateBook extends createBook.CreateBook {
    constructor() {
        super({ infra: { dataGateway: new infrastructure_config_1.DataGateway() } });
    }
}
exports.CreateBook = CreateBook;
class GetBook extends getBook.GetBook {
    constructor() {
        super({ infra: { dataGateway: new infrastructure_config_1.DataGateway() } });
    }
}
exports.GetBook = GetBook;
class UpdateBook extends updateBook.UpdateBook {
    constructor() {
        super({ infra: { dataGateway: new infrastructure_config_1.DataGateway() } });
    }
}
exports.UpdateBook = UpdateBook;
class DeleteBook extends deleteBook.DeleteBook {
    constructor() {
        super({ infra: { dataGateway: new infrastructure_config_1.DataGateway() } });
    }
}
exports.DeleteBook = DeleteBook;
class ListBooks extends listBooks.ListBooks {
    constructor() {
        super({ infra: { dataGateway: new infrastructure_config_1.DataGateway() } });
    }
}
exports.ListBooks = ListBooks;
//# sourceMappingURL=book.config.js.map