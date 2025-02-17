import { shortenUrl } from "../src/controller/url.controller";
import { Request, Response } from "express";
import { Url } from "../src/models/url.model";

// Mock Request and Response objects
const mockRequest = (body = {}, user = {}) => ({
  body,
  user,
} as Request);

const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Shorten URL", () => {
  it("should return 400 if no URL is provided", async () => {
    const req = mockRequest({}, { id: "user123" });
    const res = mockResponse();

    await shortenUrl(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Original URL is required" });
  });

  it("should return 201 and shorten the URL", async () => {
    const req = mockRequest({ originalUrl: "https://example.com" }, { id: "user123" });
    const res = mockResponse();

    await shortenUrl(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ shortUrl: expect.any(String) }));
  });
});
