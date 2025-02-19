export interface MunzenCurrency {
  id: number;
  ticker: string;
  viewedTicker: string;
  name: string;
  isCrypto: boolean;
  logoUrl: string;
  priority: number;
  isBestConditions: boolean;
  decimals: number;
  roundOff: number;
  description: string | null;
  tooltipDescription: string | null;
  discountDescription: string | null;
  feeValue: number | null;
  blockchainNetwork: string | null;
  tickerWithNetwork: string;
}

export interface MunzenRate {
  fromCurrency: string;
  // Code (ticker) of base currency

  toCurrency: string;
  // Code (ticker) of quote currency with (or without) network

  exchangeRate: {
    divisor: number;
    // Rate calculated by 1 / value

    multiplier: number;
    // Rate calculated by 1 * value
  };
  // Rate of currencies conversion

  decimals: number;
  // Count of the rate's toCurrency decimals

  roundOff: number;
  // Number of decimals are rounded and displayed to customer

  minAmount: number;
  // Minimal amount available for exchange for fromCurrency

  maxAmount: number;
  // Maximal amount available for exchange for fromCurrency

  minAmountConverted: number;
  // Minimal amount available for exchange for toCurrency

  maxAmountConverted: string;
  // Maximal amount available for exchange for toCurrency

  availablePaymentTypes: Array<string>;
}

interface MunzenFeeProvider {
  type: 'max';
  value: Array<Array<MunzenFeeMoney | MunzenFeePercent>>;
}

interface MunzenFeeMoney {
  type: 'money';
  value: {
    amount: number;
    currency: string;
  };
}

interface MunzenFeePercent {
  type: 'percent';
  value: number;
}

export interface MunzenFee {
  providerFee: MunzenFeeProvider;
  networkFee: MunzenFeeMoney;
  networkFeeFiat: MunzenFeeMoney;
}

export interface MunzenWidgetMessageEventData<T = MunzenEventPayload> {
  source: 'nearpay_widget';
  data: MunzenWidgetEvent<T>;
}

export interface MunzenWidgetEvent<T = MunzenEventPayload> {
  type: MunzenEventType;
  payload: T;
}

export enum MunzenEventType {
  // Widget succesfully initalized, and ready to be interacted with
  OnLoad = 'onload',
  // An error in the work of the widget, which does not allow the process to continue
  OnError = 'onerror',
  // Resizing the widget boundaries, due to content changes
  OnResize = 'onresize',
  // Close the widget
  OnExit = 'onexit',
  // The widget started from the starting point (called at each reset to the beginning)
  OnStarted = 'onstarted',
  // User had been authenticated and order had been created
  OnOperationCreated = 'onoperationcreated',
  // Sending payment data - user clicked on Pay button
  OnPaymentSent = 'onpaymentsent',
  // Order completed, payment has been received
  OnOperationSuccess = 'onoperationsuccess',
  // Order declined, due to service failure, fraud control, or other
  OnOperationFail = 'onoperationfail',
  // Payment is pending to be confirmed
  OnOperationPending = 'onoperationpending',
  // When detected user country of exchange is unsupported
  OnUnsupported = 'onunsupported',
  // When user click "Force continue" button. In this case we apply default country - US
  OnForceContinue = 'onforcecontinue',
}

type MunzenEventPayload =
  | OnOperationSuccess
  | OnErrorEvent
  | OnOperationPending
  | OnOperationFail
  | OnUnsupported
  | OnForceContinue
  | OnOperationCreated
  | OnResizeEvent
  | OnExitEvent
  | OnLoadedEvent
  | OnPaymentSent
  | OnStartedEvent;

interface MunzenResizePayload {
  size: { width: number; height: number };
}
interface MunzenErrorPayload {
  error: {
    code: string;
    message: string;
  };
}
interface MunzenOrderCreatedPayload {
  orderId: string;
}
// OrderPayload looks the same as OrderCreatedPayload, but is a subject to change
// we will add more useful data to OrderPayload in future
interface MunzenOrderPayload {
  orderId: string;
}

// Payload for onforcecontinue is the same as for onunsupported
interface MunzenUnsupportedPayload {
  country?: {
    name?: string;
    isoAlpha2?: string;
    isoAlpha3?: string;
    flagUrl?: string;
  };
}

// 1) onloaded - Widget succesfully initalized, and ready to be interacted with
export interface OnLoadedEvent extends MunzenWidgetEvent<MunzenResizePayload> {
  type: MunzenEventType.OnLoad;
}

// 2) onerror - An error in the work of the widget, which does not allow the process to continue
export interface OnErrorEvent extends MunzenWidgetEvent<MunzenErrorPayload> {
  type: MunzenEventType.OnError;
}

// 3) onresize - Resizing the document inside the iframe widget
export interface OnResizeEvent extends MunzenWidgetEvent<MunzenResizePayload> {
  type: MunzenEventType.OnResize;
}

// 4) onexit - Close the widget, contains no data
export interface OnExitEvent extends MunzenWidgetEvent<null> {
  type: MunzenEventType.OnExit;
}

// 5) onstarted - The widget started from the starting point (called at each reset to the beginning)
export interface OnStartedEvent extends MunzenWidgetEvent<null> {
  type: MunzenEventType.OnStarted;
}

// 6) onoperationcreated - user had been authenticated and order had been created
export interface OnOperationCreated
  extends MunzenWidgetEvent<MunzenOrderCreatedPayload> {
  type: MunzenEventType.OnOperationCreated;
}

// 7) onpaymentsent - Sending payment data - the user clicked on Pay, does not contain data
export interface OnPaymentSent extends MunzenWidgetEvent<null> {
  type: MunzenEventType.OnPaymentSent;
}

// 8) onoperationpending - payment is pending to be confirmed
export interface OnOperationPending
  extends MunzenWidgetEvent<MunzenOrderPayload> {
  type: MunzenEventType.OnOperationPending;
}

// 9) onoperationsuccess - order completed, payment has been received
export interface OnOperationSuccess
  extends MunzenWidgetEvent<MunzenOrderPayload> {
  type: MunzenEventType.OnOperationSuccess;
}

// 10) onoperationfail - order declined, due to service failure, fraud control, or other
export interface OnOperationFail extends MunzenWidgetEvent<MunzenOrderPayload> {
  type: MunzenEventType.OnOperationFail;
}

// 11) onunsupported - detected user country is unsupported
export interface OnUnsupported
  extends MunzenWidgetEvent<MunzenUnsupportedPayload> {
  type: MunzenEventType.OnUnsupported;
}

// 12) onforcecontinue - user clicks "Force continue" button and default country (US) is applied
export interface OnForceContinue
  extends MunzenWidgetEvent<MunzenUnsupportedPayload> {
  type: MunzenEventType.OnForceContinue;
}

export interface MunzenOrder {
  orderId: string;
  merchantOrderId: string;
  customerId: string;
  fromCurrency: string;
  fromAmount: 100;
  fromAmountWithoutFees: number;
  toCurrency: string;
  toAmount: number;
  toWallet: string;
  exchangeRate: number;
  providerFee: number;
  networkFee: number;
  networkFeeFiat: number;
  status: string;
  failureCode: string;
  failurePayload: {
    some: string;
  };
  createdAt: string;
}
