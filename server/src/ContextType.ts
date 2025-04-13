import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";

export interface ContextType extends ExpressContextFunctionArgument{
    payload ?:{userId:string};
};