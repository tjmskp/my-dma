import { useState } from 'react';
import { signInWithFacebook } from '../firebase/auth';

export default function FacebookSignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFacebookSignIn = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { userCredential, accessToken } = await signInWithFacebook();
      
      // Store the access token securely (you might want to use a state management solution)
      if (accessToken) {
        // You can store this token in your application state or secure storage
        console.log('Meta Ads API Access Token:', accessToken);
      }

      // You can access user information from the credential
      const user = userCredential.user;
      console.log('Signed in user:', user.email);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleFacebookSignIn}
        disabled={isLoading}
        className={`
          flex items-center gap-2 px-6 py-2 
          bg-[#1877F2] text-white
          rounded-md shadow-sm hover:bg-[#0C63D4] 
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1877F2]
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
        `}
      >
        {/* Facebook Icon */}
        <svg
          className="w-5 h-5 fill-current"
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        {isLoading ? 'Signing in...' : 'Sign in with Facebook'}
      </button>
      
      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
} 