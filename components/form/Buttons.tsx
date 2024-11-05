"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LuTrash2, LuPenSquare } from "react-icons/lu";
import { SignInButton } from "@clerk/nextjs";
import { BsHandThumbsUp, BsFillHandThumbsUpFill } from "react-icons/bs";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

export function SubmitButton({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      disabled={pending}
      className={cn("capitalize", className)}
      size={size}
    >
      {pending ? (
        <>
          <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}

type actionType = "edit" | "delete";
export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <LuPenSquare />;
      case "delete":
        return <LuTrash2 />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type: ${never}`);
    }
  };

  return (
    <Button
      type='submit'
      size='icon'
      variant='link'
      className='p-2 cursor-pointer'
    >
      {pending ? <ReloadIcon className=' animate-spin' /> : renderIcon()}
    </Button>
  );
};

export const CardSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button
        type='button'
        size='icon'
        variant='outline'
        className='p-2 cursor-pointer'
        asChild
      >
        <BsHandThumbsUp />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      size='icon'
      variant='outline'
      className=' p-2 cursor-pointer'
      suppressHydrationWarning
    >
      {pending ? (
        <ReloadIcon className=' animate-spin' />
      ) : isFavorite ? (
        <BsFillHandThumbsUpFill />
      ) : (
        <BsHandThumbsUp />
      )}
    </Button>
  );
};

export const ProductSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button type='button' size='default' className='mt-8'>
        Please Sign In
      </Button>
    </SignInButton>
  );
};
