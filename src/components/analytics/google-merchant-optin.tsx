"use client"

import Script from "next/script"
import { useRouter } from "next/navigation"

interface GoogleMerchantOptInProps {
  MERCHANT_ID: string
}

export default function GoogleMerchantOptIn({ MERCHANT_ID }: GoogleMerchantOptInProps) {
  return (
    <>
      <Script
        src="https://apis.google.com/js/platform.js?onload=renderOptIn"
        strategy="afterInteractive"
      />

      <Script id="google-merchant-optin" strategy="afterInteractive">
        {`
          window.renderOptIn = function() {
            window.gapi && window.gapi.load('surveyoptin', function() {
              window.gapi.surveyoptin.render(
                {
                  // REQUIRED FIELDS
                  "merchant_id": ${MERCHANT_ID},
                  "order_id": "ORDER_ID",
                  "email": "CUSTOMER_EMAIL",
                  "delivery_country": "COUNTRY_CODE",
                  "estimated_delivery_date": "YYYY-MM-DD",

                  // OPTIONAL FIELDS
                  "products": [{"gtin":"GTIN1"}, {"gtin":"GTIN2"}]
                });
            });
          }
        `}
      </Script>
    </>
  )
}
