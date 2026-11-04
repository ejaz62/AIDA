import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { sendChatMessage, ChatMessage } from '../services/chatApi';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-0',
  role: 'assistant',
  text: 'Hello & Welcome to **AIDA** (Artificial Intelligence Digital Academy)! 👋\n\nI am your AI Assistant. I can answer questions about our **10-day practical AI course**, fees, refund policy, and planned learning areas in **English**, **Urdu (اردو)**, or **Roman Urdu**.\n\nHow can I help you today?',
  timestamp: Date.now(),
};

const SUGGESTED_QUESTIONS = [
  'What is the course fee and duration?',
  'Do I need prior coding or technical experience?',
  'What is the refund policy?',
  'What are the planned learning areas?',
  'How do I contact Muhammad Ejaz / AIDA?',
];

export const FloatingChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true);
    }
  }, [messages, isLoading]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    setErrorNotice(null);
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: Date.now(),
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      // Pass the previous history (excluding the new user message, which sendChatMessage appends)
      const assistantReply = await sendChatMessage(textToSend, messages);

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: assistantReply,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('[AIDA Chat UI] Send error:', err);
      const errorMessage =
        err?.message ||
        'Unable to connect to the AIDA assistant right now. Please try again or message on WhatsApp at +92 322 7204898.';
      setErrorNotice(errorMessage);

      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          text: `⚠️ ${errorMessage}`,
          timestamp: Date.now(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        id: `welcome-${Date.now()}`,
        timestamp: Date.now(),
      },
    ]);
    setErrorNotice(null);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  // Helper to format text with basic markdown (bold, lists, linebreaks)
  const renderFormattedText = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, lineIdx) => {
      // Parse **bold** tags
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const parsedLine = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIdx} className="font-bold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      // Check if bullet point
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('• ');
      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-1.5 my-1 pl-1">
            <span className="text-cyan-400 font-bold shrink-0">•</span>
            <span className="flex-1">{parsedLine}</span>
          </div>
        );
      }

      if (line.trim() === '') {
        return <div key={lineIdx} className="h-2" />;
      }

      return (
        <p key={lineIdx} className="my-0.5 leading-relaxed">
          {parsedLine}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open AIDA AI Assistant"
            className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 p-3.5 sm:p-4 text-white shadow-xl shadow-cyan-900/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950 cursor-pointer"
          >
            <div className="relative">
              <Bot className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:rotate-6" />
              {/* Online pulse indicator */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950"></span>
              </span>
            </div>

            <span className="hidden sm:inline-block pr-1 font-bold text-sm tracking-wide text-white">
              AIDA AI Assistant
            </span>
          </button>
        )}
      </div>

      {/* Floating Chat Modal / Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AIDA AI Assistant Window"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[88vh] rounded-2xl border border-cyan-500/30 bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-cyan-950/60 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3.5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-950/70 text-cyan-400 shadow-inner">
                <Bot className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm sm:text-base text-white tracking-tight truncate">
                    AIDA AI Assistant
                  </h3>
                  <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                    Flash AI
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                  <span className="truncate">English • اردو • Roman Urdu</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Clear conversation */}
              <button
                onClick={handleClearChat}
                title="Clear conversation"
                aria-label="Clear conversation"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {!isUser && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/60 text-cyan-400 mt-0.5">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl px-4 py-2.5 max-w-[85%] break-words ${
                      isUser
                        ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white rounded-tr-xs shadow-md shadow-cyan-900/30'
                        : msg.isError
                        ? 'bg-rose-950/60 text-rose-200 border border-rose-800/60 rounded-tl-xs'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-800/90 rounded-tl-xs'
                    }`}
                  >
                    {renderFormattedText(msg.text)}
                  </div>

                  {isUser && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 mt-0.5">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2.5 justify-start">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/60 text-cyan-400 mt-0.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                </div>
                <div className="rounded-2xl rounded-tl-xs border border-slate-800/90 bg-slate-900/90 px-4 py-2.5 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-cyan-400 font-medium">AIDA Assistant is thinking</span>
                    <span className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Prompt Chips (Shown when only initial message exists) */}
            {messages.length === 1 && !isLoading && (
              <div className="pt-2 space-y-1.5">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-1">
                  Frequently Asked Questions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map((question, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => handleSend(question)}
                      className="text-left text-xs bg-slate-900/80 hover:bg-slate-800 text-cyan-300 hover:text-cyan-200 border border-slate-800 hover:border-cyan-500/40 rounded-xl px-2.5 py-1.5 transition-colors cursor-pointer"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div className="border-t border-slate-800 bg-slate-900/90 p-3 space-y-2">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                placeholder="Ask in English, Urdu or Roman Urdu..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-md shadow-cyan-900/40 transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-cyan-400" />
                10-Day Course • Full 1st-day refund
              </span>
              <span>
                WhatsApp: <a href="https://wa.me/923227204898" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">+92 322 7204898</a>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
