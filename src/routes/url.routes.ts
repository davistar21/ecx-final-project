import express from 'express';
import { deleteUrl, getUserUrls, invalidateUrl, redirectToOriginal, shortenUrl } from '../controller/url.controller';
import { authenticateToken } from '../middleware/auth.middlweare';

const urlRouter = express.Router()


urlRouter.post("/shorten", authenticateToken, shortenUrl);

urlRouter.get("/:shortCode", redirectToOriginal);

urlRouter.get("/geturls", authenticateToken, getUserUrls);

urlRouter.post("/invalidate/:shortCode", authenticateToken, invalidateUrl);

urlRouter.delete("/delete/:shortCode", authenticateToken, deleteUrl);


export default urlRouter