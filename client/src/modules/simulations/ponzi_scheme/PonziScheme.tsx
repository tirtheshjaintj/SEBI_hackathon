import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Animated,
  TouchableOpacity,
  Easing,
  Dimensions,
  Modal,
} from "react-native";
import styles from "./useStyles";
import TtsManager from "@/src/services/texttospeech/TtsManager";
import { Ionicons } from "@expo/vector-icons";
import narrationStyles from "./narrationStyles";
import ModalWrapper from "@/src/components/modal/ModalWrapper";

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

// --- Narration phrase pools (variety so steps don't feel repetitive) ---
const joinPhrases = [
  (id: number, invested: number, expected: number) =>
    `Investor ${id} jumps in with $${invested}, hoping to turn it into $${expected}.`,
  (id: number, invested: number, expected: number) =>
    `Here comes Investor ${id}, adding $${invested}. They're promised $${expected} back.`,
  (id: number, invested: number, expected: number) =>
    `Investor ${id} decides to trust the scheme, putting in $${invested} for a shot at $${expected}.`,
  (id: number, invested: number, expected: number) =>
    `Investor ${id} quietly invests $${invested}. The promised return is $${expected}.`,
];

const payoutPhrases = [
  (ids: number[]) =>
    `Good news for ${ids.length > 1 ? "investors" : "investor"} ${ids.join(" and ")} — they've been paid out.`,
  (ids: number[]) =>
    `The scheme manages to reward ${ids.join(", ")} for now; they leave with their gains.`,
  (ids: number[]) =>
    `Investors ${ids.join(" and ")} just received their promised returns and exited the scheme.`,
];

const collapsePhrases = [
  (count: number) =>
    `The scheme collapses with ${count} participants unable to be paid. This is the danger of a Ponzi — it cannot scale forever.`,
  (count: number) =>
    `Collapse! ${count} investors lost everything when the money ran out.`,
];

export default function PonziSimulation() {
  // State
  const [bucket, setBucket] = useState(0);
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [collapsed, setCollapsed] = useState(false);

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
      } catch {}
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
      } catch {}
    }

    setIsSpeaking(true);
    setCurrentNarration(text);

    return new Promise<void>((resolve) => {
      const onDone = () => {
        setIsSpeaking(false);
        setCurrentNarration("");
        try {
          TtsManager.removeOnDone?.(onDone);
        } catch {}
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
    const introText =
      "Welcome to the Ponzi Scheme Simulation! Here you'll see how a promise of big returns relies on new money pouring in. Watch closely — some players win early, but the game always ends the same way: collapse. So Lets start";
    if (showIntroModal) {
      // Play intro but keep modal visible until user presses Start
      (async () => {
        await speak(introText);
        
        startSimulation();
        // after intro finishes we keep the modal open so user can press Start
      })();
      
    }

    // only trigger when modal becomes visible
  }, [showIntroModal]);

  

  useEffect(()=>{
    if(!showIntroModal){
    }

  },[showIntroModal])

  // bucket animation when value changes (snappy scale)
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

  // interval manager
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

  // main logic to add investors (with varied narration)
  const addInvestor = async () => {
    if (processingRef.current) return;
    processingRef.current = true;

    try {
      // force collapse after N investors
      if (investorsRef.current.length >= COLLAPSE_AFTER) {
        setCollapsed(true);
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 0.9, duration: 100, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();

        const remaining = investorsRef.current.length - investorsRef.current.filter((inv) => inv.status === "Dropped Out").length;
        const collapseText = collapsePhrases[Math.floor(Math.random() * collapsePhrases.length)](remaining);
        await speak(collapseText);
        return;
      }

      // create new investor
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

      // narration for join (randomized)
      const joinText = joinPhrases[Math.floor(Math.random() * joinPhrases.length)](
        newInvestor.id,
        newInvestor.invested,
        newInvestor.expected
      );
      await speak(joinText);

      // payout logic (FIFO excluding latest). Only if we have funds
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

      // if any were paid, narrate with varied phrase
      if (paidInvestors.length > 0) {
        const payoutText = payoutPhrases[Math.floor(Math.random() * payoutPhrases.length)](paidInvestors);
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

      setLastAction(
        paidInvestors.length > 0
          ? `Investor ${newInvestor.id} joined. Investors ${paidInvestors.join(", ")} were paid out.`
          : `Investor ${newInvestor.id} joined the scheme.`
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
          <Text style={styles.investorName}>👤 Investor #{item.id}</Text>
          <View style={[styles.statusBadge, item.status === "Dropped Out" ? styles.exitedBadge : styles.activeBadge]}>
            <Text style={styles.statusBadgeText}>{item.status === "Active" ? "ACTIVE" : "EXITED"}</Text>
          </View>
        </View>

        <View style={styles.investmentInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Invested</Text>
            <Text style={styles.infoValue}>${item.invested}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Expected</Text>
            <Text style={styles.infoValue}>${item.expected}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoValue, item.earned > 0 ? styles.positiveValue : styles.zeroValue]}>${item.earned}</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>Progress</Text>
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

    console.log("first")
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
                Imagine being promised quick, guaranteed profits. Sounds great — until the cash runs out. This simulation will
                show how new investors keep the scheme alive and how payouts are actually funded. Ready to see it unfold?
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
        <Text style={styles.title}>💰 Ponzi Scheme Simulation</Text>
        <Text style={styles.subtitle}>Live narration of each step</Text>
        <TouchableOpacity style={narrationStyles.floatingButton} onPress={() => TtsManager.stop()}>
          <Ionicons name="volume-mute" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bucket card */}
      <Animated.View style={[styles.bucketCard, { transform: [{ scale: collapsed ? pulseAnim : bucketScale }] }]}>
        <View style={styles.bucketIcon}>
          <Text style={styles.bucketIconText}>💰</Text>
        </View>
        <View style={styles.bucketInfo}>
          <Text style={styles.bucketLabel}>TOTAL FUNDS</Text>
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
          <Text style={styles.statLabel}>Total Investors</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{investors.filter((inv) => inv.status === "Dropped Out").length}</Text>
          <Text style={styles.statLabel}>Exited</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{investors.filter((inv) => inv.status === "Active").length}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
      </View>

      {/* Collapsed view */}
      {collapsed ? (
        <Animated.View style={[styles.collapseContainer, { transform: [{ scale: pulseAnim }] }]}>
          <Text style={styles.collapseIcon}>🚨</Text>
          <Text style={styles.collapseTitle}>Scheme Collapsed!</Text>
          <Text style={styles.collapseText}>
            The scheme could no longer pay out investors. {investors.length - investors.filter((inv) => inv.status === "Dropped Out").length} participants lost everything.
          </Text>

          <TouchableOpacity style={narrationStyles.button} onPress={restartSimulation}>
            <Text style={narrationStyles.buttonText}>Restart Simulation</Text>
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
      <ModalWrapper visible={isSpeaking} onClose={() => {}} backdropColor="transparent">
        <View style={narrationStyles.overlay}>
          <Animated.View style={[narrationStyles.narrationBox, { transform: [{ scale: pulseAnim }] }]}>
            <Text style={narrationStyles.narrationIcon}>💬</Text>
            <Text style={narrationStyles.narrationText}>{currentNarration}</Text>
          </Animated.View>
        </View>
      </ModalWrapper>
    </View>
  );
}
