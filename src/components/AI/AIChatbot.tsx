/* eslint-disable react/no-unescaped-entities */
'use client'

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Loader2, MessageCircle, Send, User, X } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import {useChat} from '@ai-sdk/react'
import { UIMessage } from 'ai';
import { Input } from '../ui/input';



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

        <AnimatePresence initial={false}>
            {
                isOpen && (
                    <motion.div key='chat'
                    initial={{opacity:0, scale:0.9, y:12}} animate={{opacity:1, scale:1, y:0}} exit={{opacity:0, scale:0.9, y:12}} transition={{type:'spring', stiffness:480, damping:34, mass:0.55}} style={{transformOrigin: 'bottom right'}} className={cn("absolute bottom-[72px] right-0", "w-[calc(100vw-40px)] max-w-[400px]", "h-[72vh] max-h-[580px] sm:h-[520px]", "flex flex-col overflow-hidden", "rounded-xl border border-gray-100 bg-white", "shadow-[0_12px_48px_rgba(0,0,0,0.18")}>

                        <div className='relative flex items-center justify-between shrink-0 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-500'>
                            <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.13),transparent_60%)] pointer-events-none '/>

                            <div className='relative flex items-center gap-3'>
                                <div className='w-9 h-9 bg-white/20 backdrop-blur-sm flex items-center justify-center rounded-full border border-white/20'>
                                <Bot className='w-5 h-5 text-white'/>

                                </div>

                                <div className='flex flex-col'>
                                    <span className='font-semibold text-white text-sm sm:text-base '>
                                        EShop Assistant
                                    </span>
                                    <span className='text-[10px] text-green-100 flex items-center gap-1.5 mt-0.5'>
                                        <span className='w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse'/>
                                        Always Online
                                    </span>

                                </div>
                            </div>

                            <button onClick={() => setIsOpen(false)} className='relative w-8 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition-colors' aria-label='Close'> 
                                <X className='w-4 h-4'/>

                            </button>

                        </div>

                        {/* Error */}

                        <AnimatePresence>
                            {
                                error && (
                                    <motion.div initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} transition={{duration:0.18}} className='shrink-0 overflow-hidden'>
                                        <div className='bg-red-50 text-red-600 px-3 py-2 text-xs border-b border-red-100 flex items-center gap-2'>
                                            <span className='flex-1 font-medium'>{error.message || 'Connection failed.'}</span>
                                            <button onClick={() => window.location.reload()} className='px-2 py-0.5 rounded text-xs hover:bg-red-100 transition-colors'>Retry</button>
                                        </div>
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>

                        {/* Message */}

                        <div ref={scrollRef} className='flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50 overscroll-contain'>
                        {
                            messages.length === 0 && !error && (
                                <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className='space-y-5 pt-2'> 
                                <div className='text-center'>
                                    <div className='w-14 h-14 bg-white shadow-sm rounded-full flex items-center justify-center mx-auto mb-3  border border-white/20'>
                                    <Bot className="w-6 h-6 text-green-600 opacity-50"/>

                                    </div>
                                    <p className='text-sm font-semibold text-gray-700'>
                                        Hi! I'm your EShop Assistant.

                                    </p>
                                    <p className='text-xs text-gray-400 mt-1'>
                                        Ask me anything or pick a topic:
                                    </p>

                                </div>
                                <div className='flex flex-col gap-2'>
                                    {
                                        suggestQuestions.map((q, i) => (
                                            <motion.button key={i} initial={{opacity:0, x: -10}} animate={{opacity:1, x: 0}} transition={{delay:i * 0.06 + 0.15}} onClick={() => sendMessage({text:q})} className='text-left px-4 py-2.5 text-[13px] sm:text-sm bg-white text-gray-700 rounded-lg border border-gray-200 hover:border-green-400 hover:bg-green-50 hover:text-green-800 active:scale-[0.98] transition-all duration-150 shadow-sm'>
                                                {q}

                                            </motion.button>
                                        ))
                                    }

                                </div>

                                </motion.div>
                            )
                        }

                          {/* Message bubbles */}
                            {messages.map((m: UIMessage) => {
                                const isUser = m.role === 'user';
                                return (
                                    <motion.div
                                        key={m.id}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={cn("flex items-end gap-2", isUser ? "flex-row-reverse" : "flex-row")}
                                    >
                                        <div className={cn(
                                            "w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                                            isUser ? "bg-green-600" : "bg-white border border-gray-200"
                                        )}>
                                            {isUser
                                                ? <User className="w-3.5 h-3.5 text-white" />
                                                : <Bot className="w-3.5 h-3.5 text-green-600" />
                                            }
                                        </div>
                                        <div className={cn(
                                            "px-3.5 py-2.5 rounded-2xl max-w-[80%] text-[13px] sm:text-sm leading-relaxed shadow-sm",
                                            isUser
                                                ? "bg-green-600 text-white rounded-br-sm"
                                                : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm"
                                        )}>
                                            {m.parts.map((part, i) =>
                                                part.type === 'text' ? <p key={i} className="whitespace-pre-wrap">{part.text}</p> : null
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {/* Typing indicator */}
                            <AnimatePresence>
                                {isLoading && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="flex items-end gap-2"
                                    >
                                        <div className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                                            <Bot className="w-3.5 h-3.5 text-green-600" />
                                        </div>
                                        <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                                            {[0, 1, 2].map((i) => (
                                                <motion.span
                                                    key={i}
                                                    className="w-1.5 h-1.5 bg-green-500 rounded-full block"
                                                    animate={{ y: [0, -4, 0] }}
                                                    transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.13, ease: 'easeInOut' }}
                                                />
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                          {/* Input Footer */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!input.trim() || isLoading) return;
                                sendMessage({ text: input });
                                setInput('');
                            }}
                            className="shrink-0 px-3 py-3 border-t border-gray-100 bg-white flex gap-2 items-center"
                        >
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message…"
                                disabled={isLoading}
                                autoComplete="off"
                                className="flex-1 bg-gray-50 border-gray-200 text-sm focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-400 h-10 sm:h-11 rounded-xl transition-all duration-200 placeholder:text-gray-400"
                            />
                            <motion.button
                                type="submit"
                                whileTap={{ scale: 0.88 }}
                                disabled={isLoading || !input.trim()}
                                className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-40 flex items-center justify-center shadow-md transition-colors duration-150"
                                aria-label="Send"
                            >
                                {isLoading
                                    ? <Loader2 className="w-4 h-4 text-white animate-spin" />
                                    : <Send className="w-4 h-4 text-white" />
                                }
                            </motion.button>
                        </form>

                    </motion.div>
                )
            }
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