import React from "react";
import { IonInput, IonItem, IonLabel, IonNote, IonText } from "@ionic/react";
import { JSX } from "@ionic/core/dist/types/components";

interface IProps extends JSX.IonInput {
  value: string;
  title: string;
  placeholder: string;
  setValue?: (s: string) => void;
  onChange?: any;
  name?: string;
}

const InputField = ({
  title,
  value,
  setValue,
  placeholder,
  onChange,
  name,
  ...props
}: IProps) => {
  return (
    <>
      <IonItem
        lines="full"
        className={`ion-item ${
          props.errorText ? "ion-invalid" : ""
        } ion-touched`}
      >
        <IonLabel position="floating">
          <b>
            {title} <IonText color="danger">*</IonText>
          </b>
        </IonLabel>
        <IonInput
          name={name}
          type="text"
          value={value}
          errorText={props.errorText}
          onIonInput={onChange}
          placeholder={placeholder}
        />
      </IonItem>
      {props.errorText && (
        <IonNote className="ion-margin" color="danger">
          {props.errorText}
        </IonNote>
      )}
    </>
  );
};
export default InputField;
