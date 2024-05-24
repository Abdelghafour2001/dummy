"use client";

import { chat } from "@/actions/chat";
import Submit from "@/components/submit";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { generateRandomId } from "@/lib/utils";
import { JSONMessage } from "@/types";
import { useRouter } from "next/navigation";
import { ElementRef, useEffect, useOptimistic, useRef } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronDownIcon, CheckCircleIcon, XCircleIcon, ArrowPathIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';
//import { useSpeechSynthesis } from 'react-speech-kit';

type ChatProps = {
  messages: JSONMessage[];
  id: string;
};

type Message = {
  answer?: string;
  id: string;
  question: string;
};

export default function Chat({ messages, id }: ChatProps) {
  const scrollRef = useRef<ElementRef<"div">>(null);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], string>(
    messages,
    (state, newMessage: string) => [
      ...state,
      {
        answer: undefined,
        id: generateRandomId(4),
        question: newMessage,
      },
    ]
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [optimisticMessages]);

  const handleReadAloud = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleRegenerate = (messageId: string) => {
    // Logic to regenerate the message
    console.log(`Regenerate message with ID: ${messageId}`);
  };

  const handleFeedback = (messageId: string, feedback: 'good' | 'bad') => {
    // Logic to handle feedback
    console.log(`Feedback for message ID: ${messageId} is ${feedback}`);
  };

  return (
    <div className="flex flex-col grow">
      <div className="flex flex-col items-start gap-8 pb-10 min-h-[75vh] w-full sm:w-[95%]">
        {optimisticMessages.map((message, index) => (
          <div className="flex flex-col items-start gap-4" key={message.id}>
            <h4 className="text-xl font-medium text-sky-700 dark:text-sky-200">
              {message.question}
            </h4>
            {!message.answer ? (
              <div className="w-full max-w-xl flex flex-col gap-3">
                <Skeleton className="w-[90%] h-[20px] rounded-md" />
                <Skeleton className="w-[60%] h-[20px] rounded-md" />
              </div>
            ) : (
              <div className="w-full max-w-xl">
                <ReactMarkdown
                  className="prose dark:prose-dark"
                  remarkPlugins={[remarkGfm]}
                >
                  {message.answer}
                </ReactMarkdown>
                {index === optimisticMessages.length - 1 && (

                  <div className="mt-1 flex gap-3 empty:hidden juice:-ml-3">
                    <div className="-ml-1 mt-0 flex h-7 items-center justify-center gap-[2px] self-end text-gray-400 lg:justify-start lg:self-center visible">
                      <span className="" data-state="closed">
                        <button className="rounded-md p-1 text-token-text-tertiary hover:text-token-text-primary" onClick={() => handleReadAloud(message.answer!)}>
                          <SpeakerWaveIcon className="h-5 w-5" />
                        </button>
                      </span>
                      <span className="" data-state="closed">
                        <button className="rounded-md p-1 text-token-text-tertiary hover:text-token-text-primary">
                          <ArrowPathIcon className="h-5 w-5" />
                        </button>
                      </span>
                      <span className="" data-state="closed">
                        <button className="rounded-md p-1 text-token-text-tertiary hover:text-token-text-primary" onClick={() => handleFeedback(message.id, 'good')}>
                          <CheckCircleIcon className="h-5 w-5" />
                        </button>
                      </span>
                      <span className="" data-state="closed">
                        <button className="rounded-md p-1 text-token-text-tertiary hover:text-token-text-primary">
                          <XCircleIcon className="h-5 w-5" />
                        </button>
                      </span>
                      {/* Add more buttons with appropriate icons as needed */}
                    </div>
                  </div>
                  
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      <div ref={scrollRef}></div>
      <div className="mt-5 sticky bottom-0 pb-8 pt-1 bg-background">
        <ChatInput id={id} addMessage={addOptimisticMessage} />
      </div>
    </div>
  );
}

type ConversationComponent = {
  id: string;
  addMessage: (msg: string) => void;
};

function ChatInput({ addMessage, id }: ConversationComponent) {
  const inputRef = useRef<ElementRef<"input">>(null);
  const router = useRouter();
  const { toast } = useToast();

  async function handleSubmit(formData: FormData) {
    const message = formData.get("message") as string;
    if (!message) return;
    const apiKey = localStorage.getItem("apiKey");
    if (!apiKey) {
      toast({
        title: "No API key found!",
        description: 'Please add API key from "My account" section',
      });
      return;
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    addMessage(message);
    const err = await chat({
      apiKey,
      conversationId: id,
      message,
    });

    if (err?.message) {
      toast({
        title: err.message,
      });
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }}
      className="flex flex-row items-center gap-2 sm:pr-5"
    >
      <Input
        ref={inputRef}
        autoComplete="off"
        name="message"
        placeholder="Ask me something..."
        className="h-12"
      />
      <Submit />
    </form>
  );
}
