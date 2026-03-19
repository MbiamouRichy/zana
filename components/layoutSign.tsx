import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function LayoutSign({
  children,
  imageSrc,
}: Readonly<{
  children: React.ReactNode;
  imageSrc: string;
}>) {
  return (
    <div className="flex flex-row min-h-screen min-w-full overflow-x-hidden!">
      <div className="lg:w-2/5 w-full flex flex-col gap-4 p-2 md:p-10">
        <div className="flex gap-2 justify-start">
          <Link
            href="/"
            title="Accueil"
            className="flex items-center gap-2 self-start font-medium"
          >
            <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            ZANA
          </Link>
        </div>
        <div className="flex w-full h-full flex-col self-center items-center justify-center">
          {children}
        </div>
      </div>
      <div className="lg:w-3/5 flex-1 hidden bg-muted lg:flex">
        <Image
          src={imageSrc}
          alt="Image"
          width={1000}
          height={1000}
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
