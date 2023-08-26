import createHttpError from "http-errors";
import validator from "validator";
import { UserModel } from "../models/index.js";
import {DEFAULT_PROFILE_IMAGE, DEFAULT_STATUS} from '../utils/constant.utils.js'

export const createUser = async (userData) => {
  const { name, email, picture, status, password } = userData;

  if (!name || !email || !password) {
    throw createHttpError.BadRequest("Please fill all fields");
  }

  if (
    !validator.isLength(name, {
      min: 2,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure your name is between 2 and 16 characters."
    );
  }

  if (status) {
    if (status.length > 64) {
      throw createHttpError.BadRequest(
        "Please make sure your status is less than 64 characters"
      );
    }
  }

  if (!validator.isEmail(email)) {
    throw createHttpError.BadRequest(
      "Please make sure to provide a valid email address."
    );
  }

  const checkDb = await UserModel.findOne({ email });

  if (checkDb) {
    throw createHttpError.BadRequest(
      "Please try again with different email addresss, this email is already exist"
    );
  }

  if (
    !validator.isLength(password,{
      min: 6,
      max: 128,
    })
  ) {
    throw createHttpError.BadRequest(
      "Please make sure your password is between 6 and 128 characters."
    );
  }

  const user = await new UserModel({
    name,
    email,
    picture: picture || DEFAULT_PROFILE_IMAGE,
    status: status || DEFAULT_STATUS,
    password,
  }).save();
  return user;
};
