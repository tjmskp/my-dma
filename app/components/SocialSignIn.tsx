import GoogleSignInButton from './GoogleSignInButton';
import FacebookSignInButton from './FacebookSignInButton';

export default function SocialSignIn() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
        <p className="mt-2 text-sm text-gray-600">
          Choose your preferred sign-in method
        </p>
      </div>
      
      <GoogleSignInButton />
      
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or</span>
        </div>
      </div>
      
      <FacebookSignInButton />
      
      <p className="mt-4 text-xs text-center text-gray-600">
        By signing in, you agree to our Terms of Service and Privacy Policy.
        Your data will be used to personalize your experience and manage your advertising accounts.
      </p>
    </div>
  );
} 