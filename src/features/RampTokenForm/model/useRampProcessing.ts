import NiceModal from '@ebay/nice-modal-react';

import { MunzenOrder } from '@/entities/Munzen';
import {
  RampAlertStepModal,
  RampWidgetStepModal,
} from '@/features/RampTokenForm';

interface RampData {
  toCurrency: string;
  fromCurrency: string;
  fromAmount: number;
  toWallet: string;
}

export const useRampProcessing = () => {
  const rampAlertModal = NiceModal.useModal(RampAlertStepModal);
  const rampWidgetModal = NiceModal.useModal(RampWidgetStepModal);

  const ramp = (data: RampData) =>
    rampAlertModal
      .show()
      .then(() => {
        rampAlertModal.remove();
        return rampWidgetModal.show({ ...data }) as Promise<MunzenOrder>;
      })
      .finally(() => {
        rampAlertModal.remove();
      });

  return { ramp };
};
