import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  GitBranch,
  Home,
  KeyRoundIcon,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { NextPage } from "next"
import ThemeToggleButton from "@/components/ui/themebutton"
import { FloatingNav } from "@/components/ui/floatingnavbar"
import { avatarUrls, content, navItems } from "@/components/data"
import { Highlight } from "@/components/ui/hero-highlight"
import { HeroHighlight } from "@/components/ui/hero-highlight"
import { motion } from "framer-motion"
import ShinyButton from "@/components/magicui/shiny-button"
import { SparklesCore } from "@/components/ui/sparkles"
import LinearGradient from "@/components/magicui/linear-gradient"
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import ShimmerButton from "@/components/magicui/shimmer-button"
import { LampContainer } from "@/components/ui/lamp"
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import AvatarCircles from "@/components/magicui/avatar-circles"
import { Stick } from "next/font/google"
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"
import Marquee from "@/components/magicui/marquee"
import MarqueeDemo from "@/components/magicui/MarqueeDemo"
import { Accordion } from "@radix-ui/react-accordion"
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Footer from "@/components/ui/footer"

const LandingPage: NextPage = () =>{
    return (
      <div className="antialiased text-base-content bg-background overflow-none">
        <div id="app" className="min-h-screen flex flex-col p-4 relative">
          <div className="absolute top-0 left-0 p-10 z-50">
            <img src="/images/logo.png" alt="Quelve" className="w-84 h-8 object-cover" />
          </div>
            <div className="absolute top-0 right-0 p-8 z-50">
                <ThemeToggleButton />
            </div>
          <div className="home-containers">
            <FloatingNav navItems={navItems} />
            <HeroHighlight>
                <motion.h1
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: [20, -5, 0],
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
                className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto mb-4" // Reduced margin-bottom to mb-4
                >
                Unleash Your Imagination with
                {" "}
                <Highlight className="text-black dark:text-white">
                    Endless Stories and Quels
                </Highlight>
                </motion.h1>
                <div className="text-center mx-auto flex flex-col items-center p-5 gap-y-10"> {/* Added gap-y-4 to increase space between span and button */}
                <span className="px-4 text-lg font-medium text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug">
                Join Quelve and dive into a universe where stories never end. Write, read, and explore limitless branching narratives created by a vibrant community of authors and fans.
                </span>
                <Link href="/signup">
                  <ShimmerButton>
                    <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
                    Start Your Adventure Now
                    </span>
                  </ShimmerButton>
                </Link>
                <AvatarCircles className="" numPeople={99} avatarUrls={avatarUrls} />
                </div>
            </HeroHighlight>
            <div id="features" className="home-features flex flex-col justify-center items-center gap-10 pt-20 bg-background dark:bg-black pb-20 rounded-lg px-96">
              <h2 className="font-heading font-4xl leading-[1.1] sm:text-4xl md:text-4xl font-bold">Features</h2>
              <BentoGrid>
                <BentoCard name="Discover Stories" Icon={Search} description="Find your next great read or explore new perspectives through branching narratives created by other writers." className={"col-span-3 lg:col-span-1"} background={<DotLottieReact src="https://lottie.host/a32959f3-7674-4b4b-8f2b-3c747c2ebdf4/M9xGQdHqLw.json" className="absolute -right-40 -top-50 opacity-70" loop autoplay autoResizeCanvas></DotLottieReact>} href={""} cta={""} />
                <BentoCard name="Create Quels" Icon={GitBranch} description="Readers and writers can create branching narratives, or 'quels,' from any chapter of a story." className={"col-span-3 lg:col-span-2"} background={<DotLottieReact src="https://lottie.host/fb2a96dd-ed16-4983-9b94-8a1df6fd5d2b/J49F9pybZk.json" className="absolute -right-40 -top-50 opacity-70" loop autoplay autoResizeCanvas></DotLottieReact>} href={""} cta={""} />
                <BentoCard name="Join Communities" Icon={Users2} description="Become a part of exclusive communities and interact with your favorite authors." className={"col-span-3 lg:col-span-2"} background={<DotLottieReact src="https://lottie.host/93ea2aaa-5c6b-41f0-8402-8ff243d84f66/iLZOKgLxnB.json" className="absolute -right-40 -top-50 opacity-70" loop autoplay autoResizeCanvas></DotLottieReact>} href={""} cta={""} />
                <BentoCard name="Exclusive Access" Icon={KeyRoundIcon} description="Premium plans for exclusive author content." className={"col-span-3 lg:col-span-1"} background={<DotLottieReact src="https://lottie.host/81d61eb3-f047-41e7-928c-1499ae766ccf/0Atb7pdD3L.json" className="absolute -right-40 -top-50 opacity-70" loop autoplay autoResizeCanvas></DotLottieReact>} href={""} cta={""} />
              </BentoGrid>
            </div>
            <div id='how-it-works' className="how-it-works flex flex-col justify-center items-center gap-16 pt-10 bg-background dark:bg-black pt-10 pb-20">
              <h1 className="text-5xl font-bold text-black dark:text-white">How It Works</h1>
              <StickyScroll content={content} />
            </div>
            <div id="testimonials" className="home-testimonials flex flex-col justify-center items-center gap-10 pt-10 bg-background dark:bg-black pb-20 p-20">
              <h2 className="font-heading font-4xl leading-[1.1] sm:text-4xl md:text-4xl font-bold">Testimonials</h2>
              <MarqueeDemo />
            </div>  
            <div id='faq' className="home-faq flex flex-col justify-center items-center gap-10 bg-background dark:bg-black p-20">
              <div className="faq-container grid grid-cols-2 gap-10">
                <div className="faq-head flex flex-col content-start gap-5 bg-background dark:bg-black rounded-lg p-10 w-3/4 bg-opacity-75 shadow-white shadow-lg text-black dark:text-white border-black dark:border-white border-4">
                  <span className="text-3xl font-bold">Frequently Asked Questions</span>
                  <span className="text-xl pb-20">Have questions about Quelve? Check out our FAQ section for answers to common queries.</span>
                  <DotLottieReact src="https://lottie.host/9f06124b-51b2-4d9d-8cce-f47ec548d788/Q23BRLZ2au.json" className="scale-150 -right-50 -top-50 opacity-80" loop autoplay autoResizeCanvas></DotLottieReact>
                </div>
                <div className="accordion-container w-full" style={{ minHeight: '300px' }}> {/* Adjusted width to w-full */}
                  <Accordion type="single" collapsible className="w-full text-xl">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What is Quelve?</AccordionTrigger>
                      <AccordionContent className="text-lg">
                        Quelve is an innovative platform where you can read, write, and create branching narratives called &quot;quels.&quot; Connect with authors, join exclusive communities, and immerse yourself in a rich storytelling experience.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>How do I get started?</AccordionTrigger>
                      <AccordionContent className="text-lg">
                        Sign up for free, browse our library of stories, and start reading. If you&apos;re a writer, use our intuitive editor to create and publish your own stories or start a &apos;quel&apos; from any existing story.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>What are &apos;quels&apos;?</AccordionTrigger>
                      <AccordionContent className="text-lg">
                      &apos;Quels&apos; are branching narratives that other users can create from any chapter of an existing story. They allow for alternate storylines, new character arcs, and endless possibilities.                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>How does the premium subscription work?</AccordionTrigger>
                      <AccordionContent className="text-lg">
                        Our premium plans give you access to exclusive content, the ability to join multiple author communities, and other benefits. You can subscribe monthly or annually, with different tiers to fit your needs.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>What features do author communities offer?</AccordionTrigger>
                      <AccordionContent className="text-lg">
                        Author communities provide exclusive content, updates, and direct interaction with your favorite writers. Premium users can join these communities and gain access to private Discord servers and more.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-6">
                      <AccordionTrigger>Can I use AI tools for writing?</AccordionTrigger>
                      <AccordionContent className="text-lg">
                        Yes, we offer AI-powered writing tools to help you generate content, brainstorm ideas, and enhance your storytelling. These tools are available through a credits-based system.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-7">
                      <AccordionTrigger>How do I join an author&apos;s Discord server?</AccordionTrigger>
                      <AccordionContent className="text-lg">
                        Join an author&apos;s community on Quelve, and you&apos;ll receive an invite to their exclusive Discord server where you can interact with the author and other fans directly.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-8">
                      <AccordionTrigger>Is there a limit to how many stories or quels I can create?</AccordionTrigger>
                      <AccordionContent className="text-lg">
                        There are no limits on the number of stories or quels you can create. Let your imagination run wild!
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

export default LandingPage
