import { useState } from 'react';
import { appmaxApi } from '@/services/appmax';

interface UsePixPaymentProps {
  onSuccess?: (pixData: any) => void;
  onError?: (error: string) => void;
}

export function usePixPayment({ onSuccess, onError }: UsePixPaymentProps = {}) {
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const createPixPayment = async (data: {
    orderId: string;
    customerId: string;
    documentNumber: string;
  }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await appmaxApi.createPixPayment({
        orderId: data.orderId,
        customerId: data.customerId,
        documentNumber: data.documentNumber,
      });

      if (!response.success) {
        throw new Error(response.error || 'Erro ao gerar PIX');
      }

      setPixData(response.data);
      onSuccess?.(response.data);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Erro ao processar pagamento PIX';
      setError(errorMessage);
      onError?.(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createPixPayment,
    loading,
    pixData,
    error,
  };
}
