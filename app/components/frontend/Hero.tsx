import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ModeToggle } from "../dashboard/ThemeToggle";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <>
      <div className="relative flex flex-col w-full py-5 mx-auto md:flex-row md:items-center md:justify-between">
        <div className="flex flex-row items-center justify-between gap-4 text-sm lg:justify-start">
          <Link href={"/"} className="flex items-center gap-2">
            <Image src={"/logo.png"} alt="" width={100} height={100} />
            <h4 className="text-3xl">
              Blog
              <span className=" text-blue-700 font-semibold">Marshal</span>
            </h4>
          </Link>
          <div className="md:hidden">
            <ModeToggle />
          </div>
        </div>
        <nav className="hidden md:flex md:justify-end md:space-x-4 ">
          <ModeToggle />
          <LoginLink>
            <Button variant={"secondary"}>Sign in</Button>{" "}
          </LoginLink>
          <RegisterLink>
            <Button>Sign Up</Button>{" "}
          </RegisterLink>
        </nav>
      </div>
      <section className="relative flex items-center justify-center">
        <div className="relative items-center w-full py-12 lg:py-20 ">
          <div className="text-center ">
            <span className="text-sm text-blue-700 tracking-tight font-medium bg-blue-600/10 rounded-full px-4 py-2">
              Ultimate Blogging saas for Status{" "}
            </span>
            <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium">
              Setup your blogs{" "}
              <span className="block text-blue-700">in Minutes</span>
            </h1>
            <p className="max-w-xl mx-auto mt-4 text-base font-light lg:text-lg text-muted-foreground tracking-tight">
              setting up your blogs is hard and time comsuming. we make it easy
              for you to create a blog in minutes
            </p>
            <div className="flex items-center gap-x-4 w-full justify-center mt-4">
              <LoginLink>
                <Button variant={"secondary"}>Sign in</Button>
              </LoginLink>
              <RegisterLink>
                <Button>Try For Free</Button>{" "}
              </RegisterLink>
            </div>
          </div>
          <div className="relative items-center w-full py-11 mx-auto">
            {" "}
            <svg
              className="absolute -mt-24 blur-3xl"
              fill="none"
              viewBox="0 0 400 400"
              height="100%"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_10_20)">
                <g filter="url(#filter0_f_10_20)">
                  <path
                    d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z"
                    fill="#03FFE0"
                  ></path>
                  <path
                    d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z"
                    fill="#7C87F8"
                  ></path>
                  <path
                    d="M320 400H400V78.75L106.2 134.75L320 400Z"
                    fill="#4C65E4"
                  ></path>
                  <path
                    d="M400 0H128.6L106.2 134.75L400 78.75V0Z"
                    fill="#043AFF"
                  ></path>
                </g>
              </g>
              <defs>
                <filter
                  colorInterpolationFilters="sRGB"
                  filterUnits="userSpaceOnUse"
                  height="720.666"
                  id="filter0_f_10_20"
                  width="720.666"
                  x="-160.333"
                  y="-160.333"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="shape"
                  ></feBlend>
                  <feGaussianBlur
                    result="effect1_foregroundBlur_10_20"
                    stdDeviation="80.1666"
                  ></feGaussianBlur>
                </filter>
              </defs>
            </svg>
            <Image
              src={"/hero.png"}
              alt=""
              width={1300}
              height={1300}
              className="relative object-cover w-full border rounded-lg shadow-2xl lg:rounded-2xl"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
