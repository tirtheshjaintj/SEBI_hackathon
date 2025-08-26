import AppBottomSheet from "@/src/components/bottomSheet/AppBottomSheet";
import LoaderFullScreen from "@/src/components/loaders/LoaderFullScreen";
import ModalWrapper from "@/src/components/modal/ModalWrapper";
import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import CustomToolbar from "@/src/components/toolBars/mainToolBar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import { HTTP_STATUS_CODES } from "@/src/constants/constant";
import Colors from "@/src/theme/colors";
import {
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { FontAwesome6 } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useCallback } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import AddBudgetModal from "../components/AddBudgetModal";
import BudgetForm from "../components/BudgetForm";
import BalanceSection from "../components/BudgetSection";
import IncomeExpenseCards from "../components/IncomeExpenseCard";
import RecentTransactions from "../components/RecentTransaction";
import SpendFrequencyGraph from "../components/SpendFrequencyGraph";
import { addExpense } from "../services/budget";
 
interface Props {
  data: any;
  fetchData: () => Promise<void>;
}
const BudgetScreen = ({ data, fetchData }: Props) => {
  const [submitLoader, setSubmitLoader] = React.useState(false);
  const [openAddBudgetModal, setOpenAddBudgetModal] = React.useState(false);
  const formRef = React.useRef<any>(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await fetchData().finally(() => setRefreshing(false));
  }, [fetchData]);

  const submitHandler = useCallback(
    async (formValues: any, resetValues: () => void) => {
      try {
        setSubmitLoader(true);
        const { res, status } = (await addExpense(formValues)) as any;
        if (status !== HTTP_STATUS_CODES.CREATED) {
          throw new Error("Something went wrong");
        }
        console.log({ res });
        fetchData();
        resetValues();
        formRef?.current?.close();

        Toast.show({
          type: "success",
          text1: "Spending Added Successfully",
        });
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Unable to Add Budget",
        });
      } finally {
        setSubmitLoader(false);
      }
    },
    []
  );
  console.log(data.expenses);
  return (
    <View style={{ flex: 1 }}>
      {data && (
        <AppLinearGradient
          colors={[
            Colors.primaryCyanColor,
            Colors.gradientCyanSecondary,
            Colors.white,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          locations={[0, 0.2, 0.3]}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />
      )}
      {data && (
        <AppSafeAreaView style={styles.container}>
          {/* <StatusBar animated style="auto" translucent /> */}
          <CustomToolbar textColor="white" rightIcon={true} streak={true} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
            refreshControl={
              <RefreshControl
                tintColor={Colors.primaryCyanColor}
                progressViewOffset={45}
                progressBackgroundColor={Colors.white}
                colors={[Colors.primaryCyanColor]}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            style={{
              flex: 1,
              borderTopRightRadius: 20,
              backgroundColor: Colors.white,
              borderTopLeftRadius: 20,
            }}
          >
            <BalanceSection
              data={data}
              handleSetBudget={() => {
                setOpenAddBudgetModal(true);
              }}
            />
       
            <IncomeExpenseCards
              income={data?.totalIncome ?? 0}
              expenses={data?.totalExpenses ?? 0}
            />
            <RecentTransactions expenses={data.expenses ?? []} />

            <SpendFrequencyGraph expenses={data.expenses ?? []} />
          </ScrollView>
          <AppBottomSheet
            bottomSheetRef={formRef}
            draggable={true}
            snapTo="55%"
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              scrollEnabled={false}
            >
              <BudgetForm sbuminHandler={submitHandler} />
            </ScrollView>
          </AppBottomSheet>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.fab}
            onPress={() => {
              formRef.current && formRef.current?.expand();
            }}
          >
            <FontAwesome6 name="add" size={24} color="white" />
          </TouchableOpacity>
          {submitLoader && <LoaderFullScreen />}
        </AppSafeAreaView>
      )}

      <ModalWrapper
        visible={openAddBudgetModal || !data}
        onClose={() => setOpenAddBudgetModal(false)}
      >
        <AddBudgetModal
          closeModal={
            !data
              ? () => {
                  router.replace("/home");
                }
              : setOpenAddBudgetModal
          }
          refreshData={fetchData}
        />
      </ModalWrapper>

      {!data && (
        <Image
          source={{
            uri: "https://res.cloudinary.com/duwypp4g5/image/upload/v1752873427/17452_r0gou7.jpg",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.5,
          }}
        />
      )}
    </View>
  );
};

export default BudgetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
  },

  fab: {
    position: "absolute",
    right: 20,
    overflow: "hidden",
    bottom: verticalScale(60),
    backgroundColor: Colors.darkBlack,
    opacity: 0.9,
    width: scale(60),
    height: scale(60),
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.84,
    elevation: 3,
    zIndex: 1,
  },
});
