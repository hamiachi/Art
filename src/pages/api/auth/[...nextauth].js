// pages/api/auth/[...nextauth].js

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';

const clientPromise = MongoClient.connect(process.env.MONGODB_URI);

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const client = await clientPromise;
      const db = client.db();

      const existingUser = await db.collection('users').findOne({ email: user.email });
      if (!existingUser) {
        // Mã hóa email bằng bcrypt
        const saltRounds = 10;
        const hashedEmail = await bcrypt.hash(user.email, saltRounds);

        // Mã hóa email bằng CryptoJS
        const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
        const encryptedEmail = CryptoJS.AES.encrypt(user.email, secretKey).toString();

        // Lưu token vào localStorage và sessionStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', hashedEmail);
          sessionStorage.setItem('token', encryptedEmail);
        }

        // Lưu thông tin người dùng vào MongoDB
        await db.collection('users').insertOne({
          username: user.name,
          email: user.email,
          password: '', // No password needed as it's an OAuth user
        });
      }
      return true;
    },
    async session({ session, token, user }) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: null,
  },
});
