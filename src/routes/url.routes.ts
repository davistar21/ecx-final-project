import express, { RequestHandler } from 'express';
import { deleteUrl, getUserUrls, invalidateUrl, redirectToOriginal, shortenUrl } from '../controller/url.controller';
import { authenticateToken } from '../middleware/auth.middlweare';
import { urlParamsSchema, validateParams } from '../middleware/user.validate.middleware';

const urlRouter = express.Router()


urlRouter.post("/shorten", authenticateToken, shortenUrl);

urlRouter.get("short/:shortCode", redirectToOriginal);

urlRouter.get("/urls", authenticateToken, getUserUrls);

urlRouter.post("/invalidate/:shortCode", authenticateToken, validateParams(urlParamsSchema) as RequestHandler, invalidateUrl);

urlRouter.delete("/delete/:shortCode", authenticateToken, validateParams(urlParamsSchema) as RequestHandler, deleteUrl);


export default urlRouter;