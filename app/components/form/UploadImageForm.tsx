"use client";
import { UploadDropzone } from "@/app/utils/uploadthing";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React, { useState } from "react";
import SubmitButtons from "../dashboard/SubmitButtons";
import { toast } from "sonner";
import { UpdateImage } from "@/app/actions";
import { Input } from "@/components/ui/input";

interface IAppProps {
  siteId: string;
}
const UploadImageForm = ({ siteId }: IAppProps) => {
  const [image, setImage] = useState<undefined | string>("");
  return (
    <Card>
      <CardHeader>
        <CardTitle>Images</CardTitle>
        <CardDescription>
          This is the image of your site. you can change it here
        </CardDescription>
      </CardHeader>
      <CardContent>
        {image ? (
          <>
            <Image
              src={image}
              alt=""
              width={170}
              height={170}
              className="size-[200px] object-cover rounded-lg ml-80"
            />
          </>
        ) : (
          <>
            <UploadDropzone
              endpoint={"imageUploader"}
              onClientUploadComplete={(res) => {
                setImage(res[0].url);
                toast.success("Image has been loaded");
              }}
              onUploadError={() => {
                toast.error("something some wrong");
              }}
            />
          </>
        )}
      </CardContent>
      <CardFooter>
        <form action={UpdateImage}>
          <Input type="hidden" value={siteId} name="siteId" />
          <Input type="hidden" value={image || ""} name="imageUrl" />
          <SubmitButtons
            text="Change Image"
            className="bg-blue-500 hover:bg-blue-600"
          />
        </form>
      </CardFooter>
    </Card>
  );
};

export default UploadImageForm;
