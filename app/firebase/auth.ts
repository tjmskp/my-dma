import { auth } from './config';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  UserCredential,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  AuthError
} from 'firebase/auth';

export const signUp = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
};

interface GoogleSignInResult {
  userCredential: UserCredential;
  accessToken: string | null;
}

export const signInWithGoogle = async (): Promise<GoogleSignInResult> => {
  try {
    const provider = new GoogleAuthProvider();
    // Add Google Ads API scope
    provider.addScope('https://www.googleapis.com/auth/adwords');
    
    // Optional: Add other useful scopes
    provider.addScope('https://www.googleapis.com/auth/userinfo.email');
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    
    const result = await signInWithPopup(auth, provider);
    
    // Get the Google Access Token
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken || null;

    return {
      userCredential: result,
      accessToken
    };
  } catch (error) {
    const authError = error as AuthError;
    // Handle specific error cases
    switch (authError.code) {
      case 'auth/popup-blocked':
        throw new Error('Please enable popups for this website to sign in with Google');
      case 'auth/popup-closed-by-user':
        throw new Error('Sign-in cancelled. Please try again');
      case 'auth/cancelled-popup-request':
        throw new Error('Another sign-in attempt is in progress');
      case 'auth/unauthorized-domain':
        throw new Error('This domain is not authorized for Google sign-in');
      default:
        throw error;
    }
  }
};

interface FacebookSignInResult {
  userCredential: UserCredential;
  accessToken: string | null;
}

export const signInWithFacebook = async (): Promise<FacebookSignInResult> => {
  try {
    const provider = new FacebookAuthProvider();
    // Add Meta Ads API scopes
    provider.addScope('ads_management');
    provider.addScope('ads_read');
    provider.addScope('business_management');
    
    // Optional: Add other useful scopes
    provider.addScope('email');
    provider.addScope('public_profile');
    
    const result = await signInWithPopup(auth, provider);
    
    // Get the Facebook Access Token
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken || null;

    return {
      userCredential: result,
      accessToken
    };
  } catch (error) {
    const authError = error as AuthError;
    // Handle specific error cases
    switch (authError.code) {
      case 'auth/popup-blocked':
        throw new Error('Please enable popups for this website to sign in with Facebook');
      case 'auth/popup-closed-by-user':
        throw new Error('Sign-in cancelled. Please try again');
      case 'auth/cancelled-popup-request':
        throw new Error('Another sign-in attempt is in progress');
      case 'auth/unauthorized-domain':
        throw new Error('This domain is not authorized for Facebook sign-in');
      case 'auth/account-exists-with-different-credential':
        throw new Error('An account already exists with the same email address but different sign-in credentials');
      default:
        throw error;
    }
  }
}; 