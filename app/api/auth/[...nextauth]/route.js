import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/user";
import { dbConnect } from "@/utils/db";

const handler = NextAuth({
  // Use JSON Web Tokens for session management.
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Connect to the database.
        await dbConnect();

        // Find the user by email.
        const user = await User.findOne({
          email: credentials.email,
        }).select("+password");

        // If the user is not found, throw an error.
        if (!user) {
          throw new Error("No user with a matching Email was found.");
        }

        // Check if the password is valid.
        const pwValid = await user.comparePassword(credentials.password);
        if (!pwValid) {
          throw new Error("Your password is invalid");
        }

        // Return the user object for the session.
        return {
          _id: user._id,
          fname: user.fname,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    // This callback is called whenever a JWT is created or updated.
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    // This callback is called whenever a session is checked.
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
});

export { handler as GET, handler as POST };
