"use client";
import React, { useState } from "react";
import { Label } from "./label"
import { Input } from "./input";
import { cn } from "@/lib/utils";
import {
  IconBrandGoogle,
} from "@tabler/icons-react";
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import { doc, setDoc, serverTimestamp, collection, getDoc } from "firebase/firestore"; 
import { auth, db, useAuthContext } from '@/context/authContext';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { user , login } = useAuthContext();

  const SignUpWithGoogle = async () => {
    try {
      console.log("Starting login process...");
      const user = await login(); // Ensure to capture the returned user object
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
  
      if (!(docSnap.exists())) {
        console.log("User document does not exist, creating new one...");
        // User does not exist in Firestore, create a new document
        await setDoc(userRef, {
          username: user.displayName,
          email: user.email,
          profilePicture: user.photoURL || 'https://static-cdn.jtvnw.net/user-default-pictures-uv/294c98b5-e34d-42cd-a8f0-140b72fba9b0-profile_image-70x70.png',
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
  
      console.log("Redirecting to /main...");
      router.push('/main');
      console.log("Redirected.");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  const handleEmailSignUp = async (event: React.FormEvent) => {
    event.preventDefault();

    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    if (password.length < 8) {
      setError("Password should be at least 8 characters long.");
      return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user) {
          const userDoc = doc(db, 'users', user.uid);
          await setDoc(userDoc, {
            username: '', // set this to the desired username
            email: user.email, // set this to the desired email
            profilePicture: 'https://static-cdn.jtvnw.net/user-default-pictures-uv/294c98b5-e34d-42cd-a8f0-140b72fba9b0-profile_image-70x70.png', // set this to the desired profile picture URL
            bio: '', // set this to the desired bio
            joinedAt: serverTimestamp(),
            premium: {
              isPremium: false,
              subscriptionType: '',
              subscriptionStart: null,
              subscriptionEnd: null
            },
            linkedDiscordId: '', // set this to the desired Discord user ID
            storyList: [],
            quelList: [],
            joinedCommunities: [],
            readingProgress: {
              stories: {},
              quels: {}
            }
          });
          router.push('/main');
        }
      } catch (error) {
        setError((error as Error).message);
      }
    setEmail('');
    setPassword('');
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to Quelve
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Create an account to start your journey.
      </p>

      <form className="my-8" onSubmit={handleEmailSignUp}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Durden" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            onClick={SignUpWithGoogle}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Sign in with Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
