import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { PanelLeftIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { buttonVariants } from "./ui/button";
import prisma from "@/prisma/client";
import { getUser } from "@/lib/auth";
import { ScrollArea } from "./ui/scroll-area";

export default function LeftPanel() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex flex-row items-center gap-2">
          <PanelLeftIcon className="w-5 h-5 mt-1" />
          <span className="mt-1 sm:hidden flex">Menu</span>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="min-w-[390px] px-0">
        <div>
          <h3 className="px-7 text-xl font-semibold">Conversations</h3>
          <Suspense
            fallback={
              <p className={buttonVariants({ variant: "link" })}>Loading...</p>
            }
          >
            <ConversationList />
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  );
}

async function ConversationList() {
  const session = await getUser();
  if (!session?.user) return null;
  const res = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      conversations: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if(!res) return null;
  const { conversations } = res;
  return (
    <ScrollArea className="flex flex-col mt-7 items-start overflow-y-auto h-[90vh] pb-5">
      {conversations.map((cn) => (
        <div key={cn.id} className="group w-full my-3 px-8 flex justify-between items-center hover:bg-gray-100 rounded-md p-2">
          <SheetClose asChild>
            <Link
              href={`/chat/${cn.id}`}
              className="hover:underline underline-offset-2 flex-1"
            >
              {cn.name.length > 35 ? `${cn.name.slice(0, 35)}...` : cn.name}
            </Link>
          </SheetClose>
          <div className="hidden group-hover:flex space-x-2">
            <button
              className="text-blue-500 hover:text-blue-700"
            >
              Save
            </button>
            <button
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
}

async function saveConversation(id: string) {
  // Implement save logic here
  console.log('Save conversation', id);
}

async function deleteConversation(id: string) {
  // Implement delete logic here
  console.log('Delete conversation', id);
}