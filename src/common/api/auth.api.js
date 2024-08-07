import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";

export const signupAPI = (data) => {

    try {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            resolve({ message: 'Email verification sent!', user: user })
                        })
                        .catch((error) => {
                            reject({ message: error.code });
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    if (errorCode.localeCompare("auth/email-already-in-use") === 0) {
                        reject({ message: "Email ID already used.!" })
                    } else if (errorCode.localeCompare("auth/weak-password") === 0) {
                        reject({ message: "Password is too short - should be 6 character..." })
                    }
                });
        })
    } catch (error) {
        console.log(error);
    }
}

export const loginAPI = (values) => {
    try {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, values.email, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    if (user.emailVerified) {
                        resolve({ message: 'Login Successfully', user: user });
                    } else {
                        reject({ message: 'Your added email is not verified.' })
                    }
                })
                .catch((error) => {
                    const errorCode = error.code;

                    if (errorCode.localeCompare('auth/invalid-login-credentials') === 0) {
                        reject({ message: 'Your Email and Password Invalid.' })
                    }
                });
        })
    } catch (error) {
        console.log(error)
    }
}

export const forgotPassAPI = (data) => {
    try {
        return new Promise((resolve, reject) => {
            sendPasswordResetEmail(auth, data.email)
                .then(() => {
                    resolve({ message: 'Password reset email sent!' });
                })
                .catch((error) => {
                    if (error.code.localeCompare('auth/user-not-found') === 0) {
                        reject({ message: 'Please enter your registred email address.' })
                    } else if (error.code.localeCompare('auth/network-request-failed') === 0) {
                        reject({ message: 'Please check your internet connection.' })
                    }
                });
        })
    } catch (error) {
        console.log(error)
    }
}

export const logoutAPI = () => {
    try {
        return new Promise((resolve, reject) => {
            signOut(auth).then(() => {
                resolve({ message: 'Logout Successfully.' });
            }).catch((error) => {
                reject({ message: error.code })
            });
        })
    } catch (error) {
        console.log(error)
    }
}