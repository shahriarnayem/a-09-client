function getAuthErrorMessage(error) {
  const errorMessages = {
    'auth/email-already-in-use':
      'An account already exists with this email address.',
    'auth/invalid-credential':
      'The email address or password is incorrect.',
    'auth/invalid-email':
      'Please enter a valid email address.',
    'auth/missing-password':
      'Please enter your password.',
    'auth/weak-password':
      'Please choose a stronger password.',
    'auth/popup-blocked':
      'The sign-in window was blocked by your browser.',
    'auth/popup-closed-by-user':
      'The sign-in window was closed before completion.',
    'auth/cancelled-popup-request':
      'Only one sign-in window can be opened at a time.',
    'auth/network-request-failed':
      'Please check your internet connection and try again.',
    'auth/too-many-requests':
      'Too many attempts were made. Please try again later.',
    'auth/unauthorized-domain':
      'This website address is not authorized for sign-in.',
    'auth/user-disabled':
      'This account is currently unavailable.',
  };

  return (
    errorMessages[error?.code] ||
    error?.message ||
    'We could not complete your request. Please try again.'
  );
}

export default getAuthErrorMessage;