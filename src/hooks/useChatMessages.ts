/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useState, useRef, useEffect } from 'react';

export type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
};

const getErrorMessage = (err: any): string => {
    const msg = err?.message?.toLowerCase() ?? '';
    if (msg.includes('fetch') || msg.includes('network') || msg.includes('failed to fetch'))
        return 'Unable to connect to the server. Please check your internet connection and try again.';
    if (msg.includes('429') || msg.includes('rate limit'))
        return 'Too many requests have been made. Please wait a moment and try again.';
    if (msg.includes('500') || msg.includes('internal server'))
        return 'The server encountered an error. Please try again in a few moments.';
    if (msg.includes('401') || msg.includes('unauthorized'))
        return 'Authentication error. Please refresh the page and try again.';
    if (msg.includes('403') || msg.includes('forbidden'))
        return 'Access denied. You do not have permission to perform this action.';
    if (msg.includes('404'))
        return 'The requested resource was not found. Please try again.';
    if (msg.includes('timeout') || msg.includes('timed out'))
        return 'The request took too long to respond. Please try again.';
    if (msg.includes('groq') || msg.includes('model') || msg.includes('ai'))
        return 'The AI service is currently unavailable. Please try again shortly.';
    if (msg.includes('abort'))
        return 'The request was cancelled. Please try again.';
    return 'Something went wrong. Please try again.';
};

export const useChatMessages = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages]);

    const triggerChat = async (text: string) => {
        if (!text.trim() || isLoading) return;
        setError(null);

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        const assistantId = (Date.now() + 1).toString();
        setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
                }),
            });

            if (!response.ok) {
                let errMsg = `Request failed with status ${response.status}`;
                try {
                    const errData = await response.json();
                    errMsg = errData.message ?? errMsg;
                } catch { /* ignore */ }
                throw new Error(errMsg);
            }

            const data = await response.json();
            if (!data.success) throw new Error(data.message ?? 'Request failed');

            setMessages(prev =>
                prev.map(m => m.id === assistantId ? { ...m, content: data.text } : m)
            );
        } catch (err: any) {
            setError(getErrorMessage(err));
            setMessages(prev => prev.filter(m => m.id !== assistantId));
        } finally {
            setIsLoading(false);
        }
    };

    const handleRetry = () => {
        setError(null);
        const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
        if (lastUserMessage) {
            setMessages(prev => prev.filter(m => m.id !== lastUserMessage.id));
            triggerChat(lastUserMessage.content);
        }
    };

    const clearChat = () => {
        setMessages([]);
        setError(null);
        setInput('');
    };

    return {
        messages, isLoading, error, input,
        setInput, setError, scrollRef, inputRef,
        triggerChat, handleRetry, clearChat,
    };
};