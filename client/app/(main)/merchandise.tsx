import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import MerchandiseScreenShimmer from "@/src/modules/merchandise/components/MerchandiseScreenShimmer";
import MerchandiseScreen from "@/src/modules/merchandise/screens/MerchandiseScreen";
import { getAllMerchandise } from "@/src/modules/merchandise/services/merchandise";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Merchandise = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllMerchandise();
      // console.log({ res });
      if (res) {
        setData(res.merchandise);
        setLoading(false);
      }
    } catch (error) { }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  if (!loading) return <MerchandiseScreen data={data} refreshHanlder={getData} />;

  return (
    <AppSafeAreaView style={{ flex: 1 }}>
      <CommonToolbar title={t("Rewards Store")} />
      <MerchandiseScreenShimmer />
    </AppSafeAreaView>
  );
};

export default Merchandise;
