"use client"

import Script from "next/script"

interface GoogleMerchantBadgeProps {
  MERCHANT_ID: string
}

export default function GoogleMerchantBadge({ MERCHANT_ID }: GoogleMerchantBadgeProps) {
  return (
    <>
      <Script
        src="https://apis.google.com/js/platform.js?onload=renderBadge"
        strategy="afterInteractive"
      />

      <Script id="google-merchant-badge" strategy="afterInteractive">
        {`
          window.renderBadge = function() {
            var ratingBadgeContainer = document.createElement("div");
            document.body.appendChild(ratingBadgeContainer);
            window.gapi && window.gapi.load('ratingbadge', function() {
              window.gapi.ratingbadge.render(ratingBadgeContainer, {"merchant_id": ${MERCHANT_ID}});
            });
          }
        `}
      </Script>
    </>
  )
}
