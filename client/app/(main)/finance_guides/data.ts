type FinanceGuide = {
  id: string;
  title: string;
  description: string;
  uri: string;
};

type FinanceGuidesByLocale = {
  en: FinanceGuide[];
  hi: FinanceGuide[];
  pa: FinanceGuide[];
};

const financeGuidesByLocale: FinanceGuidesByLocale = {
  en: [
    {
      id: "1",
      title: "Budgeting Basics 💰",
      description:
        "A budget helps you track income and expenses, so you know where your money goes. Start by listing monthly income and fixed costs like rent or bills. Then track variable expenses like eating out or entertainment. Use tools or apps to monitor spending. The goal isn’t to stop spending, but to spend mindfully. Review and adjust your budget every month to match real life.",
      uri: "https://imgs.search.brave.com/fc4NLVX5zjgWhkrv7_m_p8pxyg8pbCvs-A69Zyp7ljU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xNTYzNi8xNTYz/NjgyNC5wbmc_c2Vt/dD1haXNfaHlicmlk"
    },
    {
      id: "2",
      title: "Emergency Fund 🛡️",
      description:
        "An emergency fund is a financial safety net — typically 3–6 months of expenses saved in a separate account. It helps cover unexpected costs like medical bills, car repairs, or job loss without going into debt. Build it slowly by saving a fixed amount monthly. Avoid using it for planned purchases — it’s for true emergencies only.",
      uri: "https://imgs.search.brave.com/3a-iW1wMwINdP7au_ZW3QvzB6NM0hZZ6YLiF_pqeBLg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjM3/ODU4OTI4L3ZlY3Rv/ci9lbWVyZ2VuY3kt/ZnVuZC1pY29uLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1S/TVZ4bURZVFVDSVlN/WHN2MVFvYl9KSzFB/eWRYMVVTT0tobGpO/VE9FN3pRPQ"
    },
    {
      id: "3",
      title: "Understanding Credit Scores 📊",
      description:
        "Your credit score affects loan approvals and interest rates. It’s based on payment history, debt amounts, length of credit history, and types of credit used. Pay bills on time, keep credit utilization below 30%, and check your report regularly. A higher score can save you thousands in borrowing costs.",
      uri: "https://imgs.search.brave.com/xeC99yLqjZ-uGaQ1f-OkD-ZIDMruxJRNv9YmjYIMDyA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzcxLzI3LzI5/LzM2MF9GXzU3MTI3/Mjk1MV9iRURHcWhv/cVlSMlVGdm9VQk5u/ZnAwalZrMkhaanZi/ay5qcGc"
    },
    {
      id: "4",
      title: "Investing for Beginners 📈",
      description:
        "Start investing early to benefit from compounding. Understand risk vs. return, diversify across assets like stocks, bonds, or mutual funds, and invest regularly rather than timing the market. Learn basics before investing large amounts, and avoid scams promising quick profits. Consider talking to a certified advisor if unsure.",
      uri: "https://imgs.search.brave.com/s84DF7NF6If_dVDgsvIctbLDPeKquIs0izplt28NvLI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW52ZXN0b3BlZGlh/LmNvbS90aG1iL0ct/NzczRndTQ2ZiMDI3/WkVJX3dqSEwwdVgz/Zz0vMjgyeDE4OC9m/aWx0ZXJzOm5vX3Vw/c2NhbGUoKTptYXhf/Ynl0ZXMoMTUwMDAw/KTpzdHJpcF9pY2Mo/KS9tb3J0Z2FnZS1y/ZWFsLWVzdGF0ZS1p/bnZlc3RpbmctZ3Vp/ZGUtNDIyMjU0My12/MS1iNDljNDk0MDVl/ZTE0Nzc5YWRiMjVk/Mjg3OTQxMTQxNC5w/bmc"
    },
    {
      id: "5",
      title: "Avoiding Debt Traps ⚠️",
      description:
        "Relying too much on credit cards or loans can become a debt trap. Pay full card balances monthly to avoid interest. Don’t borrow for wants — borrow only for genuine needs. Track debts and repayment schedules carefully. If struggling, talk to your lender early to explore restructuring or payment plans.",
      uri: "https://imgs.search.brave.com/AMT698rwtlB40vtV395pPdZv5125Zr4JNmIfAaltEAI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvOTg4Mi85ODgy/MTgyLnBuZw"
    },
    {
      id: "6",
      title: "Setting Financial Goals 🎯",
      description:
        "Clear goals give your money purpose. Short-term (vacation, new phone), mid-term (car, home down payment), and long-term (retirement, child’s education). Make goals SMART: Specific, Measurable, Achievable, Relevant, Time-bound. Review progress yearly and adjust as life changes.",
      uri: "https://imgs.search.brave.com/TRJ2gYWHPU6HOiSNWAVGitlVc8NYUIViwygjyi_QEUg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xNzc3Ny8xNzc3/NzU4OC5wbmc_c2Vt/dD1haXNfaHlicmlk"
    }
  ],

  hi: [
    {
      id: "1",
      title: "बजट बनाना 💰",
      description:
        "बजट से आप जानते हैं कि पैसा कहाँ जा रहा है। मासिक आय और फिक्स खर्च जैसे किराया लिखें, फिर बाकी खर्च जैसे घूमना-फिरना नोट करें। खर्च को ऐप्स या डायरी में ट्रैक करें। मकसद खर्च रोकना नहीं, बल्कि समझदारी से करना है। हर महीने बजट रिव्यू करें।",
      uri: "https://imgs.search.brave.com/fc4NLVX5zjgWhkrv7_m_p8pxyg8pbCvs-A69Zyp7ljU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xNTYzNi8xNTYz/NjgyNC5wbmc_c2Vt/dD1haXNfaHlicmlk"
    },
    {
      id: "2",
      title: "इमरजेंसी फंड 🛡️",
      description:
        "आपात स्थिति के लिए 3–6 महीने का खर्च अलग सेविंग में रखें। मेडिकल बिल, नौकरी जाने या अचानक खर्च में मदद करेगा। धीरे-धीरे हर महीने थोड़ा बचाएँ और सिर्फ इमरजेंसी में ही इस्तेमाल करें।",
      uri: "https://imgs.search.brave.com/3a-iW1wMwINdP7au_ZW3QvzB6NM0hZZ6YLiF_pqeBLg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjM3/ODU4OTI4L3ZlY3Rv/ci9lbWVyZ2VuY3kt/ZnVuZC1pY29uLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1S/TVZ4bURZVFVDSVlN/WHN2MVFvYl9KSzFB/eWRYMVVTT0tobGpO/VE9FN3pRPQ"
    },
    {
      id: "3",
      title: "क्रेडिट स्कोर क्या है 📊",
      description:
        "क्रेडिट स्कोर लोन अप्रूवल और ब्याज दर को प्रभावित करता है। समय पर बिल चुकाएँ, क्रेडिट लिमिट का 30% से कम इस्तेमाल करें, और रिपोर्ट चेक करते रहें। अच्छा स्कोर भविष्य में कर्ज सस्ता करता है।",
      uri: "https://imgs.search.brave.com/xeC99yLqjZ-uGaQ1f-OkD-ZIDMruxJRNv9YmjYIMDyA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzcxLzI3LzI5/LzM2MF9GXzU3MTI3/Mjk1MV9iRURHcWhv/cVlSMlVGdm9VQk5u/ZnAwalZrMkhaanZi/ay5qcGc"
    },
    {
      id: "4",
      title: "निवेश की शुरुआत 📈",
      description:
        "जल्दी निवेश से पैसा बढ़ता है। जोखिम-रिटर्न समझें, म्यूचुअल फंड, शेयर, FD जैसे साधनों में निवेश बाँटें। धीरे-धीरे नियमित निवेश करें, एक साथ बड़ी रकम न डालें।",
      uri: "https://imgs.search.brave.com/s84DF7NF6If_dVDgsvIctbLDPeKquIs0izplt28NvLI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW52ZXN0b3BlZGlh/LmNvbS90aG1iL0ct/NzczRndTQ2ZiMDI3/WkVJX3dqSEwwdVgz/Zz0vMjgyeDE4OC9m/aWx0ZXJzOm5vX3Vw/c2NhbGUoKTptYXhf/Ynl0ZXMoMTUwMDAw/KTpzdHJpcF9pY2Mo/KS9tb3J0Z2FnZS1y/ZWFsLWVzdGF0ZS1p/bnZlc3RpbmctZ3Vp/ZGUtNDIyMjU0My12/MS1iNDljNDk0MDVl/ZTE0Nzc5YWRiMjVk/Mjg3OTQxMTQxNC5w/bmc"
    },
    {
      id: "5",
      title: "कर्ज के जाल से बचें ⚠️",
      description:
        "बिना सोच-समझ के लोन या क्रेडिट कार्ड खर्च से कर्ज बढ़ता है। पूरे बिल समय पर चुकाएँ, फिजूल के लिए उधार न लें। अगर दिक्कत हो, तो बैंक से बात करें।",
      uri: "https://imgs.search.brave.com/AMT698rwtlB40vtV395pPdZv5125Zr4JNmIfAaltEAI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvOTg4Mi85ODgy/MTgyLnBuZw"
    },
    {
      id: "6",
      title: "वित्तीय लक्ष्य तय करें 🎯",
      description:
        "स्पष्ट लक्ष्य से बचत में मोटिवेशन आता है। जैसे छुट्टी, कार, रिटायरमेंट। SMART (Specific, Measurable, Achievable, Relevant, Time-bound) बनाएं। सालाना प्रगति जाँचें।",
      uri: "https://imgs.search.brave.com/TRJ2gYWHPU6HOiSNWAVGitlVc8NYUIViwygjyi_QEUg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xNzc3Ny8xNzc3/NzU4OC5wbmc_c2Vt/dD1haXNfaHlicmlk"
    }
  ],

  pa: [
    {
      id: "1",
      title: "ਬਜਟ ਬਣਾਉਣਾ 💰",
      description:
        "ਆਮਦਨ ਤੇ ਖਰਚਿਆਂ ਦੀ ਲਿਸਟ ਬਣਾਓ ਤਾਂ ਪਤਾ ਲੱਗੇ ਕਿ ਪੈਸਾ ਕਿੱਥੇ ਜਾ ਰਿਹਾ ਹੈ। ਮਾਸਿਕ ਖਰਚੇ ਤੇ ਬਚਤ ਨੂੰ ਲਿਖੋ। ਐਪ ਜਾਂ ਨੋਟਬੁੱਕ ਨਾਲ ਟ੍ਰੈਕ ਕਰੋ। ਮਕਸਦ ਖਰਚ ਰੋਕਣਾ ਨਹੀਂ, ਸੋਚ ਸਮਝ ਨਾਲ ਖਰਚ ਕਰਨਾ ਹੈ।",
      uri: "https://imgs.search.brave.com/fc4NLVX5zjgWhkrv7_m_p8pxyg8pbCvs-A69Zyp7ljU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xNTYzNi8xNTYz/NjgyNC5wbmc_c2Vt/dD1haXNfaHlicmlk"
    },
    {
      id: "2",
      title: "ਐਮਰਜੈਂਸੀ ਫੰਡ 🛡️",
      description:
        "ਤਿੰਨ ਤੋਂ ਛੇ ਮਹੀਨੇ ਦੇ ਖਰਚੇ ਵੱਖਰੇ ਖਾਤੇ ਵਿੱਚ ਰੱਖੋ। ਇਹ ਅਚਾਨਕ ਖਰਚੇ ਜਿਵੇਂ ਡਾਕਟਰੀ ਬਿਲ ਜਾਂ ਨੌਕਰੀ ਗੁਆਉਣ ਸਮੇਂ ਕੰਮ ਆਉਂਦਾ ਹੈ। ਹੌਲੀ ਹੌਲੀ ਬਣਾਓ ਅਤੇ ਸਿਰਫ਼ ਐਮਰਜੈਂਸੀ ਵਿੱਚ ਹੀ ਵਰਤੋਂ।",
      uri: "https://imgs.search.brave.com/3a-iW1wMwINdP7au_ZW3QvzB6NM0hZZ6YLiF_pqeBLg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjM3/ODU4OTI4L3ZlY3Rv/ci9lbWVyZ2VuY3kt/ZnVuZC1pY29uLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1S/TVZ4bURZVFVDSVlN/WHN2MVFvYl9KSzFB/eWRYMVVTT0tobGpO/VE9FN3pRPQ"
    },
    {
      id: "3",
      title: "ਕ੍ਰੈਡਿਟ ਸਕੋਰ 📊",
      description:
        "ਕ੍ਰੈਡਿਟ ਸਕੋਰ ਲੋਨ ਅਤੇ ਦਰਾਂ ਤੇ ਅਸਰ ਪਾਂਦਾ ਹੈ। ਸਮੇਂ ਤੇ ਬਿੱਲ ਭਰੋ, 30% ਤੋਂ ਘੱਟ ਯੂਟਿਲਾਈਜ਼ੇਸ਼ਨ ਰੱਖੋ, ਅਤੇ ਰਿਪੋਰਟ ਜਾਂਚਦੇ ਰਹੋ। ਚੰਗਾ ਸਕੋਰ ਮੁੱਲ ਬਚਾਉਂਦਾ ਹੈ।",
      uri: "https://imgs.search.brave.com/xeC99yLqjZ-uGaQ1f-OkD-ZIDMruxJRNv9YmjYIMDyA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzcxLzI3LzI5/LzM2MF9GXzU3MTI3/Mjk1MV9iRURHcWhv/cVlSMlVGdm9VQk5u/ZnAwalZrMkhaanZi/ay5qcGc"
    },
    {
      id: "4",
      title: "ਨਿਵੇਸ਼ ਦੀ ਸ਼ੁਰੂਆਤ 📈",
      description:
        "ਜਲਦੀ ਨਿਵੇਸ਼ ਕਰਨ ਨਾਲ ਪੈਸਾ ਵੱਧਦਾ ਹੈ। ਵੱਖ ਵੱਖ ਥਾਵਾਂ 'ਤੇ ਨਿਵੇਸ਼ ਕਰੋ, ਜਿਵੇਂ ਮਿਊਚੁਅਲ ਫੰਡ, ਸ਼ੇਅਰ। ਹੌਲੀ ਹੌਲੀ ਅਤੇ ਨਿਯਮਤ ਕਰੋ।",
      uri: "https://imgs.search.brave.com/s84DF7NF6If_dVDgsvIctbLDPeKquIs0izplt28NvLI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/aW52ZXN0b3BlZGlh/LmNvbS90aG1iL0ct/NzczRndTQ2ZiMDI3/WkVJX3dqSEwwdVgz/Zz0vMjgyeDE4OC9m/aWx0ZXJzOm5vX3Vw/c2NhbGUoKTptYXhf/Ynl0ZXMoMTUwMDAw/KTpzdHJpcF9pY2Mo/KS9tb3J0Z2FnZS1y/ZWFsLWVzdGF0ZS1p/bnZlc3RpbmctZ3Vp/ZGUtNDIyMjU0My12/MS1iNDljNDk0MDVl/ZTE0Nzc5YWRiMjVk/Mjg3OTQxMTQxNC5w/bmc"
    },
    {
      id: "5",
      title: "ਕਰਜ਼ ਦੇ ਜਾਲ ਤੋਂ ਬਚੋ ⚠️",
      description:
        "ਲਾਪਰਵਾਹੀ ਨਾਲ ਲਿਆ ਲੋਨ ਜਾਂ ਕਾਰਡ ਖਰਚ ਮੁਸ਼ਕਲ ਬਣਾਉਂਦਾ ਹੈ। ਸਮੇਂ ਤੇ ਭੁਗਤਾਨ ਕਰੋ, ਜ਼ਰੂਰੀ ਸਮੇਂ ਲਈ ਹੀ ਲੋਨ ਲਓ।",
      uri: "https://imgs.search.brave.com/AMT698rwtlB40vtV395pPdZv5125Zr4JNmIfAaltEAI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvOTg4Mi85ODgy/MTgyLnBuZw"
    },
    {
      id: "6",
      title: "ਵਿੱਤੀ ਲਕੜੀਆਂ 🎯",
      description:
        "ਸਪਸ਼ਟ ਲਕੜੀਆਂ ਨਾਲ ਬਚਤ ਵਿੱਚ ਮਕਸਦ ਆਉਂਦਾ ਹੈ। ਛੋਟੇ, ਦਰਮਿਆਨੇ ਤੇ ਲੰਮੇ ਸਮੇਂ ਦੇ ਲਕੜੀਆਂ ਬਣਾਓ ਅਤੇ ਸਮੇਂ ਸਮੇਂ 'ਤੇ ਦੇਖੋ।",
      uri: "https://imgs.search.brave.com/TRJ2gYWHPU6HOiSNWAVGitlVc8NYUIViwygjyi_QEUg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xNzc3Ny8xNzc3/NzU4OC5wbmc_c2Vt/dD1haXNfaHlicmlk"
    }
  ],
};

export default financeGuidesByLocale;
