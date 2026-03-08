import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';
import {
  MessageCircle, Send, Minimize2, Maximize2, X, Bot, User, Mic, MicOff, Volume2, VolumeX, Copy, Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import ChatActionCards from './ChatActionCards';
import { SPEECH_LANG_MAP } from '@/i18n';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/nyaya-chat`;

const SUGGESTION_KEYS = [
  'suggestTenantDeposit',
  'suggestSalaryNotPaid',
  'suggestConsumerComplaint',
  'suggestTrafficFine',
  'suggestPropertyDispute',
  'suggestDomesticViolence',
];

const ChatBot: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const userState = user?.preferences?.selectedState;
  const currentLang = i18n.language;

  const buildWelcome = () =>
    userState
      ? `${t('chatbotGreeting')}\n\n${t('chatbotGreetingState', { state: userState })}\n\n${t('chatbotAskAnything')}\n- ${t('chatbotExample1')}\n- ${t('chatbotExample2')}\n- ${t('chatbotExample3')}\n\n${t('chatbotDisclaimer')}`
      : `${t('chatbotGreeting')}\n\n${t('chatbotAskAnything')}\n- ${t('chatbotExample1')}\n- ${t('chatbotExample2')}\n- ${t('chatbotExample3')}\n\n${t('chatbotDisclaimer')}`;

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: buildWelcome() },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const listenTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages(prev => {
      const rest = prev.filter(m => m.id !== '1');
      return [{ id: '1', role: 'assistant', content: buildWelcome() }, ...rest];
    });
  }, [currentLang, userState, t]);

  // Copy text
  const copyText = async (text: string, msgId: string) => {
    const clean = text.replace(/[#*_\[\]()>`~|]/g, '');
    await navigator.clipboard.writeText(clean);
    setCopiedMsgId(msgId);
    toast.success(t('copiedToClipboard'));
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  // Voice Input (Speech-to-Text) using Web Speech API
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert(t('voiceNotSupported'));
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = SPEECH_LANG_MAP[currentLang] || 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(prev => prev + transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  // Voice Output (Text-to-Speech) using Web Speech Synthesis
  const speakText = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) {
      alert(t('ttsNotSupported'));
      return;
    }
    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[#*_\[\]()>`~|]/g, '').replace(/\n+/g, '. ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = SPEECH_LANG_MAP[currentLang] || 'en-IN';
    utterance.rate = 0.9;
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);
    window.speechSynthesis.speak(utterance);
    setSpeakingMsgId(msgId);
  };

  const streamChat = async (allMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({
        messages: allMessages.map((m) => ({ role: m.role, content: m.content })),
        userState: userState || undefined,
        language: currentLang,
      }),
    });

    if (!resp.ok) {
      const errData = await resp.json().catch(() => ({}));
      throw new Error(errData.error || 'Failed to get response');
    }
    if (!resp.body) throw new Error('No response body');

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = '';
    let assistantSoFar = '';
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);
        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (line.startsWith(':') || line.trim() === '') continue;
        if (!line.startsWith('data: ')) continue;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') { streamDone = true; break; }
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantSoFar += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === 'assistant' && last.id === 'streaming') {
                return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
              }
              return [...prev, { id: 'streaming', role: 'assistant', content: assistantSoFar }];
            });
          }
        } catch { textBuffer = line + '\n' + textBuffer; break; }
      }
    }

    // Flush remaining
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split('\n')) {
        if (!raw) continue;
        if (raw.endsWith('\r')) raw = raw.slice(0, -1);
        if (raw.startsWith(':') || raw.trim() === '') continue;
        if (!raw.startsWith('data: ')) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === '[DONE]') continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantSoFar += content;
            setMessages((prev) => prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
          }
        } catch { /* ignore */ }
      }
    }

    setMessages((prev) => prev.map((m) => m.id === 'streaming' ? { ...m, id: Date.now().toString() } : m));
  };

  const handleSendMessage = async (text?: string) => {
    const msgText = text || inputMessage;
    if (!msgText.trim() || isTyping) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: msgText };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setShowSuggestions(false);
    setIsTyping(true);
    try {
      const historyForAI = updatedMessages.filter((m) => m.id !== '1').map((m) => ({ role: m.role, content: m.content }));
      await streamChat(historyForAI as Message[]);
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Something went wrong. Please try again.';
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: 'assistant', content: `❌ ${errorMsg}` }]);
    } finally { setIsTyping(false); }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="fixed bottom-6 right-6 z-50">
            <Button onClick={() => setIsOpen(true)} className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg" size="icon">
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className={`fixed z-50 ${isFullScreen ? 'inset-4' : 'bottom-6 right-6 w-96 h-[500px]'} bg-card rounded-lg shadow-2xl border flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">NyayaBot</h3>
                  <p className="text-xs text-muted-foreground">
                    {userState ? `📍 ${userState} • ${t('aiLegalAssistantLabel')}` : t('aiLegalAwarenessAssistant')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" onClick={() => setIsFullScreen(!isFullScreen)}>
                  {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-lg p-3 ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <div className="flex items-start space-x-2">
                          {message.role === 'assistant' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                          {message.role === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                          <div className="text-sm prose prose-sm dark:prose-invert max-w-none [&>p]:my-1 [&>ul]:my-1 [&>ol]:my-1">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Action buttons for assistant messages */}
                    {message.role === 'assistant' && message.id !== '1' && message.id !== 'streaming' && (
                      <>
                        <div className="mt-1 ml-6 flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-6 gap-1 text-muted-foreground hover:text-foreground"
                            onClick={() => speakText(message.content, message.id)}
                          >
                            {speakingMsgId === message.id ? (
                              <><VolumeX className="h-3 w-3" /> {t('stopAudio')}</>
                            ) : (
                              <><Volume2 className="h-3 w-3" /> {t('playAudio')}</>
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-6 gap-1 text-muted-foreground hover:text-foreground"
                            onClick={() => copyText(message.content, message.id)}
                          >
                            {copiedMsgId === message.id ? (
                              <><Check className="h-3 w-3" /> {t('copied')}</>
                            ) : (
                              <><Copy className="h-3 w-3" /> {t('copyText')}</>
                            )}
                          </Button>
                        </div>
                        <div className="mt-2 max-w-[90%]">
                          <ChatActionCards messageContent={message.content} />
                        </div>
                      </>
                    )}
                  </div>
                ))}

                {/* Quick Suggestion Chips */}
                {showSuggestions && messages.length <= 1 && !isTyping && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">{t('trySuggestions')}</p>
                    <div className="flex flex-wrap gap-2">
                      {SUGGESTION_KEYS.map((key) => (
                        <button
                          key={key}
                          onClick={() => handleSendMessage(t(key))}
                          className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                        >
                          {t(key)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {isTyping && messages[messages.length - 1]?.id !== 'streaming' && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-muted/30">
              <div className="flex space-x-2">
                {/* Voice Input Button */}
                <Button
                  variant={isListening ? "destructive" : "outline"}
                  size="icon"
                  className="shrink-0"
                  onClick={isListening ? stopListening : startListening}
                  title={t('voiceInputTooltip')}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isListening ? t('voiceListening') : t('chatbotInputPlaceholder')}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button onClick={() => handleSendMessage()} size="icon" className="bg-primary hover:bg-primary/90" disabled={isTyping || !inputMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                {t('chatbotDisclaimerShort')}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
