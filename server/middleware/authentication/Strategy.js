import passport from "passport";
import JWT from "passport-jwt";
import User from "../../db/schema/UserSchema";

const { SKEY } = process.env;

const opts = {
  jwtFromRequest: JWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SKEY
};

passport.use(
  new JWT.Strategy(opts, ({ user: { email } }, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

export default {
  init: passport.initialize(),
  authenticate: passport.authenticate("jwt", { session: false })
};
