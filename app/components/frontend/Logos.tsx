import Image from "next/image";
import React from "react";

const Logos = () => {
  return (
    <div className="py-10">
      <h2 className="text-center text-lg font-semibold leading-7">
        Trusted by the best companies in the world
      </h2>
      <div className="mt-10 grid max-w-lg mx-auto grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        <Image
          src={"/logo.png"}
          alt="logo"
          width={500}
          height={500}
          className="col-span-2 max-h-36 w-full object-contain lg:col-span-1  dark:invert"
        />
        <Image
          src={"/nextjs.svg"}
          alt="logo"
          width={500}
          height={500}
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={"/logo.png"}
          alt="logo"
          width={500}
          height={500}
          className="col-span-2 max-h-36 w-full object-contain lg:col-span-1  dark:invert"
        />
        <Image
          src={"/nextjs.svg"}
          alt="logo"
          width={500}
          height={500}
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 dark:invert"
        />
        <Image
          src={"/logo.png"}
          alt="logo"
          priority
          width={500}
          height={500}
          className="col-span-2 max-h-36 w-full object-contain lg:col-span-1  dark:invert"
        />
      </div>
    </div>
  );
};

export default Logos;
