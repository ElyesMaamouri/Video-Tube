exports.loginFailedGoogle_get = (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
};

exports.loginSuccessGoogle_get = (req, res) => {
  console.log("loginSuccessGoogle_get");
  // console.log("user", req.user);
  res.redirect("/dashboard");
  // res.status(200).json({
  //   success: true,
  //   message: "successful",
  //   user: req.user,
  // });
};
