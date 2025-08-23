const createUser = require("../services/authService");

const signUp = async (req, res) => {
  const { name, email, password, companyName } = req.body;

  const { user, token } = await createUser({
    name,
    email,
    password,
    companyName,
  });

  console.log({ user });

  res.status(201).json({
    message: `User ${user.name} registered successfully!`,
    user,
    token,
  });
};

module.exports = { signUp };
