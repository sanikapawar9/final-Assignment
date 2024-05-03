// creating database of users
const users = {}; 

const AuthService = {
  // Signup 
  signup: (email, password) => {
    // if user having same email already exists
    if (users[email]) {
      throw new Error('Email already exists. Please use a different email.');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Create a new user
    users[email] = { email, password };
  },

  // Login user
  login: (email, password) => {
    // if user does not exists
    const user = users[email];
    if (!user) {
      throw new Error('User does not exist. Please sign up first.');
    }

    if (user.password !== password) {
      throw new Error('Incorrect password. Please try again.');
    }

    return true;
  }
};

export default AuthService;
