"use client"
import React, { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import Link from "next/link";
import { DefaultChatTransport, UIMessage } from "ai";
import { generateUUID } from "@/lib/utils";
import { DEFAULT_MODEL_ID } from "@/lib/ai/model";
