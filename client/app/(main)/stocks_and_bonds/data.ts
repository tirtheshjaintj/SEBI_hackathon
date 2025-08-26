type StocksAndBondsGuide = {
  id: string;
  title: string;
  description: string;
  uri: string;
};

type StocksAndBondsByLocale = {
  en: StocksAndBondsGuide[];
  hi: StocksAndBondsGuide[];
  pa: StocksAndBondsGuide[];
};

const stocksAndBondsByLocale: StocksAndBondsByLocale = {
  en: [
    {
      id: "1",
      title: "What are Stocks? 📈",
      description:
        "Stocks represent ownership in a company. When you buy shares, you become a part-owner and can benefit if the company does well. Stocks can be volatile in the short term but may offer higher returns over the long term.",
      uri: "https://imgs.search.brave.com/iTG3uW1xgE2MdcviScmFk5RILtidduEmhVZKVGuZJz4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzJx/amZrL3N0eWxlcy9j/b21tdW5pdHlJY29u/XzRzMnY4ZXV1dGlz/MTEucG5n"
    },
    {
      id: "2",
      title: "What are Bonds? 🏦",
      description:
        "Bonds are like loans you give to governments or companies. They promise to pay you back after a fixed time with interest. Bonds are generally less risky than stocks but usually offer lower returns.",
      uri: "https://imgs.search.brave.com/CePTV85WrGm4-gRZAmN5jhLExeLRF7Il3ToTa3LGbak/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzk3LzQyLzI3/LzM2MF9GXzEwOTc0/MjI3MDhfallac3dp/b2wyanVhWFNmODI1/ekpINTNRNWRsbHN4/eGUuanBn"
    },
    {
      id: "3",
      title: "Diversify Your Portfolio 🧺",
      description:
        "Don’t put all your money into one stock or bond. Diversification helps reduce risk by spreading investments across different asset types, industries, and geographies.",
      uri: "https://imgs.search.brave.com/gxKSEi7K3e0myrKVq7yNFG8HITQQR9YZlOzsxqSCx-g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xNzU5Ny8xNzU5/Nzc4Mi5wbmc_c2Vt/dD1haXNfaHlicmlk"
    },
    {
      id: "4",
      title: "Risk vs. Return ⚖️",
      description:
        "Stocks usually have higher potential returns but also higher risk. Bonds tend to be safer but provide steady, lower returns. Choose a balance that fits your risk tolerance and goals.",
      uri: "https://imgs.search.brave.com/yafgwTsWi4tAsc20SLSHmwGAnrEmaGdTrUG4kFSst94/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzYv/NDk3Lzc3Mi9zbWFs/bC9oaWdoLXJpc2st/aGlnaC1yZXR1cm4t/Y29uY2VwdC1idXNp/bmVzc21hbi1zdGFu/ZC1vbi1zdGFja3Mt/b2Ytcmlzay1ib3hl/cy10by1nZXQtcmV3/YXJkLXByb3NwZWN0/cy1vZi1oaWdoZXIt/cmV0dXJuLWluLWhp/Z2hlci1yaXNrLXZl/Y3Rvci5qcGc"
    },
    {
      id: "5",
      title: "Long-term Investing 🕰️",
      description:
        "Investing in stocks and bonds works best over the long term. Avoid panic selling when markets drop, and review your portfolio periodically to stay aligned with your goals.",
      uri: "https://imgs.search.brave.com/-L7J1we0-J1eB8FbipOD8pJ024E90qxtnGwwdc-cFZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvbG9u/Zy10ZXJtLWludmVz/dG1lbnQtM2QtaWNv/bi1kb3dubG9hZC1p/bi1wbmctYmxlbmQt/ZmJ4LWdsdGYtZmls/ZS1mb3JtYXRzLS1p/bnZlc3RpbmctY29p/bi1jYXNoLXRpbWUt/dGltZXItcGFjay1i/dXNpbmVzcy1pY29u/cy03ODYzODAxLnBu/Zw"
    },
    {
      id: "6",
      title: "Understanding Dividends 💵",
      description:
        "Some companies share part of their profits with investors as dividends. Reinvesting dividends can boost long-term returns. Not all stocks pay dividends, so research before investing.",
      uri: "https://imgs.search.brave.com/5vw0FE6NT3nZL67WFLKHz14XaAvnErhYvrI0hZgYfi0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xNzY3My8xNzY3/MzY3My5wbmc_c2Vt/dD1haXNfaHlicmlk"
    }
  ],

  hi: [
    {
      id: "1",
      title: "स्टॉक्स क्या हैं? 📈",
      description:
        "स्टॉक कंपनी में हिस्सेदारी दर्शाते हैं। शेयर खरीदने पर आप मालिक बनते हैं और कंपनी के अच्छा करने पर लाभ पाते हैं। छोटे समय में जोखिम ज्यादा, लेकिन लंबे समय में रिटर्न भी अच्छे हो सकते हैं।",
      uri: "https://imgs.search.brave.com/iTG3uW1xgE2MdcviScmFk5RILtidduEmhVZKVGuZJz4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzJx/amZrL3N0eWxlcy9j/b21tdW5pdHlJY29u/XzRzMnY4ZXV1dGlz/MTEucG5n"
    },
    {
      id: "2",
      title: "बॉन्ड्स क्या हैं? 🏦",
      description:
        "बॉन्ड्स वो ऋण हैं जो आप सरकार या कंपनी को देते हैं। बदले में वो तय समय पर ब्याज समेत पैसा लौटाते हैं। जोखिम कम, पर रिटर्न भी कम होते हैं।",
      uri: "https://imgs.search.brave.com/CePTV85WrGm4-gRZAmN5jhLExeLRF7Il3ToTa3LGbak/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzk3LzQyLzI3/LzM2MF9GXzEwOTc0/MjI3MDhfallac3dp/b2wyanVhWFNmODI1/ekpINTNRNWRsbHN4/eGUuanBn"
    },
    {
      id: "3",
      title: "डायवर्सिफाई करें 🧺",
      description:
        "पूंजी को सिर्फ एक स्टॉक या बॉन्ड में न लगाएँ। अलग-अलग सेक्टर और टाइप में निवेश करने से जोखिम कम होता है।",
      uri: "https://imgs.search.brave.com/gxKSEi7K3e0myrKVq7yNFG8HITQQR9YZlOzsxqSCx-g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xNzU5Ny8xNzU5/Nzc4Mi5wbmc_c2Vt/dD1haXNfaHlicmlk"
    },
    {
      id: "4",
      title: "जोखिम बनाम रिटर्न ⚖️",
      description:
        "स्टॉक्स में रिटर्न ज्यादा पर जोखिम भी ज्यादा। बॉन्ड्स में रिटर्न कम लेकिन स्थिर होते हैं। अपने लक्ष्य और जोखिम क्षमता के हिसाब से निवेश करें।",
      uri: "https://imgs.search.brave.com/yafgwTsWi4tAsc20SLSHmwGAnrEmaGdTrUG4kFSst94/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzYv/NDk3Lzc3Mi9zbWFs/bC9oaWdoLXJpc2st/aGlnaC1yZXR1cm4t/Y29uY2VwdC1idXNp/bmVzc21hbi1zdGFu/ZC1vbi1zdGFja3Mt/b2Ytcmlzay1ib3hl/cy10by1nZXQtcmV3/YXJkLXByb3NwZWN0/cy1vZi1oaWdoZXIt/cmV0dXJuLWluLWhp/Z2hlci1yaXNrLXZl/Y3Rvci5qcGc"
    },
    {
      id: "5",
      title: "लॉन्ग-टर्म निवेश 🕰️",
      description:
        "स्टॉक्स और बॉन्ड्स में निवेश लंबे समय में अच्छे परिणाम देते हैं। गिरावट पर बेचने की जल्दी न करें, समय-समय पर पोर्टफोलियो देखें।",
      uri: "https://imgs.search.brave.com/-L7J1we0-J1eB8FbipOD8pJ024E90qxtnGwwdc-cFZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvbG9u/Zy10ZXJtLWludmVz/dG1lbnQtM2QtaWNv/bi1kb3dubG9hZC1p/bi1wbmctYmxlbmQt/ZmJ4LWdsdGYtZmls/ZS1mb3JtYXRzLS1p/bnZlc3RpbmctY29p/bi1jYXNoLXRpbWUt/dGltZXItcGFjay1i/dXNpbmVzcy1pY29u/cy03ODYzODAxLnBu/Zw"
    },
    {
      id: "6",
      title: "डिविडेंड को समझें 💵",
      description:
        "कुछ कंपनियां अपने मुनाफे का हिस्सा निवेशकों को डिविडेंड के रूप में देती हैं। डिविडेंड को दोबारा निवेश करने से रिटर्न बढ़ सकता है।",
      uri: "https://imgs.search.brave.com/5vw0FE6NT3nZL67WFLKHz14XaAvnErhYvrI0hZgYfi0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xNzY3My8xNzY3/MzY3My5wbmc_c2Vt/dD1haXNfaHlicmlk"
    }
  ],

  pa: [
    {
      id: "1",
      title: "ਸਟਾਕ ਕੀ ਹਨ? 📈",
      description:
        "ਸਟਾਕ ਕੰਪਨੀ ਵਿੱਚ ਹਿੱਸੇਦਾਰੀ ਦਿਖਾਉਂਦੇ ਹਨ। ਖਰੀਦ ਕੇ ਤੁਸੀਂ ਹਿੱਸੇਦਾਰ ਬਣਦੇ ਹੋ ਅਤੇ ਕੰਪਨੀ ਚੰਗਾ ਕਰਨ ਤੇ ਫਾਇਦਾ ਮਿਲਦਾ ਹੈ। ਛੋਟੇ ਸਮੇਂ ਵਿੱਚ ਰਿਸਕ ਵੱਧ, ਲੰਮੇ ਸਮੇਂ ਵਿੱਚ ਵੱਧ ਰਿਟਰਨ।",
      uri: "https://imgs.search.brave.com/iTG3uW1xgE2MdcviScmFk5RILtidduEmhVZKVGuZJz4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1XzJx/amZrL3N0eWxlcy9j/b21tdW5pdHlJY29u/XzRzMnY4ZXV1dGlz/MTEucG5n"
    },
    {
      id: "2",
      title: "ਬੋਂਡ ਕੀ ਹਨ? 🏦",
      description:
        "ਬੋਂਡ ਉਹ ਕਰਜ਼ਾ ਹੁੰਦਾ ਹੈ ਜੋ ਤੁਸੀਂ ਸਰਕਾਰ ਜਾਂ ਕੰਪਨੀ ਨੂੰ ਦਿੰਦੇ ਹੋ। ਉਹ ਨਿਸ਼ਚਿਤ ਸਮੇਂ 'ਤੇ ਵਿਆਜ ਸਮੇਤ ਮੁੜ ਦਿੰਦੇ ਹਨ। ਰਿਸਕ ਘੱਟ, ਪਰ ਮੁਨਾਫਾ ਵੀ ਘੱਟ।",
      uri: "https://imgs.search.brave.com/CePTV85WrGm4-gRZAmN5jhLExeLRF7Il3ToTa3LGbak/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzEwLzk3LzQyLzI3/LzM2MF9GXzEwOTc0/MjI3MDhfallac3dp/b2wyanVhWFNmODI1/ekpINTNRNWRsbHN4/eGUuanBn"
    },
    {
      id: "3",
      title: "ਡਾਇਵਰਸੀਫਾਈ ਕਰੋ 🧺",
      description:
        "ਸਾਰਾ ਪੈਸਾ ਇੱਕ ਸਟਾਕ ਜਾਂ ਬੋਂਡ ਵਿੱਚ ਨਾ ਲਗਾਓ। ਵੱਖ-ਵੱਖ ਖੇਤਰਾਂ ਅਤੇ ਐਸੈੱਟ ਵਿੱਚ ਨਿਵੇਸ਼ ਨਾਲ ਖਤਰਾ ਘੱਟ ਹੁੰਦਾ ਹੈ।",
      uri: "https://imgs.search.brave.com/gxKSEi7K3e0myrKVq7yNFG8HITQQR9YZlOzsxqSCx-g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xNzU5Ny8xNzU5/Nzc4Mi5wbmc_c2Vt/dD1haXNfaHlicmlk"
    },
    {
      id: "4",
      title: "ਖਤਰਾ ਅਤੇ ਰਿਟਰਨ ⚖️",
      description:
        "ਸਟਾਕ ਵਧੇਰੇ ਮੁਨਾਫਾ ਦੇ ਸਕਦੇ ਹਨ ਪਰ ਰਿਸਕ ਵੀ ਵਧੇਰਾ ਹੁੰਦਾ ਹੈ। ਬੋਂਡ ਸੁਰੱਖਿਅਤ, ਪਰ ਮੁਨਾਫਾ ਘੱਟ। ਆਪਣੀ ਯੋਜਨਾ ਅਨੁਸਾਰ ਫੈਸਲਾ ਕਰੋ।",
      uri: "https://imgs.search.brave.com/yafgwTsWi4tAsc20SLSHmwGAnrEmaGdTrUG4kFSst94/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzYv/NDk3Lzc3Mi9zbWFs/bC9oaWdoLXJpc2st/aGlnaC1yZXR1cm4t/Y29uY2VwdC1idXNp/bmVzc21hbi1zdGFu/ZC1vbi1zdGFja3Mt/b2Ytcmlzay1ib3hl/cy10by1nZXQtcmV3/YXJkLXByb3NwZWN0/cy1vZi1oaWdoZXIt/cmV0dXJuLWluLWhp/Z2hlci1yaXNrLXZl/Y3Rvci5qcGc"
    },
    {
      id: "5",
      title: "ਲੰਮਾ ਸਮੇਂ ਦਾ ਨਿਵੇਸ਼ 🕰️",
      description:
        "ਸਟਾਕ ਅਤੇ ਬੋਂਡ ਲੰਮੇ ਸਮੇਂ ਵਿੱਚ ਚੰਗਾ ਨਤੀਜਾ ਦਿੰਦੇ ਹਨ। ਮਾਰਕੀਟ ਡਿੱਗਣ ਤੇ ਡਰੋ ਨਾ, ਸਮੇਂ-ਸਮੇਂ 'ਤੇ ਵੇਖਦੇ ਰਹੋ।",
      uri: "https://imgs.search.brave.com/-L7J1we0-J1eB8FbipOD8pJ024E90qxtnGwwdc-cFZA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4z/ZC5pY29uc2NvdXQu/Y29tLzNkL3ByZW1p/dW0vdGh1bWIvbG9u/Zy10ZXJtLWludmVz/dG1lbnQtM2QtaWNv/bi1kb3dubG9hZC1p/bi1wbmctYmxlbmQt/ZmJ4LWdsdGYtZmls/ZS1mb3JtYXRzLS1p/bnZlc3RpbmctY29p/bi1jYXNoLXRpbWUt/dGltZXItcGFjay1i/dXNpbmVzcy1pY29u/cy03ODYzODAxLnBu/Zw"
    },
    {
      id: "6",
      title: "ਡਿਵਿਡੈਂਡ ਨੂੰ ਸਮਝੋ 💵",
      description:
        "ਕੁਝ ਕੰਪਨੀਆਂ ਨਫੇ ਦਾ ਹਿੱਸਾ ਡਿਵਿਡੈਂਡ ਦੇ ਤੌਰ 'ਤੇ ਦਿੰਦੀਆਂ ਹਨ। ਡਿਵਿਡੈਂਡ ਮੁੜ ਨਿਵੇਸ਼ ਕਰਨ ਨਾਲ ਰਿਟਰਨ ਵੱਧ ਸਕਦਾ ਹੈ।",
      uri: "https://imgs.search.brave.com/5vw0FE6NT3nZL67WFLKHz14XaAvnErhYvrI0hZgYfi0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xNzY3My8xNzY3/MzY3My5wbmc_c2Vt/dD1haXNfaHlicmlk"
    }
  ]
};

export default stocksAndBondsByLocale;
