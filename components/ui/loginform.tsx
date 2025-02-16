import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import { doc, setDoc, serverTimestamp, collection, getDoc } from "firebase/firestore"; 
import { auth, db, useAuthContext } from '@/context/authContext';
import { setPersistence, browserSessionPersistence, browserLocalPersistence } from 'firebase/auth';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, login } = useAuthContext();
  console.log("useAuthContext:", useAuthContext());

  const loginWithGoogle = async () => {
    try {
      console.log("Starting login process...");
      
      await setPersistence(auth, browserLocalPersistence)
        .then(async () => {
      await login();
      router.push('/main');
      if (!user) {
        console.error("User is not logged in");
        return;
      } 
      console.log("User logged in:", user);

      const usersCollection = collection(db, 'users');
      console.log("Fetching user collection...")
  
      const userRef = doc(usersCollection, user.uid);
      const docSnap = await getDoc(userRef);
      console.log("Fetched user document:", docSnap);
  
      if (!(docSnap).exists()) {
        console.log("User document does not exist, creating new one...");
        // User does not exist in Firestore, create a new document
        await setDoc(userRef, {
          username: user?.displayName || '',
          email: user.email,
          profilePicture: user.photoURL,
          bio: '',
          joinedAt: serverTimestamp(),
          premium: {
            isPremium: false,
            subscriptionType: '',
            subscriptionStart: null,
            subscriptionEnd: null
          },
          linkedDiscordId: '',
          lists: [],
          joinedCommunities: [],
          storyList: [],
          quelList: [],
          readingProgress: {
            stories: {},
            quels: {}
          }
        });
        console.log("User document created.");
      }
    }
  )
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  } catch (error) {
    console.error("Login process failed:", error);
  }
};

  const handleEmailSignIn = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/main');
    } catch (error) {
      const errorCode = (error as any).code;
      switch (errorCode) {
        case 'auth/user-not-found':
          setError('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Wrong password.');
          break;
        default:
          setError('An error occurred. Please try again.');
      }
    }
    setEmail('');
    setPassword('');
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full" onClick={handleEmailSignIn}>
            Login
          </Button>
          <Button variant="outline" className="w-full" onClick={loginWithGoogle}>
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
