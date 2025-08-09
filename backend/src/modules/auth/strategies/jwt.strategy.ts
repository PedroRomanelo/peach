import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { supabaseClient } from '../../../config/supabase.config';
import { User, AuthError } from '@supabase/supabase-js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.SUPABASE_JWT_SECRET;

    if (!secret) {
      throw new UnauthorizedException('SUPABASE_JWT_SECRET is not defined');
    }

    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    };
    super(options);
  }

  async validate(payload: { sub: string }): Promise<User> {
    try {
      // eslint-disable-next-line prettier/prettier
     const { data, error } : { data: { user: User | null }, error: AuthError | null } = await supabaseClient.auth.getUser(payload.sub);

      if (error) {
        throw new UnauthorizedException('Invalid token'); // 401
      }

      if (!data.user) {
        throw new NotFoundException('User not found'); // 404
      }

      return data.user;
    } catch (err) {
      console.error('Authentication failed:', err);
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
