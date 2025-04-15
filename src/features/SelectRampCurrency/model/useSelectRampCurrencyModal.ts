import NiceModal from '@ebay/nice-modal-react';

import { MunzenCurrency } from '@/entities/Munzen';

import { SelectRampModal } from '../ui/SelectRampModal';

export const useSelectRampCurrencyModal = () => {
  const modalSelectRampCurrency = NiceModal.useModal(SelectRampModal);

  const openModalSelectRampCurrency = (
    selectedCurrencyId: string,
    isCrypto: boolean,
    callback: (currency: MunzenCurrency) => void,
  ) => {
    modalSelectRampCurrency
      .show({ selectedCurrencyId, isCrypto })
      .then((currency) => callback(currency as MunzenCurrency));
  };

  return { openModalSelectRampCurrency };
};
