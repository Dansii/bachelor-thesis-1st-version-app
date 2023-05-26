import { IonToast } from "@ionic/react";

interface TProps {
  active?: boolean;
  setActive?: (value: boolean) => void;
  text: string;
}

const Toast = ({ active = true, setActive = () => {}, text }: TProps) => {
  return (
    <IonToast
      isOpen={active}
      onDidDismiss={() => setActive(false)}
      message={text}
      duration={1500}
    />
  );
};

export default Toast;
