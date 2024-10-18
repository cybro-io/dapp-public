export enum AnalyticsEvent {
  ConnectWalletClick = 'click_wallet_connect',
  ConnectWalletSuccess = 'click_wallet_connect_success',
  TrustScoreHintOpen = 'hint_trust_score_open',
  VaultConnectWalletClickForm = 'click_wallet_connect_form',
  DepositAmountChangedManually = 'form_change_deposit_amount_manually',
  DepositAmountChangedPreset = 'form_change_deposit_amount_preset',
  CalculatorPeriodChange = 'form_change_period',
  DepositSuccess = 'deposit_success',
  WithdrawalSuccess = 'withdrawal_success',

  ChangeSwapSettings = 'change_swap_settings',
  ChangeSwapFrom = 'change_swap_from',
  ChangeSwapTo = 'change_swap_to',
  ChangeSwapAmount = 'change_swap_amount',
  ChangeSwapAmountPreset = 'change_swap_amount_preset',
  SuccessSwap = 'success_swap',

  ChangeZapInToken = 'change_zap_in_token',
  ChangeZapInTokenSuccess = 'change_zap_in_token_success',

  ChangeVaultListStyle = 'change_vault_list_style',

  PageLoadVault = 'page_load_vault',
  PageLoadSwap = 'page_load_swap',
}

export const typeByEvent: Record<AnalyticsEvent, string> = {
  [AnalyticsEvent.ConnectWalletClick]: 'click',
  [AnalyticsEvent.ConnectWalletSuccess]: 'success',
  [AnalyticsEvent.TrustScoreHintOpen]: 'hint',
  [AnalyticsEvent.VaultConnectWalletClickForm]: 'click',
  [AnalyticsEvent.DepositAmountChangedManually]: 'change',
  [AnalyticsEvent.DepositAmountChangedPreset]: 'change',
  [AnalyticsEvent.CalculatorPeriodChange]: 'change',
  [AnalyticsEvent.DepositSuccess]: 'deposit',
  [AnalyticsEvent.WithdrawalSuccess]: 'withdrawal',

  [AnalyticsEvent.ChangeSwapSettings]: 'change',
  [AnalyticsEvent.ChangeSwapFrom]: 'change',
  [AnalyticsEvent.ChangeSwapTo]: 'change',
  [AnalyticsEvent.ChangeSwapAmount]: 'change',
  [AnalyticsEvent.ChangeSwapAmountPreset]: 'change',
  [AnalyticsEvent.SuccessSwap]: 'swap',

  [AnalyticsEvent.ChangeZapInToken]: 'change',
  [AnalyticsEvent.ChangeZapInTokenSuccess]: 'success',

  [AnalyticsEvent.ChangeVaultListStyle]: 'change',

  [AnalyticsEvent.PageLoadVault]: 'page',
  [AnalyticsEvent.PageLoadSwap]: 'page',
};
