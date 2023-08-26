import createHttpError from "http-errors";
import { createUser, signUser } from "../services/auth.service.js";
import { verifyToken, getToken } from "../services/token.service.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, picture, status, password } = req.body;

    const newUser = await createUser({
      name,
      email,
      picture,
      status,
      password,
    });

    const { access_token, refresh_token } = await getToken(newUser._id);

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json({
      message: "register success",
      access_token,
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await signUser(email, password);

    const { access_token, refresh_token } = await getToken(user._id);

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/v1/auth/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.json({
      message: "login success",
      access_token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("refreshtoken", {
      path: "/api/v1/auth/refreshtoken",
    });
    res.json({
      message: "logged out!",
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refreshtoken;
    if (!refresh_token) throw createHttpError.Unauthorized("Please login");

    const check = await verifyToken(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET
    );
    res.send(check);
  } catch (error) {
    next(error);
  }
};
