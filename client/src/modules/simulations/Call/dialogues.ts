
interface dialogueType {
    speaker: string;
    text: string;
    modalText: string;
}
const dialoguesByStories: {
    en: dialogueType[];
    hi: dialogueType[];
    pa: dialogueType[];
}[] = [
        // 🧩 Story 1
        {

            en: [
                { speaker: 'Scammer', text: 'Hello madam, am I speaking with Mrs. Sharma?', modalText: '' },
                { speaker: 'Victim', text: 'Yes, this is Mrs. Sharma. Who is this?', modalText: '' },
                { speaker: 'Scammer', text: "I’m calling from your bank's fraud prevention team. We noticed some suspicious activity on your account today morning.", modalText: "Pretending to be from the bank to sound official." },
                { speaker: 'Victim', text: 'Suspicious activity? What do you mean?', modalText: '' },
                { speaker: 'Scammer', text: 'Yes, madam. There were two login attempts – one from Singapore and another from Dubai. We suspect someone might have your online banking details.', modalText: "Mentioning foreign locations makes it scarier." },
                { speaker: 'Victim', text: 'Oh my God! I didn’t do anything. What should I do now?', modalText: '' },
                { speaker: 'Scammer', text: 'Don’t worry, madam. That’s why we called you quickly. To block these fraudulent transactions, I just need to verify some details with you.', modalText: "Creates urgency to push victim to share data." },
                { speaker: 'Victim', text: 'Okay… what do you need?', modalText: '' },
                { speaker: 'Scammer', text: 'First, could you please confirm your date of birth and the last four digits of your account number?', modalText: "Asks partial info to seem legitimate." },
                { speaker: 'Victim', text: 'It’s 18th March 1982, and the last four digits are 7634.', modalText: '' },
                { speaker: 'Scammer', text: 'Thank you, madam. Now, our system will send you a One Time Password (OTP). Please read it back to me as soon as you get it, so we can stop the hacker.', modalText: "Never share OTP on phone — this is the scammer’s goal." },
                { speaker: 'Victim', text: 'Um… okay, let me check… yes, I just got it. It’s 345876.', modalText: '' },
                { speaker: 'Scammer', text: 'Perfect. Thank you so much for your cooperation, madam. We just stopped one transaction, but there’s a new attempt showing up. I’m going to send you another OTP now, please tell me quickly.', modalText: "Scammers often ask for multiple OTPs to drain accounts in parts." },
                { speaker: 'Victim', text: 'Again? Okay… now it says 987245.', modalText: '' },
                { speaker: 'Scammer', text: 'Great, thank you. Just one last step: could you confirm your debit card’s expiry date and CVV number on the back? This helps us block the card for international use.', modalText: "They ask for full card details now." },
                { speaker: 'Victim', text: 'Wait… why do you need my CVV?', modalText: '' },
                { speaker: 'Scammer', text: 'Madam, it’s only for verification. Without it, the hacker can still access your card. Please trust me, I’m from your bank’s security department.', modalText: "Uses pressure and authority." },
                { speaker: 'Victim', text: 'Alright… expiry is 11/26 and CVV is 842.', modalText: '' },
                { speaker: 'Scammer', text: 'Thank you, madam. Almost done. Now, we also see your account linked to UPI apps. Could you please tell me which app you use so we can block it temporarily?', modalText: "Tries to get info to attack digital wallets too." },
                { speaker: 'Victim', text: 'Yes, I use PhonePe mostly… sometimes Google Pay.', modalText: '' },
                { speaker: 'Scammer', text: 'Understood. You may get two more OTPs in a moment; don’t worry, just read them to me quickly.', modalText: '' },
                { speaker: 'Victim', text: 'Okay… first one is 445902, second one is 778133.', modalText: '' },
                { speaker: 'Scammer', text: 'Perfect, thank you! Last thing, madam: please do not answer calls from other numbers claiming to be the bank. It might confuse the process. Just stay on this number for any help.', modalText: "They tell victim to ignore real bank calls later." },
                { speaker: 'Victim', text: 'Alright… thank you for helping me. I’m really worried!', modalText: '' },
                { speaker: 'Scammer', text: 'Of course, madam. We’re here to help. Your account is safe now. Have a good day and please stay alert in the future.', modalText: '' },
                { speaker: 'Victim', text: 'Thanks… goodbye.', modalText: '' }
            ],

            hi: [
                { speaker: 'Scammer', text: 'नमस्ते मैडम, क्या मैं श्रीमती शर्मा से बात कर रहा हूँ?', modalText: '' },
                { speaker: 'Victim', text: 'हाँ, मैं शर्मा बोल रही हूँ। आप कौन हैं?', modalText: '' },
                { speaker: 'Scammer', text: 'मैं आपके बैंक के फ्रॉड प्रिवेंशन टीम से बोल रहा हूँ। आज सुबह आपके खाते में कुछ संदिग्ध गतिविधि देखी गई है।', modalText: 'बैंक से होने का दावा करके भरोसा जीतने की कोशिश।' },
                { speaker: 'Victim', text: 'संदिग्ध गतिविधि? मतलब?', modalText: '' },
                { speaker: 'Scammer', text: 'जी, मैडम। दो बार लॉगिन की कोशिश हुई – एक सिंगापुर से और दूसरी दुबई से। हमें शक है कि किसी के पास आपकी ऑनलाइन बैंकिंग जानकारी हो सकती है।', modalText: 'विदेशी लोकेशन बताकर डराना।' },
                { speaker: 'Victim', text: 'अरे भगवान! मैंने तो कुछ नहीं किया। अब क्या करूँ?', modalText: '' },
                { speaker: 'Scammer', text: 'घबराएँ नहीं मैडम, इसी वजह से हमने तुरंत कॉल किया। इन फ्रॉड ट्रांजैक्शन्स को रोकने के लिए कुछ जानकारी चाहिए होगी।', modalText: 'जल्दी-जल्दी जानकारी माँगकर दबाव बनाना।' },
                { speaker: 'Victim', text: 'ठीक है… क्या चाहिए?', modalText: '' },
                { speaker: 'Scammer', text: 'पहले अपना जन्मतिथि और अकाउंट नंबर के आखिरी चार अंक बता दें।', modalText: 'आधा अधूरा डेटा माँगकर भरोसा दिलाना।' },
                { speaker: 'Victim', text: '18 मार्च 1982… और आखिरी चार अंक 7634 हैं।', modalText: '' },
                { speaker: 'Scammer', text: 'धन्यवाद मैडम। अब आपके नंबर पर एक OTP आएगा, तुरंत पढ़कर बताइए ताकि हम हैकर को ब्लॉक कर सकें।', modalText: 'OTP कभी किसी को नहीं बताना चाहिए। यही धोखा है।' },
                { speaker: 'Victim', text: 'अभी आया… 345876।', modalText: '' },
                { speaker: 'Scammer', text: 'बहुत बढ़िया। एक ट्रांजैक्शन रोका गया, लेकिन अब एक और नया अटेम्प्ट दिख रहा है। एक और OTP भेज रहा हूँ, जल्दी बताइए।', modalText: 'अलग-अलग हिस्सों में पैसा निकालने की कोशिश।' },
                { speaker: 'Victim', text: 'फिर से? ठीक है… 987245।', modalText: '' },
                { speaker: 'Scammer', text: 'धन्यवाद। अब आखिरी स्टेप: अपने डेबिट कार्ड की वैलिडिटी डेट और पीछे का CVV बताइए, ताकि कार्ड को इंटरनेशनल ब्लॉक किया जा सके।', modalText: 'अब पूरी कार्ड की डिटेल्स माँगना।' },
                { speaker: 'Victim', text: 'CVV क्यों?', modalText: '' },
                { speaker: 'Scammer', text: 'मैडम, सिर्फ वेरिफिकेशन के लिए। हम बिना CVV के कार्ड ब्लॉक नहीं कर सकते। भरोसा रखिए, मैं बैंक से ही बोल रहा हूँ।', modalText: 'दबाव बनाकर भरोसे में लेना।' },
                { speaker: 'Victim', text: 'ठीक है… 11/26 वैलिडिटी और CVV 842।', modalText: '' },
                { speaker: 'Scammer', text: 'बहुत अच्छा। अब देख रहा हूँ कि आपका अकाउंट कुछ UPI ऐप से भी लिंक है। कौन-सा ऐप यूज़ करती हैं? ब्लॉक कर दूँगा।', modalText: 'डिजिटल वॉलेट पर भी हमला करने की तैयारी।' },
                { speaker: 'Victim', text: 'फोनपे… और कभी-कभी गूगल पे।', modalText: '' },
                { speaker: 'Scammer', text: 'ठीक है मैडम। अभी दो और OTP आएँगे, जल्दी से बता दीजिए।', modalText: '' },
                { speaker: 'Victim', text: 'पहला 445902, दूसरा 778133।', modalText: '' },
                { speaker: 'Scammer', text: 'धन्यवाद! एक आखिरी बात: किसी और नंबर से बैंक के नाम पर कॉल आए तो मत उठाइए, वरना कन्फ्यूजन होगा।', modalText: 'असली बैंक कॉल को भी रोकने का तरीका।' },
                { speaker: 'Victim', text: 'अच्छा… धन्यवाद आपकी मदद के लिए। बहुत डर लग रहा है!', modalText: '' },
                { speaker: 'Scammer', text: 'कोई बात नहीं मैडम, अब आपका अकाउंट सेफ है। ध्यान रखिए। नमस्ते।', modalText: '' },
                { speaker: 'Victim', text: 'जी धन्यवाद… नमस्ते।', modalText: '' }
            ],

            pa: [
                { speaker: 'Scammer', text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਮੈਡਮ, ਕੀ ਮੈਂ ਸ਼ਰਮਾ ਜੀ ਨਾਲ ਗੱਲ ਕਰ ਰਿਹਾ ਹਾਂ?', modalText: '' },
                { speaker: 'Victim', text: 'ਹਾਂ, ਮੈਂ ਸ਼ਰਮਾ ਹਾਂ। ਤੁਸੀਂ ਕੌਣ ਹੋ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਮੈਂ ਤੁਹਾਡੇ ਬੈਂਕ ਦੀ ਫਰੌਡ ਟੀਮ ਤੋਂ ਬੋਲ ਰਿਹਾ ਹਾਂ। ਅੱਜ ਸਵੇਰੇ ਤੁਹਾਡੇ ਖਾਤੇ ਵਿੱਚ ਸ਼ੱਕੀ ਸਰਗਰਮੀਆਂ ਦੇਖੀਆਂ ਹਨ।', modalText: 'ਬੈਂਕ ਤੋਂ ਹੋਣ ਦਾ ਨਾਟਕ ਕਰਕੇ ਵਿਸ਼ਵਾਸ ਬਣਾਉਣਾ।' },
                { speaker: 'Victim', text: 'ਸ਼ੱਕੀ ਸਰਗਰਮੀਆਂ? ਕੀ ਮਤਲਬ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਜੀ ਮੈਡਮ, ਦੋ ਲੋਗਿਨ ਕੋਸ਼ਿਸਾਂ ਹੋਈਆਂ – ਇਕ ਸਿੰਗਾਪੁਰ ਤੋਂ, ਇਕ ਦੁਬਈ ਤੋਂ। ਲੱਗਦਾ ਹੈ ਕਿਸੇ ਕੋਲ ਤੁਹਾਡੀ ਡਿਟੇਲ ਹੈ।', modalText: 'ਵਿਦੇਸ਼ੀ ਥਾਵਾਂ ਦਾ ਹਵਾਲਾ ਦੇ ਕੇ ਡਰਾਉਣਾ।' },
                { speaker: 'Victim', text: 'ਹਾਏ ਰੱਬਾ! ਮੈਂ ਤਾਂ ਕੁਝ ਨਹੀਂ ਕੀਤਾ। ਹੁਣ ਕੀ ਕਰਾਂ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਚਿੰਤਾ ਨਾ ਕਰੋ ਮੈਡਮ, ਇਸ ਲਈ ਤੁਰੰਤ ਫ਼ੋਨ ਕੀਤਾ। ਟਰਾਂਜ਼ੈਕਸ਼ਨ ਰੋਕਣ ਲਈ ਥੋੜ੍ਹੀ ਜਾਣਕਾਰੀ ਚਾਹੀਦੀ ਹੈ।', modalText: 'ਤੁਰੰਤ ਜਾਣਕਾਰੀ ਲੈਣ ਲਈ ਦਬਾਅ ਬਣਾਉਣਾ।' },
                { speaker: 'Victim', text: 'ਠੀਕ ਹੈ… ਕੀ ਦੱਸਣਾ ਹੈ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਤੁਹਾਡਾ ਜਨਮ ਮਿਤੀ ਤੇ ਖਾਤੇ ਦੇ ਆਖਰੀ ਚਾਰ ਅੰਕ ਦੱਸੋ ਜੀ।', modalText: 'ਅਧੂਰੀ ਜਾਣਕਾਰੀ ਲੈ ਕੇ ਭਰੋਸਾ ਬਣਾਉਣਾ।' },
                { speaker: 'Victim', text: '18 ਮਾਰਚ 1982… ਤੇ ਆਖਰੀ ਚਾਰ ਅੰਕ 7634।', modalText: '' },
                { speaker: 'Scammer', text: 'ਧੰਨਵਾਦ ਮੈਡਮ। ਹੁਣ ਤੁਹਾਡੇ ਨੰਬਰ ਤੇ OTP ਆਏਗਾ, ਜਲਦੀ ਦੱਸੋ ਤਾਂਕਿ ਅਟੈਕ ਰੁਕ ਸਕੇ।', modalText: 'OTP ਕਿਸੇ ਨੂੰ ਵੀ ਨਾ ਦਿਓ – ਇਹੀ ਠੱਗੀ ਦਾ ਟਰਿਕ ਹੈ।' },
                { speaker: 'Victim', text: 'ਆ ਗਿਆ… 345876।', modalText: '' },
                { speaker: 'Scammer', text: 'ਵਧੀਆ। ਇਕ ਟਰਾਂਜ਼ੈਕਸ਼ਨ ਰੁਕਿਆ, ਪਰ ਨਵਾਂ ਅਟੈਮਪਟ ਆ ਰਿਹਾ ਹੈ। ਹੋਰ ਇਕ OTP ਆਵੇਗਾ, ਫਟਾਫਟ ਦੱਸੋ।', modalText: 'ਕੁਝ ਕੁ ਧੜਿਆਂ ਵਿੱਚ ਪੈਸਾ ਕੱਢਣ ਦੀ ਕੋਸ਼ਿਸ।' },
                { speaker: 'Victim', text: 'ਫਿਰ? ਠੀਕ ਹੈ… 987245।', modalText: '' },
                { speaker: 'Scammer', text: 'ਸ਼ੁਕਰੀਆ। ਹੁਣ ਕਾਰਡ ਦੀ ਮਿਆਦ ਤੇ CVV ਦੱਸੋ, ਤਾਂਕਿ ਬਲਾਕ ਕਰੀਏ।', modalText: 'ਹੁਣ ਪੂਰੀ ਕਾਰਡ ਡਿਟੇਲ ਮੰਗਣਾ।' },
                { speaker: 'Victim', text: 'CVV ਕਿਉਂ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਸਿਰਫ ਵੈਰੀਫਿਕੇਸ਼ਨ ਲਈ ਮੈਡਮ, ਬਿਨਾਂ ਇਸ ਦੇ ਕਾਰਡ ਨਹੀਂ ਬਲਾਕ ਹੁੰਦਾ। ਮੈਂ ਬੈਂਕ ਤੋਂ ਹਾਂ, ਫਿਕਰ ਨਾ ਕਰੋ।', modalText: 'ਦਬਾਅ ਤੇ ਝੂਠਾ ਭਰੋਸਾ।' },
                { speaker: 'Victim', text: '11/26 ਮਿਆਦ ਤੇ CVV 842।', modalText: '' },
                { speaker: 'Scammer', text: 'ਧੰਨਵਾਦ। ਹੁਣ ਦੱਸੋ ਕਿ ਤੁਹਾਡੇ ਕੋਲ ਕਿਹੜਾ UPI ਐਪ ਹੈ?', modalText: 'ਡਿਜੀਟਲ ਵੌਲਿਟ ਉੱਤੇ ਹਮਲਾ ਕਰਨ ਲਈ।' },
                { speaker: 'Victim', text: 'ਫੋਨਪੇ… ਤੇ ਕਦੇ ਗੂਗਲ ਪੇ।', modalText: '' },
                { speaker: 'Scammer', text: 'ਠੀਕ। ਹੁਣ ਦੋ ਹੋਰ OTP ਆਉਣਗੇ, ਜਲਦੀ ਦੱਸੋ।', modalText: '' },
                { speaker: 'Victim', text: '445902 ਤੇ 778133।', modalText: '' },
                { speaker: 'Scammer', text: 'ਸ਼ੁਕਰੀਆ! ਇਕ ਅਖੀਰ ਗੱਲ – ਕਿਸੇ ਹੋਰ ਨੰਬਰ ਤੋਂ ਬੈਂਕ ਦੀ ਕਾਲ ਆਏ ਤਾਂ ਨਾ ਸੁਣਨਾ।', modalText: 'ਅਸਲੀ ਬੈਂਕ ਕਾਲ ਤੋਂ ਵੀ ਬਚਾਉਣ ਦੀ ਕੋਸ਼ਿਸ।' },
                { speaker: 'Victim', text: 'ਠੀਕ ਹੈ… ਡਰ ਲੱਗ ਰਿਹਾ ਸੀ, ਧੰਨਵਾਦ!', modalText: '' },
                { speaker: 'Scammer', text: 'ਚਿੰਤਾ ਨਾ ਕਰੋ, ਹੁਣ ਸੁਰੱਖਿਅਤ ਹੈ। ਅਲਵਿਦਾ ਜੀ!', modalText: '' },
                { speaker: 'Victim', text: 'ਸ਼ੁਕਰੀਆ… ਅਲਵਿਦਾ!', modalText: '' }
            ]
        },

        // 🧩 Story 2 (with modalText everywhere)
        {
            en: [
                { speaker: 'Scammer', text: 'Congrats! You’ve been selected for a free vacation package, fully paid!', modalText: '' },
                { speaker: 'Victim', text: 'Wow, really? That sounds amazing! Where exactly?', modalText: '' },
                { speaker: 'Scammer', text: 'To the Maldives! All 5-star hotels, 4 nights and 5 days. You only need to pay a small registration fee of $99 to confirm your spot.', modalText: 'Scammers often ask for a small “processing fee” to sound believable.' },
                { speaker: 'Victim', text: 'Hmm… is that all? What else do I have to do?', modalText: '' },
                { speaker: 'Scammer', text: 'That’s it! Just share your card details or bank info so we can process the fee immediately and send you the booking confirmation.', modalText: 'Notice how they rush to get financial details.' },
                { speaker: 'Victim', text: 'Card details? Isn’t there a safer way?', modalText: '' },
                { speaker: 'Scammer', text: 'Ma’am, this is a limited-time offer! Hundreds are calling right now. If you wait, you might lose your spot.', modalText: 'They use urgency to stop you from thinking clearly.' },
                { speaker: 'Victim', text: 'Well… okay, but why do I have to pay anything if it’s free?', modalText: '' },
                { speaker: 'Scammer', text: 'Just the processing fee, nothing else. Plus, we’ll give you a voucher for local sightseeing worth $200 as a bonus.', modalText: 'Extra offers to make it sound more tempting.' },
                { speaker: 'Victim', text: 'I don’t know… this still feels suspicious.', modalText: '' },
                { speaker: 'Scammer', text: 'Look, ma’am, thousands have already travelled through us. We’re an award-winning agency. Trust me, you’ll regret missing this!', modalText: 'They build false trust and reputation.' },
                { speaker: 'Victim', text: 'Hmm… I’ll think about it and call back.', modalText: '' },
                { speaker: 'Scammer', text: 'Ma’am, if you hang up, this deal may not be available again. Please decide now!', modalText: '' },
                { speaker: 'Victim', text: 'No thanks, I think I’ll skip.', modalText: '' }
            ]
            ,
            hi: [
                { speaker: 'Scammer', text: 'बधाई हो! आप फ्री वेकेशन पैकेज के लिए चुने गए हैं!', modalText: '' },
                { speaker: 'Victim', text: 'वाकई? कहाँ का पैकेज है?', modalText: '' },
                { speaker: 'Scammer', text: 'मालदीव का! 5 स्टार होटल, 4 रात 5 दिन। बस ₹999 की रजिस्ट्रेशन फीस देकर जगह कन्फर्म करनी होगी।', modalText: 'छोटी फीस माँगना स्कैमर्स की सामान्य ट्रिक है।' },
                { speaker: 'Victim', text: 'बस इतना ही? और कुछ नहीं करना पड़ेगा?', modalText: '' },
                { speaker: 'Scammer', text: 'बस अपने कार्ड की डिटेल या बैंक जानकारी दे दीजिए, ताकि तुरंत फीस प्रोसेस कर सकें और बुकिंग भेज दें।', modalText: 'देखिए कैसे तुरंत डिटेल्स लेने की जल्दी है।' },
                { speaker: 'Victim', text: 'कार्ड की डिटेल? कोई और तरीका नहीं है?', modalText: '' },
                { speaker: 'Scammer', text: 'मैडम, ये लिमिटेड टाइम ऑफर है! बहुत लोग लाइन में हैं, देरी की तो मौका चला जाएगा।', modalText: 'जल्दी-जल्दी निर्णय लेने का दबाव।' },
                { speaker: 'Victim', text: 'लेकिन फ्री पैकेज के लिए पैसे क्यों देने पड़ रहे हैं?', modalText: '' },
                { speaker: 'Scammer', text: 'ये सिर्फ प्रोसेसिंग फीस है। साथ में ₹2000 का लोकल टूर वाउचर भी फ्री मिलेगा।', modalText: 'अतिरिक्त ऑफर से लालच बढ़ाना।' },
                { speaker: 'Victim', text: 'फिर भी… कुछ गड़बड़ लग रही है।', modalText: '' },
                { speaker: 'Scammer', text: 'मैडम, हजारों लोग हमसे ट्रैवल कर चुके हैं। पक्का भरोसा रखिए। बाद में पछताएँगी।', modalText: 'झूठी विश्वसनीयता दिखाना।' },
                { speaker: 'Victim', text: 'मैं सोचकर बताती हूँ।', modalText: '' },
                { speaker: 'Scammer', text: 'मैडम, अभी डिसाइड करें। वरना ये ऑफर चला जाएगा!', modalText: '' },
                { speaker: 'Victim', text: 'नहीं, धन्यवाद।', modalText: '' }
            ]
            ,
            pa: [
                { speaker: 'Scammer', text: 'ਵਧਾਈ ਹੋ! ਤੁਸੀਂ ਮੁਫ਼ਤ ਛੁੱਟੀਆਂ ਲਈ ਚੁਣੇ ਗਏ ਹੋ!', modalText: '' },
                { speaker: 'Victim', text: 'ਸੱਚਮੁੱਚ? ਕਿੱਥੇ ਦੀਆਂ ਛੁੱਟੀਆਂ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਮਾਲਦੀਵ! 5-ਸਟਾਰ ਹੋਟਲ, 4 ਰਾਤਾਂ 5 ਦਿਨਾਂ ਦਾ ਪੈਕੇਜ। ਸਿਰਫ਼ ₹999 ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਫੀਸ ਦੇਣੀ ਪਏਗੀ।', modalText: 'ਛੋਟੀ ਫੀਸ ਮੰਗ ਕੇ ਵਿਸ਼ਵਾਸ ਬਣਾਉਣਾ।' },
                { speaker: 'Victim', text: 'ਫਿਰ ਹੋਰ ਕੁਝ ਨਹੀਂ ਕਰਨਾ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਸਿਰਫ ਕਾਰਡ ਜਾਂ ਬੈਂਕ ਡਿਟੇਲ ਦਿਓ ਤਾਂ ਜੋ ਫੀਸ ਕਟ ਜਾਵੇ ਤੇ ਕਨਫਰਮੇਸ਼ਨ ਭੇਜੀਏ।', modalText: 'ਫੌਰਨ ਡਿਟੇਲ ਲੈਣ ਦੀ ਕੋਸ਼ਿਸ਼।' },
                { speaker: 'Victim', text: 'ਕਾਰਡ ਦੀ ਡਿਟੇਲ? ਹੋਰ ਤਰੀਕਾ ਨਹੀਂ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਮੈਡਮ, ਇਹ ਲਿਮਿਟਡ ਆਫਰ ਹੈ! ਬਹੁਤ ਲੋਕ ਫੋਨ ਕਰ ਰਹੇ ਹਨ, ਹੁਣੇ ਫੈਸਲਾ ਕਰੋ ਨਹੀਂ ਤਾਂ ਮੁਕ ਜਾਵੇਗਾ।', modalText: 'ਤੁਰੰਤ ਫੈਸਲੇ ਦਾ ਦਬਾਅ।' },
                { speaker: 'Victim', text: 'ਫਿਰ ਵੀ ਫਰੀ ਪੈਕੇਜ ਲਈ ਪੈਸੇ ਕਿਉਂ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਸਿਰਫ ਪ੍ਰੋਸੈਸਿੰਗ ਲਈ। ਨਾਲ 2000 ਦਾ ਸਾਈਟਸੀਇੰਗ ਵਾਊਚਰ ਵੀ ਮੁਫ਼ਤ ਮਿਲੇਗਾ।', modalText: 'ਲਾਲਚ ਵਧਾਉਣਾ।' },
                { speaker: 'Victim', text: 'ਮੈਨੂੰ ਇਹ ਠੀਕ ਨਹੀਂ ਲੱਗ ਰਿਹਾ।', modalText: '' },
                { speaker: 'Scammer', text: 'ਮੈਡਮ, ਸਾਡੀ ਕੰਪਨੀ ਤੇ ਹਜ਼ਾਰਾਂ ਯਾਤਰੀਆਂ ਦਾ ਭਰੋਸਾ ਹੈ। ਮੌਕਾ ਨਾ ਗਵਾਓ।', modalText: 'ਝੂਠਾ ਭਰੋਸਾ ਦਿਖਾਉਣਾ।' },
                { speaker: 'Victim', text: 'ਮੈਂ ਸੋਚ ਲਵਾਂ ਫੇਰ ਦੱਸਦੀ ਹਾਂ।', modalText: '' },
                { speaker: 'Scammer', text: 'ਹੁਣੇ ਦੱਸੋ ਮੈਡਮ! ਬਾਅਦ ਵਿੱਚ ਆਫਰ ਮੁਕ ਜਾਵੇਗਾ।', modalText: '' },
                { speaker: 'Victim', text: 'ਨਹੀਂ, ਧੰਨਵਾਦ।', modalText: '' }
            ]
        },
        {
            en: [
                { speaker: 'Scammer', text: 'Good afternoon, ma’am. This is John from Windows Technical Support.', modalText: '' },
                { speaker: 'Victim', text: 'Oh, hi. Is there a problem with my computer?', modalText: '' },
                { speaker: 'Scammer', text: 'Yes ma’am, our system detected multiple viruses and suspicious activities from your IP address.', modalText: 'They use fear and technical jargon to sound serious.' },
                { speaker: 'Victim', text: 'Oh dear! What should I do now?', modalText: '' },
                { speaker: 'Scammer', text: 'Don’t worry, ma’am. We can help. First, could you please turn on your computer and go to www.help-now-support.com?', modalText: 'They ask you to visit a fake site for remote control.' },
                { speaker: 'Victim', text: 'Okay… it’s loading. What next?', modalText: '' },
                { speaker: 'Scammer', text: 'Now, click “Allow” to let our certified technician fix the issue remotely.', modalText: 'They get access to your system this way.' },
                { speaker: 'Victim', text: 'Alright, I clicked it. But my screen just went black…', modalText: '' },
                { speaker: 'Scammer', text: 'That’s normal, ma’am. We’re scanning. Oh! The infection is worse than we thought. Your data might be at risk!', modalText: 'They dramatize the “threat” to scare you.' },
                { speaker: 'Victim', text: 'Oh no! Please save my files!', modalText: '' },
                { speaker: 'Scammer', text: 'We can clean everything immediately, but our premium clean-up tool costs $299. Would you like to proceed?', modalText: 'Finally, they ask for money.' },
                { speaker: 'Victim', text: 'That sounds expensive… Are you sure this is the only way?', modalText: '' },
                { speaker: 'Scammer', text: 'Ma’am, your banking passwords and personal photos are in danger. It’s urgent. Most people pay right away to stay safe.', modalText: 'They pressure the victim using fear.' },
                { speaker: 'Victim', text: 'Hmm… I need to think. Can I call you back?', modalText: '' },
                { speaker: 'Scammer', text: 'If you hang up now, you risk losing everything. We cannot guarantee your data will be safe after this call.', modalText: 'They try to stop the victim from thinking logically.' },
                { speaker: 'Victim', text: 'No… this doesn’t feel right. I’ll get help locally instead.', modalText: '' },
                { speaker: 'Scammer', text: 'Ma’am, this is a one-time solution! Think carefully!', modalText: '' },
                { speaker: 'Victim', text: 'Sorry, goodbye.', modalText: '' }
            ]
            ,
            hi: [
                { speaker: 'Scammer', text: 'नमस्कार मैडम, मैं विंडोज़ टेक्निकल सपोर्ट से जॉन बोल रहा हूँ।', modalText: '' },
                { speaker: 'Victim', text: 'ओह, नमस्ते। क्या मेरे कंप्यूटर में कोई समस्या है?', modalText: '' },
                { speaker: 'Scammer', text: 'जी मैडम, हमारे सिस्टम ने आपके आईपी एड्रेस से कई वायरस और संदिग्ध गतिविधियाँ पाई हैं।', modalText: 'डर और तकनीकी शब्दों का इस्तेमाल करके असली लगते हैं।' },
                { speaker: 'Victim', text: 'अरे! अब मुझे क्या करना चाहिए?', modalText: '' },
                { speaker: 'Scammer', text: 'चिंता न करें मैडम, हम मदद करेंगे। कृपया कंप्यूटर ऑन कीजिए और www.help-now-support.com पर जाइए।', modalText: 'ये आपको फर्जी साइट पर भेजते हैं ताकि कंट्रोल मिल सके।' },
                { speaker: 'Victim', text: 'ठीक है… पेज खुल रहा है। अब?', modalText: '' },
                { speaker: 'Scammer', text: 'अब “Allow” पर क्लिक कीजिए, ताकि हमारा सर्टिफाइड टेक्नीशियन आपकी मदद कर सके।', modalText: 'इससे इन्हें आपके सिस्टम का एक्सेस मिलता है।' },
                { speaker: 'Victim', text: 'मैंने क्लिक किया… लेकिन स्क्रीन काली हो गई है…', modalText: '' },
                { speaker: 'Scammer', text: 'ये सामान्य है मैडम, हम स्कैन कर रहे हैं। ओह! वायरस बहुत ज़्यादा हैं। आपके डाटा पर खतरा है!', modalText: 'डर बढ़ाकर समस्या को बड़ा दिखाते हैं।' },
                { speaker: 'Victim', text: 'अरे भगवान! कृपया मेरी फाइलें बचाइए!', modalText: '' },
                { speaker: 'Scammer', text: 'हम तुरंत सब ठीक कर सकते हैं, लेकिन इसका प्रीमियम क्लीन-अप टूल $299 का है। करना चाहेंगी?', modalText: 'अंत में पैसे माँगते हैं।' },
                { speaker: 'Victim', text: 'इतना महँगा? क्या और कोई तरीका नहीं है?', modalText: '' },
                { speaker: 'Scammer', text: 'मैडम, आपके बैंक पासवर्ड और फोटोज़ खतरे में हैं। तुरंत करना ज़रूरी है। ज़्यादातर लोग तुरंत पेमेंट कर देते हैं।', modalText: 'डर का दबाव डालते हैं।' },
                { speaker: 'Victim', text: 'मुझे सोचना पड़ेगा… क्या मैं बाद में कॉल कर सकती हूँ?', modalText: '' },
                { speaker: 'Scammer', text: 'अगर आप अभी कॉल काटती हैं, तो हम डेटा सुरक्षित नहीं रख पाएँगे।', modalText: 'विचार करने का समय नहीं देते।' },
                { speaker: 'Victim', text: 'नहीं… मुझे ठीक नहीं लग रहा। मैं लोकल एक्सपर्ट से दिखाऊँगी।', modalText: '' },
                { speaker: 'Scammer', text: 'मैडम, ये एक बार का मौका है! सोचिए!', modalText: '' },
                { speaker: 'Victim', text: 'माफ़ कीजिए, अलविदा।', modalText: '' }
            ]
            ,
            pa: [
                { speaker: 'Scammer', text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ ਮੈਡਮ, ਮੈਂ Windows Technical Support ਤੋਂ ਜੌਨ ਬੋਲ ਰਿਹਾ ਹਾਂ।', modalText: '' },
                { speaker: 'Victim', text: 'ਓਹ, ਸਤ ਸ੍ਰੀ ਅਕਾਲ। ਕੋਈ ਸਮੱਸਿਆ ਆਈ ਹੈ ਮੇਰੇ ਕੰਪਿਊਟਰ ਵਿੱਚ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਜੀ ਮੈਡਮ, ਸਾਡੇ ਸਿਸਟਮ ਨੇ ਤੁਹਾਡੇ IP ਪਤੇ ਤੋਂ ਕਈ ਵਾਇਰਸ ਅਤੇ ਸ਼ੱਕੀ ਗਤੀਵਿਧੀਆਂ ਪਾਈਆਂ ਹਨ।', modalText: 'ਡਰ ਅਤੇ ਤਕਨੀਕੀ ਸ਼ਬਦਾਂ ਨਾਲ ਗੰਭੀਰ ਬਣ ਕੇ ਦਿਖਾਉਂਦੇ ਹਨ।' },
                { speaker: 'Victim', text: 'ਹਾਏ! ਹੁਣ ਮੈਂ ਕੀ ਕਰਾਂ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਘਬਰਾਉ ਨਾ ਮੈਡਮ, ਅਸੀਂ ਮਦਦ ਕਰਾਂਗੇ। ਪਹਿਲਾਂ www.help-now-support.com ਤੇ ਜਾਓ।', modalText: 'ਫਰਜੀ ਸਾਈਟ ਤੇ ਭੇਜ ਕੇ ਕੰਪਿਊਟਰ ਦਾ ਕੰਟਰੋਲ ਲੈਂਦੇ ਹਨ।' },
                { speaker: 'Victim', text: 'ਠੀਕ ਹੈ… ਲੋਡ ਹੋ ਰਿਹਾ। ਹੁਣ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਹੁਣ “Allow” ਤੇ ਕਲਿੱਕ ਕਰੋ ਤਾਂ ਕਿ ਸਾਡਾ ਸਰਟੀਫਾਈਡ ਟੈਕਨੀਸ਼ਨ ਮਦਦ ਕਰ ਸਕੇ।', modalText: 'ਇਹ ਨਾਲ ਉਹਨਾਂ ਨੂੰ ਤੁਹਾਡੇ ਕੰਪਿਊਟਰ ਦੀ ਐਕਸੇਸ ਮਿਲ ਜਾਂਦੀ ਹੈ।' },
                { speaker: 'Victim', text: 'ਕਲਿੱਕ ਕੀਤਾ… ਪਰ ਸਕ੍ਰੀਨ ਕਾਲੀ ਹੋ ਗਈ...', modalText: '' },
                { speaker: 'Scammer', text: 'ਇਹ ਨਾਰਮਲ ਹੈ ਮੈਡਮ, ਅਸੀਂ ਸਕੈਨ ਕਰ ਰਹੇ ਹਾਂ। ਓਹ! ਇਨਫੈਕਸ਼ਨ ਵੱਡਾ ਹੈ। ਤੁਹਾਡੇ ਡਾਟਾ ਨੂੰ ਖਤਰਾ ਹੈ!', modalText: 'ਖਤਰਾ ਵੱਡਾ ਦਿਖਾ ਕੇ ਡਰਾਉਂਦੇ ਹਨ।' },
                { speaker: 'Victim', text: 'ਹਾਏ ਰੱਬਾ! ਮੇਰੀਆਂ ਫਾਈਲਾਂ ਬਚਾਓ!', modalText: '' },
                { speaker: 'Scammer', text: 'ਅਸੀਂ ਹੁਣੇ ਹੀ ਸਭ ਕੁਝ ਠੀਕ ਕਰ ਸਕਦੇ ਹਾਂ, ਪਰ ਪ੍ਰੀਮੀਅਮ ਕਲੀਨ-ਅੱਪ ਟੂਲ ਦੀ ਕੀਮਤ $299 ਹੈ। ਕਰਨੀਆਂ ਚਾਹੁੰਦੇ ਹੋ?', modalText: 'ਆਖਿਰ ਵਿੱਚ ਪੈਸੇ ਮੰਗਦੇ ਹਨ।' },
                { speaker: 'Victim', text: 'ਬਹੁਤ ਮਹਿੰਗਾ ਹੈ… ਕੋਈ ਹੋਰ ਤਰੀਕਾ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਮੈਡਮ, ਤੁਹਾਡੇ ਬੈਂਕ ਪਾਸਵਰਡ ਤੇ ਤਸਵੀਰਾਂ ਖਤਰੇ ਵਿਚ ਹਨ। ਜਲਦੀ ਫੈਸਲਾ ਕਰੋ। ਜਿਆਦਾਤਰ ਲੋਕ ਤੁਰੰਤ ਪੇ ਕਰ ਦਿੰਦੇ ਹਨ।', modalText: 'ਡਰ ਦਾ ਦਬਾਅ ਬਣਾਉਂਦੇ ਹਨ।' },
                { speaker: 'Victim', text: 'ਮੈਨੂੰ ਸੋਚਣ ਦੀ ਲੋੜ ਹੈ… ਕੀ ਮੈਂ ਬਾਅਦ ਵਿੱਚ ਫੋਨ ਕਰ ਸਕਦੀ ਹਾਂ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਜੇ ਹੁਣ ਕਾਲ ਕੱਟੀ ਤਾਂ ਤੁਹਾਡਾ ਡਾਟਾ ਬਚਾਇਆ ਨਹੀਂ ਜਾ ਸਕੇਗਾ।', modalText: 'ਫੈਸਲਾ ਕਰਨ ਲਈ ਸਮਾਂ ਨਹੀਂ ਦਿੰਦੇ।' },
                { speaker: 'Victim', text: 'ਨਹੀਂ… ਮੈਨੂੰ ਠੀਕ ਨਹੀਂ ਲੱਗ ਰਿਹਾ। ਮੈਂ ਲੋਕਲ ਐਕਸਪਰਟ ਨੂੰ ਦਿਖਾਵਾਂਗੀ।', modalText: '' },
                { speaker: 'Scammer', text: 'ਮੈਡਮ, ਇਹ ਇਕ ਵਾਰੀ ਦਾ ਮੌਕਾ ਹੈ! ਸੋਚੋ!', modalText: '' },
                { speaker: 'Victim', text: 'ਮਾਫ ਕਰਨਾ, ਅਲਵਿਦਾ।', modalText: '' }
            ]
            ,
        },
        {
            en: [
                { speaker: 'Scammer', text: 'Good afternoon! Am I speaking with Ms. Davis?', modalText: '' },
                { speaker: 'Victim', text: 'Yes, this is Davis. Who’s calling?', modalText: '' },
                { speaker: 'Scammer', text: 'Ma’am, this is Mark from the National Courier Service. We’ve been trying to deliver an urgent parcel to you since yesterday.', modalText: 'Scammers often sound polite and use common names to appear real.' },
                { speaker: 'Victim', text: 'Oh? I don’t remember ordering anything.', modalText: '' },
                { speaker: 'Scammer', text: 'It’s actually an official document sent by your bank. Unfortunately, there’s an address mismatch. Could you please confirm your full address?', modalText: 'They use words like “official document” to create urgency and trust.' },
                { speaker: 'Victim', text: 'Um… okay, my address is 42 Elm Street, Greenfield.', modalText: '' },
                { speaker: 'Scammer', text: 'Thank you, Ms. Davis. Also, for security reasons, could you verify your date of birth and the last four digits of your account number?', modalText: 'They ask for small personal details first to lower the victim’s guard.' },
                { speaker: 'Victim', text: 'I was born on May 12, 1980, and the last four digits are 4821.', modalText: '' },
                { speaker: 'Scammer', text: 'Perfect, thank you so much! One moment while I check… Oh, I see here there’s also an outstanding verification fee of $25 before we can release the parcel.', modalText: 'Scammers introduce a payment after gaining trust.' },
                { speaker: 'Victim', text: 'Wait, what? Why would I pay for something I didn’t request?', modalText: '' },
                { speaker: 'Scammer', text: 'I completely understand, ma’am. But this fee comes directly from the sender — your bank. If it’s not paid today, the parcel will be marked as undeliverable and returned, which might cause issues with your account.', modalText: 'They use fear of “account issues” to pressure the victim.' },
                { speaker: 'Victim', text: 'That sounds strange… can you give me the bank’s direct number? I’d like to confirm first.', modalText: '' },
                { speaker: 'Scammer', text: 'Unfortunately, ma’am, the document is marked confidential, and we can’t share sender details over the phone. But if you like, we can settle this right now to avoid delay.', modalText: 'They avoid giving real contact details and push to pay immediately.' },
                { speaker: 'Victim', text: 'Hmm… I’m not comfortable sharing my card details over the phone.', modalText: '' },
                { speaker: 'Scammer', text: 'It’s a very small fee, and your parcel is already in transit. You just need to read the card number and expiry date, and I’ll process it securely.', modalText: 'They downplay the risk to convince the victim.' },
                { speaker: 'Victim', text: 'No, I think I’ll call my bank directly first. Thank you.', modalText: '' },
                { speaker: 'Scammer', text: 'Ma’am, please understand, if we hang up now, the parcel could get canceled automatically.', modalText: '' },
                { speaker: 'Victim', text: 'I’m sorry, I don’t feel safe. Goodbye.', modalText: '' },
                { speaker: 'Scammer', text: '*click*', modalText: 'Scammer usually hangs up when victim refuses.' }
            ]
            ,
            hi: [
                { speaker: 'Scammer', text: 'नमस्ते! क्या मैं मिस डेविस से बात कर रहा हूँ?', modalText: '' },
                { speaker: 'Victim', text: 'हाँ, मैं डेविस बोल रही हूँ। आप कौन?', modalText: '' },
                { speaker: 'Scammer', text: 'मैडम, मैं मार्क बोल रहा हूँ नेशनल कूरियर सर्विस से। हम कल से आपका एक ज़रूरी पार्सल डिलीवर करने की कोशिश कर रहे हैं।', modalText: 'ठग अक्सर आम नाम और विनम्र भाषा का इस्तेमाल करते हैं।' },
                { speaker: 'Victim', text: 'ओह? मुझे तो याद नहीं कि मैंने कुछ मंगवाया है।', modalText: '' },
                { speaker: 'Scammer', text: 'ये असल में आपके बैंक द्वारा भेजा गया एक आधिकारिक दस्तावेज़ है। लेकिन पते में थोड़ी गड़बड़ है। कृपया पूरा पता बता सकती हैं?', modalText: '“आधिकारिक दस्तावेज़” जैसे शब्द भरोसा बनाने के लिए बोले जाते हैं।' },
                { speaker: 'Victim', text: 'ठीक है… मेरा पता है 42 एल्म स्ट्रीट, ग्रीनफील्ड।', modalText: '' },
                { speaker: 'Scammer', text: 'बहुत धन्यवाद, मैडम। साथ ही, सुरक्षा के लिए जन्मतिथि और अकाउंट नंबर के आखिरी चार अंक भी बता दें।', modalText: 'पहले हल्की जानकारी मांगकर भरोसा जीतते हैं।' },
                { speaker: 'Victim', text: 'मेरा जन्म 12 मई 1980 को हुआ था और आखिरी चार अंक 4821 हैं।', modalText: '' },
                { speaker: 'Scammer', text: 'धन्यवाद! एक मिनट… जी, यहाँ लिखा है कि पार्सल रिलीज़ करने से पहले $25 की वेरिफिकेशन फीस देनी होगी।', modalText: 'भरोसा बनने के बाद फीस की मांग करते हैं।' },
                { speaker: 'Victim', text: 'क्या? मैं क्यों दूँ किसी ऐसी चीज़ के लिए जो मैंने मंगवाई ही नहीं?', modalText: '' },
                { speaker: 'Scammer', text: 'मैं आपकी बात समझता हूँ, मैडम। पर ये चार्ज सीधे आपके बैंक की ओर से है। आज नहीं दिया तो पार्सल रिटर्न हो जाएगा और अकाउंट में दिक्कत आ सकती है।', modalText: '“अकाउंट की दिक्कत” कहकर डराते हैं।' },
                { speaker: 'Victim', text: 'मुझे बैंक का नंबर दें, मैं खुद कन्फर्म करना चाहती हूँ।', modalText: '' },
                { speaker: 'Scammer', text: 'माफ़ कीजिए, ये दस्तावेज़ कॉन्फिडेंशियल है, इसलिए हम नंबर नहीं दे सकते। चाहें तो अभी पेमेंट कर सकती हैं, देर नहीं होगी।', modalText: 'असली नंबर देने से बचते हैं, तुरंत पेमेंट के लिए दबाव डालते हैं।' },
                { speaker: 'Victim', text: 'मुझे फोन पर कार्ड डिटेल्स देना ठीक नहीं लग रहा।', modalText: '' },
                { speaker: 'Scammer', text: 'मैडम, सिर्फ छोटी सी फीस है और पार्सल पहले से रास्ते में है। बस कार्ड नंबर और एक्सपायरी बता दें, मैं सेफली प्रोसेस कर दूँगा।', modalText: 'जोखिम को छोटा बताकर मनाने की कोशिश।' },
                { speaker: 'Victim', text: 'नहीं, मैं पहले अपने बैंक से पूछूँगी। धन्यवाद।', modalText: '' },
                { speaker: 'Scammer', text: 'मैडम, अगर अभी कॉल कट गई तो पार्सल कैंसिल हो सकता है…', modalText: '' },
                { speaker: 'Victim', text: 'मुझे सुरक्षित नहीं लग रहा, अलविदा।', modalText: '' },
                { speaker: 'Scammer', text: '*क्लिक*', modalText: 'इनकार के बाद अक्सर कॉल काट देते हैं।' }
            ]
            ,
            pa: [
                { speaker: 'Scammer', text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਕੀ ਮੈਂ ਮਿਸ ਡੇਵਿਸ ਨਾਲ ਗੱਲ ਕਰ ਰਿਹਾ ਹਾਂ?', modalText: '' },
                { speaker: 'Victim', text: 'ਹਾਂ, ਮੈਂ ਡੇਵਿਸ ਬੋਲ ਰਹੀ ਹਾਂ। ਤੁਸੀਂ ਕੌਣ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਮੈਡਮ, ਮੈਂ ਮਾਰਕ ਬੋਲ ਰਿਹਾ ਹਾਂ ਨੈਸ਼ਨਲ ਕੂਰੀਅਰ ਸਰਵਿਸ ਤੋਂ। ਅਸੀਂ ਕੱਲ੍ਹ ਤੋਂ ਤੁਹਾਡਾ ਇੱਕ ਜ਼ਰੂਰੀ ਪਾਰਸਲ ਪਹੁੰਚਾਉਣ ਦੀ ਕੋਸ਼ਿਸ਼ ਕਰ ਰਹੇ ਹਾਂ।', modalText: 'ਠੱਗ ਅਕਸਰ ਆਮ ਨਾਂ ਵਰਤਦੇ ਹਨ ਤਾਕਿ ਸਹੀ ਲੱਗਣ।' },
                { speaker: 'Victim', text: 'ਓਹ? ਮੈਨੂੰ ਤਾਂ ਯਾਦ ਨਹੀਂ ਕਿ ਮੈਂ ਕੁਝ ਮੰਗਵਾਇਆ ਸੀ।', modalText: '' },
                { speaker: 'Scammer', text: 'ਇਹ ਤੁਹਾਡੇ ਬੈਂਕ ਵੱਲੋਂ ਭੇਜੇ ਗਏ ਦਸਤਾਵੇਜ਼ ਹਨ। ਪਰ ਪਤੇ ਵਿੱਚ ਗੜਬੜ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਪੂਰਾ ਪਤਾ ਦੱਸ ਦਿਓ।', modalText: '“ਦਸਤਾਵੇਜ਼” ਵਰਗੇ ਸ਼ਬਦ ਨਾਲ ਭਰੋਸਾ ਬਣਾਉਂਦੇ ਹਨ।' },
                { speaker: 'Victim', text: 'ਠੀਕ ਹੈ… 42 ਐਲਮ ਸਟ੍ਰੀਟ, ਗ੍ਰੀਨਫੀਲਡ।', modalText: '' },
                { speaker: 'Scammer', text: 'ਧੰਨਵਾਦ, ਮੈਡਮ। ਸੁਰੱਖਿਆ ਲਈ ਜਨਮ ਤਾਰੀਖ ਅਤੇ ਅਕਾਊਂਟ ਨੰਬਰ ਦੇ ਆਖਰੀ ਚਾਰ ਅੰਕ ਵੀ ਦੱਸ ਦਿਓ।', modalText: 'ਪਹਿਲਾਂ ਹੌਲੀ-ਹੌਲੀ ਜਾਣਕਾਰੀ ਲੈਂਦੇ ਹਨ।' },
                { speaker: 'Victim', text: '12 ਮਈ 1980, ਅਤੇ ਆਖਰੀ ਚਾਰ ਅੰਕ 4821 ਹਨ।', modalText: '' },
                { speaker: 'Scammer', text: 'ਧੰਨਵਾਦ! ਹੁਣ ਦੇਖ ਰਿਹਾ ਹਾਂ ਕਿ ਪਾਰਸਲ ਛੱਡਣ ਤੋਂ ਪਹਿਲਾਂ $25 ਦੀ ਵਰਿਫਿਕੇਸ਼ਨ ਫੀਸ ਹੈ।', modalText: 'ਭਰੋਸਾ ਬਣਾਉਣ ਤੋਂ ਬਾਅਦ ਪੈਸੇ ਮੰਗਦੇ ਹਨ।' },
                { speaker: 'Victim', text: 'ਕਿ? ਮੈਂ ਕਿਉਂ ਦਿਆਂ ਜੋ ਮੈਂ ਮੰਗਵਾਇਆ ਹੀ ਨਹੀਂ?', modalText: '' },
                { speaker: 'Scammer', text: 'ਮੈਂ ਸਮਝਦਾ ਹਾਂ, ਮੈਡਮ। ਪਰ ਇਹ ਫੀਸ ਤੁਹਾਡੇ ਬੈਂਕ ਵੱਲੋਂ ਹੈ। ਅੱਜ ਨਾ ਦਿੱਤੀ ਤਾਂ ਪਾਰਸਲ ਰਿੱਟਰਨ ਹੋ ਸਕਦਾ ਹੈ ਅਤੇ ਅਕਾਊਂਟ ਵਿੱਚ ਸਮੱਸਿਆ ਆ ਸਕਦੀ ਹੈ।', modalText: '“ਅਕਾਊਂਟ ਸਮੱਸਿਆ” ਦਾ ਡਰ ਦਿਖਾ ਕੇ ਦਬਾਅ ਬਣਾਉਂਦੇ ਹਨ।' },
                { speaker: 'Victim', text: 'ਮੈਨੂੰ ਬੈਂਕ ਦਾ ਨੰਬਰ ਦਿਓ, ਮੈਂ ਪਹਿਲਾਂ ਪੁੱਛ ਲਵਾਂਗੀ।', modalText: '' },
                { speaker: 'Scammer', text: 'ਮਾਫ਼ ਕਰਨਾ, ਇਹ ਦਸਤਾਵੇਜ਼ ਗੁਪਤ ਹਨ, ਅਸੀਂ ਨੰਬਰ ਨਹੀਂ ਦੇ ਸਕਦੇ। ਪਰ ਤੁਸੀਂ ਹੁਣੇ ਹੀ ਫੀਸ ਦੇ ਦਿਓ ਤਾਂ ਦੇਰੀ ਨਹੀਂ ਹੋਏਗੀ।', modalText: 'ਅਸਲ ਨੰਬਰ ਨਹੀਂ ਦਿੰਦੇ, ਤੁਰੰਤ ਪੈਸੇ ਲਈ ਦਬਾਅ।' },
                { speaker: 'Victim', text: 'ਮੈਨੂੰ ਫੋਨ ਤੇ ਕਾਰਡ ਡੀਟੇਲਸ ਦੇਣਾ ਠੀਕ ਨਹੀਂ ਲੱਗਦਾ।', modalText: '' },
                { speaker: 'Scammer', text: 'ਮੈਡਮ, ਬਹੁਤ ਛੋਟੀ ਫੀਸ ਹੈ ਤੇ ਪਾਰਸਲ ਰਸਤੇ ਵਿੱਚ ਹੈ। ਸਿਰਫ ਕਾਰਡ ਨੰਬਰ ਤੇ ਮਿਆਦ ਦੱਸ ਦਿਓ।', modalText: 'ਖਤਰੇ ਨੂੰ ਛੋਟਾ ਦੱਸ ਕੇ ਮਨਾਉਂਦੇ ਹਨ।' },
                { speaker: 'Victim', text: 'ਨਹੀਂ, ਮੈਂ ਪਹਿਲਾਂ ਆਪਣੇ ਬੈਂਕ ਨਾਲ ਗੱਲ ਕਰਾਂਗੀ। ਧੰਨਵਾਦ।', modalText: '' },
                { speaker: 'Scammer', text: 'ਮੈਡਮ, ਹੁਣੇ ਫੋਨ ਕੱਟਿਆ ਤਾਂ ਪਾਰਸਲ ਕੈਂਸਲ ਹੋ ਸਕਦਾ ਹੈ…', modalText: '' },
                { speaker: 'Victim', text: 'ਮੈਨੂੰ ਸੁਰੱਖਿਆ ਨਹੀਂ ਲੱਗ ਰਿਹਾ, ਅਲਵਿਦਾ।', modalText: '' },
                { speaker: 'Scammer', text: '*ਕਲਿਕ*', modalText: 'ਜਦੋਂ ਸ਼ਿਕਾਰ ਇਨਕਾਰ ਕਰੇ ਤਾਂ ਕਾਲ ਕੱਟ ਦਿੰਦੇ ਹਨ।' }
            ]

        }
    ];

export default dialoguesByStories;