import { IonText, IonToast } from "@ionic/react";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "../../../../common/InputField/InputField";
import Text from "../../../../common/Text/Text";
import { StyledPrimaryButton } from "../../../../../styles/styles";
import { SEND_CODE_VERIFICATION } from "../../../../../store/auth/actions";
import { RootState, useAppDispatch } from "../../../../../store/store";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const StyledContainer = styled("div")`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

interface IProps {
  isSmsSent?: boolean;
}

const mapStateToProps = (state: RootState) => ({
  isSmsSent: state.auth.smsSent,
});

const phoneRegExp = /^\+?[1-9]\d{1,14}$/; // replace this with your phone validation regex

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(13)
    .required(),
});

const Login1 = ({ isSmsSent }: IProps) => {
  const history = useHistory();
  const call = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      call({
        type: SEND_CODE_VERIFICATION,
        payload: values,
      });
    },
  });

  const handleSubmit = () => {
    console.log(formik.values.phone);
    call({
      type: SEND_CODE_VERIFICATION,
      payload: formik.values,
    });
  };

  useEffect(() => {
    if (isSmsSent) {
      history.push("/verification");
    }
  }, [isSmsSent]);

  return (
    <StyledContainer>
      <InputField
        name="phone"
        type="tel"
        onChange={(e: any) => {
          const event = {
            target: {
              name: "phone",
              value: e.detail.value,
            },
          };
          // formik.handleChange(event);
          formik.setFieldValue("phone", e.detail.value);
          setTimeout(() => console.log(formik.values), 500);
        }}
        value={formik.values.phone}
        placeholder="+420 777 777 777"
        title="Phone"
        errorText={formik.errors.phone}
      />
      {!formik.errors.phone && formik.values.phone && (
        <StyledPrimaryButton
          className="ion-margin-top ion-padding-horizontal"
          onClick={handleSubmit}
        >
          <Text weight="bold" color="light">
            Login
          </Text>
        </StyledPrimaryButton>
      )}
    </StyledContainer>
  );
};

export default connect(mapStateToProps)(Login1);
