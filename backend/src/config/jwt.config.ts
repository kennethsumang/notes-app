export interface JwtConfig {
  secret: string;
}

export const config: JwtConfig = {
  secret: process.env.JWT_SECRET as string,
};
