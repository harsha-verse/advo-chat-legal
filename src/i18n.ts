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
      passwordsDoNotMatch: "Passwords do not match"
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
      corporateLaw: "कॉर्पोरेट कानून"
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
      templates: "ಟೆಂಪ್ಲೇಟ್‌ಗಳು"
    }
  },
  ta: {
    translation: {
      welcome: "LAWLITE க்கு வரவேற்கிறோம்",
      login: "உள்நுழைவு",
      signup: "பதிவு செய்யவும்",
      email: "மின்னஞ்சல்",
      password: "கடவுச்சொல்",
      dashboard: "டாஷ்போர்ட்",
      lawyers: "வழக்கறிஞர்கள்",
      documents: "ஆவணங்கள்",
      templates: "வார்ப்புருக்கள்"
    }
  },
  ml: {
    translation: {
      welcome: "LAWLITE ലേക്ക് സ്വാഗതം",
      login: "ലോഗിൻ",
      signup: "സൈൻ അപ്പ്",
      email: "ഇമെയിൽ",
      password: "പാസ്‌വേഡ്",
      dashboard: "ഡാഷ്‌ബോർഡ്",
      lawyers: "അഭിഭാഷകർ",
      documents: "ഡോക്യുമെന്റുകൾ",
      templates: "ടെംപ്ലേറ്റുകൾ"
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