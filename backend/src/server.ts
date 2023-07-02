import { startExpressApp } from "./app";
import { config } from "./config";

const { port } = config;

startExpressApp(Number(port));
