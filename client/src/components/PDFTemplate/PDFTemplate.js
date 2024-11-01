import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { converToUSD, converToVND } from '../convertToVND/convertToVND';

export const PDFTemplate = ({ order }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={{ padding: 40, flexDirection: 'column' }}>
                    {/* Shop Information Section */}
                    <View style={styles.shopContainer}>
                        <View style={styles.shopInforWrapper}>
                            <Text style={styles.shopText}>Tomtoc Perfumes</Text>
                            <Text style={styles.whiteText}>tomtoc.perfumes@gmail.com</Text>
                        </View>
                        <View style={styles.shopInforWrapper}>
                            <Text style={styles.whiteText}>So 1 Vo Van Ngan</Text>
                            <Text style={styles.whiteText}>
                                HCMC University of Technology and Education
                            </Text>
                        </View>
                    </View>

                    {/* Invoice Header */}
                    <View style={{ marginVertical: 10 }}>
                        <Text style={styles.shopText}>Tomtoc Invoice</Text>
                        <View style={styles.invoiceContainer}>
                            <View style={styles.shopInforWrapper}>
                                <Text style={{ fontWeight: 'bold' }}>
                                    Invoice Number: {order._id}
                                </Text>
                                <Text style={styles.blackText}>
                                    Use Vietnamese will crash the font
                                </Text>
                                <Text style={styles.blackText}>0869967676</Text>
                                <Text style={styles.blackText}>Fuck off</Text>
                            </View>
                        </View>
                    </View>

                    {/* Items Table */}
                    <Text style={styles.blackText}>Items</Text>
                    <View style={styles.tableContainer}>
                        {/* Header Row */}
                        <View style={styles.tableHeader}>
                            <Text style={styles.tableColumn}>Product</Text>
                            <Text style={styles.tableColumn}>Amount</Text>
                            <Text style={styles.tableColumn}>Qty</Text>
                            <Text style={styles.tableColumn}>Total Amount</Text>
                        </View>

                        {/* Items Rows */}
                        {order.items?.map((product, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableColumn}>{product.productName}</Text>
                                <Text style={styles.tableColumn}>{converToVND(product.price)}</Text>
                                <Text style={styles.tableColumn}>{product.quantity}</Text>
                                <Text style={styles.tableColumn}>
                                    {converToVND(product.price * product.quantity)}
                                </Text>
                            </View>
                        ))}
                    </View>

                    <Text>Total Price: {order.totalPrice}</Text>
                </View>
            </Page>
        </Document>
    );
};

// Styles object for PDF
const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFF',
        padding: 5,
    },
    shopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    shopInforWrapper: {
        marginBottom: 5,
    },
    shopText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    whiteText: {
        color: '#FFFFFF',
    },
    blackText: {
        color: '#000000',
    },
    tableContainer: {
        borderWidth: 1,
        borderColor: '#000',
        marginVertical: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#ccc',
        paddingVertical: 5,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingVertical: 5,
    },
    tableColumn: {
        flex: 1,
        textAlign: 'center',
    },
});
