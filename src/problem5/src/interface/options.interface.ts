import { DataGateway } from "src/configuration/infrastructure.config";

export type Options = {
  infra: {
    dataGateway?: DataGateway;
  };
};
