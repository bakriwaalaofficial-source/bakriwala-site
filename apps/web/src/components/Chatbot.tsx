'use client';

import React, { useState, useRef, useEffect } from 'react';

// Helper component to render rich formatting: bold, italics, bullet points, numbers, and paragraphs
function FormattedMessage({ text }: { text: string }) {
  // Parse inline formatting: **bold** and *italic*
  const renderInline = (content: string) => {
    // Regex for bold **text** or *italic*
    const parts = content.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-extrabold text-slate-950 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={index} className="italic text-slate-800">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  // Split response by line breaks
  const lines = text.split('\n');

  return (
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
      {lines.map((line, lineIndex) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lineIndex} className="h-1.5" />;
        }

        // Headings (### or ##)
        if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
          const headingText = trimmed.replace(/^#+\s*/, '');
          return (
            <h4
              key={lineIndex}
              className="font-black text-slate-900 text-sm sm:text-base mt-2 mb-1 flex items-center gap-1.5 text-green-900"
            >
              <span className="w-1.5 h-3.5 bg-green-600 rounded-full inline-block"></span>
              {renderInline(headingText)}
            </h4>
          );
        }

        // Numbered list items (e.g., 1. 2. 3.)
        const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          const num = numMatch[1];
          const itemText = numMatch[2];
          return (
            <div key={lineIndex} className="flex items-start gap-2 pl-1 py-0.5">
              <span className="w-5 h-5 flex-shrink-0 rounded-full bg-green-100 text-green-800 font-black text-[10px] flex items-center justify-center mt-0.5 shadow-xs border border-green-300">
                {num}
              </span>
              <div className="flex-1 text-slate-800">{renderInline(itemText)}</div>
            </div>
          );
        }

        // Bullet list items (e.g., * , - , • )
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          const itemText = trimmed.replace(/^[\*\-•]\s*/, '');
          return (
            <div key={lineIndex} className="flex items-start gap-2 pl-1.5 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 flex-shrink-0 mt-2"></span>
              <div className="flex-1 text-slate-800">{renderInline(itemText)}</div>
            </div>
          );
        }

        // Standard Paragraph
        return (
          <p key={lineIndex} className="text-slate-800 font-normal">
            {renderInline(line)}
          </p>
        );
      })}
    </div>
  );
}

export default function Chatbot() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const [chatHistory, setChatHistory] = useState([
    {
      role: 'ai',
      text: 'Namaste! 🙏 I am your **BakriWala AI Expert Assistant**.\n\nHow can I help your farm today? You can ask about:\n* **Vaccination schedules** (PPR, ET, Goat Pox)\n* **Low-cost feed formulas** & TMR\n* **Disease symptoms & remedies**\n* **High-yield goat breeds** & NABARD loans',
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [chatHistory, isChatOpen, isLoading]);

  const quickPrompts = [
    '💉 Goat Vaccination Schedule',
    '🌾 Low-Cost Feed Formula',
    '🐐 Best Breeds for Meat & Milk',
    '🤒 How to treat PPR & Diarrhea?',
    '📜 NABARD Subsidy 50% DPR'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || message).trim();
    if (!text || isLoading) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newHistory = [...chatHistory, { role: 'user', text, time: currentTime }];
    setChatHistory(newHistory);
    if (!textToSend) setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();

      if (data.success && data.reply) {
        setChatHistory([
          ...newHistory,
          {
            role: 'ai',
            text: data.reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        setChatHistory([
          ...newHistory,
          {
            role: 'ai',
            text: 'I had trouble fetching the answer. For urgent expert support, please **message our doctor team on WhatsApp at +91 63920 04098**.',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setChatHistory([
        ...newHistory,
        {
          role: 'ai',
          text: '⚠️ **Connection Error**: Unable to reach the server. Please check your internet or reach us directly on WhatsApp at **+91 63920 04098**.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const cleanText = text.replace(/[*#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const clearChat = () => {
    if (confirm('Clear chat history?')) {
      setChatHistory([
        {
          role: 'ai',
          text: 'Chat history cleared. How can I help you and your goat farm now?',
          time: 'Just now'
        }
      ]);
    }
  };

  return (
    <>
      {/* Chat Window Panel */}
      {isChatOpen && (
        <div
          className={`fixed bottom-24 right-3 sm:right-6 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/90 z-50 flex flex-col overflow-hidden transition-all duration-300 animate-fadeIn ${
            isExpanded
              ? 'w-[95vw] sm:w-[620px] h-[85vh] max-h-[750px]'
              : 'w-[94vw] sm:w-[420px] h-[540px] max-h-[82vh]'
          }`}
        >
          {/* Header Panel */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-green-950 text-white px-4 py-3.5 flex justify-between items-center shadow-md border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-green-400 shadow-md bg-slate-800 flex items-center justify-center">
                  <img
                    src="/chatbot-icon.png"
                    alt="BakriWala AI Mascot"
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-slate-900 animate-pulse"></span>
              </div>

              <div>
                <h3 className="font-black text-sm sm:text-base leading-tight flex items-center gap-1.5 text-white">
                  BakriWala AI Assistant
                </h3>
                <div className="flex items-center gap-2 text-[11px] text-green-300 font-medium">
                  <span>● Online</span>
                  <span>•</span>
                  <span>Expert Diagnostics</span>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1 text-slate-300">
              {/* WhatsApp Doctor Escalation */}
              <a
                href="https://wa.me/+916392004098?text=Hello%20BakriWala%20Doctor,%20I%20need%20expert%20advice"
                target="_blank"
                rel="noreferrer"
                title="Ask Expert Doctor on WhatsApp"
                className="p-1.5 hover:text-green-400 hover:bg-slate-800/80 rounded-lg transition text-xs font-bold flex items-center gap-1 bg-green-600/20 text-green-300 border border-green-500/30"
              >
                <span>💬 Expert</span>
              </a>

              {/* Clear Chat */}
              <button
                onClick={clearChat}
                title="Clear Chat"
                className="p-1.5 hover:text-white hover:bg-slate-800/80 rounded-lg transition text-sm"
                aria-label="Clear chat"
              >
                🗑️
              </button>

              {/* Expand Toggle */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Collapse' : 'Expand'}
                className="p-1.5 hover:text-white hover:bg-slate-800/80 rounded-lg transition text-sm hidden sm:block"
                aria-label="Expand or collapse chat"
              >
                {isExpanded ? '🗗' : '🗖'}
              </button>

              {/* Close */}
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white font-bold text-lg rounded-lg hover:bg-slate-800/80 transition"
                aria-label="Close Chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50/80 space-y-4">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2.5 items-start ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-green-500/60 flex-shrink-0 bg-slate-900 mt-1 shadow-sm">
                    <img
                      src="/chatbot-icon.png"
                      alt="AI"
                      className="w-full h-full object-cover scale-110"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 shadow-sm font-normal relative group transition ${
                    msg.role === 'user'
                      ? 'bg-green-700 text-white rounded-tr-xs'
                      : 'bg-white border border-slate-200 text-slate-900 rounded-tl-xs shadow-xs'
                  }`}
                >
                  {/* Rich Formatted Content */}
                  {msg.role === 'ai' ? (
                    <FormattedMessage text={msg.text} />
                  ) : (
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">{msg.text}</p>
                  )}

                  {/* Message Footer: Timestamp + Copy/Speak Controls */}
                  <div className="mt-2.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span className={msg.role === 'user' ? 'text-green-200' : 'text-slate-400'}>
                      {msg.time || ''}
                    </span>

                    {msg.role === 'ai' && (
                      <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition">
                        <button
                          onClick={() => speakText(msg.text)}
                          title={isSpeaking ? 'Stop Audio' : 'Listen in Audio'}
                          className="hover:text-green-700 font-bold transition flex items-center gap-1 text-[11px]"
                        >
                          <span>{isSpeaking ? '⏹️ Stop' : '🔊 Listen'}</span>
                        </button>
                        <button
                          onClick={() => copyToClipboard(msg.text, index)}
                          title="Copy message"
                          className="hover:text-green-700 font-bold transition flex items-center gap-1 text-[11px]"
                        >
                          <span>{copiedIndex === index ? '✓ Copied' : '📋 Copy'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-start justify-start animate-fadeIn">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-green-500/60 flex-shrink-0 bg-slate-900 mt-1">
                  <img
                    src="/chatbot-icon.png"
                    alt="AI"
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 text-xs text-slate-600 flex items-center gap-2.5 shadow-sm">
                  <span className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce"></span>
                  <span className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2.5 h-2.5 bg-green-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  <span className="font-semibold text-slate-700">BakriWala AI is formulating answer...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3.5 py-2.5 bg-slate-100/90 border-t border-slate-200/80 flex gap-2 overflow-x-auto text-xs no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-3 py-1.5 bg-white hover:bg-green-700 hover:text-white text-slate-700 font-bold rounded-full border border-slate-200/90 shadow-xs transition transform hover:scale-105"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Control Box */}
          <div className="p-3 bg-white border-t border-slate-200/80 flex gap-2 items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask anything (e.g. PPR vaccine dosage, low cost feed formula)..."
              className="flex-1 border border-slate-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600 text-xs sm:text-sm text-slate-900 bg-white placeholder:text-slate-400"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !message.trim()}
              className="bg-green-700 hover:bg-green-800 disabled:opacity-40 text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition shadow-md flex items-center justify-center gap-1"
            >
              <span>Send</span>
              <span>➔</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button with Mascot Image */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        aria-label="Open AI Assistant"
        className="fixed bottom-6 right-4 sm:right-6 w-16 h-16 sm:w-18 sm:h-18 bg-slate-900 hover:bg-slate-800 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 z-50 border-4 border-green-500/80 animate-pulse-glow group"
      >
        {isChatOpen ? (
          <span className="text-white font-black text-2xl">✕</span>
        ) : (
          <div className="relative w-full h-full rounded-full overflow-hidden p-0.5">
            <img
              src="/chatbot-icon.png"
              alt="BakriWala AI Mascot"
              className="w-full h-full object-cover scale-110 rounded-full group-hover:scale-125 transition duration-300"
            />
            <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-slate-900 shadow-sm animate-pulse"></span>
          </div>
        )}
      </button>
    </>
  );
}
