import SectionTitleHeader from "@/src/components/Headers/SectionTitleHeader";
import Colors from "@/src/theme/colors";
import {
  normalize,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Slider from "./Slider";
import TopWidget from "./TopWidget";
import ToolsGrid from "./ToolsGrid";

const imagesHindi = [
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1758474187/An_Initiative_By_PSB_22_guazyb.png",
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1756489468/An_Initiative_By_PSB_15_gnscbe.png",
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1752410213/An_Initiative_By_PSB_9_hn78iy.png",
];

const imagesEng = [
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1758474187/An_Initiative_By_PSB_23_dcgjm6.png",
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1756489468/An_Initiative_By_PSB_14_e3zziu.png",
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1752410213/An_Initiative_By_PSB_8_ctybrp.png",
];
const imagesPunjabi = [
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1758474187/An_Initiative_By_PSB_21_itlxfw.png",
  "https://res.cloudinary.com/duwypp4g5/image/upload/v1756489468/An_Initiative_By_PSB_16_rukrhk.png",
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

      <View style={styles.container}>
        <View style={{ paddingHorizontal: normalize(20) }}>
          <SectionTitleHeader
            title={t("Quick Tools")}
            underlineHeight={1}
            border={true}
          />
        </View>
        {/* <View style={styles.grid}>
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
        </View> */}

        {/* Tools */}
        <ToolsGrid />
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
