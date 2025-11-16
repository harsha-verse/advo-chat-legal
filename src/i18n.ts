import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to LAWLITE",
      login: "Login",
      signup: "Sign Up",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      licenseNumber: "License Number",
      specialization: "Specialization",
      experience: "Experience (Years)",
      consultationFee: "Consultation Fee",
      forgotPassword: "Forgot Password?",
      loginAsLawyer: "Login as Lawyer",
      loginAsUser: "Login as User",
      signupAsLawyer: "Sign Up as Lawyer",
      signupAsUser: "Sign Up as User",
      dashboard: "Dashboard",
      lawyers: "Lawyers",
      documents: "Documents",
      templates: "Templates",
      consultants: "Consultants",
      profile: "Profile",
      chat: "Chat",
      services: "Services",
      familyLaw: "Family Law",
      criminalLaw: "Criminal Law",
      cyberLaw: "Cyber Law",
      civilLaw: "Civil Law",
      corporateLaw: "Corporate Law",
      businessSetup: "Business Setup",
      documentation: "Documentation",
      disputes: "Disputes",
      consultant: "Consultant",
      legalAdvice: "Legal Advice",
      legalInformation: "Legal Information",
      crossborderLaws: "Crossborder Laws",
      legalAid: "Legal Aid",
      trafficLaws: "Traffic Laws",
      bookConsultation: "Book Consultation",
      chatWithLawyer: "Chat with Lawyer",
      viewProfile: "View Profile",
      downloadTemplate: "Download Template",
      editTemplate: "Edit Template",
      logout: "Logout",
      invalidCredentials: "Invalid credentials. Please check your email and password.",
      licenseVerificationRequired: "License verification is required for lawyer registration.",
      registrationSuccessful: "Registration successful! Please login.",
      pleaseEnterEmail: "Please enter your email",
      pleaseEnterPassword: "Please enter your password",
      pleaseEnterLicenseNumber: "Please enter your license number",
      passwordsDoNotMatch: "Passwords do not match",
      botGreeting: "🙏 Namaste! I'm NyayaBot, your comprehensive legal assistant for Indian law. I can help you with Constitutional rights, traffic rules, property law, family matters, consumer rights, criminal law, employment issues, and much more. How can I assist you today?"
    }
  },
  hi: {
    translation: {
      welcome: "LAWLITE में आपका स्वागत है",
      login: "लॉगिन",
      signup: "साइन अप",
      email: "ईमेल",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",
      licenseNumber: "लाइसेंस नंबर",
      specialization: "विशेषज्ञता",
      experience: "अनुभव (वर्ष)",
      consultationFee: "परामर्श शुल्क",
      forgotPassword: "पासवर्ड भूल गए?",
      loginAsLawyer: "वकील के रूप में लॉगिन",
      loginAsUser: "उपयोगकर्ता के रूप में लॉगिन",
      signupAsLawyer: "वकील के रूप में साइन अप",
      signupAsUser: "उपयोगकर्ता के रूप में साइन अप",
      dashboard: "डैशबोर्ड",
      lawyers: "वकील",
      documents: "दस्तावेज़",
      templates: "टेम्प्लेट",
      consultants: "सलाहकार",
      profile: "प्रोफ़ाइल",
      chat: "चैट",
      services: "सेवाएं",
      familyLaw: "पारिवारिक कानून",
      criminalLaw: "आपराधिक कानून",
      cyberLaw: "साइबर कानून",
      civilLaw: "नागरिक कानून",
      corporateLaw: "कॉर्पोरेट कानून",
      businessSetup: "व्यवसाय स्थापना",
      documentation: "प्रलेखन",
      disputes: "विवाद",
      consultant: "सलाहकार",
      legalAdvice: "कानूनी सलाह",
      legalInformation: "कानूनी जानकारी",
      crossborderLaws: "सीमा पार कानून",
      legalAid: "कानूनी सहायता",
      trafficLaws: "यातायात कानून",
      bookConsultation: "परामर्श बुक करें",
      chatWithLawyer: "वकील के साथ चैट करें",
      viewProfile: "प्रोफ़ाइल देखें",
      downloadTemplate: "टेम्पलेट डाउनलोड करें",
      editTemplate: "टेम्पलेट संपादित करें",
      logout: "लॉगआउट",
      invalidCredentials: "अमान्य क्रेडेंशियल। कृपया अपना ईमेल और पासवर्ड जांचें।",
      licenseVerificationRequired: "वकील पंजीकरण के लिए लाइसेंस सत्यापन आवश्यक है।",
      registrationSuccessful: "पंजीकरण सफल! कृपया लॉगिन करें।",
      pleaseEnterEmail: "कृपया अपना ईमेल दर्ज करें",
      pleaseEnterPassword: "कृपया अपना पासवर्ड दर्ज करें",
      pleaseEnterLicenseNumber: "कृपया अपना लाइसेंस नंबर दर्ज करें",
      passwordsDoNotMatch: "पासवर्ड मेल नहीं खाते",
      botGreeting: "🙏 नमस्ते! मैं न्यायबोट हूं, भारतीय कानून के लिए आपका व्यापक कानूनी सहायक। मैं संवैधानिक अधिकारों, यातायात नियमों, संपत्ति कानून, पारिवारिक मामलों, उपभोक्ता अधिकारों, आपराधिक कानून, रोजगार के मुद्दों और बहुत कुछ में आपकी मदद कर सकता हूं। मैं आज आपकी कैसे सहायता कर सकता हूं?"
    }
  },
  kn: {
    translation: {
      welcome: "LAWLITE ಗೆ ಸ್ವಾಗತ",
      login: "ಲಾಗಿನ್",
      signup: "ಸೈನ್ ಅಪ್",
      email: "ಇಮೇಲ್",
      password: "ಪಾಸ್‌ವರ್ಡ್",
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      lawyers: "ವಕೀಲರು",
      documents: "ದಾಖಲೆಗಳು",
      templates: "ಟೆಂಪ್ಲೇಟ್‌ಗಳು",
      consultants: "ಸಲಹೆಗಾರರು",
      services: "ಸೇವೆಗಳು",
      botGreeting: "🙏 ನಮಸ್ಕಾರ! ನಾನು ನ್ಯಾಯಾಬಾಟ್, ಭಾರತೀಯ ಕಾನೂನಿಗಾಗಿ ನಿಮ್ಮ ಸಮಗ್ರ ಕಾನೂನು ಸಹಾಯಕ. ನಾನು ಸಾಂವಿಧಾನಿಕ ಹಕ್ಕುಗಳು, ಸಂಚಾರ ನಿಯಮಗಳು, ಆಸ್ತಿ ಕಾನೂನು, ಕುಟುಂಬ ವಿಷಯಗಳು, ಗ್ರಾಹಕ ಹಕ್ಕುಗಳು, ಕ್ರಿಮಿನಲ್ ಕಾನೂನು, ಉದ್ಯೋಗ ಸಮಸ್ಯೆಗಳು ಮತ್ತು ಇನ್ನೂ ಹೆಚ್ಚಿನದರಲ್ಲಿ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?"
    }
  },
  ta: {
    translation: {
      welcome: "LAWLITE க்கு வரவேற்கிறோம்",
      login: "உள்நுழைவு",
      signup: "பதிவு செய்க",
      email: "மின்னஞ்சல்",
      password: "கடவுச்சொல்",
      dashboard: "டாஷ்போர்டு",
      lawyers: "வழக்கறிஞர்கள்",
      documents: "ஆவணங்கள்",
      templates: "வார்ப்புருக்கள்",
      consultants: "ஆலோசகர்கள்",
      services: "சேவைகள்",
      botGreeting: "🙏 வணக்கம்! நான் ந்யாயபாட், இந்திய சட்டத்திற்கான உங்கள் விரிவான சட்ட உதவியாளர். நான் அரசியலமைப்பு உரிமைகள், போக்குவரத்து விதிகள், சொத்து சட்டம், குடும்ப விஷயங்கள், நுகர்வோர் உரிமைகள், குற்றவியல் சட்டம், வேலைவாய்ப்பு பிரச்சினைகள் மற்றும் பல விஷயங்களில் உங்களுக்கு உதவ முடியும். இன்று நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?"
    }
  },
  te: {
    translation: {
      welcome: "LAWLITE కు స్వాగతం",
      login: "లాగిన్",
      signup: "సైన్ అప్",
      email: "ఇమెయిల్",
      password: "పాస్‌వర్డ్",
      dashboard: "డాష్‌బోర్డ్",
      lawyers: "న్యాయవాదులు",
      documents: "పత్రాలు",
      templates: "టెంప్లేట్లు",
      consultants: "సలహాదారులు",
      services: "సేవలు",
      botGreeting: "🙏 నమస్కారం! నేను న్యాయబాట్, భారతీయ చట్టం కోసం మీ సమగ్ర చట్టపరమైన సహాయకుడిని. నేను రాజ్యాంగ హక్కులు, ట్రాఫిక్ నియమాలు, ఆస్తి చట్టం, కుటుంబ విషయాలు, వినియోగదారు హక్కులు, క్రిమినల్ చట్టం, ఉపాధి సమస్యలు మరియు మరెన్నో విషయాలలో మీకు సహాయం చేయగలను. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?"
    }
  },
  ml: {
    translation: {
      welcome: "LAWLITE-ലേക്ക് സ്വാഗതം",
      login: "ലോഗിൻ",
      signup: "സൈൻ അപ്പ്",
      email: "ഇമെയിൽ",
      password: "പാസ്‌വേഡ്",
      dashboard: "ഡാഷ്‌ബോർഡ്",
      lawyers: "അഭിഭാഷകർ",
      documents: "രേഖകൾ",
      templates: "ടെംപ്ലേറ്റുകൾ",
      consultants: "കൺസൾട്ടൻറുകൾ",
      services: "സേവനങ്ങൾ",
      botGreeting: "🙏 നമസ്കാരം! ഞാൻ ന്യായബോട്ട്, ഇന്ത്യൻ നിയമത്തിനായുള്ള നിങ്ങളുടെ സമഗ്ര നിയമ സഹായി. ഭരണഘടനാ അവകാശങ്ങൾ, ട്രാഫിക് നിയമങ്ങൾ, സ്വത്ത് നിയമം, കുടുംബ കാര്യങ്ങൾ, ഉപഭോക്തൃ അവകാശങ്ങൾ, ക്രിമിനൽ നിയമം, തൊഴിൽ പ്രശ്നങ്ങൾ എന്നിവയിലും അതിലേറെയിലും എനിക്ക് നിങ്ങളെ സഹായിക്കാനാകും. ഇന്ന് എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?"
    }
  },
  bn: {
    translation: {
      welcome: "LAWLITE-এ স্বাগতম",
      login: "লগইন",
      signup: "সাইন আপ",
      email: "ইমেল",
      password: "পাসওয়ার্ড",
      dashboard: "ড্যাশবোর্ড",
      lawyers: "আইনজীবী",
      documents: "নথি",
      templates: "টেমপ্লেট",
      consultants: "পরামর্শদাতা",
      services: "সেবা",
      botGreeting: "🙏 নমস্কার! আমি ন্যায়াবট, ভারতীয় আইনের জন্য আপনার সম্পূর্ণ আইনি সহায়ক। আমি সাংবিধানিক অধিকার, যানবাহন নিয়ম, সম্পত্তি আইন, পারিবারিক বিষয়, ভোক্তা অধিকার, ফৌজদারি আইন, কর্মসংস্থান সমস্যা এবং আরও অনেক কিছুতে আপনাকে সাহায্য করতে পারি। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?"
    }
  },
  mr: {
    translation: {
      welcome: "LAWLITE मध्ये आपले स्वागत आहे",
      login: "लॉगिन",
      signup: "साइन अप",
      email: "ईमेल",
      password: "पासवर्ड",
      dashboard: "डॅशबोर्ड",
      lawyers: "वकील",
      documents: "कागदपत्रे",
      templates: "टेम्पलेट्स",
      consultants: "सल्लागार",
      services: "सेवा",
      botGreeting: "🙏 नमस्कार! मी न्यायाबॉट आहे, भारतीय कायद्यासाठी तुमचा सर्वसमावेशक कायदेशीर सहाय्यक. मी घटनात्मक अधिकार, वाहतूक नियम, मालमत्ता कायदा, कौटुंबिक बाबी, ग्राहक हक्क, फौजदारी कायदा, रोजगार समस्या आणि बरेच काही यामध्ये तुम्हाला मदत करू शकतो. आज मी तुम्हाला कशी मदत करू शकतो?"
    }
  },
  gu: {
    translation: {
      welcome: "LAWLITE માં આપનું સ્વાગત છે",
      login: "લોગિન",
      signup: "સાઇન અપ",
      email: "ઇમેઇલ",
      password: "પાસવર્ડ",
      dashboard: "ડેશબોર્ડ",
      lawyers: "વકીલો",
      documents: "દસ્તાવેજો",
      templates: "ટેમ્પલેટ્સ",
      consultants: "સલાહકારો",
      services: "સેવાઓ",
      botGreeting: "🙏 નમસ્તે! હું ન્યાયાબોટ છું, ભારતીય કાયદા માટે તમારો વ્યાપક કાનૂની સહાયક. હું બંધારણીય અધિકારો, ટ્રાફિક નિયમો, મિલકત કાયદો, કુટુંબ બાબતો, ગ્રાહક અધિકારો, ફોજદારી કાયદો, રોજગાર સમસ્યાઓ અને વધુમાં તમને મદદ કરી શકું છું. આજે હું તમને કેવી રીતે મદદ કરી શકું?"
    }
  },
  pa: {
    translation: {
      welcome: "LAWLITE ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ",
      login: "ਲਾਗਿਨ",
      signup: "ਸਾਈਨ ਅੱਪ",
      email: "ਈਮੇਲ",
      password: "ਪਾਸਵਰਡ",
      dashboard: "ਡੈਸ਼ਬੋਰਡ",
      lawyers: "ਵਕੀਲ",
      documents: "ਦਸਤਾਵੇਜ਼",
      templates: "ਟੈਂਪਲੇਟਸ",
      consultants: "ਸਲਾਹਕਾਰ",
      services: "ਸੇਵਾਵਾਂ",
      botGreeting: "🙏 ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਨਿਆਇਆਬੋਟ ਹਾਂ, ਭਾਰਤੀ ਕਾਨੂੰਨ ਲਈ ਤੁਹਾਡਾ ਵਿਆਪਕ ਕਾਨੂੰਨੀ ਸਹਾਇਕ। ਮੈਂ ਸੰਵਿਧਾਨਕ ਅਧਿਕਾਰਾਂ, ਟ੍ਰੈਫਿਕ ਨਿਯਮਾਂ, ਜਾਇਦਾਦ ਕਾਨੂੰਨ, ਪਰਿਵਾਰਕ ਮਾਮਲਿਆਂ, ਖਪਤਕਾਰ ਅਧਿਕਾਰਾਂ, ਅਪਰਾਧਿਕ ਕਾਨੂੰਨ, ਰੁਜ਼ਗਾਰ ਮੁੱਦਿਆਂ ਅਤੇ ਹੋਰ ਬਹੁਤ ਕੁਝ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਸਹਾਇਤਾ ਕਰ ਸਕਦਾ ਹਾਂ?"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;