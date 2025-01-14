import { CloudRain } from "lucide-react";
import React from "react";

const feratures = [
  {
    name: "sign up for free",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi neque id ratione! Ipsam eaque.",
    icon: CloudRain,
  },
  {
    name: "Balzing fast",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi neque id ratione! Ipsam eaque.",
    icon: CloudRain,
  },
  {
    name: "Super secure with kind",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi neque id ratione! Ipsam eaque.",
    icon: CloudRain,
  },
  {
    name: "easy to used",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi neque id ratione! Ipsam eaque, voluptate odit tempora aliquam fuga, nobis iure hic, facilis dolores quidem eius sint quo beatae voluptatum.",
    icon: CloudRain,
  },
];
const Features = () => {
  return (
    <div className="py-20 sm:py-32">
      <div className="max-w-2xl mx-auto lg:text-center">
        <p className="font-semibold text-blue-600 leading-7 ">Blogs Faster</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl ">
          get your Blog up and running in minutes
        </h1>
        <p className="mt-5 text-sm leading-snug text-muted-foreground">
          Right here you can create a blog in minutes.we make it easy for you to
          create a blog in minutes . the blog is very fast and easy to create .
        </p>
      </div>
      <div className="mx-auto mt-14 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {feratures.map((item) => (
            <div key={item.name} className="relative pl-16">
              <div className="text-base font-semibold leading-7 ">
                <div className="absolute left-0 top-0 justify-center flex size-10 items-center bg-blue-600 rounded-lg ">
                  <item.icon className="w-6 h-6" />
                </div>
                {item.name}
              </div>
              <p className="mt-2 text-base text-muted-foreground leading-snug">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
