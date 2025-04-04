export const vaultDescriptions = {
  apy:
    'APY  (Annual Percentage Yield) is the annual effective interest rate that shows how much you can earn with reinvestment of your earnings. APY is calculated based on the yield from the last 30 days and reflects the projected annual return if the monthly yield remains constant.\n\n' +
    'The calculation of APY uses the compound interest formula: APY = (1 + r)ⁿ - 1, where r is the monthly yield (in decimal form) and n is the number of periods in a year (usually 12). This formula accounts for the reinvestment effect, meaning that each subsequent interest calculation is applied to an increased capital amount. For example, if the monthly yield is 5% (r = 0.05), the APY for the year would be: APY = (1 + 0.05)¹² - 1 ≈ 0.7959, or 79.59%.\n\n' +
    'Intuitively, many users might calculate the annual percentage yield as a simple multiplication of the monthly percentage by 12 months. In this case, the result would be 60% (0.05 × 12 = 0.6). However, this approach is incorrect as it ignores the compounding effect, which significantly increases the total yield over a year.\n\n' +
    'APY provides investors with a more accurate assessment of real earnings from their investments, especially in cases with frequent profit compounding.',
  managementType:
    'There are two types of funds: ACTIVE and INACTIVE.\n\n' +
    'INACTIVE funds act as a simple conduit, directing investor capital into a single crypto project without additional functionality.\n\n' +
    "ACTIVE funds, on the other hand, offer advanced management capabilities. These include automated reward collection, reinvestment, liquidity range adjustments, and other active management features. They are designed to dynamically rebalance the fund's composition and optimize performance over time, providing a more hands-on approach to fund management.",
  management:
    'Funds can be managed either by the Cybro company or by an external contractor/provider',

  intention: {
    fiatStable:
      'Fiat-Stable - For investors who want to be guaranteed to preserve the dollar value of their investments. Also relevant during periods of crypto market decline. Such funds are nominated in stablecoins. During market drawdowns, they do not lose their dollar value.',
    growthCrypto:
      'Growth Crypto - For long-term investors who believe in the growth of crypto. Nominated in cryptocurrency. During periods of crypto market growth, they show greater profitability compared to dollar funds.\n',
  },

  fee: {
    deposit:
      "The entry fee for the fund is charged at the percentage specified at the time of deposit. The fee is deducted in the fund's currency.",
    withdrawal:
      "The exit fee for the fund is charged at the percentage specified at the time of withdrawal. The fee is deducted in the fund's currency from the amount remaining after the profit fee has been applied.",
    profit:
      "The profit fee is charged at the specified percentage. The fund deducts this fee when you withdraw your funds. The fee is taken in the fund's currency from the withdrawal amount. The profit fee is applied before the exit fee. It is calculated as a percentage of the profit attributed to the withdrawn amount.\n" +
      'This means you don’t pay a profit fee until you withdraw your funds. If the fund’s price increases and then returns to its initial level, you won’t pay any profit fee.\n',
  },

  trustScore:
    "The Trust Score is automatically calculated based on a vault's data, including its strategy, history, reputation, and reliability. Certain events can lower the Trust Score, while others can increase it. You can view these events by selecting a specific vault and checking its Trust Score section.",
};
