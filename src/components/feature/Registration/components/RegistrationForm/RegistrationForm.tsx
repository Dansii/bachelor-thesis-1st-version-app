import React, { useState } from "react";
import { IonItemGroup } from "@ionic/react";
import InputField from "../../../../common/InputField/InputField";
import { useAppDispatch } from "../../../../../store/store";
import { REGISTRATION } from "../../../../../store/auth/actions";

interface IProps {
  name: string;
  email: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
}
const RegistrationForm = ({ name, setName, email, setEmail }: IProps) => {
  return (
    <IonItemGroup>
      <InputField
        title="Name"
        value={name}
        setValue={setName}
        placeholder="Daniil"
      />
      <InputField
        title="Email"
        value={email}
        setValue={setEmail}
        placeholder="email@email.cz"
      />
    </IonItemGroup>
  );
};
export default RegistrationForm;
