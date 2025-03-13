export const links = {
  preSale: process.env.NEXT_PUBLIC_PRESALE_URL ?? '',
  medium: 'https://cybro.medium.com/',
  docCybroPoints: 'https://docs.cybro.io/cybro/usdcybro-token/cybro-points/',
  symbiosisExplorer:
    'https://explorer.symbiosis.finance/transactions/{chainId}/{txId}',
  blastScan: 'https://blastscan.io/tx/{txId}',
  blastScanTokenUrl: 'https://blastscan.io/token/{token}',
  noImage: 'https://blastscan.io/assets/blast/images/svg/empty-token.svg',

  docStaking: 'https://docs.cybro.io/cybro/usdcybro-token/staking-usdcybro',
  docBridge: 'https://docs.cybro.io/cybro/usdcybro-token/bridging',
  docClaiming: 'https://docs.cybro.io/cybro/usdcybro-token/claiming-usdcybro',

  stakingPessimisticAudit:
    'https://github.com/cybro-io/dapp-contracts-audits/blob/main/CYBRO%20Staking%20Security%20Analysis%20by%20Pessimistic.pdf',
};
