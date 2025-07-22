import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Minimize2, 
  Maximize2, 
  X,
  Bot,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from '@/types';

const ChatBot: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hello! I\'m your legal assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getLegalResponse = (message: string): string => {
    const lowercaseMessage = message.toLowerCase();
    
    // Legal FAQ responses based on Indian Constitution and laws
    if (lowercaseMessage.includes('article 21') || lowercaseMessage.includes('right to life')) {
      return 'Article 21 of the Indian Constitution guarantees the Right to Life and Personal Liberty. It states that "No person shall be deprived of his life or personal liberty except according to procedure established by law." This is one of the most fundamental rights and has been interpreted broadly by the Supreme Court.';
    }
    
    if (lowercaseMessage.includes('article 19') || lowercaseMessage.includes('freedom of speech')) {
      return 'Article 19(1)(a) guarantees freedom of speech and expression to all citizens. However, this right is subject to reasonable restrictions under Article 19(2) in the interests of sovereignty, security of State, friendly relations with foreign States, public order, decency, morality, or contempt of court.';
    }
    
    if (lowercaseMessage.includes('article 14') || lowercaseMessage.includes('equality')) {
      return 'Article 14 ensures equality before law and equal protection of laws. It prohibits the State from denying any person equality before the law or equal protection of the laws within the territory of India.';
    }
    
    if (lowercaseMessage.includes('rental agreement') || lowercaseMessage.includes('rent')) {
      return 'For rental agreements, you need: 1) Details of landlord and tenant 2) Property description 3) Rent amount and payment terms 4) Security deposit 5) Duration of tenancy 6) Terms and conditions. Would you like me to provide a rental agreement template?';
    }
    
    if (lowercaseMessage.includes('nda') || lowercaseMessage.includes('non-disclosure')) {
      return 'A Non-Disclosure Agreement (NDA) should include: 1) Parties involved 2) Definition of confidential information 3) Purpose of disclosure 4) Duration of confidentiality 5) Exceptions 6) Consequences of breach. I can provide you with an NDA template.';
    }
    
    if (lowercaseMessage.includes('power of attorney')) {
      return 'A Power of Attorney document should specify: 1) Principal and Agent details 2) Scope of powers granted 3) Duration (if any) 4) Specific limitations 5) Signature and notarization requirements. Different types include General, Special, and Durable POA.';
    }
    
    if (lowercaseMessage.includes('labour') || lowercaseMessage.includes('employment')) {
      return 'Key employment laws in India include: 1) Industrial Disputes Act, 1947 2) Payment of Wages Act, 1936 3) Employees\' Provident Fund Act, 1952 4) Labour Code on Wages, 2019. For specific issues, consult with a labour law specialist.';
    }
    
    if (lowercaseMessage.includes('consumer rights')) {
      return 'Consumer rights under the Consumer Protection Act, 2019 include: 1) Right to safety 2) Right to be informed 3) Right to choose 4) Right to be heard 5) Right to seek redressal 6) Right to consumer education. You can file complaints with District, State, or National Consumer Commissions.';
    }
    
    if (lowercaseMessage.includes('template') || lowercaseMessage.includes('document')) {
      return 'I can help you with various legal templates including: Rental Agreements, NDAs, Power of Attorney, Employment Contracts, Partnership Deeds, Property Sale Deeds, Loan Agreements, and more. What specific template do you need?';
    }
    
    if (lowercaseMessage.includes('lawyer') || lowercaseMessage.includes('consultation')) {
      return 'You can find specialized lawyers on our platform for: Family Law, Criminal Law, Corporate Law, Civil Law, Cyber Law, Property Law, and more. Each lawyer profile shows their experience, specialization, fees, and client reviews. Would you like me to help you find a lawyer?';
    }
    
    // Default response
    return 'I\'m here to help with legal queries related to Indian laws and constitution. I can provide information about legal articles, suggest document templates, and connect you with qualified lawyers. What specific legal assistance do you need?';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: getLegalResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
              size="icon"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className={`fixed z-50 ${
              isFullScreen 
                ? 'inset-4' 
                : 'bottom-6 right-6 w-96 h-96'
            } bg-card rounded-lg shadow-2xl border flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Legal Assistant</h3>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFullScreen(!isFullScreen)}
                >
                  {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.sender === 'bot' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                        {message.sender === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a legal question..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;