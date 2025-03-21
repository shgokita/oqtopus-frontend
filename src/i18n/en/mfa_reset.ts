export default {
  title: 'MFA reset request',
  form: {
    mail: 'Email address',
    password: 'Password',
    error_message: {
      mail_address_enter: 'Please enter your email address',
      mail_address_valid: 'Please enter a valid email address',
      password: 'Please enter your password',
    },
  },
  button: 'Send',
  alert: {
    success: 'Your request has been accepted.',
    failure: 'Failed to authenticate.',
  },
};
