import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmailFun from '../config/sendEmail.js';
import VerificationEmail from '../utils/verifyEmailTemplate.js';
import generatedAccessToken from '../utils/generatedAccessToken.js';
import generatedRefreshToken from '../utils/generatedRefreshToken.js';

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import ReviewModel from '../models/review.model.js';

cloudinary.config({
    cloud_name: process.env.cloudinary_Config_Cloud_Name,
    api_key: process.env.cloudinary_Config_api_key,
    api_secret: process.env.cloudinary_Config_api_secret,
    secure: true
});

export async function registerUserController(request, response) {
    try {
        let user;

        const { name, email, password } = request.body;
        if (!name || !email || !password) {
            return response.status(400).json({
                message: "Provide email, name, password",
                error: true,
                success: false
            })
        }

        user = await UserModel.findOne({ email: email });

        if (user) {
            return response.json({
                message: "Already registered with this email",
                error: true,
                success: false
            })
        }

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        user = new UserModel({
            email: email,
            password: hashPassword,
            name: name,
            otp: verifyCode,
            otpExpires: Date.now() + 600000
        });

        await user.save();

        //Send verification email
        await sendEmailFun({
            to: email,
            subject: "Verify email from Ecommerce App",
            text: "",
            html: VerificationEmail(name, verifyCode)
        })

        //Create a JWT token for verification purposes
        const token = jwt.sign(
            {
                email: user.email,
                id: user._id
            },
            process.env.JSON_WEB_TOKEN_SECRET_KEY
        )

        return response.status(200).json({
            success: true,
            error: false,
            message: "User registered successfully! Please verify your email.",
            token: token, //Optional: include this if needed for verification
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function verifyEmailController(request, response) {
    try {
        const { email, otp } = request.body;

        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return response.status(400).json({
                error: true,
                success: false,
                message: "User not found."
            });
        }

        const isCodeValid = user.otp === otp;
        const isNotExpired = user.otpExpires > Date.now();

        if (isCodeValid && isNotExpired) {
            user.verify_email = true;
            user.otp = null;
            user.otpExpires = null;
            await user.save();
            return response.status(200).json({
                error: false,
                success: true,
                message: "Email verified successfully."
            });
        } else if (!isCodeValid) {
            return response.status(400).json({
                error: true,
                success: false,
                message: "Invalid OTP"
            });
        } else {
            return response.status(400).json({
                error: true,
                success: false,
                message: "OTP exprired."
            });
        }
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function authWithGoogleController(request, response) {
    const { name, email, avatar, mobile, role } = request.body;

    try {
        const existingUser = await UserModel.findOne({ email: email });
        if (!existingUser) {
            const user = await UserModel.create({
                name: name,
                mobile: mobile,
                email: email,
                password: 'null',
                avatar: avatar,
                role: role,
                verify_email: true,
                signUpWithGoogle: true
            });

            await user.save();

            const accessToken = await generatedAccessToken(user._id);
            const refreshToken = await generatedRefreshToken(user._id);

            await UserModel.findByIdAndUpdate(
                user?._id,
                { last_login_date: new Date() }
            )

            const cookiesOption = {
                httpOnly: true,
                secure: true,
                sameSite: "None"
            }
            response.cookie('accessToken', accessToken, cookiesOption);
            response.cookie('refreshToken', refreshToken, cookiesOption);

            return response.status(200).json({
                message: 'Login successfully',
                error: false,
                success: true,
                data: {
                    accessToken,
                    refreshToken
                }
            });
        } else {
            const accessToken = await generatedAccessToken(existingUser._id);
            const refreshToken = await generatedRefreshToken(existingUser._id);

            await UserModel.findByIdAndUpdate(
                existingUser?._id,
                { last_login_date: new Date() }
            )

            const cookiesOption = {
                httpOnly: true,
                secure: true,
                sameSite: "None"
            }
            response.cookie('accessToken', accessToken, cookiesOption);
            response.cookie('refreshToken', refreshToken, cookiesOption);

            return response.status(200).json({
                message: 'Login successfully',
                error: false,
                success: true,
                data: {
                    accessToken,
                    refreshToken
                }
            });
        }
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function loginUserController(request, response) {
    try {
        const { email, password } = request.body;

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            response.status(400).json({
                message: "User not registered",
                error: true,
                success: false
            })
        }

        if (user.status !== "Active") {
            response.status(400).json({
                message: "Contact to admin",
                error: true,
                success: false
            })
        }

        if (user.verify_email !== true) {
            response.status(400).json({
                message: "Your email haven't been verified yet.",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcryptjs.compare(password, user.password);

        if (!checkPassword) {
            response.status(400).json({
                message: "Check your password",
                error: true,
                success: false
            })
        }

        const accessToken = await generatedAccessToken(user._id);
        const refreshToken = await generatedRefreshToken(user._id);

        await UserModel.findByIdAndUpdate(
            user?._id,
            { last_login_date: new Date() }
        )

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        response.cookie('accessToken', accessToken, cookiesOption);
        response.cookie('refreshToken', refreshToken, cookiesOption);

        return response.status(200).json({
            message: 'Login successfully',
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export async function logoutController(request, response) {
    try {
        const userId = request.userId;

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        response.clearCookie("accessToken", cookiesOption);
        response.clearCookie("refreshToken", cookiesOption);

        const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
            refreshToken: ''
        })

        return response.json({
            message: "Logout successfully",
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

var imagesArr = [];
export async function userAvatarController(request, response) {
    try {
        imagesArr = [];

        const userId = request.userId; //auth middleware
        const image = request.files;

        const user = await UserModel.findOne({ _id: userId });
        if (!user) {
            response.status(500).json({
                message: "User not found",
                error: true,
                success: false
            })
        }
        //First remove image from cloudinary
        const imgUrl = user.avatar;
        const urlArr = imgUrl.split("/");
        const avatar_image = urlArr[urlArr.length - 1];
        const imageName = avatar_image.split(".")[0];

        if (imageName) {
            const res = await cloudinary.uploader.destroy(
                imageName,
                (error, result) => {

                }
            );
        }


        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false
        };

        for (let i = 0; i < image?.length; i++) {
            const img = await cloudinary.uploader.upload(
                image[i].path,
                options,
                function (error, result) {
                    imagesArr.push(result.secure_url);
                    fs.unlinkSync(`uploads/${request.files[i].filename}`);
                }
            );
        }

        user.avatar = imagesArr[0];
        await user.save();

        return response.status(200).json({
            _id: userId,
            avtar: imagesArr[0]
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function removeImageFromCloudinaryController(request, response) {
    const imgUrl = request.query.img;
    const urlArr = imgUrl.split("/");
    const image = urlArr[urlArr.length - 1];
    const imageName = image.split(".")[0];

    if (imageName) {
        const res = await cloudinary.uploader.destroy(
            imageName,
            (error, result) => {

            }
        );

        if (res) {
            response.status(200).send(res);
        }
    }

}

export async function updateUserDetailsController(request, response) {
    try {
        const userId = request.userId;
        const { name, email, mobile, password } = request.body;

        const userExit = await UserModel.findById(userId);
        if (!userExit) {
            return response.status(400).send('The user cannot be updated!');
        }

        let verifyCode = "";
        if (email !== userExit.email) {
            verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        }

        let hashPassword = "";
        if (password) {
            const salt = await bcryptjs.genSalt(10);
            hashPassword = await bcryptjs.hash(password, salt);
        } else {
            hashPassword = userExit.password;
        }

        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            {
                name: name,
                mobile: mobile,
                email: email,
                verify_email: email !== userExit.email ? false : true,
                password: hashPassword,
                otp: verifyCode !== "" ? verifyCode : null,
                otpExpires: verifyCode !== "" ? Date.now() + 600000 : ''
            },
            {
                new: true
            }
        );

        if (email !== userExit.email) {
            //Send verification email
            await sendEmailFun({
                to: email,
                subject: "Verify email from Ecommerce App",
                text: '',
                html: VerificationEmail(name, verifyCode)
            })
        }


        return response.json({
            message: "User updated successfully.",
            error: false,
            success: true,
            user: {
                name: updateUser?.name,
                _id: updateUser?._id,
                email: updateUser?.email,
                mobile: updateUser?.mobile,
                avatar: updateUser?.avatar
            }
        });



    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function forgotPasswordController(request, response) {
    try {
        const { email } = request.body;

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        } else {

            let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

            user.otp = verifyCode;
            user.otpExpires = Date.now() + 600000;

            await user.save();

            await sendEmailFun({
                to: email,
                subject: "Verify OTP from Ecommerce App",
                text: '',
                html: VerificationEmail(user.name, verifyCode)
            })

            return response.json({
                message: "Check your mail",
                error: false,
                success: true
            })
        }

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function verifyForgotPasswordOtpController(request, response) {
    try {
        const { email, otp } = request.body;

        const user = await UserModel.findOne({ email: email });

        if (!user) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }

        if (!email || !otp) {
            return response.status(400).json({
                message: "Provide required field email, otp.",
                error: true,
                success: false
            })
        }

        if (otp !== user.otp) {
            return response.status(400).json({
                message: "Invalid OTP",
                error: true,
                success: false
            })
        }

        const currentTime = new Date().toISOString();
        if (user.otpExpires < currentTime) {
            return response.status(400).json({
                message: "OTP expired",
                error: true,
                success: false
            })
        }

        user.otp = '';
        user.otpExpires = '';

        await user.save();


        return response.status(200).json({
            message: "OTP verified successfully.",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function resetPasswordController(request, response) {
    try {
        const { email, oldPassword, newPassword, confirmPassword } = request.body;
        if (!email || !newPassword || !confirmPassword) {
            return response.status(400).json({
                message: "Provide required fields email, newPassword, confirmPassword",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({
                message: "Email is not available",
                error: true,
                success: false
            })
        }

        if (!oldPassword && user?.signUpWithGoogle === false) {
            return response.status(400).json({
                message: "Provide required fields.",
                error: true,
                success: false
            })
        }

        const checkPassword = await bcryptjs.compare(oldPassword, user.password);
        if (!checkPassword) {
            return response.status(400).json({
                message: "Your old password is wrong.",
                error: true,
                success: false
            })
        }

        if (newPassword !== confirmPassword) {
            return response.status(400).json({
                message: "newPassword and confirmPassword must be same",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(confirmPassword, salt);
        user.password = hashPassword;
        await user.save();

        return response.json({
            message: "Password updated successfully.",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function resetPasswordController2(request, response) {
    try {
        const { email, newPassword, confirmPassword } = request.body;
        if (!email || !newPassword || !confirmPassword) {
            return response.status(400).json({
                message: "Provide required fields email, newPassword, confirmPassword",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return response.status(400).json({
                message: "Email is not available",
                error: true,
                success: false
            })
        }

        if (newPassword !== confirmPassword) {
            return response.status(400).json({
                message: "newPassword and confirmPassword must be same",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(confirmPassword, salt);
        user.password = hashPassword;
        await user.save();

        return response.json({
            message: "Password updated successfully.",
            error: false,
            success: true
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

//refresh token
export async function refreshTokenController(request, response) {
    try {
        const refreshToken = request.cookies.refreshToken || request?.headers?.authorization?.split(" ")[1]; // [Bearer token]
        if (!refreshToken) {
            return response.status(401).json({
                message: "Invalid token",
                error: true,
                success: false
            });
        }

        const verifyToken = await jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN);
        if (!verifyToken) {
            return response.status(401).json({
                message: "Token expired",
                error: true,
                success: false
            });
        }

        const userId = verifyToken?._id;
        const newAccessToken = await generatedAccessToken(userId);
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        };
        response.cookie('accessToken', newAccessToken, cookiesOption);

        return response.json({
            message: "New access token generated.",
            error: false,
            success: true,
            data: {
                accessToken: newAccessToken
            }
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

//get login user details
export async function userDetailsController(request, response) {
    try {
        const userId = request.userId;
        const user = await UserModel.findById(userId).select('-password -refresh_token').populate('address_details');

        return response.json({
            message: "User details",
            data: user,
            error: false,
            success: true
        })


    } catch (error) {
        return response.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false
        });
    }
}


export async function addReviewController(request, response) {
    try {
        const { image, userName, review, rating, userId, productId } = request.body;

        const userReview = new ReviewModel({
            image: image,
            userName: userName,
            review: review,
            rating: rating,
            userId: userId,
            productId: productId
        });

        await userReview.save();

        return response.status(200).json({
            message: 'Review added successfully',
            error: false,
            success: true
        });


    } catch (error) {
        return response.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false
        });
    }

}


export async function getReviewsController(request, response) {
    try {
        const productId = request.query.productId;

        const reviews = await ReviewModel.find({ productId: productId });
        if (!reviews) {
            return response.status(400).json({
                message: "Review not found",
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            error: false,
            success: true,
            reviews: reviews
        });

    } catch (error) {
        return response.status(500).json({
            message: "Something is wrong",
            error: true,
            success: false
        });
    }
}