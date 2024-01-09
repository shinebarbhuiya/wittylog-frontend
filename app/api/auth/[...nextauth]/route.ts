import NextAuth, { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from 'next-auth/react';

const rotationInterval = 10; // Rotation interval in seconds (5 minutes)

// To rotate the access token using the refresh token
async function refreshAccessToken(tokenObject: any) {
  console.log("Refreshing access token");
  console.log(tokenObject.access);
  try {
    // Get a new access token with a refreshToken
    const res = await fetch('http://localhost:8000/auth/jwt/refresh', {
      method: 'POST',
      body: JSON.stringify({ refresh: tokenObject.refresh }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      console.log("some error while refreshing token");

      // Use the signIn function to force a sign-in
      // If refresh token is invalid, then the server will not respond with 200 OK
      await signIn();
      return {
        ...tokenObject,
        error: 'RefreshAccessTokenError',
      };
    }

    // Parse the response and get the new access token
    const parsedResponse = await res.json();
    const access = parsedResponse.access;

    // set token expiry i.e current time + rotation interval(in seconds)
    const accessTokenExpiry = Math.floor(Date.now() / 1000) + rotationInterval;

    console.log("Refreshed successfully");

    // Return the new token object along with the access token expiry
    return {
      ...tokenObject,
      access,
      accessTokenExpiry
    };
  } catch (error) {
    console.log("some error while refreshing token");
    // If the refresh token is invalid, use the signIn function to force a sign-in
    await signIn();
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 15, // 15 days
  },
  pages: {
    signIn: '/login',
    // newUser: '/auth/new-user' // New users will be directed here on the first sign-in (leave the property out if not of interest)
  },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_SECRET_ID as string,
    // }),
    // Using Credentials for old school auth
    CredentialsProvider({
      // The name to display on the sign-in form (e.g. 'Sign in with...')
      name: "Credentials",
      // `credentials` is used to generate a form on the sign-in page
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "shine@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        try {
          const res = await fetch("http://localhost:8000/auth/jwt/create/", {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            }
          });

          if (!res.ok) {
            // Creds are invalid
            return null;
          }

          const parsedResponse = await res.json();

          // console.log(parsedResponse)

          const refresh = parsedResponse.refresh;
          const access = parsedResponse.access;

          // Get the user details
          const userRes = await fetch("http://localhost:8000/auth/users/me/", {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${access}`
            }
          });

          if (!userRes.ok) {
            return null;
          }

          const parsedUserResponse = await userRes.json();
          const me = parsedUserResponse;
          const accessTokenExpiry = Math.floor(Date.now() / 1000) + rotationInterval;

          return {
            ...credentials,
            access,
            refresh,
            me,
            accessTokenExpiry
          };
        } catch (error) {
          console.log(error);
        }
      }
    }),
  ],
  callbacks: {
    jwt: async ({ token, user } : { token: { accessTokenExpiry: number, [key: string]: any }, user: any }) => {
      if (user) {
        // This will only be executed at login. Each next invocation will skip this part.
        return {
          ...token,
          // jwt: user.jwt,
          access: user.access,
          refresh: user.refresh,
          me: user.me,
          accessTokenExpiry: user.accessTokenExpiry
        };
      }

      // If accessTokenExpiry is 5 hours, we have to refresh the token before 5 hours pass.
      // We set this shouldRefreshTime to 30 seconds before the accessTokenExpiry.
      const shouldRefreshTime = Math.round((token.accessTokenExpiry - 30) * 1000 - Date.now());

      // If the token is still valid, just return it.
      if (shouldRefreshTime > 0) {
        return token;
        // return Promise.resolve(token);
      }

      // If the call arrives after 23 hours have passed, we allow refreshing the token.
      token = await refreshAccessToken(token);
      return token;
    },
    session: async ({ session, token } : { session: any, token: any }) => {
      if (token) {
        // session.jwt = token.jwt
        session.access = token.access;
        // session.refresh = token.refresh
        session.me = token.me;
      }

      console.log("sessions running");

      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET as string,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
