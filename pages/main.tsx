import Link from "next/link"
import {
  BarChart4,
  Bell,
  Book,
  CircleUser,
  Globe2,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  PenSquare,
  Search,
  SearchIcon,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NextPage } from "next"
import ThemeToggleButton from "@/components/ui/themebutton"
import { SetStateAction, useEffect, useState } from "react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { Separator } from "@/components/ui/separator"
import { useAuthContext } from "@/context/authContext"
import { useRouter } from "next/router"
import ExplorePage from "./main/explore"
import ProfilePage from "./main/profile"

const MainPage: NextPage = () =>{
  const {user, setUser, logout} = useAuthContext();
  const [activeSection, setActiveSection] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const updateActiveSectionFromHash = () => {
    const hash = window.location.hash.replace('#', ''); // Remove the '#' character
    if (hash) {
      setActiveSection(hash);
    } else {
      setActiveSection('home'); // Set to default or initial section if no hash is present
    }
  };

  useEffect(() => {
    // Update active section based on the initial URL hash
    updateActiveSectionFromHash();

    // Listen for hash changes to update the active section
    window.addEventListener('hashchange', updateActiveSectionFromHash, false);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('hashchange', updateActiveSectionFromHash, false);
    };
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    // Handler for popstate event
    const handlePopState = (event: { state: { section: SetStateAction<string> } }) => {
      // Check if the state is not null
      if (event.state) {
        // Set the active section based on the state
        setActiveSection(event.state.section);
      }
    };
  
    // Add event listener for popstate
    window.addEventListener('popstate', handlePopState);
  
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (

    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <img src="/images/logo.png" alt="Quelve" className="h-10 w-86" />
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-md font-medium lg:px-4">
              <Link
                href="#home"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor link behavior
                  setIsLoading(true); // Start loading
                  setTimeout(() => { // Simulate loading time
                    setActiveSection('home');
                    setIsLoading(false); // End loading
                    window.history.pushState({}, '', '/main');
                  }, 2500); // Adjust the timeout duration as needed
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${activeSection === 'home' ? 'bg-primary text-white hover:text-white' : ''}`}
              >
                <Home className="h-6 w-6" />
                <span>Home</span>
              </Link>
              <Link
                href="#explore"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoading(true); // Start loading
                  setTimeout(() => { // Simulate loading time
                    setActiveSection('explore');
                    setIsLoading(false); // End loading
                    window.history.pushState({}, '', '/main#explore');
                  }, 2500); // Adjust the timeout duration as needed
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${activeSection === 'explore' ? 'bg-primary text-white hover:text-white' : ''}`}
              >
                <SearchIcon className="h-6 w-6" />
                Explore
              </Link>
              <Link
                href="#mystories"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor link behavior
                  setIsLoading(true); // Start loading
                  setTimeout(() => { // Simulate loading time
                    setActiveSection('mystories');
                    setIsLoading(false); // End loading
                    window.history.pushState({}, '', '/main#mystories');
                  }, 2500); // Adjust the timeout duration as needed
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${activeSection === 'mystories' ? 'bg-primary text-white hover:text-white' : ''}`}
              >
                <Book className="h-6 w-6" />
                My Stories
              </Link>
              <Link
                href="#communities"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor link behavior
                  setIsLoading(true); // Start loading
                  setTimeout(() => { // Simulate loading time
                    setActiveSection('communities');
                    setIsLoading(false); // End loading
                    window.history.pushState({}, '', '/main#communities');
                  }, 2500); // Adjust the timeout duration as needed
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${activeSection === 'communities' ? 'bg-primary text-white hover:text-white' : ''}`}
              >
                <Globe2 className="h-6 w-6" />
                Communities
              </Link>
              <Link
                href="#create"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor link behavior
                  setIsLoading(true); // Start loading
                  setTimeout(() => { // Simulate loading time
                    setActiveSection('create');
                    setIsLoading(false); // End loading
                    window.history.pushState({}, '', '/main#create');
                  }, 2500); // Adjust the timeout duration as needed
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${activeSection === 'create' ? 'bg-primary text-white hover:text-white' : ''}`}
              >
                <PenSquare className="h-6 w-6" />
                Create
              </Link>
              <Separator />
              <h2 className="px-3 py-2 text-md font-semibold text-muted-foreground italic">Your Account</h2>
              <Link
                href="#profile"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor link behavior
                  setIsLoading(true); // Start loading
                  setTimeout(() => { // Simulate loading time
                    setActiveSection('profile');
                    setIsLoading(false); // End loading
                    window.history.pushState({}, '', '/main#profile');
                  }, 2500); // Adjust the timeout duration as needed
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${activeSection === 'profile' ? 'bg-primary text-white hover:text-white' : ''}`}
              >
                <CircleUser className="h-6 w-6" />
                Profile
              </Link>
              <Link
                href="#dashboard"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor link behavior
                  setIsLoading(true); // Start loading
                  setTimeout(() => { // Simulate loading time
                    setActiveSection('dashboard');
                    setIsLoading(false); // End loading
                    window.history.pushState({}, '', '/main#dashboard');
                  }, 2500); // Adjust the timeout duration as needed
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${activeSection === 'dashboard' ? 'bg-primary text-white hover:text-white' : ''}`}
              >
                <BarChart4 className="h-6 w-6" />
                Dashboard
              </Link>
              <Link
                href="#settings"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor link behavior
                  setIsLoading(true); // Start loading
                  setTimeout(() => { // Simulate loading time
                    setActiveSection('settings');
                    setIsLoading(false); // End loading
                    window.history.pushState({}, '', '/main#settings');
                  }, 2500); // Adjust the timeout duration as needed
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${activeSection === 'settings' ? 'bg-primary text-white hover:text-white' : ''}`}
              >
                <Settings className="h-6 w-6" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Link href="/pricing">
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <ThemeToggleButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              {user?.profilePicture ? (
                <img src={user.profilePicture} alt="User" className="h-10 w-10 rounded-full" />
              ) : (
                <CircleUser className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle user menu</span>
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link
                href="#profile"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor link behavior
                  setIsLoading(true); // Start loading
                  setTimeout(() => { // Simulate loading time
                    setActiveSection('profile');
                    setIsLoading(false); // End loading
                  }, 2500); // Adjust the timeout duration as needed
                }}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
              <Link
                href="#settings"
                onClick={(e) => {
                  e.preventDefault(); // Prevent the default anchor link behavior
                  setIsLoading(true); // Start loading
                  setTimeout(() => { // Simulate loading time
                    setActiveSection('settings');
                    setIsLoading(false); // End loading
                  }, 2500); // Adjust the timeout duration as needed
                }}>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                </Link>
              <DropdownMenuSeparator />
              <Link href={"/"}><DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem></Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {isLoading ? (
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 justify-center items-center">
            <DotLottieReact src="https://lottie.host/f0c039ff-3afa-4027-ae5d-32023a698ab7/MyPFcprvFl.json" className="w-48 h-48" loop autoplay autoResizeCanvas />
          </main>
        ) : activeSection === 'profile' ? (
          <ProfilePage />
        ) : activeSection === 'explore' ? (
          <ExplorePage />
        ) : null}
      </div>
    </div>
  )
}

export default MainPage
