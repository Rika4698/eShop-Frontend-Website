/* eslint-disable react/no-unescaped-entities */
'use client'

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Loader2, MessageCircle, Send, User, X } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {useChat} from '@ai-sdk/react'
import { UIMessage } from 'ai';
import { Input } from '../ui/input';
import { ChatWindow } from './ChatWindow';



const emptySubscribe = () => () => {};
const getTrue = () => true;
const getFalse = () => false;

function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input , setInput] = useState("");
    

    const {messages, sendMessage, status, error} = useChat();

    const isLoading = status === "submitted" || status === 'streaming';
    const scrollRef = useRef<HTMLDivElement>(null);

    const suggestQuestions = [
        "What are the user roles?",
        "Tell me about product categories?",
        "How can I become a vendor?"
    ];

   const mounted = useSyncExternalStore(emptySubscribe, getTrue, getFalse);

    useEffect(() => {
        if(scrollRef.current){
            scrollRef.current.scrollTo({top:scrollRef.current.scrollHeight, behavior:'smooth'});
        }
    }, [messages]);

    if(!mounted)
        return null;






    return (
        <div className="fixed  bottom-5 right-5 md:bottom-6 md:right-6 z-[100]">

       <AnimatePresence>
                {isOpen && <ChatWindow />}
            </AnimatePresence>

        <div className='relative group'>

            <div className={cn("absolute bottom-16 left-1/2 -translate-x-1/2", "px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-medium whitespace-nowrap", "opacity-0 group-hover:opacity-100 pointer-events-none tracking-widest", "transition-all duration-200 ease-out" , "translate-y-1 group-hover:translate-y-0", "shadow-lg", isOpen && "hidden" )}>
            EShop Chat

            <div className='absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-green-600'/>
            </div>

             <motion.button 
            onClick={() => setIsOpen(prev => !prev)} 
            whileHover={{ scale: 1.08 }} 
            whileTap={{ scale: 0.9 }} 
            aria-label={isOpen ? 'Close chat' : 'Open chat'} 
            className={cn("relative w-14 h-14 rounded-full flex items-center justify-center", "shadow-[0_4px_24px_rgba(22,163,74,0.4)]", "transition-colors duration-200",  status === 'error' ? "bg-red-500" : "bg-green-600")}>

                <AnimatePresence initial={false} mode="wait">
                    {
                        isOpen ? (
                            <motion.span key="x" initial={{ rotate: -80, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 80, opacity: 1 }} transition={{ duration: 0.18 }} className='absolute flex items-center justify-center'>
                                <X className="w-6 h-6 text-white" />
                            </motion.span>) : (
                            <motion.span key="msg" initial={{ rotate: -80, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 80, opacity: 1 }} transition={{ duration: 0.18 }} className='absolute flex items-center justify-center'>

                                {
                                    isLoading ? <Loader2 className='w-6 h-6 text-white animate-spin' /> : <MessageCircle className='w-6 h-6 text-white' />
                                }
                            </motion.span>
                        )
                    }


                </AnimatePresence>

            </motion.button>

        </div>

           

        </div>
    );
}

export default AIChatbot;