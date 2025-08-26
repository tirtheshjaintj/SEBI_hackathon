import Colors from "@/src/theme/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },

    toolbar: {
        backgroundColor: 'transparent',
        elevation: 0,
    },
    headerTitle: {
        color: 'white',
        fontSize: 22,
        fontWeight: '700',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    scrollContent: {
        paddingBottom: 30,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 16,
        marginVertical: 16,
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#495057',
    },
    filterContainer: {
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    filterButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#e9ecef',
        borderRadius: 20,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#dee2e6',
    },
    filterButtonActive: {
        backgroundColor: Colors.primaryCyanColor,
        borderColor: Colors.primaryCyanColor,
    },
    filterText: {
        fontSize: 14,
        color: '#495057',
        fontWeight: '500',
    },
    filterTextActive: {
        color: 'white',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
        borderLeftWidth: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#212529',
        marginBottom: 2,
    },
    number: {
        fontSize: 14,
        color: '#6c757d',
    },
    time: {
        fontSize: 12,
        fontWeight: '500',
    },
    cardDetails: {
        paddingLeft: 48, // Align with icon
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#6c757d',
        marginLeft: 8,
    },
    spamWarning: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff5f5',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    spamText: {
        fontSize: 12,
        color: '#ff4757',
        fontWeight: '500',
        marginLeft: 4,
    },
    reportContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    reportCount: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reportCountText: {
        fontSize: 16,
        color: '#6c757d',
        marginLeft: 4,
    },
    reportButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff5f5',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ffccd5',
    },
    reportedButton: {
        backgroundColor: '#e6f7ee',
        borderColor: '#b7ebc8',
    },
    reportButtonText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#c2185b',
        marginRight: 4,
    },
    listContent: {
        paddingBottom: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    errorText: {
        fontSize: 16,
        color: '#495057',
        textAlign: 'center',
        marginVertical: 16,
    },
    retryButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    retryButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#adb5bd',
        textAlign: 'center',
        marginTop: 16,
    },
    refreshButton: {
        marginTop: 16,
        borderRadius: 25,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    refreshGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
    },
    refreshText: {
        color: 'white',
        fontWeight: '600',
        marginLeft: 8,
    },
});

export default styles;