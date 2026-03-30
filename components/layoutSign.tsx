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
    <div className="flex flex-row min-w-full relative overflow-x-hidden!">
      <div className="lg:w-2/5 w-full min-h-screen flex flex-col items-center gap-4 p-2 md:p-10">
          <Link
            href="/"
            title="Accueil"
            className="flex items-center self-start font-bricolage"
          >
            <svg
              width="526"
              height="300"
              viewBox="0 0 526 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-24"
            >
              <path
                d="M9 233V218.5L107 84.5V81.25H13V68H124.5V83L26.25 216.75V219.75H127V233H9Z"
                fill="currentColor"
              />
              <path
                d="M122.25 233L181.25 68H202L261 233H246L193 81H190.5L137.5 233H122.25ZM147 193V180.25H237.75V193H147Z"
                fill="currentColor"
              />
              <path
                d="M377.25 233L436.25 68H457L516 233H501L448 81H445.5L392.5 233H377.25ZM402 193V180.25H492.75V193H402Z"
                fill="currentColor"
              />
              <path
                d="M254.5 233V68H274.25L369.25 214.5H370.75L369.5 68H383.25V233H365.25L269 84.75H267.25L268.5 233H254.5Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        <div className="flex flex-1 w-full flex-col items-center justify-center">
          {children}
        </div>
      </div>
      <div className="lg:w-3/5 h-full absolute top-0 right-0 -z-1 flex-1 hidden lg:block">
        <Image
          src={imageSrc}
          alt="Image"
          width={3000}
          height={3000}
          className="max-w-full h-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
