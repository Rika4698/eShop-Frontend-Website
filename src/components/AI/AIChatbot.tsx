'use client'

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import {useChat} from '@ai-sdk/react'

function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);

    const {status, error} = useChat();

    const isLoading = status === "submitted" || status === 'streaming';






    return (
        <div className="fixed  bottom-5 right-5 md:bottom-6 md:right-6 z-[100]">

        <AnimatePresence initial={false}>
            {
                isOpen && (
                    <motion.div key='chat'
                    initial={{opacity:0, scale:0.9, y:12}} animate={{opacity:1, scale:1, y:0}} exit={{opacity:0, scale:0.9, y:12}} transition={{type:'spring', stiffness:480, damping:34, mass:0.55}} style={{transformOrigin: 'bottom right'}} className={cn("absolute bottom-[72px] right-0", "w-[calc(100vw-40px)] max-w-[400px]", "h-[72vh] max-h-[580px] sm:h-[520px]", "flex flex-col overflow-hidden", "rounded-xl border border-gray-100 bg-white", "shadow-[0_12px_48px_rgba(0,0,0,0.18")}>

                        <div className=''>

                        </div>

                    </motion.div>
                )
            }
        </AnimatePresence>

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
    );
}

export default AIChatbot;