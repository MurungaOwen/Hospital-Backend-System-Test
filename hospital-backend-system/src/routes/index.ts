import { Router } from "express";
import * as doctorRoutes from "./doctorRoutes";
import * as patientRoutes from "./patientRoutes";
import * as noteRoutes from "./noteRoutes";
import * as authRoutes from "./authRoutes";
import docsRouter from "./docRoute";
const appRouter = Router();

const appRoutes = [
        {
            path: "/auth",
            router: authRoutes.default,
        },
        {
            path: "/doctors",
            router: doctorRoutes.default,
        },
        {
            path: "/notes",
            router: noteRoutes.default,
        },
        {
            path: "/patient",
            router: patientRoutes.default,
        },
        {
            path: "/docs",
            router: docsRouter,
        }
];

appRoutes.forEach(route => {
    appRouter.use(route.path, route.router);
});

export default appRouter;
