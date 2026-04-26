/* eslint-disable react/no-unescaped-entities */
// components/AI/ChatWindow.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, User, Loader2, AlertCircle, RefreshCw, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useChatMessages, Message } from '@/hooks/useChatMessages';

const SUGGESTED_QUESTIONS = [
    "What are the user roles?",
    "How can I become a vendor?",
];

// ─── Error Banner ───
const ErrorBanner = ({
    error,
    onRetry,
    onDismiss,
}: {
    error: string;
    onRetry: () => void;
    onDismiss: () => void;
}) => (
    <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="shrink-0 overflow-hidden"
    >
        <div className="bg-red-50 border-b border-red-100 px-3 py-2.5 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span className="flex-1 text-xs text-red-600 leading-relaxed">{error}</span>
            <div className="flex items-center gap-1 shrink-0">
                <button onClick={onRetry} className="flex items-center gap-1 px-2 py-0.5 rounded text-xs text-red-600 hover:bg-red-100 transition-colors font-medium">
                    <RefreshCw className="w-3 h-3" /> Retry
                </button>
                <button onClick={onDismiss} className="px-2 py-0.5 rounded text-xs text-red-500 hover:bg-red-100 transition-colors">
                    <X className="w-3 h-3" />
                </button>
            </div>
        </div>
    </motion.div>
);



// ─── Welcome Screen ───
const WelcomeScreen = ({ onSelect }: { onSelect: (q: string) => void }) => (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-5 pt-2">
        <div className="text-center">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-gray-100">
                <Bot className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-sm font-semibold text-gray-700">Hi! I'm your <span className='text-green-600 text-base'>EShop</span> Assistant.</p>
            <p className="text-xs text-gray-400 mt-1">Ask me anything or pick a topic:</p>
        </div>
        <div className="flex flex-col gap-2">
            {SUGGESTED_QUESTIONS.map((q, i) => (
                <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.15 }}
                    onClick={() => onSelect(q)}
                    className="text-left px-4 py-2.5 text-[13px] sm:text-sm bg-white text-gray-700 rounded-xl border border-gray-200 hover:border-green-400 hover:bg-green-50 hover:text-green-800 active:scale-[0.98] transition-all duration-150 shadow-sm"
                >
                    {q}
                </motion.button>
            ))}
        </div>
    </motion.div>
);

// ─── Message Bubble ────────
const MessageBubble = ({ m }: { m: Message }) => {
    const isUser = m.role === 'user';
    if (!m.content && !isUser) return null;
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={cn("flex items-end gap-2", isUser ? "flex-row-reverse" : "flex-row")}
        >
            <div className={cn("w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-sm", isUser ? "bg-green-600" : "bg-white border border-gray-200")}>
                {isUser ? <User className="w-3.5 h-3.5 text-white" /> : <Bot className="w-3.5 h-3.5 text-green-600" />}
            </div>
            <div className={cn("px-3.5 py-2.5 rounded-2xl max-w-[80%] text-[13px] sm:text-sm leading-relaxed shadow-sm", isUser ? "bg-green-600 text-white rounded-br-sm" : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm")}>
                <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
        </motion.div>
    );
};

// ─── Loading Dots ─────────────────
const LoadingDots = () => (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-end gap-2">
        <div className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
            <Bot className="w-3.5 h-3.5 text-green-600" />
        </div>
        <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
                <motion.span key={i} className="w-1.5 h-1.5 bg-green-500 rounded-full block"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.13, ease: 'easeInOut' }}
                />
            ))}
        </div>
    </motion.div>
);

// ─── Main Chat Window ─────
export const ChatWindow = () => {
    const { messages, isLoading, error, input, setInput, setError, scrollRef, inputRef, triggerChat, handleRetry, clearChat } = useChatMessages();

    return (
        <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: 'spring', stiffness: 480, damping: 34, mass: 0.55 }}
            style={{ transformOrigin: 'bottom right' }}
            className={cn(
                "absolute bottom-[72px] right-0",
                "w-[calc(100vw-40px)] max-w-[400px]",
                "h-[72vh] max-h-[580px] sm:h-[520px]",
                "flex flex-col overflow-hidden",
                "rounded-2xl border border-gray-100 bg-white",
                "shadow-[0_12px_48px_rgba(0,0,0,0.18)]"
            )}
        >
            {/* Header */}
            <div className="relative shrink-0 flex items-center justify-between px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-500">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.13),transparent_60%)] pointer-events-none" />
                <div className="flex items-center gap-3 relative">
                    <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                        <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="font-semibold text-white text-sm sm:text-base tracking-tight">eShop Assistant</span>
                        <span className="text-[10px] text-green-100 flex items-center gap-1.5 mt-0.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                            Always Online
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1 relative">
                    {messages.length > 0 && (
                        <button onClick={clearChat} className="w-auto px-2 h-8 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition-colors text-[10px] font-medium">
                            Clear chat
                        </button>
                    )}
                </div>
            </div>

            {/* Error Banner */}
            <AnimatePresence>
                {error && <ErrorBanner error={error} onRetry={handleRetry} onDismiss={() => setError(null)} />}
            </AnimatePresence>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/60 overscroll-contain">
                {messages.length === 0 && !error && <WelcomeScreen onSelect={triggerChat} />}
                {messages.map((m) => <MessageBubble key={m.id} m={m} />)}
                <AnimatePresence>
                    {isLoading && <LoadingDots />}
                </AnimatePresence>
            </div>

            {/* Input */}
            <div className="shrink-0 px-3 py-3 border-t border-gray-100 bg-white flex gap-2 items-center">
                <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); triggerChat(input); } }}
                    placeholder="Type a message…"
                    disabled={isLoading}
                    autoComplete="off"
                    className="flex-1 bg-gray-50 border-gray-200 text-sm focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:border-green-400 h-10 sm:h-11 rounded-xl transition-all duration-200 placeholder:text-gray-400"
                />
                <motion.button
                    type="button"
                    onClick={() => triggerChat(input)}
                    whileTap={{ scale: 0.88 }}
                    disabled={isLoading || !input.trim()}
                    className="h-10 w-10 sm:h-11 sm:w-11 shrink-0 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-40 flex items-center justify-center shadow-md transition-colors duration-150"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 text-white animate-spin" /> : <Send className="w-4 h-4 text-white" />}
                </motion.button>
            </div>
        </motion.div>
    );
};