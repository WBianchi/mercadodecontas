"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { toast } from "sonner"
import { Loader2, CreditCard } from "lucide-react"
import { PaymentSuccess } from "./payment-success"
import { Dialog } from "./ui/dialog"
import { PaymentProcessing } from "./payment-processing"
import { useStripe, useElements, Elements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Carrega o Stripe fora do componente para evitar recargas desnecessárias
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_live_51QYEkLJxaFHPndkBHPcXPjwH2QHfkl9kEAJ7xaJlKnoqeYMiQQjHBrFNfV9mKu3S95KlziGyhPbk1SBVmUWP4nWN003rjAzaC8');

interface CreditCardPaymentProps {
  value: number
  onCreateOrder: (data: any) => Promise<any>
  disabled?: boolean
  onboard?: any
  cpfCnpj?: string
}

// Componente interno que usa os hooks do Stripe
function StripeCheckoutForm({ 
  value, 
  onCreateOrder, 
  disabled, 
  onComplete 
}: { 
  value: number; 
  onCreateOrder: (data: any) => Promise<any>; 
  disabled?: boolean;
  onComplete: (success: boolean, paymentIntent?: any) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  
  useEffect(() => {
    // Criar uma intent de pagamento assim que o componente for carregado
    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        // Aqui você chamaria sua API para criar um PaymentIntent
        const response = await fetch("/api/payments/create-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: value * 100, // Stripe usa centavos
            currency: "brl",
            paymentMethod: "CREDIT_CARD"
          }),
        });
        
        const data = await response.json();
        
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          toast.error("Erro ao inicializar pagamento");
        }
      } catch (error) {
        console.error("Erro ao criar intent de pagamento:", error);
        toast.error("Erro ao inicializar pagamento");
      } finally {
        setLoading(false);
      }
    };
    
    createPaymentIntent();
  }, [value]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js ainda não carregou
      return;
    }
    
    setLoading(true);
    
    try {
      // Confirmar o pagamento com o Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment/confirmation`,
        },
        redirect: "if_required",
      });
      
      if (error) {
        // Mostrar erro ao cliente
        toast.error(error.message || "Erro ao processar pagamento");
        onComplete(false);
      } else if (paymentIntent) {
        // O pagamento foi processado com sucesso
        console.log("Pagamento confirmado:", paymentIntent);
        
        if (paymentIntent.status === "succeeded") {
          try {
            // Chama a função para criar o pedido na sua API
            const orderResponse = await onCreateOrder({
              paymentMethod: "CREDIT_CARD",
              paymentIntentId: paymentIntent.id,
              stripePaymentId: paymentIntent.id
            });
            
            console.log("Pedido criado:", orderResponse);
            onComplete(true, paymentIntent);
          } catch (orderError) {
            console.error("Erro ao criar pedido:", orderError);
            toast.error("Pagamento confirmado, mas houve um erro ao criar o pedido");
            onComplete(false);
          }
        } else if (paymentIntent.status === "processing") {
          toast.info("Seu pagamento está sendo processado");
          onComplete(true, paymentIntent);
        } else {
          toast.warning(`Status do pagamento: ${paymentIntent.status}`);
          onComplete(false);
        }
      }
    } catch (submitError) {
      console.error("Erro ao submeter pagamento:", submitError);
      toast.error("Erro ao processar pagamento");
      onComplete(false);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <p className="text-xl font-semibold">Pagamento com Cartão</p>
        <p className="text-sm text-muted-foreground mt-1">
          Seus dados de pagamento estão seguros com o Stripe
        </p>
      </div>

      <div className="border-t border-b py-3 my-2">
        <p className="text-center text-sm font-medium">
          Total a pagar <span className="font-bold text-base">R$ {value.toFixed(2)}</span>
        </p>
      </div>
      
      {clientSecret ? (
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <CardElement 
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
                hidePostalCode: true,
              }}
            />
          </div>
          
          <div className="text-xs text-muted-foreground mt-2">
            <p>• Seus dados estão seguros e criptografados</p>
            <p>• Processamento instantâneo e seguro</p>
            <p>• Pagamento à vista no cartão de crédito</p>
          </div>
          
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={!stripe || !elements || loading || disabled}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              "Finalizar Pagamento"
            )}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Inicializando pagamento...</p>
        </div>
      )}
    </form>
  );
}

// Componente principal que exportamos
export function CreditCardPayment({ value, onCreateOrder, disabled, onboard, cpfCnpj }: CreditCardPaymentProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [orderId, setOrderId] = useState("");
  
  // Resetar estados
  const handleClose = () => {
    setShowSuccess(false);
    setShowProcessing(false);
    setPaymentId("");
    setOrderId("");
  };
  
  const handlePaymentComplete = (success: boolean, paymentIntent?: any) => {
    if (success) {
      if (paymentIntent?.status === "succeeded") {
        setShowSuccess(true);
      } else {
        // Para status pendentes ou em processamento
        setPaymentId(paymentIntent?.id || "");
        setShowProcessing(true);
      }
    }
  };
  
  const handlePaymentSuccess = () => {
    setShowProcessing(false);
    setShowSuccess(true);
  };

  // Opções para personalizar a aparência do Stripe
  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '4px',
    }
  };

  // Opções do elemento do Stripe
  const options = {
    appearance
  };

  return (
    <div className="flex flex-col gap-5">
      {!showProcessing && !showSuccess && (
        <Elements stripe={stripePromise} options={options}>
          <StripeCheckoutForm 
            value={value} 
            onCreateOrder={onCreateOrder} 
            disabled={disabled}
            onComplete={handlePaymentComplete} 
          />
        </Elements>
      )}

      <Dialog open={showProcessing} onOpenChange={setShowProcessing}>
        <PaymentProcessing 
          paymentMethod="CREDIT_CARD"
          paymentId={paymentId}
          externalReference={orderId}
          onSuccess={handlePaymentSuccess}
        />
      </Dialog>

      <Dialog open={showSuccess} onOpenChange={handleClose}>
        <PaymentSuccess onClose={handleClose} />
      </Dialog>
    </div>
  );
}
