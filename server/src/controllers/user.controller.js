import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";

const options = {
  httpOnly: true,
  secure: true,
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findOne(userId);

    if (!user) {
      throw new apiError(404, 'Invalid User Request');
    }

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new apiError(
      500,
      error.message || 'Something went wrong while genrating refresh and access tokens'
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, avatarURL } = req.body;

  if (
    [username, email, password].some((field) => !field || field.trim() === "")
  ) {
    throw new apiError(400, "Username, email, and password are required");
  }

  const isUserExist = await User.findOne({ $or: [{ username }, { email }] });

  if (isUserExist) {
    throw new apiError(400, "User already exists");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password,
    avatarURL,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new apiResponse(201, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new apiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    throw new apiError(404, "User with entered email does not exist");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new apiError(401, "Invalid user credentials");
  }
  const createdUser = user.toObject();
  delete createdUser.password;
  delete createdUser.refreshToken;
  delete createdUser.lastOnline;

  if (!createdUser) {
    throw new apiError(500, "Something went wrong while logging in the user");
  }

  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user?._id
  );

  if (!refreshToken || !accessToken) {
    throw new apiError(
      500,
      "Something went wrong in getting access and refresh tokens"
    );
  }

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: createdUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: { refreshToken: 1 }, // Using $unset is better for removing a field
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
