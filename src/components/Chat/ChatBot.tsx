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
      message: '🙏 Namaste! I\'m NyayaBot, your comprehensive legal assistant for Indian law. I can help you with Constitutional rights, traffic rules, property law, family matters, consumer rights, criminal law, employment issues, and much more. How can I assist you today?',
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

  const legalKnowledge = {
    // Constitutional Rights & Basic Legal Awareness
    constitution: {
      "Article 14": "Right to Equality - All persons are equal before law. The State cannot discriminate between citizens on grounds of religion, race, caste, sex, or place of birth.",
      "Article 19": "Right to Freedom - Includes freedom of speech, assembly, association, movement, residence, and profession. Can be restricted only for security of State, public order, decency, or morality.",
      "Article 21": "Right to Life & Personal Liberty - Fundamental right to live with dignity. Includes right to privacy, clean environment, education, and healthcare.",
      "Article 32": "Right to Constitutional Remedies - Dr. Ambedkar called it 'heart and soul' of Constitution. Right to directly approach Supreme Court for fundamental rights violation.",
      "Article 39A": "Equal Justice & Free Legal Aid - State must provide free legal aid to poor. Legal Services Authority Act, 1987 implements this.",
      "Right to Information": "RTI Act, 2005 - Citizens can seek information from public authorities within 30 days. Fee: ₹10 for application.",
      "Right to Education": "Article 21A - Free and compulsory education for children aged 6-14 years."
    },

    // Traffic Rules & Motor Vehicle Laws
    traffic: {
      "Helmet Laws": "Mandatory for two-wheeler riders & pillion riders. Fine: ₹1,000 + 3 months license suspension. Some states exempt Sikhs wearing turbans.",
      "Seatbelt Laws": "Mandatory for all car occupants including back seat passengers. Fine: ₹1,000. Driver responsible for all passengers.",
      "Speed Limits": "City roads: 50 kmph, State highways: 90 kmph, National highways: 100 kmph for cars. School zones: 25 kmph.",
      "Drunk Driving": "Legal limit: 30mg alcohol per 100ml blood. First offense: ₹10,000 fine + 6 months jail. Repeat offense: ₹15,000 + 2 years jail.",
      "Mobile Phone Use": "Hands-free devices allowed. Fine for handheld use: ₹1,000-₹5,000. Can lead to license suspension.",
      "Traffic Challans": "Pay online via Parivahan portal, MParivahan app, or traffic police websites. Challenge in traffic court within 30 days.",
      "Red Light Violation": "Fine: ₹1,000. Automated cameras increasingly used. Can be challenged with proper evidence."
    },

    // Property Laws
    property: {
      "Land Ownership": "Freehold: Complete ownership. Leasehold: Limited period ownership. Agricultural land: Restrictions on sale to non-farmers in many states.",
      "Property Title": "Title deed proves ownership. Check for clear title, encumbrance certificate, and property card. Verify through sub-registrar office.",
      "Property Registration": "Mandatory under Registration Act, 1908. Stamp duty varies by state (3-10% of property value). Registration within 4 months.",
      "Mutation": "Update revenue records after property purchase. Apply to Village Revenue Officer with sale deed and tax receipts.",
      "Property Disputes": "File civil suit in appropriate court. Consider mediation/arbitration. Limitation period: 12 years for property recovery.",
      "Tenant Rights": "Rent Control Acts vary by state. Notice period for eviction. Fair rent determination. Protection against arbitrary eviction.",
      "Illegal Possession": "File FIR for criminal trespass (IPC 441). Civil suit for recovery of possession. Injunction to prevent further encroachment."
    },

    // Power of Attorney
    powerOfAttorney: {
      "What is POA": "Legal document authorizing another person to act on your behalf. Must be on stamp paper and notarized/registered.",
      "General POA": "Broad powers for multiple transactions. Useful for NRIs managing property in India. Can include property sale, purchase, rent.",
      "Special POA": "Limited to specific transaction/purpose. More common and safer. Automatically expires after completion of specified act.",
      "Registration": "Optional but recommended for property matters. Registration fee: ₹100-₹500. Valid across India once registered.",
      "Revocation": "Can be revoked anytime by principal. Must inform all relevant parties and register revocation if original POA was registered.",
      "NRI POA": "Must be attested by Indian Consulate. Valid for 3 years from date of execution. Special provisions under FEMA."
    },

    // Criminal & Civil Law Basics
    criminal: {
      "IPC 420": "Cheating & dishonest inducement. Punishment: Up to 7 years imprisonment + fine. Common in fraud cases.",
      "IPC 406": "Criminal breach of trust. When someone entrusted with property dishonestly uses it. Punishment: Up to 3 years + fine.",
      "IPC 498A": "Cruelty to married woman by husband/relatives. Cognizable & non-bailable. Punishment: Up to 3 years imprisonment.",
      "IPC 354": "Assault/criminal force on woman with intent to outrage modesty. Punishment: 1-5 years imprisonment + fine.",
      "IPC 506": "Criminal intimidation. Threatening someone with injury to person/reputation/property. Punishment: Up to 2 years imprisonment.",
      "Defamation": "IPC 499-500. Harming reputation by words/signs. Both civil remedy (damages) and criminal offense (up to 2 years imprisonment).",
      "Theft vs Robbery": "Theft (IPC 378): Taking without consent. Robbery (IPC 390): Theft with violence/threat. Punishment varies accordingly.",
      "Bail Rights": "Bailable vs non-bailable offenses. Right to bail under Article 21. Apply in magistrate court or higher courts."
    },

    // Family & Marriage Laws
    family: {
      "Hindu Marriage": "Hindu Marriage Act, 1955. Divorce grounds: cruelty, desertion, conversion, mental disorder, communicable disease.",
      "Muslim Marriage": "Governed by Muslim Personal Law. Talaq, Khula, Mubarat forms of divorce. Triple Talaq now illegal.",
      "Christian Marriage": "Indian Christian Marriage Act, 1872. Divorce under Indian Divorce Act, 1869. Grounds similar to Hindu law.",
      "Maintenance": "Wife entitled to maintenance under Section 125 CrPC. Amount based on husband's income and wife's needs.",
      "Child Custody": "Best interest of child paramount. Mother preferred for children under 5. Joint custody increasingly recognized.",
      "Adoption": "Hindu Adoption & Maintenance Act for Hindus. Juvenile Justice Act for others. Court permission required.",
      "Domestic Violence": "Protection of Women from Domestic Violence Act, 2005. Includes physical, emotional, economic abuse."
    },

    // Legal Documentation
    documentation: {
      "Affidavit": "Sworn statement of facts. On stamp paper (₹10-₹100). Must be notarized. Used for name change, address proof, etc.",
      "Notarization": "Authentication by notary public. Required for certain documents. Fee: ₹10-₹50 per document.",
      "Rent Agreement": "11-month agreement avoids registration. Include rent, deposit, terms. Stamp duty as per state rates.",
      "Sale Agreement": "Agreement to sell property. Different from sale deed. Should include price, possession date, terms.",
      "Employment Contract": "Include salary, designation, notice period, confidentiality. Should comply with labour laws.",
      "Stamp Duty": "Varies by state and document type. E-stamping available in most states. Physical stamps also valid."
    },

    // Cyber & IT Laws
    cyber: {
      "IT Act 2000": "Covers cyber crimes, digital signatures, data protection. Amended in 2008 to include more offenses.",
      "Section 66A": "Struck down by Supreme Court in 2015. Was about offensive messages. No longer applicable.",
      "Section 67": "Publishing obscene material online. Punishment: 3-5 years imprisonment + fine up to ₹10 lakh.",
      "Online Fraud": "Use of IT devices for cheating. File complaint with cyber cell. Also covered under IPC 420.",
      "Data Protection": "Personal Data Protection Act pending. Currently governed by IT Rules 2011 and IT Act.",
      "Social Media": "Posts can attract defamation, hate speech charges. Be cautious about fake news sharing.",
      "Cybercrime Helpline": "National helpline: 1930. Report online fraud, cyber threats immediately."
    },

    // Labour & Employment Rights
    labour: {
      "Minimum Wages": "Varies by state and skill level. Currently ₹178-₹350 per day in most states. Revised periodically.",
      "Working Hours": "Maximum 8 hours per day, 48 hours per week. Overtime payment for extra hours.",
      "Maternity Leave": "26 weeks paid leave for women employees. Applicable to establishments with 10+ employees.",
      "Provident Fund": "12% of basic salary contributed by employee and employer. Withdrawal allowed after 2 months of unemployment.",
      "ESI Benefits": "Medical care for employees earning up to ₹25,000. Contribution: 0.75% employee + 3.25% employer.",
      "Termination": "30 days notice or pay in lieu. Retrenchment compensation for employees with 1+ year service.",
      "Gratuity": "Payable after 5 years of service. Amount: 15 days salary for each year of service."
    },

    // Consumer Protection
    consumer: {
      "Consumer Rights": "Right to safety, information, choice, representation, redressal, consumer education.",
      "Defective Products": "Manufacturer liable for defects. Consumer can claim replacement, refund, or compensation.",
      "Service Deficiency": "Poor service quality, delays, overcharging covered. File complaint in consumer court.",
      "Online Shopping": "E-commerce rules 2020. Return/refund policies mandatory. Grievance officer contact required.",
      "Consumer Courts": "District: up to ₹1 crore, State: ₹1-10 crore, National: above ₹10 crore. No court fee up to ₹5 lakh.",
      "Complaint Process": "File within 2 years of cause of action. Include purchase proof, correspondence.",
      "Unfair Trade Practices": "False advertisements, misleading claims, defective goods covered under Consumer Protection Act."
    },

    // Recent Legal Developments
    recent: {
      "Bharatiya Nyaya Sanhita 2023": "Replaces IPC 1860. Focus on justice over punishment. Death penalty for mob lynching.",
      "Bharatiya Nagarik Suraksha Sanhita 2023": "Replaces CrPC. Videography of search, seizure mandatory. Time limits for investigations.",
      "Bharatiya Sakshya Adhiniyam 2023": "Replaces Evidence Act. Digital evidence given priority. Secondary evidence rules relaxed.",
      "New Labour Codes": "4 codes replace 29 laws. Simplified compliance, universal social security, flexible working hours.",
      "Data Protection Bill": "Pending legislation for digital privacy. Will regulate data collection, processing, storage.",
      "Cryptocurrency": "Not legal tender but not banned. Taxed at 30%. RBI developing digital rupee (CBDC)."
    },

    // Emergency & Important Contacts
    emergency: {
      "Women Helpline": "181 - 24/7 helpline for women in distress. Also WhatsApp: +91-8652-HELPLINE",
      "Cyber Crime": "1930 - National helpline for cyber crimes. Also file complaint at cybercrime.gov.in",
      "Police": "100 - Emergency police helpline. Also 112 for integrated emergency services",
      "Legal Aid": "15100 - National Legal Services Authority helpline for free legal aid",
      "Child Helpline": "1098 - For child protection and rights related issues",
      "Senior Citizens": "14567 - Helpline for elderly abuse and support",
      "Anti-Corruption": "1031 - CBI helpline for reporting corruption"
    },

    // Legal Templates Available
    templates: {
      "Rent Agreement": "11-month rental agreement template with standard clauses",
      "Power of Attorney": "General and Special POA formats for various purposes",
      "Affidavit": "Self-declaration format for various legal purposes",
      "Legal Notice": "Formal notice template for legal demands",
      "Complaint Format": "Consumer court and police complaint formats",
      "Employment Contract": "Standard employment agreement template",
      "Partnership Deed": "Business partnership agreement format"
    }
  };

  const getLegalResponse = (message: string): string => {
    const lowercaseMessage = message.toLowerCase();
    
    // Traffic Rules & Driving Laws
    if (lowercaseMessage.includes('helmet') || lowercaseMessage.includes('seatbelt') || lowercaseMessage.includes('traffic')) {
      if (lowercaseMessage.includes('helmet')) {
        return `🏍️ **Helmet Laws in India:**\n${legalKnowledge.traffic["Helmet Laws"]}\n\n**Additional Info:** States like Punjab exempt Sikh community wearing turbans. Always carry valid license and registration documents.`;
      }
      if (lowercaseMessage.includes('seatbelt')) {
        return `🚗 **Seatbelt Laws:**\n${legalKnowledge.traffic["Seatbelt Laws"]}\n\n**Tip:** This applies to all passengers including children. Use appropriate child restraints for kids under 12.`;
      }
      if (lowercaseMessage.includes('speed') || lowercaseMessage.includes('challan')) {
        return `🚓 **Speed Limits & Challans:**\n${legalKnowledge.traffic["Speed Limits"]}\n\n**Challan Payment:** ${legalKnowledge.traffic["Traffic Challans"]}`;
      }
      if (lowercaseMessage.includes('drunk') || lowercaseMessage.includes('alcohol')) {
        return `🍺 **Drunk Driving Laws:**\n${legalKnowledge.traffic["Drunk Driving"]}\n\n**Important:** License suspension and vehicle impounding possible. Use cab services if you've consumed alcohol.`;
      }
      return `🚦 **Traffic Rules Overview:**\n• ${legalKnowledge.traffic["Helmet Laws"]}\n• ${legalKnowledge.traffic["Seatbelt Laws"]}\n• ${legalKnowledge.traffic["Speed Limits"]}\n\nNeed specific traffic rule information? Ask me about helmets, seatbelts, speed limits, or drunk driving!`;
    }

    // Property Law
    if (lowercaseMessage.includes('property') || lowercaseMessage.includes('land') || lowercaseMessage.includes('rent') || lowercaseMessage.includes('tenant')) {
      if (lowercaseMessage.includes('rent') || lowercaseMessage.includes('tenant')) {
        return `🏠 **Rental Laws:**\n${legalKnowledge.property["Tenant Rights"]}\n\n**Rent Agreement:** ${legalKnowledge.documentation["Rent Agreement"]}\n\n**Template Available:** I can provide a standard rent agreement template. Would you like me to share it?`;
      }
      if (lowercaseMessage.includes('title') || lowercaseMessage.includes('deed')) {
        return `📋 **Property Title & Registration:**\n${legalKnowledge.property["Property Title"]}\n\n**Registration Process:** ${legalKnowledge.property["Property Registration"]}`;
      }
      if (lowercaseMessage.includes('dispute') || lowercaseMessage.includes('illegal')) {
        return `⚖️ **Property Disputes:**\n${legalKnowledge.property["Property Disputes"]}\n\n**Illegal Possession:** ${legalKnowledge.property["Illegal Possession"]}`;
      }
      return `🏘️ **Property Law Overview:**\n• Ownership types: ${legalKnowledge.property["Land Ownership"]}\n• Registration: ${legalKnowledge.property["Property Registration"]}\n• Disputes: File civil suit or consider mediation\n\nNeed specific help with rent agreements, property disputes, or ownership verification?`;
    }

    // Power of Attorney
    if (lowercaseMessage.includes('power of attorney') || lowercaseMessage.includes('poa')) {
      return `📝 **Power of Attorney Guide:**\n\n**What is POA:** ${legalKnowledge.powerOfAttorney["What is POA"]}\n\n**Types:**\n• **General POA:** ${legalKnowledge.powerOfAttorney["General POA"]}\n• **Special POA:** ${legalKnowledge.powerOfAttorney["Special POA"]}\n\n**Registration:** ${legalKnowledge.powerOfAttorney["Registration"]}\n\n**For NRIs:** ${legalKnowledge.powerOfAttorney["NRI POA"]}\n\n📄 **Template Available:** Would you like me to provide a POA template?`;
    }

    // Criminal Law
    if (lowercaseMessage.includes('criminal') || lowercaseMessage.includes('ipc') || lowercaseMessage.includes('theft') || lowercaseMessage.includes('fraud') || lowercaseMessage.includes('420')) {
      if (lowercaseMessage.includes('420') || lowercaseMessage.includes('fraud') || lowercaseMessage.includes('cheating')) {
        return `🚨 **IPC 420 - Cheating:**\n${legalKnowledge.criminal["IPC 420"]}\n\n**Related:** ${legalKnowledge.criminal["IPC 406"]}\n\n**Action:** File FIR immediately, collect evidence, approach cyber cell for online fraud.`;
      }
      if (lowercaseMessage.includes('theft') || lowercaseMessage.includes('robbery')) {
        return `🔐 **Theft vs Robbery:**\n${legalKnowledge.criminal["Theft vs Robbery"]}\n\n**Action:** File FIR immediately, provide detailed complaint, list stolen items with proof of ownership.`;
      }
      if (lowercaseMessage.includes('bail')) {
        return `⚖️ **Bail Rights:**\n${legalKnowledge.criminal["Bail Rights"]}\n\n**Process:** Apply in magistrate court, provide surety, comply with conditions. Legal aid available for poor.`;
      }
      return `⚔️ **Criminal Law Basics:**\n• Fraud/Cheating: ${legalKnowledge.criminal["IPC 420"]}\n• Breach of Trust: ${legalKnowledge.criminal["IPC 406"]}\n• Defamation: ${legalKnowledge.criminal["Defamation"]}\n\n**Emergency:** Call 100 (Police) or 112 (Integrated Emergency)`;
    }

    // Family Law
    if (lowercaseMessage.includes('marriage') || lowercaseMessage.includes('divorce') || lowercaseMessage.includes('custody') || lowercaseMessage.includes('domestic violence')) {
      if (lowercaseMessage.includes('divorce')) {
        return `💔 **Divorce Laws in India:**\n• **Hindu Marriage:** ${legalKnowledge.family["Hindu Marriage"]}\n• **Muslim Marriage:** ${legalKnowledge.family["Muslim Marriage"]}\n• **Christian Marriage:** ${legalKnowledge.family["Christian Marriage"]}\n\n**Maintenance:** ${legalKnowledge.family["Maintenance"]}`;
      }
      if (lowercaseMessage.includes('custody')) {
        return `👶 **Child Custody Laws:**\n${legalKnowledge.family["Child Custody"]}\n\n**Adoption:** ${legalKnowledge.family["Adoption"]}`;
      }
      if (lowercaseMessage.includes('domestic violence')) {
        return `🛡️ **Domestic Violence Protection:**\n${legalKnowledge.family["Domestic Violence"]}\n\n**Emergency Helpline:** 181 (Women Helpline) - 24/7 support\n\n**Action:** File complaint, seek protection order, approach women's cell at police station.`;
      }
      return `👨‍👩‍👧‍👦 **Family Law Overview:**\nMarriage laws vary by religion. Common grounds for divorce include cruelty, desertion, mental disorder. Child's best interest is paramount in custody matters.\n\n**Need Help?** Women Helpline: 181`;
    }

    // Consumer Rights
    if (lowercaseMessage.includes('consumer') || lowercaseMessage.includes('refund') || lowercaseMessage.includes('defective') || lowercaseMessage.includes('online shopping')) {
      return `🛒 **Consumer Protection:**\n\n**Your Rights:** ${legalKnowledge.consumer["Consumer Rights"]}\n\n**Defective Products:** ${legalKnowledge.consumer["Defective Products"]}\n\n**Online Shopping:** ${legalKnowledge.consumer["Online Shopping"]}\n\n**Consumer Courts:** ${legalKnowledge.consumer["Consumer Courts"]}\n\n**Filing Complaint:** ${legalKnowledge.consumer["Complaint Process"]}`;
    }

    // Employment Rights
    if (lowercaseMessage.includes('employment') || lowercaseMessage.includes('salary') || lowercaseMessage.includes('labour') || lowercaseMessage.includes('maternity')) {
      if (lowercaseMessage.includes('maternity') || lowercaseMessage.includes('leave')) {
        return `🤱 **Maternity & Employment Benefits:**\n${legalKnowledge.labour["Maternity Leave"]}\n\n**Other Benefits:**\n• PF: ${legalKnowledge.labour["Provident Fund"]}\n• ESI: ${legalKnowledge.labour["ESI Benefits"]}\n• Gratuity: ${legalKnowledge.labour["Gratuity"]}`;
      }
      if (lowercaseMessage.includes('minimum wage') || lowercaseMessage.includes('salary')) {
        return `💰 **Employment Rights:**\n• **Minimum Wages:** ${legalKnowledge.labour["Minimum Wages"]}\n• **Working Hours:** ${legalKnowledge.labour["Working Hours"]}\n• **Termination:** ${legalKnowledge.labour["Termination"]}`;
      }
      return `👷 **Labour Law Overview:**\n• Minimum wages vary by state (₹178-₹350/day)\n• 8 hours/day, 48 hours/week maximum\n• 26 weeks maternity leave\n• PF, ESI, gratuity benefits available\n\n**New Labour Codes:** ${legalKnowledge.recent["New Labour Codes"]}`;
    }

    // Cyber Crime
    if (lowercaseMessage.includes('cyber') || lowercaseMessage.includes('online fraud') || lowercaseMessage.includes('hacking') || lowercaseMessage.includes('social media')) {
      return `💻 **Cyber Crime & IT Laws:**\n\n**IT Act 2000:** ${legalKnowledge.cyber["IT Act 2000"]}\n\n**Online Fraud:** ${legalKnowledge.cyber["Online Fraud"]}\n\n**Social Media:** ${legalKnowledge.cyber["Social Media"]}\n\n**Emergency:** ${legalKnowledge.cyber["Cybercrime Helpline"]}\n\n**Report Online:** Visit cybercrime.gov.in to file complaints`;
    }

    // Constitutional Rights
    if (lowercaseMessage.includes('article') || lowercaseMessage.includes('constitution') || lowercaseMessage.includes('fundamental rights')) {
      if (lowercaseMessage.includes('21')) {
        return `📜 **Article 21 - Right to Life:**\n${legalKnowledge.constitution["Article 21"]}\n\nThis is the most expansive fundamental right, interpreted by courts to include right to privacy, clean environment, speedy trial, and dignity.`;
      }
      if (lowercaseMessage.includes('19')) {
        return `🗣️ **Article 19 - Freedom Rights:**\n${legalKnowledge.constitution["Article 19"]}\n\nIncludes 6 freedoms with reasonable restrictions. Recent debates on internet shutdowns and free speech online.`;
      }
      if (lowercaseMessage.includes('14')) {
        return `⚖️ **Article 14 - Right to Equality:**\n${legalKnowledge.constitution["Article 14"]}\n\nFundamental principle of Indian democracy. Includes LGBTQ+ rights recognition and prohibition of arbitrary state action.`;
      }
      return `📖 **Constitutional Rights:**\n• Article 14: ${legalKnowledge.constitution["Article 14"]}\n• Article 19: Freedom of speech, assembly, movement, profession\n• Article 21: Life and personal liberty\n• Article 32: Constitutional remedies\n\n**RTI:** ${legalKnowledge.constitution["Right to Information"]}`;
    }

    // Legal Templates
    if (lowercaseMessage.includes('template') || lowercaseMessage.includes('format') || lowercaseMessage.includes('agreement')) {
      return `📄 **Legal Templates Available:**\n\n${Object.entries(legalKnowledge.templates).map(([key, value]) => `• **${key}:** ${value}`).join('\n')}\n\n**Documentation Help:**\n• Affidavit: ${legalKnowledge.documentation["Affidavit"]}\n• Notarization: ${legalKnowledge.documentation["Notarization"]}\n\nWhich template would you like? I can provide detailed formats with instructions.`;
    }

    // Recent Legal Updates
    if (lowercaseMessage.includes('recent') || lowercaseMessage.includes('latest') || lowercaseMessage.includes('new law') || lowercaseMessage.includes('2023')) {
      return `📰 **Recent Legal Developments (2023-2024):**\n\n**New Criminal Laws:**\n• ${legalKnowledge.recent["Bharatiya Nyaya Sanhita 2023"]}\n• ${legalKnowledge.recent["Bharatiya Nagarik Suraksha Sanhita 2023"]}\n• ${legalKnowledge.recent["Bharatiya Sakshya Adhiniyam 2023"]}\n\n**Other Updates:**\n• ${legalKnowledge.recent["New Labour Codes"]}\n• ${legalKnowledge.recent["Data Protection Bill"]}\n• ${legalKnowledge.recent["Cryptocurrency"]}`;
    }

    // Emergency Contacts
    if (lowercaseMessage.includes('emergency') || lowercaseMessage.includes('helpline') || lowercaseMessage.includes('contact')) {
      return `🚨 **Emergency Legal Contacts:**\n\n${Object.entries(legalKnowledge.emergency).map(([key, value]) => `• **${key}:** ${value}`).join('\n')}\n\n**Remember:** Always file FIR for serious crimes, seek legal aid if you cannot afford lawyer, and document everything for evidence.`;
    }

    // RTI and Government Services
    if (lowercaseMessage.includes('rti') || lowercaseMessage.includes('information') || lowercaseMessage.includes('government')) {
      return `📋 **Right to Information (RTI):**\n${legalKnowledge.constitution["Right to Information"]}\n\n**Process:** File RTI application with concerned public authority, pay ₹10 fee, expect response within 30 days. Appeal to Information Commission if unsatisfied.\n\n**Legal Aid:** ${legalKnowledge.emergency["Legal Aid"]}`;
    }

    // General legal advice
    if (lowercaseMessage.includes('lawyer') || lowercaseMessage.includes('legal advice') || lowercaseMessage.includes('court')) {
      return `👨‍⚖️ **Legal Consultation Guidance:**\n\n**When to Consult a Lawyer:**\n• Complex legal matters\n• Court proceedings\n• Drafting important contracts\n• Criminal charges\n• Property disputes\n\n**Free Legal Aid:** Call 15100 (NALSA Helpline)\n\n**⚠️ Disclaimer:** This chatbot provides general legal information only. For specific legal advice, please consult a qualified lawyer licensed to practice in India.`;
    }

    // Default comprehensive response with context memory
    return `🤖 **I'm NyayaBot - Your Comprehensive Legal Assistant**\n\nI can help you with:\n\n🚗 **Traffic Laws** - Helmet, seatbelt, speed limits, challans\n🏠 **Property Law** - Rent agreements, title deeds, disputes\n📝 **Documentation** - POA, affidavits, contracts, templates\n⚖️ **Criminal Law** - IPC sections, bail, fraud, theft\n👨‍👩‍👧‍👦 **Family Law** - Marriage, divorce, custody, domestic violence\n🛒 **Consumer Rights** - Refunds, defective products, complaints\n👷 **Employment** - Wages, leave, termination, benefits\n💻 **Cyber Crime** - Online fraud, IT laws, social media\n📜 **Constitutional Rights** - Articles 14, 19, 21, RTI\n🚨 **Emergency Contacts** - Helplines for various issues\n\n**Recent Updates:** New criminal laws (BNS, BNSS, BSA 2023), labour codes, data protection\n\n**Ask me anything!** Example: "What are helmet laws?", "How to file RTI?", "Property dispute help", "Consumer court process"\n\n⚠️ **Legal Disclaimer:** This is for informational purposes only. Consult a qualified lawyer for specific legal advice.`;
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
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">NyayaBot</h3>
                  <p className="text-xs text-muted-foreground">Your Legal Assistant</p>
                </div>
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
                        <p className="text-sm whitespace-pre-line">{message.message}</p>
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
            <div className="p-4 border-t bg-muted/30">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about traffic rules, property law, rights, or any legal query..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="icon" className="bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                ⚠️ This is for informational purposes only. Consult a qualified lawyer for specific legal advice.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;