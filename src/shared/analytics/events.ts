export enum AnalyticsEvent {
  ConnectWalletClick = 'click_wallet_connect',
  ConnectWalletSuccess = 'click_wallet_connect_success',
  TrustScoreHintOpen = 'hint_trust_score_open',
  VaultConnectWalletClickForm = 'click_wallet_connect_form',
  DepositAmountChangedManually = 'form_change_deposit_amount_manually',
  DepositAmountChangedPreset = 'form_change_deposit_amount_preset',
  CalculatorPeriodChange = 'form_change_period',
  DepositSuccess = 'deposit_success',
  DepositError = 'deposit_error',
  DepositReject = 'deposit_reject',
  WithdrawalSuccess = 'withdrawal_success',
  WithdrawalError = 'withdrawal_error',
  WithdrawReject = 'withdraw_reject',

  ChangeSwapSettings = 'change_swap_settings',
  ChangeSwapFrom = 'change_swap_from',
  ChangeSwapTo = 'change_swap_to',
  ChangeSwapAmount = 'change_swap_amount',
  ChangeSwapAmountPreset = 'change_swap_amount_preset',
  SuccessSwap = 'success_swap',
  ErrorSwap = 'error_swap',
  RejectSwap = 'reject_swap',

  ChangeZapInToken = 'change_zap_in_token',
  ChangeZapInTokenSuccess = 'change_zap_in_token_success',

  ChangeVaultListStyle = 'change_vault_list_style',

  PageLoadVault = 'page_load_vault',
  PageLoadSwap = 'page_load_swap',

  StakeSuccess = 'stake_success',
  StakeError = 'stake_error',
  StakeReject = 'stake_reject',

  UnstakeSuccess = 'unstake_success',
  UnstakeError = 'unstake_error',
  UnstakeReject = 'unstake_reject',

  ClaimSuccess = 'claim_success',
  ClaimError = 'claim_error',
  ClaimReject = 'claim_reject',

  ClaimRewardsSuccess = 'claim_rewards_success',
  ClaimRewardsError = 'claim_rewards_error',
  ClaimRewardsReject = 'claim_rewards_reject',
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
  [AnalyticsEvent.DepositReject]: 'deposit',
  [AnalyticsEvent.DepositError]: 'deposit',
  [AnalyticsEvent.WithdrawalSuccess]: 'withdrawal',
  [AnalyticsEvent.WithdrawalError]: 'withdrawal',
  [AnalyticsEvent.WithdrawReject]: 'withdrawal',

  [AnalyticsEvent.ChangeSwapSettings]: 'change',
  [AnalyticsEvent.ChangeSwapFrom]: 'change',
  [AnalyticsEvent.ChangeSwapTo]: 'change',
  [AnalyticsEvent.ChangeSwapAmount]: 'change',
  [AnalyticsEvent.ChangeSwapAmountPreset]: 'change',
  [AnalyticsEvent.SuccessSwap]: 'swap',
  [AnalyticsEvent.ErrorSwap]: 'swap',
  [AnalyticsEvent.RejectSwap]: 'swap',

  [AnalyticsEvent.ChangeZapInToken]: 'change',
  [AnalyticsEvent.ChangeZapInTokenSuccess]: 'success',

  [AnalyticsEvent.ChangeVaultListStyle]: 'change',

  [AnalyticsEvent.PageLoadVault]: 'page',
  [AnalyticsEvent.PageLoadSwap]: 'page',

  [AnalyticsEvent.StakeSuccess]: 'stake',
  [AnalyticsEvent.StakeError]: 'stake',
  [AnalyticsEvent.StakeReject]: 'stake',

  [AnalyticsEvent.UnstakeSuccess]: 'unstake',
  [AnalyticsEvent.UnstakeError]: 'unstake',
  [AnalyticsEvent.UnstakeReject]: 'unstake',

  [AnalyticsEvent.ClaimSuccess]: 'claim',
  [AnalyticsEvent.ClaimError]: 'claim',
  [AnalyticsEvent.ClaimReject]: 'claim',

  [AnalyticsEvent.ClaimRewardsSuccess]: 'claim_rewards',
  [AnalyticsEvent.ClaimRewardsError]: 'claim_rewards',
  [AnalyticsEvent.ClaimRewardsReject]: 'claim_rewards',
};
