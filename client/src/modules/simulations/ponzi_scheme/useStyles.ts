
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#e2e8f0",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#94a3b8",
  },
  bucketCard: {
    backgroundColor: "#1e293b",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#6366f1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  bucketIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  bucketIconText: {
    fontSize: 30,
  },
  bucketInfo: {
    flex: 1,
  },
  bucketLabel: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 5,
  },
  bucketValue: {
    fontSize: 32,
    fontWeight: "800",
    color: "#e2e8f0",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginBottom: 25,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#e2e8f0",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "600",
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeCard: {
    backgroundColor: "#1e293b",
    borderLeftWidth: 4,
    borderLeftColor: "#3b82f6",
  },
  exitedCard: {
    backgroundColor: "#1e293b",
    borderLeftWidth: 4,
    borderLeftColor: "#10b981",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  investorName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#e2e8f0",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadge: {
    backgroundColor: "#1e40af",
  },
  exitedBadge: {
    backgroundColor: "#065f46",
  },
  statusBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
  investmentInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  infoItem: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 11,
    color: "white",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "white"
  },
  positiveValue: {
    color: "#10b981",
  },
  zeroValue: {
    color: "#e2e8f0",
  },
  progressContainer: {
    marginTop: 5,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  progressText: {
    fontSize: 12,
    color: "#94a3b8",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#334155",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  collapseContainer: {
    backgroundColor: "#7f1d1d",
    marginHorizontal: 20,
    padding: 25,
    borderRadius: 16,
    alignItems: "center",
  },
  collapseIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  collapseTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fecaca",
    marginBottom: 8,
  },
  collapseText: {
    fontSize: 14,
    color: "#fecaca",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default styles;