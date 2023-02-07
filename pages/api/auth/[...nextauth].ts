import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prismadb";
import bcrypt from "bcrypt";

export const authOptions = {
	session: {
		strategy: "jwt",
		// strategy: "database",
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialProvider({
			credentials: {
				userId: { label: "userId", type: "text" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.userId || !credentials.password) {
					throw new Error("Invalid Email or Password");
				}

				const { userId, password } = credentials;

				console.log({ userId, password });

				const user = await prisma.user.findUnique({
					where: { userId: userId },
				});

				if (!user) {
					throw new Error("Invalid Email or Password");
				}

				if (!user.password) {
					throw new Error("Invalid Signin Option");
				}

				const isPasswordMatched = await bcrypt.compare(
					password,
					user.password
				);

				if (!isPasswordMatched) {
					throw new Error("Invalid Email or Password");
				}

				return user;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		AppleProvider({
			clientId: process.env.APPLE_CLIENT_ID!,
			clientSecret: process.env.APPLE_CLIENT_SECRET!,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID!,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
		}),
	],
	pages: {
		signIn: "/auth/login",
	},
	secret: process.env.NEXTAUTH_SECRET,

	// callbacks: {
	// 	async jwt({ token, account }) {
	// 		// Persist the OAuth access_token to the token right after signin
	// 		if (account) {
	// 			token.accessToken = account.access_token;
	// 		}
	// 		return token;
	// 	},
	// 	async session({ session, token, user }) {
	// 		// Send properties to the client, like an access_token from a provider.
	// 		session.user = user;
	// 		return session;
	// 	},
	// },
};

export default NextAuth({ ...authOptions, session: { strategy: "jwt" } });
