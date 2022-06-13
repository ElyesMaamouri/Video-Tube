module.exports = (app) => {
  const passport = require("passport");
  const authControl = require("../controllers/auth");

  // app.get("/login/failed", authControl.loginFailedGoogle_get);
  // app.get("/login/success", authControl.loginSuccessGoogle_get);
  app.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/",
    }),
    authControl.loginSuccessGoogle_get
  );
};
