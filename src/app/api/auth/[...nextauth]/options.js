import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import connectToDB from "@/lib/connect";
export const authOptions = {
  pages: {
    signIn: "/",
  },

  callbacks: {
    async signIn({ user }) {
      try {
        const db = await connectToDB();
        const collection = db.collection("users");
        console.log("user", user);
        const findUser = await collection.findOne({ email: user.email });
        if (findUser && findUser.role === "admin") {
          return true;
        }
      } catch (error) {
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        user.role = "admin";
        token.user = user;
      }
      console.log("token", token);
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
        console.log(email, password);
        const db = await connectToDB();
        const collection = db.collection("users");
        const user = await collection.findOne({ email: email });

        if (!user) {
          throw new Error("Invalied credentials");
        }
        const ispasswordOk = await compare(password, user.password);
        if (!ispasswordOk) {
          throw new Error("Invalied credentials");
        }

        return user;
      },
    }),
  ],
};
