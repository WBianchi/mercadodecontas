/**
 * Utilitário para rastreamento de eventos do Google Analytics
 */
export const sendGAEvent = ({
  action,
  category,
  label,
  value,
  ...otherProps
}: {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...otherProps,
    });
  }
};

/**
 * Utilitário para rastreamento de eventos de e-commerce do Google Analytics
 */
export const sendEcommerceEvent = ({
  eventName,
  ecommerce,
}: {
  eventName: 'view_item' | 'add_to_cart' | 'begin_checkout' | 'purchase' | 'view_item_list';
  ecommerce: any;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, { ecommerce });
  }
};

/**
 * Utilitário para rastreamento de conversões do Google Ads
 */
export const sendAdsConversion = ({
  conversionId,
  conversionLabel,
  value,
  currency = 'BRL',
  transactionId,
}: {
  conversionId: string;
  conversionLabel: string;
  value?: number;
  currency?: string;
  transactionId?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    const conversionParams: Record<string, any> = {
      'send_to': `${conversionId}/${conversionLabel}`,
    };
    
    if (value !== undefined) {
      conversionParams.value = value;
      conversionParams.currency = currency;
    }
    
    if (transactionId) {
      conversionParams.transaction_id = transactionId;
    }
    
    window.gtag('event', 'conversion', conversionParams);
  }
};

/**
 * Exemplos de eventos de e-commerce para rastreamento
 */

// Visualização de um produto
export const trackViewProduct = (product: any) => {
  sendEcommerceEvent({
    eventName: 'view_item',
    ecommerce: {
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        discount: product.discount,
        category: product.category,
        quantity: 1
      }]
    }
  });
};

// Adição ao carrinho
export const trackAddToCart = (product: any, quantity: number = 1) => {
  sendEcommerceEvent({
    eventName: 'add_to_cart',
    ecommerce: {
      items: [{
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        discount: product.discount,
        category: product.category,
        quantity
      }]
    }
  });
};

// Início de checkout
export const trackBeginCheckout = (cart: any[]) => {
  sendEcommerceEvent({
    eventName: 'begin_checkout',
    ecommerce: {
      items: cart.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        discount: item.discount,
        category: item.category,
        quantity: item.quantity
      }))
    }
  });
};

// Compra concluída
export const trackPurchase = (orderId: string, revenue: number, tax: number, shipping: number, items: any[]) => {
  sendEcommerceEvent({
    eventName: 'purchase',
    ecommerce: {
      transaction_id: orderId,
      value: revenue,
      tax,
      shipping,
      currency: 'BRL',
      items: items.map(item => ({
        item_id: item.id,
        item_name: item.name,
        price: item.price,
        discount: item.discount,
        category: item.category,
        quantity: item.quantity
      }))
    }
  });
  
  // Também enviar como conversão para o Google Ads, se configurado
  if (process.env.NEXT_PUBLIC_GOOGLE_ADS_ID && process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL) {
    sendAdsConversion({
      conversionId: process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
      conversionLabel: process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL,
      value: revenue,
      transactionId: orderId
    });
  }
};
