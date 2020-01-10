import { Toast } from 'native-base';

class ToastService {
  closeLabelToast(message: string, callback?: Function) {
    Toast.show({
      text: message,
      buttonText: 'Close',
      duration: 3000,
      onClose: () => {
        if (callback) {
          callback();
        }
      },
    });
  }
}

export default new ToastService();
