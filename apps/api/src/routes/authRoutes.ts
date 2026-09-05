import {
  Router,
} from "express";

import {
  register,
  login,
  logout,
} from "../controllers/AuthController.js";

import {
  validate,
} from "../middleware/validate.js";

import {
  authRateLimiter,
} from "../middleware/rateLimiter.js";

import {
  registerSchema,
  loginSchema,
} from "../validators/authSchemas.js";

import {
  asyncHandler,
} from "../utils/asyncHandler.js";

import {
  authenticate,
} from "../middleware/authenticate.js";

const router =
  Router();

router.post(
  "/register",
  authRateLimiter,
  validate(registerSchema),
  asyncHandler(register),
);

router.post(
  "/login",
  authRateLimiter,
  validate(loginSchema),
  asyncHandler(login),
);
router.post(
  "/logout",
  authenticate,
  asyncHandler(logout),
);
export default router;