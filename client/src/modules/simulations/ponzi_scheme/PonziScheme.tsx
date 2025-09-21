import ModalWrapper from "@/src/components/modal/ModalWrapper";
import TtsManager from "@/src/services/texttospeech/TtsManager";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import narrationStyles from "./narrationStyles";
import styles from "./useStyles";
import { useTranslation } from "react-i18next";

const MULTIPLIER = 1.5;
const INVEST_AMOUNT = 100;
const SCREEN_WIDTH = Dimensions.get("window").width;
const COLLAPSE_AFTER = 6;

type Investor = {
  status: string;
  id: number;
  invested: number;
  expected: number;
  earned: number;
  animValue: Animated.Value;
};
const joinPhrases = {
  en: [
    (id: number, invested: number, expected: number) =>
      `Investor ${id} jumps in with $${invested}, hoping to turn it into $${expected}.`,
    (id: number, invested: number, expected: number) =>
      `Here comes Investor ${id}, adding $${invested}. They're promised $${expected} back.`,
    (id: number, invested: number, expected: number) =>
      `Investor ${id} decides to trust the scheme, putting in $${invested} for a shot at $${expected}.`,
    (id: number, invested: number, expected: number) =>
      `Investor ${id} quietly invests $${invested}. The promised return is $${expected}.`,
  ],
  hi: [
    (id: number, invested: number, expected: number) =>
      `निवेशक ${id} $${invested} के साथ कूदता है, $${expected} में बदलने की उम्मीद में।`,
    (id: number, invested: number, expected: number) =>
      `यहाँ निवेशक ${id} आता है, $${invested} जोड़ रहा है। उन्हें $${expected} वापस मिलने का वादा किया गया है।`,
    (id: number, invested: number, expected: number) =>
      `निवेशक ${id} योजना पर भरोसा करने का फैसला करता है, $${expected} का मौका पाने के लिए $${invested} लगा रहा है।`,
    (id: number, invested: number, expected: number) =>
      `निवेशक ${id} चुपचाप $${invested} का निवेश करता है। वादा किया गया रिटर्न $${expected} है।`,
  ],
  pa: [
    (id: number, invested: number, expected: number) =>
      `ਨਿਵੇਸ਼ਕ ${id} $${invested} ਨਾਲ ਕੁਦਦਾ ਹੈ, $${expected} ਵਿੱਚ ਬਦਲਣ ਦੀ ਉਮੀਦ ਵਿੱਚ।`,
    (id: number, invested: number, expected: number) =>
      `ਇੱਥੇ ਨਿਵੇਸ਼ਕ ${id} ਆਉਂਦਾ ਹੈ, $${invested} ਜੋੜ ਰਿਹਾ ਹੈ। ਉਨ੍ਹਾਂ ਨੂੰ $${expected} ਵਾਪਸ ਮਿਲਣ ਦਾ ਵਾਅਦਾ ਕੀਤਾ ਗਿਆ ਹੈ।`,
    (id: number, invested: number, expected: number) =>
      `ਨਿਵੇਸ਼ਕ ${id} ਯੋਜਨਾ 'ਤੇ ਭਰੋਸਾ ਕਰਨ ਦਾ ਫੈਸਲਾ ਕਰਦਾ ਹੈ, $${expected} ਦਾ ਮੌਕਾ ਪਾਉਣ ਲਈ $${invested} ਲਗਾ ਰਿਹਾ ਹੈ।`,
    (id: number, invested: number, expected: number) =>
      `ਨਿਵੇਸ਼ਕ ${id} ਚੁੱਪਚਾਪ $${invested} ਦਾ ਨਿਵੇਸ਼ ਕਰਦਾ ਹੈ। ਵਾਅਦਾ ਕੀਤੀ ਗਈ ਵਾਪਸੀ $${expected} ਹੈ।`,
  ]
};

const payoutPhrases = {
  en: [
    (ids: number[]) =>
      `Good news for ${ids.length > 1 ? "investors" : "investor"} ${ids.join(" and ")} — they've been paid out.`,
    (ids: number[]) =>
      `The scheme manages to reward ${ids.join(", ")} for now; they leave with their gains.`,
    (ids: number[]) =>
      `Investors ${ids.join(" and ")} just received their promised returns and exited the scheme.`,
  ],
  hi: [
    (ids: number[]) =>
      `${ids.length > 1 ? "निवेशकों" : "निवेशक"} ${ids.join(" और ")} के लिए अच्छी खबर — उन्हें भुगतान किया गया है।`,
    (ids: number[]) =>
      `योजना अभी के लिए ${ids.join(", ")} को इनाम देने में कामयाब रहती है; वे अपने लाभ के साथ निकल जाते हैं।`,
    (ids: number[]) =>
      `निवेशक ${ids.join(" और ")} को अभी-अभी उनका वादा किया गया रिटर्न मिला है और योजना से बाहर निकल गए हैं।`,
  ],
  pa: [
    (ids: number[]) =>
      `${ids.length > 1 ? "ਨਿਵੇਸ਼ਕਾਂ" : "ਨਿਵੇਸ਼ਕ"} ${ids.join(" ਅਤੇ ")} ਲਈ ਚੰਗੀ ਖ਼ਬਰ — ਉਨ੍ਹਾਂ ਨੂੰ ਭੁਗਤਾਨ ਕੀਤਾ ਗਿਆ ਹੈ।`,
    (ids: number[]) =>
      `ਯੋਜਨਾ ਹੁਣ ਲਈ ${ids.join(", ")} ਨੂੰ ਇਨਾਮ ਦੇਣ ਵਿੱਚ ਕਾਮਯਾਬ ਰਹਿੰਦੀ ਹੈ; ਉਹ ਆਪਣੇ ਫਾਇਦੇ ਨਾਲ ਨਿਕਲ ਜਾਂਦੇ ਹਨ।`,
    (ids: number[]) =>
      `ਨਿਵੇਸ਼ਕ ${ids.join(" ਅਤੇ ")} ਨੇ ਹੁਣੇ ਆਪਣਾ ਵਾਅਦਾ ਕੀਤਾ ਗਿਆ ਰਿਟਰਨ ਪ੍ਰਾਪਤ ਕੀਤਾ ਹੈ ਅਤੇ ਯੋਜਨਾ ਤੋਂ ਬਾਹਰ ਨਿਕਲ ਗਏ ਹਨ।`,
  ]
};

const collapsePhrases = {
  en: [
    (count: number) =>
      `The scheme collapses with ${count} participants unable to be paid. This is the danger of a Ponzi — it cannot scale forever.`,
    (count: number) =>
      `Collapse! ${count} investors lost everything when the money ran out.`,
  ],
  hi: [
    (count: number) =>
      `योजना ${count} प्रतिभागियों के साथ विफल हो जाती है जिनका भुगतान नहीं किया जा सका। यह पोंजी का खतरा है — यह हमेशा के लिए नहीं चल सकता।`,
    (count: number) =>
      `पतन! ${count} निवेशकों ने सब कुछ खो दिया जब पैसा खत्म हो गया।`,
  ],
  pa: [
    (count: number) =>
      `ਯੋਜਨਾ ${count} ਪ੍ਰਤੀਭਾਗੀਆਂ ਨਾਲ ਡਿੱਗ ਪੈਂਦੀ ਹੈ ਜਿਨ੍ਹਾਂ ਦਾ ਭੁਗਤਾਨ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਦਾ। ਇਹ ਪੋਂਜੀ ਦਾ ਖਤਰਾ ਹੈ — ਇਹ ਹਮੇਸ਼ਾ ਲਈ ਨਹੀਂ ਚੱਲ ਸਕਦਾ।`,
    (count: number) =>
      `ਡਿੱਗਣਾ! ${count} ਨਿਵੇਸ਼ਕਾਂ ਨੇ ਸਭ ਕੁਝ ਗੁਆ ਦਿੱਤਾ ਜਦੋਂ ਪੈਸਾ ਖਤਮ ਹੋ ਗਿਆ।`,
  ]
};

export default function PonziSimulation({onCloseModal}:{onCloseModal:()=>void}) {
  // State
  const [bucket, setBucket] = useState(0);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const { i18n,t } = useTranslation();
  const locale = i18n.language as "en" | "hi" | "pa";
  // UI / narration
  const [showIntroModal, setShowIntroModal] = useState(true); // intro modal (Start)
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentNarration, setCurrentNarration] = useState("");
  const [lastAction, setLastAction] = useState("");

  // animations
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const bucketAnim = useRef(new Animated.Value(0)).current;

  // refs for stable reads inside timers
  const investorsRef = useRef(investors);
  const listRef = useRef<FlatList<any>>(null);
  const bucketRef = useRef(bucket);
  const collapsedRef = useRef(collapsed);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const processingRef = useRef(false);


  useEffect(() => {
    if (investors.length > 0) {
      setTimeout(() => {
        listRef.current?.scrollToEnd({ animated: true });
      }, 300); // small delay so animations settle
    }
  }, [investors]);

  // keep refs updated
  useEffect(() => {
    investorsRef.current = investors;
    bucketRef.current = bucket;
    collapsedRef.current = collapsed;
  }, [investors, bucket, collapsed]);

  // initialize TTS
  useEffect(() => {
    const initTts = async () => {
      try {
        await TtsManager.setLanguage("en");
        await TtsManager.setSpeechRate(0.9);
      } catch (err) {
        console.warn("TTS init error:", err);
      }
    };
    initTts();

    return () => {
      try {
        TtsManager.stop?.();
      } catch { }
    };
  }, []);

  // pulse animation while speaking
  const speakingLoopRef = useRef<Animated.CompositeAnimation | null>(null);
  useEffect(() => {
    if (isSpeaking) {
      // start looped pulsing
      speakingLoopRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.12,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      speakingLoopRef.current.start();
    } else {
      // stop and reset
      if (speakingLoopRef.current) {
        speakingLoopRef.current.stop();
        speakingLoopRef.current = null;
      }
      pulseAnim.setValue(1);
    }
  }, [isSpeaking, pulseAnim]);

  // helper speak that shows text in modal and handles onDone
  const speak = async (text: string) => {
    // stop any current speech and replace with this
    if (isSpeaking) {
      try {
        await TtsManager.stop();
      } catch { }
    }

    setIsSpeaking(true);
    setCurrentNarration(text);

    return new Promise<void>((resolve) => {
      const onDone = () => {
        setIsSpeaking(false);
        setCurrentNarration("");
        try {
          TtsManager.removeOnDone?.(onDone);
        } catch { }
        resolve();
      };

      try {
        TtsManager.onDone(onDone);
        TtsManager.speak(text).catch(() => onDone());
      } catch {
        onDone();
      }
    });
  };

  // Intro narration (game-host style). We play this when the intro modal opens.
  useEffect(() => {
    const introTexts = {
  en: "Welcome to the Ponzi Scheme Simulation! Here you'll see how a promise of big returns relies on new money pouring in. Watch closely — some players win early, but the game always ends the same way: collapse. So Lets start",
  hi: "पोंजी योजना सिमुलेशन में आपका स्वागत है! यहां आप देखेंगे कि बड़े रिटर्न का वादा नए पैसे के आने पर कैसे निर्भर करता है। बारीकी से देखें - कुछ खिलाड़ी जल्दी जीतते हैं, लेकिन खेल हमेशा एक ही तरीके से समाप्त होता है: पतन। तो चलिए शुरू करते हैं",
  pa: "ਪੋਂਜੀ ਯੋਜਨਾ ਸਿਮੂਲੇਸ਼ਨ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ! ਇੱਥੇ ਤੁਸੀਂ ਦੇਖੋਗੇ ਕਿ ਵੱਡੇ ਰਿਟਰਨ ਦਾ ਵਾਅਦਾ ਨਵੇਂ ਪੈਸੇ ਦੇ ਆਉਣ 'ਤੇ ਕਿਵੇਂ ਨਿਰਭਰ ਕਰਦਾ ਹੈ। ਧਿਆਨ ਨਾਲ ਦੇਖੋ - ਕੁਝ ਖਿਡਾਰੀ ਜਲਦੀ ਜਿੱਤਦੇ ਹਨ, ਪਰ ਖੇਡ ਹਮੇਸ਼ਾ ਇੱਕ ਹੀ ਤਰੀਕੇ ਨਾਲ ਖਤਮ ਹੁੰਦੀ ਹੈ: ਪਤਨ। ਤੋਂ ਆਓ ਸ਼ੁਰੂ ਕਰੀਏ"
};

// Usage in your component:
// const introText = introTexts[LANGUAGE];
    if (showIntroModal) {
      // Play intro but keep modal visible until user presses Start
      (async () => {
        await speak(introTexts[locale]);

        startSimulation();
        // after intro finishes we keep the modal open so user can press Start
      })();

    }

    // only trigger when modal becomes visible
  }, [showIntroModal]);



  useEffect(() => {
    if (!showIntroModal) {
    }

  }, [showIntroModal])

  useEffect(() => {
    if (showIntroModal) return;
    bucketAnim.setValue(0);
    Animated.timing(bucketAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [bucket, showIntroModal, bucketAnim]);

  const ensureIntervalRunning = () => {
    if (intervalRef.current || showIntroModal || collapsedRef.current) return;
    intervalRef.current = setInterval(() => {
      if (!processingRef.current) addInvestor();
    }, 4000);
  };

  useEffect(() => {
    if (!showIntroModal && !collapsed) {
      ensureIntervalRunning();
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [showIntroModal, collapsed]);

  const addInvestor = async () => {
    if (processingRef.current) return;
    processingRef.current = true;

    try {
      if (investorsRef.current.length >= COLLAPSE_AFTER) {
        setCollapsed(true);
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();

        const remaining = investorsRef.current.length - investorsRef.current.filter((inv) => inv.status === "Dropped Out").length;
        const collapseText = collapsePhrases[locale][Math.floor(Math.random() * collapsePhrases[locale].length)](remaining);
        await speak(collapseText);
        return;
      }

      const newInvestor: Investor = {
        id: investorsRef.current.length + 1,
        invested: INVEST_AMOUNT,
        expected: Math.round(INVEST_AMOUNT * MULTIPLIER),
        earned: 0,
        status: "Active",
        animValue: new Animated.Value(0),
      };

      let updatedBucket = bucketRef.current + newInvestor.invested;
      let updatedInvestors = [...investorsRef.current, newInvestor];

      const joinText = joinPhrases[locale][Math.floor(Math.random() * joinPhrases[locale].length)](
        newInvestor.id,
        newInvestor.invested,
        newInvestor.expected
      );

      const paidInvestors: number[] = [];
      if (updatedInvestors.length < COLLAPSE_AFTER) {
        updatedInvestors = updatedInvestors.map((inv, idx, arr) => {
          const isNewest = idx === arr.length - 1;
          if (!isNewest && inv.status === "Active" && updatedBucket >= inv.expected) {
            updatedBucket -= inv.expected;
            paidInvestors.push(inv.id);
            return { ...inv, earned: inv.expected, status: "Dropped Out" };
          }
          return inv;
        });
      }

      if (paidInvestors.length > 0) {
        const payoutText = payoutPhrases[locale][Math.floor(Math.random() * payoutPhrases[locale].length)](paidInvestors);
        await speak(payoutText);
      }

      // update state
      setBucket(updatedBucket);
      setInvestors(updatedInvestors);
      

      // animate new investor card in
      Animated.timing(newInvestor.animValue, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }).start();

      
      await speak(joinText);

      setLastAction(
        paidInvestors.length > 0
          ? `${t("Investor")} ${newInvestor.id} ${t("joined. Investors")} ${paidInvestors.join(", ")} ${t("were paid out.")}`
          : `${t("Investor")} ${newInvestor.id} ${t("joined the scheme.")}`
      );
    } finally {
      processingRef.current = false;
    }
  };

  // render investor card
  const renderInvestor = ({ item }: { item: Investor }) => {
    const progress = item.earned / item.expected;
    const translateX = item.animValue.interpolate({ inputRange: [0, 1], outputRange: [SCREEN_WIDTH, 0] });
    const opacity = item.animValue.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

    return (
      <Animated.View
        style={[
          styles.card,
          item.status === "Dropped Out" ? styles.exitedCard : styles.activeCard,
          { opacity, transform: [{ translateX }] },
        ]}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.investorName}>👤 {t("Investor")} #{item.id}</Text>
          <View style={[styles.statusBadge, item.status === "Dropped Out" ? styles.exitedBadge : styles.activeBadge]}>
            <Text style={styles.statusBadgeText}>{item.status === "Active" ? t("ACTIVE") : t("EXITED")}</Text>
          </View>
        </View>

        <View style={styles.investmentInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>{t("Invested")}</Text>
            <Text style={styles.infoValue}>${item.invested}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>{t("Expected")}</Text>
            <Text style={styles.infoValue}>${item.expected}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoValue, item.earned > 0 ? styles.positiveValue : styles.zeroValue]}>${item.earned}</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>{t("Progress")}</Text>
            <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
          </View>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: `${Math.min(progress * 100, 100)}%`,
                  backgroundColor: progress >= 1 ? "#10b981" : "#f59e0b",
                },
              ]}
            />
          </View>
        </View>
      </Animated.View>
    );
  };

  // Start simulation after user hits Start (hide intro modal)
  const startSimulation = () => {
    setShowIntroModal(false);
    // add first investor and begin interval
    setTimeout(() => {
      addInvestor();
      ensureIntervalRunning();
    }, 400); // small delay for modal closing animation
  };

  // Restart the simulation
  const restartSimulation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setBucket(0);
    setInvestors([]);
    setCollapsed(false);
    setLastAction("");
    setShowIntroModal(true);
  };

  // bucket scale for UI
  const bucketScale = bucketAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] });

  return (
    <View style={styles.container}>
      {/* Intro Modal */}
      <Modal visible={showIntroModal} transparent animationType="fade">
        <View style={narrationStyles.overlay}>
          <View style={narrationStyles.container}>
            <Text style={narrationStyles.title}>Ponzi Scheme Simulation</Text>
            <View style={narrationStyles.content}>
              <Text style={narrationStyles.text}>
                {t("Imagine being promised quick, guaranteed profits. Sounds great — until the cash runs out. This simulation will show how new investors keep the scheme alive and how payouts are actually funded. Ready to see it unfold?")}
              </Text>
            </View>
            <View style={narrationStyles.controls}>
              <TouchableOpacity style={[narrationStyles.button, narrationStyles.primaryButton]} onPress={startSimulation}>
                <Text style={narrationStyles.buttonText}>🎮 Start Simulation</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>💰 {t("Ponzi Scheme Simulation")}</Text>
        <Text style={styles.subtitle}>{t("Live narration of each step")}</Text>
        {/* <TouchableOpacity style={narrationStyles.floatingButton} onPress={() => TtsManager.stop()}>
          <Ionicons name="volume-mute" size={20} color="#fff" />
        </TouchableOpacity> */}
      </View>

      {/* Bucket card */}
      <Animated.View style={[styles.bucketCard, { transform: [{ scale: collapsed ? pulseAnim : bucketScale }] }]}>
        <View style={styles.bucketIcon}>
          <Text style={styles.bucketIconText}>💰</Text>
        </View>
        <View style={styles.bucketInfo}>
          <Text style={styles.bucketLabel}>{t("TOTAL FUNDS")}</Text>
          <Text style={styles.bucketValue}>${bucket}</Text>
        </View>
      </Animated.View>

      {lastAction ? (
        <View style={narrationStyles.statusBar}>
          <Text style={narrationStyles.statusText}>{lastAction}</Text>
        </View>
      ) : null}

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{investors.length}</Text>
          <Text style={styles.statLabel}>{t("Total Investors")}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{investors.filter((inv) => inv.status === "Dropped Out").length}</Text>
          <Text style={styles.statLabel}>{t("Exited")}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{investors.filter((inv) => inv.status === "Active").length}</Text>
          <Text style={styles.statLabel}>{t("Active")}</Text>
        </View>
      </View>

      {/* Collapsed view */}
      {collapsed ? (
        <Animated.View style={[styles.collapseContainer, { transform: [{ scale: pulseAnim }] }]}>
          <Text style={styles.collapseIcon}>🚨</Text>
          <Text style={styles.collapseTitle}>{t("Scheme Collapsed!")}</Text>
          <Text style={styles.collapseText}>
            {t("The scheme could no longer pay out investors.")} {investors.length - investors.filter((inv) => inv.status === "Dropped Out").length} {t("participants lost everything.")}
          </Text>

          <TouchableOpacity style={narrationStyles.button} onPress={restartSimulation}>
            <Text style={narrationStyles.buttonText}>{t("Restart Simulation")}</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <FlatList
          data={investors}
          ref={listRef}
          renderItem={renderInvestor}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* In-game narration modal (live subtitles) */}
      {/* <ModalWrapper visible={isSpeaking} onClose={() => {}} backdropColor="transparent">
        <View style={narrationStyles.overlay}>
          <Animated.View style={[narrationStyles.narrationBox, { transform: [{ scale: pulseAnim }] }]}>
            <Text style={narrationStyles.narrationIcon}>💬</Text>
            <Text style={narrationStyles.narrationText}>{currentNarration}</Text>
          </Animated.View>
        </View>
      </ModalWrapper> */}
    </View>
  );
}
