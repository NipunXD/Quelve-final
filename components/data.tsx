import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { HomeIcon, MailQuestionIcon, MessageCircleIcon, MessageCircleQuestionIcon, UserIcon } from "lucide-react";

export const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <HomeIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Features",
      link: "#features",
      icon: <UserIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "How it works",
      link: "#how-it-works",
      icon: <UserIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "FAQ",
      link: "#faq",
      icon: <MessageCircleQuestionIcon className="h-4 w-4 text-neutral-500 dark:text-white" />
    },
  ];

export const avatarUrls = [
  "https://avatars.githubusercontent.com/u/16860528",
  "https://avatars.githubusercontent.com/u/20110627",
  "https://avatars.githubusercontent.com/u/106103625",
  "https://avatars.githubusercontent.com/u/59228569",
];  

export const content = [
  {
    title: "Read",
    description: "Dive into a vast library of stories from various genres and authors. Use our interactive reader to bookmark, highlight, and take notes, making your reading experience seamless. Track your progress effortlessly and never lose your place in a story.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <DotLottieReact src="https://lottie.host/a2468fca-e660-4956-8a36-1eadad409c16/A96xcDnEa4.json" className="absolute scale-150 -right-50 -top-50 opacity-80" loop autoplay autoResizeCanvas></DotLottieReact>
      </div>
    ),
  },
  {
    title: "Write",
    description:
      "Create your own original stories or start a 'quel' from any chapter of an existing story, opening up endless possibilities for alternate endings and side stories. Our rich text editor supports text formatting and multimedia embeds, giving you all the tools you need to craft engaging content.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <DotLottieReact src="https://lottie.host/8c5fd6d4-9863-4f14-ad81-31ec853c0cd7/zcrdqbDZPI.json" className="absolute scale-150 -right-50 -top-50 opacity-80" loop autoplay autoResizeCanvas></DotLottieReact>
      </div>
    ),
  },
  {
    title: "Connect",
    description:
      "Join exclusive author communities to get special content, updates, and interact directly with your favorite writers. Engage through comments, polls, and community posts, building a closer connection with the stories and their creators. Access private Discord servers for a more interactive experience.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <DotLottieReact src="https://lottie.host/fa01e46e-1052-471d-a8a7-27d68ea103e9/8n3CrFmt7O.json" className="absolute scale-150 -right-50 -top-50 opacity-80" loop autoplay autoResizeCanvas></DotLottieReact>
      </div>
    ),
  },
  {
    title: "Earn",
    description:
      "Authors earn from the total reads of their stories and quels, making every contribution valuable. Users can subscribe to premium plans for extra benefits like exclusive content and joining multiple author communities. Plus, our AI writing tools help generate content and brainstorm ideas, available through a credits system.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <DotLottieReact src="https://lottie.host/ecc77b4d-efa4-4c92-9a33-41d86da8a0ff/ermLkIeuuT.json" className="absolute scale-150 -right-50 -top-50 opacity-80" loop autoplay autoResizeCanvas></DotLottieReact>
      </div>
    ),
  },
];