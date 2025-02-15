import { NextFunction, Response, Request } from "express";
import UrlModel from "../models/url.model";
import { AuthRequest } from "../middleware/auth.middlweare";
import { originalUrlSchema } from "../middleware/url.validate.middleware";


export const shortenUrl = async (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log(req.user)
  const { error } = originalUrlSchema.validate(req.body);
  if (error){
    res.status(400).json({
      message: error.details[0].message
    })
    return next(new Error(error.details[0].message))
  }
  try {
    const { originalUrl } = req.body;
    const userId = req.user?.id;
    if (!originalUrl) {
      return next(new Error("No URL provided to shorten!"))
    }
    const existingUrl = await UrlModel.findOne({ originalUrl, userId })
    if (existingUrl) {
      return res.status(200).json({
        shortUrl: existingUrl.shortUrl
      })
    }
    const { nanoid } = await import ("nanoid");
    const shortCode = nanoid(6);

    const newUrl = await UrlModel.create({
      userId,
      originalUrl,
      shortUrl: `https://www.jdjdj/${shortCode}`,
      isValid: true,
    })
    return res.status(201).json({
      shortUrl: newUrl.shortUrl
    })
  }
  catch(error) {
    next(error)
  }
};

export const redirectToOriginal = async (req: Request, res: Response) => {
  try {
    const { shortCode } = req.params; // Extract the shortCode from the URL

    // Find the corresponding original URL in the database
    const existingUrl = await UrlModel.findOne({ shortCode });

    // If no record is found or it's invalid, return an error
    if (!existingUrl || !existingUrl.isValid) {
      return res.status(404).json({ message: "Shortened URL not found or invalid" });
    }

    // Redirect to the original URL
    return res.redirect(existingUrl.originalUrl);
  } catch (error) {
    console.error("Error in redirectToOriginal:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserUrls = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id; // Extract user ID from authentication middleware

    // Find all URLs belonging to this user
    const urls = await UrlModel.find({ userId });

    return res.json({
      success: true,
      data: urls, // Send back the list of URLs
    });
  } catch (error) {
    console.error("Error in getUserUrls:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const invalidateUrl = async (req: AuthRequest, res: Response) => {
  try {
    const { shortCode } = req.params; // Extract shortCode from request
    const userId = req.user?.id; // Extract user ID

    // Find the URL that matches the shortCode and belongs to the user
    const urlRecord = await UrlModel.findOne({ shortCode, userId });

    if (!urlRecord) {
      return res.status(404).json({ message: "URL not found or does not belong to you" });
    }

    // Mark the URL as invalid
    urlRecord.isValid = false;
    await urlRecord.save();

    return res.json({ message: "URL has been invalidated" });
  } catch (error) {
    console.error("Error in invalidateUrl:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUrl = async (req: AuthRequest, res: Response) => {
  try {
    const { shortCode } = req.params; // Extract shortCode from request
    const userId = req.user?.id; // Extract user ID

    // Find and delete the URL only if it belongs to the user
    const result = await UrlModel.findOneAndDelete({ shortCode, userId });

    if (!result) {
      return res.status(404).json({ message: "URL not found or does not belong to you" });
    }

    return res.json({ message: "URL has been deleted" });
  } catch (error) {
    console.error("Error in deleteUrl:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
