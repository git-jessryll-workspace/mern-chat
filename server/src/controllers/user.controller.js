import createHttpError from "http-errors";
import { searchUsers as searchUsersService } from "../services/user.service.js";

export const searchUsers = async (req, res, nextF) => {
  try {
    const keyword = req.query.search;

    if (!keyword) {
      throw createHttpError.BadRequest("Please add a search term first.");
    }
    const users = await searchUsersService(keyword, req.user.userId);
    res.status(200).json(users);
  } catch (error) {
    nextF(error);
  }
};
