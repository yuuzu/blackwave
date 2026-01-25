import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createInvoice, checkInvoiceStatus } from '~/utils/oxapay';

export function usePayments() {
    const router = useRouter();
    const loading = ref(false);
    const invoiceData = ref(null);
    const qrImage = ref('');
    const errorMessage = ref('');
    const successMessage = ref('');

    const rechargeAccount = async (amount, currency) => {
        loading.value = true;
        errorMessage.value = '';
        successMessage.value = '';

        try {
            const invoice = await createInvoice(amount, currency);
            invoiceData.value = invoice;
            qrImage.value = invoice.qr_code; // Assuming the API returns a QR code URL
            successMessage.value = 'Invoice created successfully. Please complete the payment.';
        } catch (error) {
            errorMessage.value = 'Error creating invoice: ' + error.message;
        } finally {
            loading.value = false;
        }
    };

    const confirmPayment = async (invoiceId) => {
        loading.value = true;
        errorMessage.value = '';
        successMessage.value = '';

        try {
            const status = await checkInvoiceStatus(invoiceId);
            if (status === 'paid') {
                successMessage.value = 'Payment confirmed! Your account has been recharged.';
                // Optionally, redirect or update user balance here
            } else {
                errorMessage.value = 'Payment not completed yet. Please check again later.';
            }
        } catch (error) {
            errorMessage.value = 'Error checking payment status: ' + error.message;
        } finally {
            loading.value = false;
        }
    };

    return {
        loading,
        invoiceData,
        qrImage,
        errorMessage,
        successMessage,
        rechargeAccount,
        confirmPayment,
    };
}