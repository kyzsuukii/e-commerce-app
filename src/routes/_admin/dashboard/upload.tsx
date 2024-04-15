import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProductUploadForm from "@/components/upload-form";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/_admin/dashboard/upload")({
  component: DashboardUploadProduct,
});

function DashboardUploadProduct() {
  const { session } = Route.useRouteContext();

  const [open, setOpen] = useState<boolean>(false);
  const [myFiles, setMyFiles] = useState<any[]>([]);

  const onDrop = useCallback(
    (file: File[]) => {
      setOpen(true);
      setMyFiles(file);
    },
    [myFiles]
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div className="my-12 container mx-auto">
      <div className="flex items-center justify-center">
        <Card className="w-1/2 bg-muted border-dashed border-2 hover:border-muted-foreground/50 hover:cursor-pointer">
          <CardContent
            {...getRootProps({
              className:
                "flex flex-col items-center justify-center px-2 py-4 text-xs space-y-2",
            })}
          >
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="flex items-center justify-center text-muted-foreground">
              <span className="font-medium text-balance text-center">
                Drag 'n' drop some files here, or click to select files
              </span>

              <input {...getInputProps()} />
            </div>
            <aside>
              {acceptedFiles &&
                acceptedFiles.map((file: any) => (
                  <div key={file.name}>{file.name}</div>
                ))}
            </aside>
          </CardContent>
        </Card>
      </div>
      {acceptedFiles && acceptedFiles.length > 0 && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Product Uploaded</DialogTitle>
              <DialogDescription>
                Provide a information about the product
              </DialogDescription>
              <ProductUploadForm session={session} thumbnail={myFiles} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
      <Toaster />
    </div>
  );
}
