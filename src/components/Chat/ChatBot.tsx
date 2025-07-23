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
    
    // Constitutional Articles (Comprehensive coverage)
    if (lowercaseMessage.includes('article 21') || lowercaseMessage.includes('right to life')) {
      return 'Article 21 guarantees the Right to Life and Personal Liberty. Recent interpretations include right to privacy, clean environment, speedy trial, free legal aid, dignity, livelihood, education, and healthcare. Supreme Court has expanded its scope significantly through landmark cases like Maneka Gandhi v. Union of India.';
    }
    
    if (lowercaseMessage.includes('article 19') || lowercaseMessage.includes('freedom of speech')) {
      return 'Article 19(1)(a) guarantees six freedoms: speech/expression, assembly, association, movement, residence, and profession. Restrictions under 19(2) include sovereignty, security, public order, decency, morality, contempt of court, defamation, and incitement to offense. Internet shutdowns, sedition laws are current debates.';
    }
    
    if (lowercaseMessage.includes('article 14') || lowercaseMessage.includes('equality')) {
      return 'Article 14 ensures equality before law and equal protection. It prohibits arbitrary state action and class legislation. Includes concepts of reasonable classification, positive discrimination for SCs/STs/OBCs, and gender equality. Recent cases have strengthened LGBTQ+ rights under this article.';
    }
    
    if (lowercaseMessage.includes('article 15') || lowercaseMessage.includes('discrimination')) {
      return 'Article 15 prohibits discrimination on grounds of religion, race, caste, sex, or place of birth. Allows positive discrimination for women, children, SCs/STs/OBCs. Recent amendments include reservation for economically weaker sections (Article 15(6)) and various state-specific reservations.';
    }
    
    if (lowercaseMessage.includes('article 16') || lowercaseMessage.includes('public employment')) {
      return 'Article 16 ensures equality of opportunity in public employment. Allows reservations for SCs/STs/OBCs and now EWS (10% reservation). Includes provisions for reservation in promotions, Creamy Layer concept, and 50% ceiling on reservations as per Indra Sawhney case.';
    }
    
    if (lowercaseMessage.includes('article 17') || lowercaseMessage.includes('untouchability')) {
      return 'Article 17 abolishes untouchability. Enforced through Protection of Civil Rights Act, 1955 and SC/ST (Prevention of Atrocities) Act, 1989. Practice of untouchability is a punishable offense. Manual scavenging is specifically prohibited under recent legislation.';
    }
    
    if (lowercaseMessage.includes('article 20') || lowercaseMessage.includes('ex post facto')) {
      return 'Article 20 provides protection against arbitrary punishment: (1) Ex post facto laws prohibited (2) Double jeopardy protection (3) Self-incrimination protection. These are available to both citizens and non-citizens. Miranda rights in Indian context derive from this article.';
    }
    
    if (lowercaseMessage.includes('article 22') || lowercaseMessage.includes('arrest')) {
      return 'Article 22 provides protection against arrest and detention: Right to be informed of grounds, right to legal representation, 24-hour production before magistrate. Preventive detention laws like NSA, UAPA are exceptions. Habeas corpus is the constitutional remedy for illegal detention.';
    }
    
    // Directive Principles and Duties
    if (lowercaseMessage.includes('dpsp') || lowercaseMessage.includes('directive principles')) {
      return 'DPSPs (Articles 36-51) are fundamental in governance but not enforceable by courts. Include right to work, education, public assistance, living wage, participatory democracy. Recent judicial interpretation has made them more enforceable through Article 21. Conflict with fundamental rights resolved case-by-case.';
    }
    
    if (lowercaseMessage.includes('fundamental duties') || lowercaseMessage.includes('article 51a')) {
      return 'Article 51A lists 11 fundamental duties added by 42nd Amendment (1976). Include respecting Constitution, national flag/anthem, protecting environment, developing scientific temperament, safeguarding public property. Non-justiciable but considered by courts in judicial review.';
    }
    
    // Specific Laws and Acts
    if (lowercaseMessage.includes('criminal procedure code') || lowercaseMessage.includes('crpc')) {
      return 'CrPC 2023 (new law replacing CrPC 1973) governs criminal procedure. Key changes: timeline-bound investigation, victim rights, electronic processes, community service sentences. Covers arrest, bail, trial procedures, appeals. Major reforms in witness protection and e-courts integration.';
    }
    
    if (lowercaseMessage.includes('indian penal code') || lowercaseMessage.includes('ipc') || lowercaseMessage.includes('bharatiya nyaya sanhita')) {
      return 'Bharatiya Nyaya Sanhita (BNS) 2023 replaces IPC 1860. Defines crimes and punishments. New provisions for terrorism, organized crime, mob lynching. Enhanced penalties for crimes against women and children. Death penalty retained for heinous crimes. Gender-neutral rape laws debated but not included.';
    }
    
    if (lowercaseMessage.includes('evidence act') || lowercaseMessage.includes('bharatiya sakshya adhiniyam')) {
      return 'Bharatiya Sakshya Adhiniyam 2023 replaces Evidence Act 1872. Recognizes electronic evidence, digital signatures, AI-generated evidence. Simplified admissibility rules for electronic records. Provisions for video conferencing, remote testimony. Strengthened protection for vulnerable witnesses.';
    }
    
    if (lowercaseMessage.includes('information technology act') || lowercaseMessage.includes('it act')) {
      return 'IT Act 2000 (amended 2008) governs cybercrimes and digital transactions. Covers data protection, cybersecurity, digital signatures, intermediary liability. Section 66A struck down by Supreme Court. Current focus on personal data protection, fake news, digital rights. New Digital India Act proposed.';
    }
    
    if (lowercaseMessage.includes('right to information') || lowercaseMessage.includes('rti')) {
      return 'RTI Act 2005 ensures transparency and accountability. Citizens can access government information within 30 days (48 hours for life/liberty). Exemptions under Section 8. Information Commissions at central and state levels. Recent amendments regarding tenure and salaries of Information Commissioners controversial.';
    }
    
    if (lowercaseMessage.includes('lokpal') || lowercaseMessage.includes('anti-corruption')) {
      return 'Lokpal and Lokayuktas Act 2013 establishes anti-corruption ombudsman. Covers PM, Ministers, MPs, government employees. Lokpal has investigative and prosecution powers. State Lokayuktas for state-level corruption. Whistleblower Protection Act 2014 protects those reporting corruption.';
    }
    
    // Employment and Labor Laws
    if (lowercaseMessage.includes('labour') || lowercaseMessage.includes('employment') || lowercaseMessage.includes('industrial relations')) {
      return 'New Labour Codes (2020): (1) Wages Code - minimum wages, payment of wages (2) Industrial Relations Code - unions, strikes, layoffs (3) Social Security Code - PF, ESI, gratuity (4) OSH Code - factory safety, working conditions. Subsumed 29 central labor laws. Implementation phased across states.';
    }
    
    if (lowercaseMessage.includes('minimum wages') || lowercaseMessage.includes('payment of wages')) {
      return 'Wages Code 2019 ensures: National minimum wage floor, timely payment, no discrimination. Covers all employees. Central government sets national floor wage. State governments cannot set wages below this floor. Penalties for delayed payment, deductions regulated. Digital payment systems encouraged.';
    }
    
    if (lowercaseMessage.includes('maternity benefit') || lowercaseMessage.includes('paternity leave')) {
      return 'Maternity Benefit Act 2017: 26 weeks paid leave (increased from 12 weeks), adoptive mothers get 12 weeks, work from home options, crèche facility for 50+ women employees. Paternity leave varies by state/employer policy. New Social Security Code 2020 may standardize benefits.';
    }
    
    // Family and Personal Laws
    if (lowercaseMessage.includes('hindu marriage act') || lowercaseMessage.includes('divorce')) {
      return 'Hindu Marriage Act 1955 governs Hindu marriages. Grounds for divorce: cruelty, desertion, conversion, mental disorder, communicable disease, renunciation. Mutual consent divorce under Section 13B. Maintenance, child custody governed by separate provisions. Recent trends favor shared custody and mediation.';
    }
    
    if (lowercaseMessage.includes('domestic violence') || lowercaseMessage.includes('protection of women')) {
      return 'Protection of Women from Domestic Violence Act 2005: Broader definition of domestic violence includes physical, sexual, verbal, emotional, economic abuse. Live-in relationships covered. Protection officers, shelter homes, monetary relief. Recent amendments strengthen implementation and increase penalties.';
    }
    
    if (lowercaseMessage.includes('child custody') || lowercaseMessage.includes('guardianship')) {
      return 'Guardians and Wards Act 1890, Hindu Minority and Guardianship Act 1956 govern custody. Best interest of child is paramount. Courts prefer joint custody, frequent access. Recent trends: shared parenting, involvement of child counselors, mediation preferred over litigation. International child abduction governed by Hague Convention.';
    }
    
    // Consumer and Civil Rights
    if (lowercaseMessage.includes('consumer rights') || lowercaseMessage.includes('consumer protection')) {
      return 'Consumer Protection Act 2019: Expanded definition of consumer, e-commerce included, product liability, class action suits, alternative dispute resolution. Central Consumer Protection Authority for policy enforcement. Three-tier system: District, State, National Consumer Commissions. Penalties up to ₹1 lakh for misleading ads.';
    }
    
    if (lowercaseMessage.includes('rent control') || lowercaseMessage.includes('rental agreement')) {
      return 'Rental agreements governed by: Transfer of Property Act 1882, state rent control laws, Model Tenancy Act 2021. Key elements: parties details, property description, rent amount, security deposit, duration, terms. Registration mandatory for 11+ months. Recent reforms aim to balance landlord-tenant rights, expedite disputes.';
    }
    
    if (lowercaseMessage.includes('property rights') || lowercaseMessage.includes('real estate')) {
      return 'Real Estate (Regulation and Development) Act 2016: RERA registration mandatory for projects, transparency in project details, completion timelines, penalty for delays, buyers rights protection. State RERA authorities established. Covers residential and commercial projects above specified thresholds. Appellate tribunals for disputes.';
    }
    
    // Corporate and Business Laws
    if (lowercaseMessage.includes('companies act') || lowercaseMessage.includes('corporate governance')) {
      return 'Companies Act 2013: Corporate governance reforms, independent directors, audit committees, CSR obligations, class action suits, serious fraud investigation. Recent amendments: producer companies, small companies exemptions, e-voting, decriminalization of technical violations. NCLT/NCLAT for company law disputes.';
    }
    
    if (lowercaseMessage.includes('insolvency') || lowercaseMessage.includes('bankruptcy')) {
      return 'Insolvency and Bankruptcy Code 2016: Time-bound resolution (180+90 days), creditor-in-control model, NCLT as adjudicating authority, resolution professionals, liquidation as last resort. Covers corporate persons, partnership firms, individuals. Pre-pack insolvency for MSMEs. Significant economic reform for stressed assets.';
    }
    
    if (lowercaseMessage.includes('gst') || lowercaseMessage.includes('goods and services tax')) {
      return 'GST Act 2017: "One Nation, One Tax" - subsumed multiple indirect taxes. CGST, SGST, IGST, UTGST structure. Input tax credit, reverse charge, composition scheme, e-way bills, GSTIN registration. Anti-profiteering measures, GST tribunals for disputes. Regular rate revisions by GST Council.';
    }
    
    // Recent Legal Developments
    if (lowercaseMessage.includes('data protection') || lowercaseMessage.includes('privacy')) {
      return 'Personal Data Protection Bill (withdrawn 2022): Proposed comprehensive data protection framework. Current status: Draft Digital Personal Data Protection Act 2023 under consideration. Covers data fiduciary obligations, consent, data principal rights, cross-border transfers, penalties. Privacy as fundamental right per Puttaswamy judgment.';
    }
    
    if (lowercaseMessage.includes('triple talaq') || lowercaseMessage.includes('muslim personal law')) {
      return 'Muslim Personal Law (Shariat) Application Act 1937 governs Muslim family matters. Triple Talaq criminalized by Muslim Personal Law (Shariat) Application Act 2019. Instant triple talaq void and illegal. Maintenance, custody rights protected. Ongoing debates on Uniform Civil Code implementation.';
    }
    
    if (lowercaseMessage.includes('cab') || lowercaseMessage.includes('citizenship amendment act')) {
      return 'Citizenship Amendment Act 2019: Fast-track citizenship for non-Muslim minorities from Afghanistan, Bangladesh, Pakistan who entered India before Dec 2014. Controversial for religion-based criterion. Combined with NRC concerns led to nationwide protests. Various petitions pending in Supreme Court challenging its validity.';
    }
    
    // Court Procedures and Legal Processes
    if (lowercaseMessage.includes('bail') || lowercaseMessage.includes('anticipatory bail')) {
      return 'Bail types: Regular bail (post-arrest), anticipatory bail (pre-arrest), interim bail (temporary). Constitutional right to bail for bailable offenses. Non-bailable offenses require court discretion. Factors: gravity of offense, flight risk, tampering evidence, public interest. Recent reforms emphasize personal liberty, undertrial detention concerns.';
    }
    
    if (lowercaseMessage.includes('pil') || lowercaseMessage.includes('public interest litigation')) {
      return 'PIL democratizes justice by allowing any citizen to approach courts for public issues. Relaxed locus standi, social justice focus. Supreme Court and High Courts have PIL jurisdiction. Covers environmental protection, fundamental rights violations, government accountability. Recent concerns about frivolous PILs led to stricter guidelines.';
    }
    
    if (lowercaseMessage.includes('arbitration') || lowercaseMessage.includes('alternative dispute resolution')) {
      return 'Arbitration and Conciliation Act 2015 (amended 2019/2021): Institutional arbitration promotion, timelines for awards (12 months), limited court intervention, confidentiality, emergency arbitration. Mediation Act 2023 promotes mediation. Lok Adalats for alternative dispute resolution. Focus on reducing court backlog.';
    }
    
    // Templates and Documents
    if (lowercaseMessage.includes('template') || lowercaseMessage.includes('document')) {
      return 'I can provide templates for: Rental Agreements, NDAs, Power of Attorney, Employment Contracts, Partnership Deeds, Property Sale Deeds, Loan Agreements, Wills, Affidavits, Consumer Complaints, Cyber Crime Complaints, and more. Which specific template do you need? I can also explain the legal requirements for each document.';
    }
    
    if (lowercaseMessage.includes('will') || lowercaseMessage.includes('succession')) {
      return 'Indian Succession Act 1925 governs wills and succession. Valid will requires: sound mind, free consent, signature, two witnesses. Registration not mandatory but advisable. Probate required for certain properties. Hindu Succession Act 2005 provides equal inheritance rights to daughters. Muslim succession governed by personal law.';
    }
    
    if (lowercaseMessage.includes('power of attorney')) {
      return 'Power of Attorney types: General (all legal acts), Special (specific purpose), Durable (survives incapacity). Must specify: Principal/Agent details, scope of powers, duration, limitations, signatures, notarization. Registration mandatory for immovable property transactions. Can be revoked anytime by principal. Safeguards against misuse essential.';
    }
    
    if (lowercaseMessage.includes('nda') || lowercaseMessage.includes('non-disclosure')) {
      return 'Non-Disclosure Agreement elements: (1) Parties identification (2) Definition of confidential information (3) Purpose and scope (4) Duration of confidentiality (5) Permitted disclosures (6) Return of information (7) Remedies for breach (8) Jurisdiction. Mutual vs Unilateral NDAs. Digital signatures valid under IT Act.';
    }
    
    // Legal Profession and Services
    if (lowercaseMessage.includes('lawyer') || lowercaseMessage.includes('advocate') || lowercaseMessage.includes('consultation')) {
      return 'Advocates Act 1961 governs legal profession. Bar Council of India regulates advocates. Specializations: Criminal Law, Civil Law, Corporate Law, Family Law, Constitutional Law, Tax Law, IP Law, Cyber Law, Environmental Law. Choose lawyers based on: experience, specialization, location, fees, reviews, success rate.';
    }
    
    if (lowercaseMessage.includes('legal aid') || lowercaseMessage.includes('free legal help')) {
      return 'Legal Services Authorities Act 1987: Free legal aid for eligible persons (women, SCs/STs, children, disabled, victims of trafficking, below poverty line). National Legal Services Authority (NALSA) coordinates. Legal aid clinics, Lok Adalats, para-legal volunteers. Constitutional mandate under Article 39A.';
    }
    
    if (lowercaseMessage.includes('court fees') || lowercaseMessage.includes('filing fees')) {
      return 'Court fees vary by: case type, claim value, court level. Court Fees Act 1870 and state amendments govern fees. Exemptions for: government cases, pauper suits, certain categories. E-filing systems accept online payments. Additional charges: advocate fees, documentation, travel. Legal aid available for eligible persons.';
    }
    
    // Recent Activities and Legal Updates
    if (lowercaseMessage.includes('recent') || lowercaseMessage.includes('latest') || lowercaseMessage.includes('news')) {
      return 'Recent legal developments: (1) New criminal laws implementation (2) Digital Personal Data Protection Act drafting (3) Uniform Civil Code committee reports (4) E-courts expansion (5) AI in judiciary discussions (6) Climate change litigation increase (7) Crypto regulation frameworks (8) Gig economy labor rights (9) POCSO Act amendments (10) Electoral reforms debates.';
    }
    
    // Default comprehensive response
    return 'I\'m your advanced legal AI assistant with comprehensive knowledge of Indian Constitution, laws, and regulations. I can help with: Constitutional rights interpretation, legal procedure guidance, document templates, case law references, recent legal updates, lawyer recommendations, legal research assistance, and procedural queries. Ask me anything specific about Indian law, and I\'ll provide detailed, accurate information based on current legal framework and recent developments.';
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