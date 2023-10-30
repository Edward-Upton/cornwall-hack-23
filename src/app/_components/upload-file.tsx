"use client";

import { type UploadFileResponse } from "uploadthing/client";
import { UploadButton } from "~/lib/uploadthing";

export default function UploadFile({
  onSuccess,
}: {
  onSuccess: (res?: UploadFileResponse[] | undefined) => void;
}) {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={onSuccess}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
}
