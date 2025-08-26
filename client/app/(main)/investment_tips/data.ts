type InvestmentTip = {
  id: string;
  title: string;
  description: string;
  uri: string;
};

type InvestmentTipsByLocale = {
  en: InvestmentTip[];
  hi: InvestmentTip[];
  pa: InvestmentTip[];
};

const investmentTipsByLocale: InvestmentTipsByLocale = {
  en: [
    {
      id: "1",
      title: "Start Early 📈",
      description:
        "Investing early helps take advantage of compound growth. Even small monthly amounts can grow significantly over years. Don’t wait for ‘more income’ — starting sooner matters more than starting bigger.",
      uri: "https://imgs.search.brave.com/M5aYjf9oMFIdleENFRYVIDM6Ay3vWk5sano24pdxDKg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni80ODQ1LzQ4NDU4/MjUucG5nP3NlbXQ9/YWlzX2h5YnJpZA"
    },
    {
      id: "2",
      title: "Diversify Your Portfolio 🧺",
      description:
        "Don’t put all your money in one asset. Mix stocks, bonds, mutual funds, and other instruments to balance risk and return. Diversification protects you from large losses if one investment underperforms.",
      uri: "https://imgs.search.brave.com/XFL_r0Xn1kHa4b4Uw_qmDXgsv4Imhh2fGB80XHw4aE4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI5/NzczMTI2MS92ZWN0/b3IvZGl2ZXJzaWZ5/LXBvcnRmb2xpby1p/bnZlc3RtZW50LXJl/YmFsYW5jZS1iZXR3/ZWVuLXN0b2Nrcy1h/bmQtYm9uZHMtcGFz/c2l2ZS1pbnZlc3Qt/d2VhbHRoLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz13OGxq/TDFjLXVkNC11ZEc5/djdWWnFWXy13WjFf/enM1RkxubFR0UUlr/VzJvPQ"
    },
    {
      id: "3",
      title: "Understand Risk vs Reward ⚖️",
      description:
        "Higher returns usually come with higher risk. Know your risk tolerance and investment goals. Avoid chasing quick profits that don’t match your comfort level or long-term plans.",
      uri: "https://imgs.search.brave.com/JGAsp2gLMQWV6Rq7eFQLdoPoiZ1ZXabj1OLUTWNsuGY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9yaXNr/LXJld2FyZC1kLXBl/b3BsZS1tYW4tcGVy/c29uLXJpc2tzLXJl/d2FyZHMtc2l0dWF0/aW9uLWlzc3VlLXNj/YWxlLTU3OTQ1NjE5/LmpwZw"
    },
    {
      id: "4",
      title: "Invest Regularly 🔄",
      description:
        "Use systematic investment plans (SIPs) or automatic transfers to invest consistently, regardless of market ups and downs. This approach can reduce average cost over time (rupee cost averaging).",
      uri: "https://imgs.search.brave.com/2Qq0Y1pHrp5ropoX4gPKLip4UziJO2m2M77EMDXheJ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMjMwMC8yMzAw/NDM2LnBuZw"
    },
    {
      id: "5",
      title: "Review & Rebalance 🔍",
      description:
        "Markets change and so can your life goals. Review your portfolio annually and rebalance if needed to stay aligned with your risk profile and goals.",
      uri: "https://imgs.search.brave.com/UpHz3l7JXRc-dnm1i1AmFjfwGMPsRNGFx_Fi9Z4sjYA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9yZXZpZXct/OTkzODIzNy04MDQy/NzkyLnBuZz9mPXdl/YnAmdz0xMjg"
    },
    {
      id: "6",
      title: "Avoid Emotional Decisions 🚫",
      description:
        "Markets fluctuate. Don’t panic sell during dips or get greedy in rallies. Stay disciplined and stick to your long-term strategy rather than reacting to headlines.",
      uri: "https://imgs.search.brave.com/WPePW5yg6dFFV4UTeB98Vq-E8g8Eo8fU91lHXfiK7DQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMTQzNy8xMTQz/NzY0Mi5wbmc_c2Vt/dD1haXNfaHlicmlk"
    }
  ],

  hi: [
    {
      id: "1",
      title: "जल्दी शुरुआत करें 📈",
      description:
        "जल्दी निवेश करने से कंपाउंड ग्रोथ का लाभ मिलता है। छोटी-छोटी रकम भी समय के साथ बड़ा फर्क ला सकती है। ज्यादा कमाई का इंतज़ार न करें — जल्दी शुरू करना ज्यादा ज़रूरी है।",
      uri: "https://imgs.search.brave.com/M5aYjf9oMFIdleENFRYVIDM6Ay3vWk5sano24pdxDKg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni80ODQ1LzQ4NDU4/MjUucG5nP3NlbXQ9/YWlzX2h5YnJpZA"
    },
    {
      id: "2",
      title: "पोर्टफोलियो में विविधता लाएँ 🧺",
      description:
        "पूंजी को एक ही जगह न लगाएँ। शेयर, बॉन्ड, म्यूचुअल फंड आदि में निवेश बाँटकर जोखिम कम करें। इससे किसी एक निवेश के खराब प्रदर्शन का असर कम होता है।",
      uri: "https://imgs.search.brave.com/XFL_r0Xn1kHa4b4Uw_qmDXgsv4Imhh2fGB80XHw4aE4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI5/NzczMTI2MS92ZWN0/b3IvZGl2ZXJzaWZ5/LXBvcnRmb2xpby1p/bnZlc3RtZW50LXJl/YmFsYW5jZS1iZXR3/ZWVuLXN0b2Nrcy1h/bmQtYm9uZHMtcGFz/c2l2ZS1pbnZlc3Qt/d2VhbHRoLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz13OGxq/TDFjLXVkNC11ZEc5/djdWWnFWXy13WjFf/enM1RkxubFR0UUlr/VzJvPQ"
    },
    {
      id: "3",
      title: "जोखिम और लाभ को समझें ⚖️",
      description:
        "ज्यादा रिटर्न में अक्सर ज्यादा जोखिम होता है। अपनी सहनशीलता और लक्ष्य के हिसाब से निवेश चुनें। जल्दी मुनाफ़ा कमाने की जल्दबाज़ी न करें।",
      uri: "https://imgs.search.brave.com/JGAsp2gLMQWV6Rq7eFQLdoPoiZ1ZXabj1OLUTWNsuGY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9yaXNr/LXJld2FyZC1kLXBl/b3BsZS1tYW4tcGVy/c29uLXJpc2tzLXJl/d2FyZHMtc2l0dWF0/aW9uLWlzc3VlLXNj/YWxlLTU3OTQ1NjE5/LmpwZw"
    },
    {
      id: "4",
      title: "नियमित निवेश करें 🔄",
      description:
        "SIP या ऑटोमैटिक ट्रांसफर से हर महीने निवेश करें। इससे बाजार के उतार-चढ़ाव का असर कम होता है और औसत लागत घटती है।",
      uri: "https://imgs.search.brave.com/2Qq0Y1pHrp5ropoX4gPKLip4UziJO2m2M77EMDXheJ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMjMwMC8yMzAw/NDM2LnBuZw"
    },
    {
      id: "5",
      title: "नजर रखें और बदलें 🔍",
      description:
        "वक़्त के साथ बाज़ार और लक्ष्य बदल सकते हैं। हर साल पोर्टफोलियो की समीक्षा करें और ज़रूरत हो तो री-बैलेंस करें।",
      uri: "https://imgs.search.brave.com/UpHz3l7JXRc-dnm1i1AmFjfwGMPsRNGFx_Fi9Z4sjYA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9yZXZpZXct/OTkzODIzNy04MDQy/NzkyLnBuZz9mPXdl/YnAmdz0xMjg"
    },
    {
      id: "6",
      title: "भावनाओं में न बहें 🚫",
      description:
        "बाज़ार में उतार-चढ़ाव आम हैं। डरकर बेचें या लालच में खरीदें नहीं। लंबी अवधि की रणनीति पर टिके रहें।",
      uri: "https://imgs.search.brave.com/WPePW5yg6dFFV4UTeB98Vq-E8g8Eo8fU91lHXfiK7DQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMTQzNy8xMTQz/NzY0Mi5wbmc_c2Vt/dD1haXNfaHlicmlk"
    }
  ],

  pa: [
    {
      id: "1",
      title: "ਜਲਦੀ ਸ਼ੁਰੂ ਕਰੋ 📈",
      description:
        "ਜਲਦੀ ਨਿਵੇਸ਼ ਕਰਨ ਨਾਲ ਕੈਂਪਾਊਂਡ ਵਾਧਾ ਮਿਲਦਾ ਹੈ। ਛੋਟੇ-ਛੋਟੇ ਨਿਵੇਸ਼ ਵੀ ਲੰਬੇ ਸਮੇਂ ਵਿੱਚ ਵੱਡਾ ਅਸਰ ਦਿਖਾਉਂਦੇ ਹਨ। ਹੋਰ ਕਮਾਈ ਦੀ ਉਡੀਕ ਨਾ ਕਰੋ — ਜਲਦੀ ਸ਼ੁਰੂ ਕਰੋ।",
      uri: "https://imgs.search.brave.com/M5aYjf9oMFIdleENFRYVIDM6Ay3vWk5sano24pdxDKg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni80ODQ1LzQ4NDU4/MjUucG5nP3NlbXQ9/YWlzX2h5YnJpZA"
    },
    {
      id: "2",
      title: "ਪੋਰਟਫੋਲਿਓ ਵੱਖਰਾ ਰੱਖੋ 🧺",
      description:
        "ਸਿਰਫ ਇੱਕ ਥਾਂ ਨਿਵੇਸ਼ ਨਾ ਕਰੋ। ਸ਼ੇਅਰ, ਬੌਂਡ, ਫੰਡ ਆਦਿ ਵਿੱਚ ਵੰਡੋ ਤਾਂ ਜੋ ਜੋਖਮ ਘੱਟ ਹੋਵੇ। ਇਹ ਕਿਸੇ ਇਕ ਨਿਵੇਸ਼ ਦੇ ਮਾੜੇ ਨਤੀਜੇ ਤੋਂ ਬਚਾਅ ਕਰਦਾ ਹੈ।",
      uri: "https://imgs.search.brave.com/XFL_r0Xn1kHa4b4Uw_qmDXgsv4Imhh2fGB80XHw4aE4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI5/NzczMTI2MS92ZWN0/b3IvZGl2ZXJzaWZ5/LXBvcnRmb2xpby1p/bnZlc3RtZW50LXJl/YmFsYW5jZS1iZXR3/ZWVuLXN0b2Nrcy1h/bmQtYm9uZHMtcGFz/c2l2ZS1pbnZlc3Qt/d2VhbHRoLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz13OGxq/TDFjLXVkNC11ZEc5/djdWWnFWXy13WjFf/enM1RkxubFR0UUlr/VzJvPQ"
    },
    {
      id: "3",
      title: "ਖਤਰੇ ਅਤੇ ਲਾਭ ਨੂੰ ਸਮਝੋ ⚖️",
      description:
        "ਉੱਚਾ ਲਾਭ ਆਮ ਤੌਰ 'ਤੇ ਉੱਚਾ ਜੋਖਮ ਲਿਆਉਂਦਾ ਹੈ। ਆਪਣੀ ਜੋਖਮ ਸਹਿਣਸ਼ੀਲਤਾ ਤੇ ਲਕੜੀਆਂ ਦੇ ਅਨੁਸਾਰ ਚੁਣੋ। ਤੇਜ਼ ਮੁਨਾਫ਼ੇ ਦੀ ਲਾਲਚ ਨਾ ਕਰੋ।",
      uri: "https://imgs.search.brave.com/JGAsp2gLMQWV6Rq7eFQLdoPoiZ1ZXabj1OLUTWNsuGY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9yaXNr/LXJld2FyZC1kLXBl/b3BsZS1tYW4tcGVy/c29uLXJpc2tzLXJl/d2FyZHMtc2l0dWF0/aW9uLWlzc3VlLXNj/YWxlLTU3OTQ1NjE5/LmpwZw"
    },
    {
      id: "4",
      title: "ਨਿਯਮਤ ਨਿਵੇਸ਼ ਕਰੋ 🔄",
      description:
        "SIP ਜਾਂ ਆਟੋਮੈਟਿਕ ਟ੍ਰਾਂਸਫਰ ਨਾਲ ਹਮੇਸ਼ਾ ਨਿਵੇਸ਼ ਕਰੋ। ਇਹ ਬਾਜ਼ਾਰ ਦੇ ਚੜ੍ਹਾਵ ਉਤਰਾਵ ਨਾਲ ਖਰਚੇ ਦੀ ਔਸਤ ਘਟਾਉਂਦਾ ਹੈ।",
      uri: "https://imgs.search.brave.com/2Qq0Y1pHrp5ropoX4gPKLip4UziJO2m2M77EMDXheJ8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMjMwMC8yMzAw/NDM2LnBuZw"
    },
    {
      id: "5",
      title: "ਸਮੀਖਿਆ ਤੇ ਸੰਤੁਲਨ 🔍",
      description:
        "ਬਾਜ਼ਾਰ ਅਤੇ ਲਕੜੀਆਂ ਬਦਲ ਸਕਦੇ ਹਨ। ਹਰ ਸਾਲ ਸੰਮੀਖਿਆ ਕਰੋ ਅਤੇ ਜ਼ਰੂਰਤ ਹੋਵੇ ਤਾਂ ਸੰਤੁਲਨ ਬਦਲੋ।",
      uri: "https://imgs.search.brave.com/UpHz3l7JXRc-dnm1i1AmFjfwGMPsRNGFx_Fi9Z4sjYA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9yZXZpZXct/OTkzODIzNy04MDQy/NzkyLnBuZz9mPXdl/YnAmdz0xMjg"
    },
    {
      id: "6",
      title: "ਭਾਵਨਾਵਾਂ ਤੇ ਕੰਟਰੋਲ 🚫",
      description:
        "ਬਾਜ਼ਾਰ ਹਮੇਸ਼ਾ ਚੜ੍ਹਦਾ ਘਟਦਾ ਹੈ। ਡਰ ਜਾਂ ਲਾਲਚ ਨਾਲ ਫੈਸਲੇ ਨਾ ਕਰੋ, ਲੰਬੇ ਸਮੇਂ ਦੀ ਯੋਜਨਾ 'ਤੇ ਟਿਕੇ ਰਹੋ।",
      uri: "https://imgs.search.brave.com/WPePW5yg6dFFV4UTeB98Vq-E8g8Eo8fU91lHXfiK7DQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMTQzNy8xMTQz/NzY0Mi5wbmc_c2Vt/dD1haXNfaHlicmlk"
    }
  ]
};

export default investmentTipsByLocale;
