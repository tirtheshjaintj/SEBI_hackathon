import SectionTitleHeader from "@/src/components/Headers/SectionTitleHeader";
import Colors from "@/src/theme/colors";
import {
  normalize,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { router } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import GridCard from "./GridCard";
import Slider from "./Slider";
import TopWidget from "./TopWidget";
import WidgetCard from "./WidgetCard";

const imagesHindi = [
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1752407775/An_Initiative_By_PSB_3_dgs5h9.png",
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1752409217/An_Initiative_By_PSB_6_vpavjs.png",
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1752410213/An_Initiative_By_PSB_9_hn78iy.png",
];

const imagesEng = [
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1752407775/An_Initiative_By_PSB_1_qasdl7.png",
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1752409217/An_Initiative_By_PSB_5_cotkaz.png",
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1752410213/An_Initiative_By_PSB_8_ctybrp.png",
];
const imagesPunjabi = [
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1752409217/An_Initiative_By_PSB_7_ycdfg4.png",
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1752407776/An_Initiative_By_PSB_4_giuwpj.png",
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1752410213/An_Initiative_By_PSB_10_khmtkm.png",
];

const MainSection = ({ data }: any) => {
  const { t, i18n } = useTranslation();
  const getImages = () => {
    const locale = i18n.language;
    switch (locale) {
      case "hi":
        return imagesHindi;
      case "pa":
        return imagesPunjabi;
      default:
        return imagesEng;
    }
  };

  return (
    <View style={styles.main}>
      <TopWidget data={data} />

      <View style={styles.container}>
        <View style={{ paddingHorizontal: normalize(20) }}>
          <SectionTitleHeader
            title={t("Quick Tools")}
            underlineHeight={1}
            border={true}
          />
        </View>
        <View style={styles.grid}>
          <WidgetCard
            img={{
              uri: "https://play-lh.googleusercontent.com/SiqpaEdvPFJqW-_puIkyu7w89xLFRuUHb6ZUZEaulu0lSKWssTHp3FW2IG5wDnepBw=w240-h480-rw",
            }}
            label={t("Calculators")}
            onPress={() => {
              router.push("/calculators/all");
            }}
          />
          <WidgetCard
            img={{
              uri: "https://www.truecaller.com/cms/b79633e5-eb38-4108-9821-d3186cd72c4d_enjoy_being_spam-free.svg",
            }}
            label={t("Report Fraud")}
            onPress={() => {
              router.push("/calllogs");
            }}
          />

          <WidgetCard
            img={{
              uri: "https://cdn-icons-png.flaticon.com/512/1803/1803210.png",
            }}
            label={t("Detect Fraud")}
            onPress={() => {
              router.push("/spamdetect");
            }}
          />
          <WidgetCard
            img={{
              uri: "https://www.svgrepo.com/show/168456/goal.svg",
            }}
            label={t("My Goals")}
            onPress={() => {
              router.push("/goals");
            }}
          />
        </View>

        {/* SLIDER/BANNER */}
        <View style={styles.slider}>
          <Slider
            style={{
              overflow: "hidden",
              borderRadius: scale(10),
              backgroundColor: Colors.white,
              borderWidth: 1,
              borderColor: Colors.divider,
              // padding: 2,
              boxShadow: "2px 2px 20px rgba(226, 226, 226, 0.5)",
            }}
            imageStyle={{ overflow: "hidden" }}
            images={getImages()}
          />
        </View>

        <View style={{ paddingHorizontal: normalize(20) }}>
          <SectionTitleHeader
            title={t("General Categories")}
            underlineHeight={1}
            border={true}
          />
        </View>
        <View style={styles.grid}>
          <GridCard
            imageSrc={{
              uri: "https://img.freepik.com/free-vector/hacker-activity-concept_23-2148533971.jpg?semt=ais_hybrid&w=740",
            }}
            label={t("Cyber Security")}
            onPress={() => {
              router.push("/cyber_secuirity/cyber_secuirity");
            }}
          />
          <GridCard
            imageSrc={{
              uri: "https://cdni.iconscout.com/illustration/premium/thumb/cyber-security-illustration-download-in-svg-png-gif-file-formats--online-protection-access-using-password-personal-accounts-people-lifestyle-pack-miscellaneous-illustrations-4993168.png",
            }}
            label={t("Fraud Prevention")}
            onPress={() => {
              router.push("/fraud_prevention/fraud_prevention");
            }}
          />

          <GridCard
            imageSrc={{
              uri: "https://img.freepik.com/premium-vector/piggy-bank-money-box-with-falling-gold-coins_53562-8910.jpg",
            }}
            label={t("Savings Tips")}
            onPress={() => {
              router.push("/saving_tips/saving_tips");
            }}
          />
        </View>

        <View style={styles.grid}>
          <GridCard
            imageSrc={{
              uri: "https://img.freepik.com/free-vector/indian-rupee-investment-concept_23-2147994654.jpg?semt=ais_hybrid&w=740",
            }}
            label={t("Finance Guides")}
            onPress={() => {
              router.push("/finance_guides/finance_guides");
            }}
          />
          <GridCard
            imageSrc={{
              uri: "https://img.freepik.com/premium-vector/rupee-investment-financial-growth-coin-growth-bar-flat-vector-illustration_667085-103.jpg",
            }}
            label={t("Investments Tips")}
            onPress={() => {
              router.push("/investment_tips/investment_tips");
            }}
          />
          <GridCard
            imageSrc={{
              uri: "https://img.freepik.com/free-vector/indian-digital-rupee-symbol-background-strong-position-financial-market-concept_1017-53787.jpg?semt=ais_hybrid&w=740",
            }}
            label={t("Stocks and Bonds")}
            onPress={() => {
              router.push("/stocks_and_bonds/stocks_and_bonds");
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    // backgroundColor: Colors.bgGreenTint,
    flex: 1,
    gap: verticalScale(24),
    paddingVertical: verticalScale(24),
  },
  desc: {
    fontFamily: "Quicksand-Medium",
    fontSize: 12,
    lineHeight: 18,
    color: Colors.textSecondaryLight,
  },
  container: {
    flex: 1,
    gap: verticalScale(18),
  },
  slider: {
    paddingHorizontal: normalize(16),
    borderRadius: normalize(10),
    overflow: "hidden",
    height: verticalScale(160),
  },
  grid: {
    flex: 1,
    paddingHorizontal: normalize(16),
    flexDirection: "row",
    justifyContent: "space-around",
    gap: normalize(15),
    flexWrap: "wrap",
  },

  section_container: {
    paddingHorizontal: normalize(16),
    flexDirection: "row",
    gap: normalize(16),
    flexWrap: "wrap",
  },

  card: {
    width: "48%",
    height: verticalScale(120),
    aspectRatio: 1,
    borderRadius: normalize(16),
    padding: normalize(10),
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.divider,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 4,
  },
});

export default MainSection;
