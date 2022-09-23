import { PayloadToken } from "../interfaces/auth.interface";
import { AuthService } from "../services/auth.service";
import { PassportUse } from "../utils/passport.use";
import { Strategy as JwtStr, StrategyOptions, ExtractJwt } from "passport-jwt";

export class JwtStrategy extends AuthService {
  constructor() {
    super();
  }

  async validate(payload: PayloadToken, done: any) {
    return done(null, payload);
  }

  get use() {
    return PassportUse<
      JwtStr,
      StrategyOptions,
      (payload: PayloadToken, done: any) => Promise<PayloadToken>
    >(
      "jwt",
      JwtStr,
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.getEnvaironment("JWT_SECRET"),
        ignoreExpiration: false,
      },
      this.validate
    );
  }
}
