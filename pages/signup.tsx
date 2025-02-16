import { SignupForm } from "@/components/ui/signupform";
import ThemeToggleButton from "@/components/ui/themebutton";
import { NextPage } from "next";

const SignUpPage: NextPage = () => {
  return (
    <div className="antialiased text-base-content bg-background overflow-none">
        <div id="app" className="min-h-screen flex flex-col p-4 relative">
            <div className="absolute top-0 left-0 p-10 z-50">
            <img src="/images/logo.png" alt="Quelve" className="w-84 h-8 object-cover" />
            </div>
            <div className="absolute top-0 right-0 p-8 z-50">
                <ThemeToggleButton />
            </div>
            <div className="flex flex-col items-center justify-center h-full pt-20">
                <SignupForm />
            </div>
        </div>
    </div>
  )
}

export default SignUpPage