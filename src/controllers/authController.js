const { createUser, userLogin } = require("../services/authService");

const signUp = async (req, res) => {
  const { name, email, password, companyName } = req.body;

  const { user, token } = await createUser({
    name,
    email,
    password,
    companyName,
  });

  res.status(201).json({
    message: `User ${user.name} registered successfully!`,
    user,
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await userLogin({email, password});

  res.status(200).json({
    message: "Login Successful!",
    user: {
      id: user._id,
      email: user.email,
      plan: user.plan,
      companyName: user.companyName,
    },
    token,
  });
};

module.exports = { signUp, login };
