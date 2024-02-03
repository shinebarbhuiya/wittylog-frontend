"use client"

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Box, Button, Code, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";


export default function Home() {

  const { data: session, status } = useSession({ required: false });

  if (status == "loading") {
    return "Please wait";
  }

  if (session) {
    return (
      <div className="m-8">
        <div>
          This is going to be the login page ... Hello, {session.user.first_name}
        </div>
      </div>
    );
  }

  return <>
    <div className="m-8">
        <div className="text-3xl font-bold">
          This is going to be the login page ... Unprotected hai yee
        </div>
      </div>
  </>;
}