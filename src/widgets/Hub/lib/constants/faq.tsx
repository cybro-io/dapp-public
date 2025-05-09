import React from 'react';

import { Link } from '@heroui/react';

import { links } from '@/shared/lib';

export const faqItems = [
  {
    key: '1',
    title: 'What is Cybro?',
    content:
      "CYBRO is a secure AI-based multichain yield aggregator for non-professional crypto investors. CYBRO offers multiple investment vaults and strategies tailored to the user's needs.",
  },
  {
    key: '2',
    title: 'How do I buy a $CYBRO token?',
    content: (
      <React.Fragment>
        Please visit the&nbsp;
        <Link
          href="/token"
          target="_blank"
          className="text-text-accent-logoYellow"
        >
          Token page
        </Link>
        &nbsp; to view the list of supported exchanges or purchase directly
        through our website.
      </React.Fragment>
    ),
  },
  {
    key: '3',
    title: 'Is CYBRO Secure',
    content:
      "CYBRO's team and code have been verified by external auditors. The CYBRO team has successfully completed two KYC audits conducted by CertiK and Assure DeFi. Vault contracts of the App have been audited by Pessimistic and QuillAudits. CertiK has audited CYBRO's Token and Presale smart contracts. To ensure security and reliability, CYBRO offers a bug bounty program with rewards of up to $25,000 for identifying vulnerabilities in their smart contracts and dApp.",
  },
  {
    key: '4',
    title: 'Where can I find my tokens?',
    content:
      'Tokens bought at presale will be available after they are claimed. First, you will receive LockedCYBRO that can exchanged for CYBRO 1:1 at the moment of the TGE or could be staked inside CYBRO.',
  },
  {
    key: '5',
    title: 'What is the token contract address?',
    content: (
      <React.Fragment>
        The contract addresses could be found in the&nbsp;
        <Link
          href={links.docTokenContractAddress}
          target="_blank"
          className="text-text-accent-logoYellow"
        >
          documentation
        </Link>
      </React.Fragment>
    ),
  },
];
