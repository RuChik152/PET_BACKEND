import express, {NextFunction, Request, Response} from "express";

const app = express();

export const mainMiddleWare = (req: Request, res: Response, next: NextFunction) => {
        //console.log('test_midaelware_1', req.body);
        //req.body.test_1 = 1

        //console.log('test_midaelware_2', req.body);
        //req.body.test_2 = 2

        next();
}



