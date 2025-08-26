const savingsTipsByLocale = {
  en: [
    {
      id: "1",
      title: "Track Your Expenses",
      description: "Keep a daily log of all your spending to identify unnecessary expenses and save more.",
      uri: "https://imgs.search.brave.com/qCgKzqb7WUBqBJZCysWZaCzoBU2Lqio52fN0XFRDeK4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jb25z/Y2lvdXMtY29uc3Vt/ZXItY29sb3ItaWNv/bi10aG91Z2h0ZnVs/LXNob3BwaW5nLXRo/b3VnaHRmdWwtc3Bl/bmRpbmctbW9uZXkt/YnV5aW5nLW5lY2Vz/c2FyeS10aGluZ3Mt/bWluZGZ1bC1zcGVu/ZGluZy1jb25jZXB0/LTIxMzgyODYzNC5q/cGc",
    },
    {
      id: "2",
      title: "Create a Budget",
      description: "Set a monthly budget and stick to it. Allocate specific amounts for savings, needs, and leisure.",
      uri: "https://imgs.search.brave.com/8teRND34ZrtsEUzEdUpGpq_KOtDn-bRccI6BcpZnocs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni84ODE4Lzg4MTgw/MjQucG5nP3NlbXQ9/YWlzX2h5YnJpZA",
    },
    {
      id: "3",
      title: "Automate Savings",
      description: "Set up automatic transfers from your salary account to a savings or investment account every month.",
      uri: "https://cdn-icons-png.flaticon.com/512/3523/3523881.png",
    },
    {
      id: "4",
      title: "Use Cashback & Discounts",
      description: "Take advantage of cashback offers, coupons, and discounts when shopping to reduce expenses.",
      uri: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
    },
    {
      id: "5",
      title: "Avoid Impulse Purchases",
      description: "Wait at least 24 hours before making non-essential purchases to decide if you really need them.",
      uri: "https://imgs.search.brave.com/qCgKzqb7WUBqBJZCysWZaCzoBU2Lqio52fN0XFRDeK4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jb25z/Y2lvdXMtY29uc3Vt/ZXItY29sb3ItaWNv/bi10aG91Z2h0ZnVs/LXNob3BwaW5nLXRo/b3VnaHRmdWwtc3Bl/bmRpbmctbW9uZXkt/YnV5aW5nLW5lY2Vz/c2FyeS10aGluZ3Mt/bWluZGZ1bC1zcGVu/ZGluZy1jb25jZXB0/LTIxMzgyODYzNC5q/cGc",
    },
    {
      id: "6",
      title: "Compare Prices Before Buying",
      description: "Before making a purchase, check prices across different platforms to get the best deal.",
      uri: "https://cdn-icons-png.flaticon.com/512/2910/2910768.png",
    },
  ],
  hi: [
    {
      id: "1",
      title: "अपने खर्चों का हिसाब रखें",
      description: "हर दिन के खर्चों को नोट करें ताकि अनावश्यक खर्चों की पहचान कर सकें और ज़्यादा बचत कर सकें।",
      uri: "https://imgs.search.brave.com/qCgKzqb7WUBqBJZCysWZaCzoBU2Lqio52fN0XFRDeK4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jb25z/Y2lvdXMtY29uc3Vt/ZXItY29sb3ItaWNv/bi10aG91Z2h0ZnVs/LXNob3BwaW5nLXRo/b3VnaHRmdWwtc3Bl/bmRpbmctbW9uZXkt/YnV5aW5nLW5lY2Vz/c2FyeS10aGluZ3Mt/bWluZGZ1bC1zcGVu/ZGluZy1jb25jZXB0/LTIxMzgyODYzNC5q/cGc",
    },
    {
      id: "2",
      title: "बजट बनाएं",
      description: "महीने का बजट तय करें और उसी पर टिके रहें। बचत, ज़रूरत और मनोरंजन के लिए अलग-अलग राशि निर्धारित करें।",
      uri: "https://imgs.search.brave.com/8teRND34ZrtsEUzEdUpGpq_KOtDn-bRccI6BcpZnocs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni84ODE4Lzg4MTgw/MjQucG5nP3NlbXQ9/YWlzX2h5YnJpZA",
    },
    {
      id: "3",
      title: "ऑटोमेटेड सेविंग्स",
      description: "हर महीने अपने सैलरी अकाउंट से बचत या निवेश खाते में अपने आप पैसा ट्रांसफर करें।",
      uri: "https://cdn-icons-png.flaticon.com/512/3523/3523881.png",
    },
    {
      id: "4",
      title: "कैशबैक और डिस्काउंट का उपयोग करें",
      description: "शॉपिंग करते समय कैशबैक ऑफर्स, कूपन और छूट का फायदा उठाएँ।",
      uri: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
    },
    {
      id: "5",
      title: "झटपट खरीदारी से बचें",
      description: "ग़ैर-ज़रूरी चीज़ों को खरीदने से पहले कम से कम 24 घंटे इंतज़ार करें और सोचें क्या वाकई ज़रूरी है।",
      uri: "https://imgs.search.brave.com/qCgKzqb7WUBqBJZCysWZaCzoBU2Lqio52fN0XFRDeK4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jb25z/Y2lvdXMtY29uc3Vt/ZXItY29sb3ItaWNv/bi10aG91Z2h0ZnVs/LXNob3BwaW5nLXRo/b3VnaHRmdWwtc3Bl/bmRpbmctbW9uZXkt/YnV5aW5nLW5lY2Vz/c2FyeS10aGluZ3Mt/bWluZGZ1bC1zcGVu/ZGluZy1jb25jZXB0/LTIxMzgyODYzNC5q/cGc",
    },
    {
      id: "6",
      title: "खरीदने से पहले कीमतें तुलना करें",
      description: "कोई भी चीज़ खरीदने से पहले अलग-अलग प्लेटफार्म पर दाम देखें और सबसे सस्ता सौदा पाएं।",
      uri: "https://cdn-icons-png.flaticon.com/512/2910/2910768.png",
    },
  ],
  pa: [
    {
      id: "1",
      title: "ਆਪਣੇ ਖਰਚ ਲਿਖੋ",
      description: "ਹਰ ਰੋਜ਼ ਆਪਣੇ ਖਰਚੇ ਦਰਜ ਕਰੋ ਤਾਂ ਜੋ ਫ਼ਜ਼ੂਲ ਖਰਚਿਆਂ ਦੀ ਪਛਾਣ ਕਰ ਸਕੋ ਅਤੇ ਹੋਰ ਬਚਤ ਕਰ ਸਕੋ।",
      uri: "https://imgs.search.brave.com/qCgKzqb7WUBqBJZCysWZaCzoBU2Lqio52fN0XFRDeK4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jb25z/Y2lvdXMtY29uc3Vt/ZXItY29sb3ItaWNv/bi10aG91Z2h0ZnVs/LXNob3BwaW5nLXRo/b3VnaHRmdWwtc3Bl/bmRpbmctbW9uZXkt/YnV5aW5nLW5lY2Vz/c2FyeS10aGluZ3Mt/bWluZGZ1bC1zcGVu/ZGluZy1jb25jZXB0/LTIxMzgyODYzNC5q/cGc",
    },
    {
      id: "2",
      title: "ਬਜਟ ਬਣਾਓ",
      description: "ਮਾਸਿਕ ਬਜਟ ਬਣਾਓ ਅਤੇ ਉਸ 'ਤੇ ਕਾਇਮ ਰਹੋ। ਬਚਤ, ਲੋੜਾਂ ਅਤੇ ਮਨੋਰੰਜਨ ਲਈ ਵੱਖ-ਵੱਖ ਰਕਮ ਰੱਖੋ।",
      uri: "https://imgs.search.brave.com/8teRND34ZrtsEUzEdUpGpq_KOtDn-bRccI6BcpZnocs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni84ODE4Lzg4MTgw/MjQucG5nP3NlbXQ9/YWlzX2h5YnJpZA",
    },
    {
      id: "3",
      title: "ਆਟੋਮੈਟਿਕ ਬਚਤ",
      description: "ਹਰ ਮਹੀਨੇ ਆਪਣੀ ਤਨਖਾਹ ਖਾਤੇ ਤੋਂ ਬਚਤ ਜਾਂ ਨਿਵੇਸ਼ ਖਾਤੇ ਵਿੱਚ ਆਟੋਮੈਟਿਕ ਤੌਰ 'ਤੇ ਰਕਮ ਭੇਜੋ।",
      uri: "https://cdn-icons-png.flaticon.com/512/3523/3523881.png",
    },
    {
      id: "4",
      title: "ਕੈਸ਼ਬੈਕ ਅਤੇ ਛੂਟਾਂ ਦਾ ਫਾਇਦਾ ਲਵੋ",
      description: "ਖਰੀਦਦਾਰੀ ਕਰਦਿਆਂ ਕੈਸ਼ਬੈਕ, ਕੂਪਨ ਅਤੇ ਛੂਟਾਂ ਦੀ ਵਰਤੋਂ ਕਰੋ ਤਾਂ ਜੋ ਖਰਚੇ ਘਟ ਸਕਣ।",
      uri: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
    },
    {
      id: "5",
      title: "ਤੁਰੰਤ ਖਰੀਦ ਤੋਂ ਬਚੋ",
      description: "ਗੈਰ-ਜ਼ਰੂਰੀ ਚੀਜ਼ਾਂ ਦੀ ਖਰੀਦ ਤੋਂ ਪਹਿਲਾਂ ਘੱਟੋ-ਘੱਟ 24 ਘੰਟੇ ਇੰਤਜ਼ਾਰ ਕਰੋ ਅਤੇ ਸੋਚੋ ਕਿ ਕੀ ਇਹ ਲਾਜ਼ਮੀ ਹੈ।",
      uri: "https://imgs.search.brave.com/qCgKzqb7WUBqBJZCysWZaCzoBU2Lqio52fN0XFRDeK4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9jb25z/Y2lvdXMtY29uc3Vt/ZXItY29sb3ItaWNv/bi10aG91Z2h0ZnVs/LXNob3BwaW5nLXRo/b3VnaHRmdWwtc3Bl/bmRpbmctbW9uZXkt/YnV5aW5nLW5lY2Vz/c2FyeS10aGluZ3Mt/bWluZGZ1bC1zcGVu/ZGluZy1jb25jZXB0/LTIxMzgyODYzNC5q/cGc",
    },
    {
      id: "6",
      title: "ਖਰੀਦਣ ਤੋਂ ਪਹਿਲਾਂ ਕੀਮਤਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ",
      description: "ਖਰੀਦਦਾਰੀ ਤੋਂ ਪਹਿਲਾਂ ਵੱਖ-ਵੱਖ ਪਲੇਟਫਾਰਮਾਂ 'ਤੇ ਕੀਮਤਾਂ ਵੇਖੋ ਤਾਂ ਜੋ ਸਭ ਤੋਂ ਵਧੀਆ ਡੀਲ ਮਿਲੇ।",
      uri: "https://cdn-icons-png.flaticon.com/512/2910/2910768.png",
    },
  ],
};

export default savingsTipsByLocale;
