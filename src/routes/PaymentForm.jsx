import { h } from 'preact'

const PaymentForm = () => {
  const googlePaymentDataRequest = {
    environment: 'TEST',
    apiVersion: 2,
    apiVersionMinor: 0,
    merchantInfo: {
      // A merchant ID is available after approval by Google.
      // @see {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist}
      // merchantId: '12345678901234567890',
      merchantName: 'Example Merchant',
    },
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: [
            'AMEX',
            'DISCOVER',
            'INTERAC',
            'JCB',
            'MASTERCARD',
            'VISA',
          ],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          // Check with your payment gateway on the parameters to pass.
          // @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway}
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
  }
  const onBuyClicked = () => {
    if (!window.PaymentRequest) {
      // PaymentRequest API is not available. Forwarding to
      // legacy form based experience.
      location.href = '/home'
      return
    }

    // Supported payment methods
    const supportedInstruments = [
      {
        supportedMethods: 'https://google.com/pay',
        data: googlePaymentDataRequest,
      },
      {
        supportedMethods: ['basic-card'],
        data: {
          supportedNetworks: [
            'visa',
            'mastercard',
            'amex',
            'discover',
            'diners',
            'jcb',
            'unionpay',
          ],
        },
      },
    ]

    // Checkout details
    const details = {
      displayItems: [
        {
          label: 'Original donation amount',
          amount: { currency: 'USD', value: '65.00' },
        },
        {
          label: 'Friends and family discount',
          amount: { currency: 'USD', value: '-10.00' },
        },
      ],
      total: {
        label: 'Total due',
        amount: { currency: 'USD', value: '55.00' },
      },
    }

    // 1. Create a `PaymentRequest` instance
    // 1. `PaymentRequest` インスタンスを生成する
    const request = new PaymentRequest(supportedInstruments, details)

    // 2. Show the native UI with `.show()`
    // 2. `.show()` を呼び出して、ネイティブ UI を表示する
    request
      .show()
      // 3. Process the payment
      // 3. 決済処理をおこなう
      .then((result) => {
        // POST the payment information to the server
        console.log(result)
        return result.complete('success')
      })
  }
  return <button onClick={onBuyClicked}>お支払いに進む</button>
}

export default PaymentForm
