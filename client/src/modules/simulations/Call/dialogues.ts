
interface dialogueType {
    speaker: string;
    text: string;
    modalText: string;
}
const dialoguesByStories: {
    en: dialogueType[];
    hi: dialogueType[];
    pa: dialogueType[];
}[] = [{
  en: [
    { speaker: 'Scammer', text: 'Hello sir, this is Ramesh from SEBI-approved investment advisory.', modalText: 'Scammer pretends to be SEBI registered to gain trust.' },
    { speaker: 'Investor', text: 'SEBI approved? Okay, tell me more.', modalText: '' },
    { speaker: 'Scammer', text: 'Yes sir, we have insider tips on stocks that will double in just one week!', modalText: 'Promises of quick guaranteed profits are a red flag.' },
    { speaker: 'Investor', text: 'Double in a week? That sounds too good.', modalText: '' },
    { speaker: 'Scammer', text: 'Trust me sir, our clients earned 50% last month. You only need to pay a small “membership fee” of ₹5,000 first.', modalText: 'They ask for upfront money in the name of membership/registration.' },
    { speaker: 'Investor', text: 'Hmm… what if I lose money?', modalText: '' },
    { speaker: 'Scammer', text: 'Impossible, sir! We guarantee profits because our tips come directly from market insiders.', modalText: 'No one can guarantee profits. Claims of insider tips are illegal.' },
    { speaker: 'Investor', text: 'Alright… how do I pay this fee?', modalText: '' },
    { speaker: 'Scammer', text: 'Just send it via UPI to this number. After that, I’ll add you to our VIP WhatsApp group for daily tips.', modalText: 'Scammers usually push payment through personal accounts.' },
    { speaker: 'Investor', text: 'I’ll think about it and verify SEBI’s website first.', modalText: '' },
    { speaker: 'Scammer', text: 'Sir, if you delay, you’ll miss today’s golden stock pick. Decide now!', modalText: 'They use urgency so the victim doesn’t check authenticity.' }
  ],

  hi: [
    { speaker: 'Scammer', text: 'नमस्ते सर, मैं सेबी अप्रूव्ड इन्वेस्टमेंट एडवाइजरी से बोल रहा हूँ।', modalText: 'सेबी का नाम लेकर भरोसा दिलाना।' },
    { speaker: 'Investor', text: 'सेबी अप्रूव्ड? ठीक है, बताइए।', modalText: '' },
    { speaker: 'Scammer', text: 'सर, हमारे पास ऐसे शेयर टिप्स हैं जो सिर्फ एक हफ्ते में दोगुना रिटर्न देंगे।', modalText: 'झटपट दोगुना मुनाफ़ा – साफ़ संकेत ठगी का।' },
    { speaker: 'Investor', text: 'एक हफ्ते में दोगुना? ये कैसे हो सकता है?', modalText: '' },
    { speaker: 'Scammer', text: 'सर, हमारे क्लाइंट्स को पिछले महीने 50% फायदा हुआ। बस ₹5000 की छोटी-सी मेंबरशिप फीस देनी होगी।', modalText: 'पहले पैसा माँगना ठगी का तरीका।' },
    { speaker: 'Investor', text: 'अगर घाटा हुआ तो?', modalText: '' },
    { speaker: 'Scammer', text: 'असंभव है सर! हमारे पास अंदर की जानकारी है।', modalText: 'इनसाइडर टिप्स देना गैरकानूनी है।' },
    { speaker: 'Investor', text: 'ठीक है… फीस कैसे दूँ?', modalText: '' },
    { speaker: 'Scammer', text: 'यूपीआई से इस नंबर पर भेज दीजिए। फिर आपको व्हाट्सऐप ग्रुप में जोड़ दूँगा।', modalText: 'निजी खाते पर पेमेंट करवाते हैं।' },
    { speaker: 'Investor', text: 'पहले मैं सेबी की साइट पर चेक करूँगा।', modalText: '' },
    { speaker: 'Scammer', text: 'सर, देरी की तो आज का गोल्डन स्टॉक चूक जाएँगे।', modalText: 'जल्दबाज़ी कराने का दबाव।' }
  ],

  pa: [
    { speaker: 'Scammer', text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਸਰ, ਮੈਂ SEBI ਅਪ੍ਰੂਵਡ ਇਨਵੈਸਟਮੈਂਟ ਐਡਵਾਇਜ਼ਰੀ ਤੋਂ ਬੋਲ ਰਿਹਾ ਹਾਂ।', modalText: 'SEBI ਦਾ ਨਾਂ ਲੈ ਕੇ ਭਰੋਸਾ ਬਣਾਉਂਦੇ ਹਨ।' },
    { speaker: 'Investor', text: 'SEBI ਅਪ੍ਰੂਵਡ? ਠੀਕ ਹੈ, ਦੱਸੋ।', modalText: '' },
    { speaker: 'Scammer', text: 'ਸਰ, ਸਾਡੇ ਕੋਲ ਐਸੇ ਸਟਾਕ ਟਿਪ ਹਨ ਜੋ ਸਿਰਫ ਇਕ ਹਫ਼ਤੇ ਵਿੱਚ ਦੋਗੁਣਾ ਕਰ ਦੇਣਗੇ।', modalText: 'ਤੁਰੰਤ ਦੋਗੁਣਾ – ਠੱਗੀ ਦੀ ਨਿਸ਼ਾਨੀ।' },
    { speaker: 'Investor', text: 'ਇਕ ਹਫ਼ਤੇ ਵਿੱਚ ਦੋਗੁਣਾ? ਇਹ ਤਾਂ ਅਜੀਬ ਹੈ।', modalText: '' },
    { speaker: 'Scammer', text: 'ਸਰ, ਸਾਡੇ ਕਲਾਇੰਟਸ ਨੇ ਪਿਛਲੇ ਮਹੀਨੇ 50% ਕਮਾਇਆ। ਸਿਰਫ਼ ₹5000 ਦੀ ਛੋਟੀ ਫੀਸ ਦੇਣੀ ਹੈ।', modalText: 'ਪਹਿਲਾਂ ਪੈਸੇ ਮੰਗਣੀ ਠੱਗੀ।' },
    { speaker: 'Investor', text: 'ਜੇ ਘਾਟਾ ਹੋ ਗਿਆ ਤਾਂ?', modalText: '' },
    { speaker: 'Scammer', text: 'ਅਸੰਭਵ ਸਰ! ਸਾਡੇ ਕੋਲ ਅੰਦਰਲੀ ਜਾਣਕਾਰੀ ਹੈ।', modalText: 'ਇਨਸਾਈਡਰ ਟਿਪਸ ਗੈਰਕਾਨੂੰਨੀ ਹਨ।' },
    { speaker: 'Investor', text: 'ਠੀਕ ਹੈ… ਫੀਸ ਕਿਵੇਂ ਦੇਣੀ?', modalText: '' },
    { speaker: 'Scammer', text: 'ਯੂਪੀਆਈ ਤੇ ਇਸ ਨੰਬਰ ਤੇ ਭੇਜੋ। ਫਿਰ VIP ਵਟਸਐਪ ਗਰੁੱਪ ਵਿੱਚ ਜੋੜਾਂਗਾ।', modalText: 'ਪ੍ਰਾਈਵੇਟ ਅਕਾਊਂਟ ਤੇ ਪੈਸੇ ਲਵਾਉਂਦੇ ਹਨ।' },
    { speaker: 'Investor', text: 'ਮੈਂ ਪਹਿਲਾਂ SEBI ਦੀ ਸਾਈਟ ਚੈੱਕ ਕਰਾਂਗਾ।', modalText: '' },
    { speaker: 'Scammer', text: 'ਜੇ ਹੁਣੇ ਨਾ ਕੀਤਾ ਤਾਂ ਅੱਜ ਦਾ ਸੋਨੇ ਦਾ ਮੌਕਾ ਖੋ ਬੈਠੋਗੇ।', modalText: 'ਜਲਦੀ ਫੈਸਲੇ ਲਈ ਦਬਾਅ।' }
  ]
}

    ];

export default dialoguesByStories;