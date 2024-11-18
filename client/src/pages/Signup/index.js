import { useReducer, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Grid,
  Typography as T,
  Inputs as I,
  Button,
  Cards,
  Icon,
} from '../../components';
import * as S from './style';
import { useAuth } from './../../context/auth';
import validate from '../../validation/schemas/signup';
import { Users } from '../../api-calls';

import { navRoutes as R, types } from '../../constants';

const { Row, Col } = Grid;

const PasswordTipsContent = (
  <div>
    <T.H3 color="neutralMain">A password must contain:</T.H3>
    <T.P weight="400" color="neutralMain">
      - a minimum of 8 characters
    </T.P>
    <T.P weight="400" color="neutralMain">
      - one capital letter
    </T.P>
    <T.P weight="400" color="neutralMain">
      - one lowercase letter
    </T.P>
    <T.P weight="400" color="neutralMain">
      - one number
    </T.P>
    <T.P weight="400" color="neutralMain">
      - one non alphabetical or numeric character
    </T.P>
  </div>
);

const BackupEmailTipsContent = (
  <div>
    <T.P color="neutralMain" weight="bold">
      To ensure seamless access and security, consider using an email address
      within your organization's domain as the backup email.
      <br />
      This way, even if you leave the organization, they can still access your
      account and maintain control of the account.
    </T.P>
  </div>
);

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  backupEmail: '',
  password: '',
  organisationName: '',
  typeOfOrganisation: '',
  agreedOnTerms: false,
  httpError: '',
  validationErrs: {},
  loading: false,
};

function reducer(state, newState) {
  return { ...state, ...newState };
}
const cleanEmail = (email) => email.toLowerCase().trim();

const SignUp = () => {
  const submitAttempt = useRef(false);
  const [passwordTipVisible, setPasswordTipVisible] = useState(false);
  const [state, setState] = useReducer(reducer, initialState);
  const {
    firstName,
    lastName,
    email,
    backupEmail,
    password,
    organisationName,
    typeOfOrganisation,
    agreedOnTerms,
    loading,
    validationErrs,
    httpError,
  } = state;
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    if (submitAttempt.current) {
      validateForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    firstName,
    lastName,
    email,
    backupEmail,
    password,
    organisationName,
    typeOfOrganisation,
    agreedOnTerms,
  ]);

  const validateForm = () => {
    try {
      validate({
        email: cleanEmail(email),
        firstName,
        lastName,
        backupEmail,
        password,
        organisationName,
        typeOfOrganisation,
        agreedOnTerms,
      });
      setState({ validationErrs: {} });
      return true;
    } catch (error) {
      if (error.name === 'ValidationError') {
        setState({ validationErrs: error.inner });
      }
      return false;
    }
  };

  const handleSignup = async () => {
    setState({ loading: true });
    const { error, data } = await Users.signup({
      email: cleanEmail(email),
      firstName,
      lastName,
      backupEmail,
      password,
      organisationName,
      typeOfOrganisation,
      agreedOnTerms,
    });

    setState({ loading: false });

    if (error) {
      if (error.statusCode === 409) {
        setState({ validationErrs: { [error.data.field]: error.message } });
      } else {
        setState({ httpError: error.message });
      }
    } else {
      setUser(data);
      navigate(R.ADMIN.SUCCESS_SIGNUP);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    submitAttempt.current = true;

    const isValid = validateForm();
    if (isValid) {
      handleSignup();
    }
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <T.H1 weight="bold">Sign up</T.H1>
      <Row mt="50px">
        <Col w={[4, 11, 6]}>
          <I.BasicInput
            label="First name"
            placeholder="Type your first name..."
            margins={{ mt: '2', mb: '1' }}
            value={firstName}
            name="firstName"
            autoFocus
            handleChange={(value) => setState({ firstName: value })}
            error={validationErrs.firstName}
          />
        </Col>
      </Row>
      <Row mt="6">
        <Col w={[4, 11, 6]}>
          <I.BasicInput
            label="Last name"
            placeholder="Type your last name..."
            margins={{ mt: '2', mb: '1' }}
            value={lastName}
            name="lastName"
            handleChange={(value) => setState({ lastName: value })}
            error={validationErrs.lastName}
          />
        </Col>
      </Row>
      <Row mt="6">
        <Col w={[4, 11, 6]}>
          <I.BasicInput
            label="Email address"
            placeholder="Type your email..."
            margins={{ mt: '2', mb: '1' }}
            type="email"
            name="email"
            value={email}
            handleChange={(input) => setState({ email: input })}
            error={validationErrs.email}
          />
        </Col>
      </Row>
      <Row mt="6">
        <Col w={[4, 11, 6]}>
          <I.BasicInput
            mb={2}
            label="Back up email address"
            placeholder="Type your backup email..."
            margins={{ mt: '2', mb: '1' }}
            type="email"
            name="backupEmail"
            value={backupEmail}
            onFocus={() => setState({ showBackupEmailTip: true })}
            handleChange={(input) => setState({ backupEmail: input })}
            error={validationErrs.backupEmail}
            helper="Enter your prefer back up email address in the event you leave the organisation"
          />
          {state?.showBackupEmailTip && (
            <Cards.Tips tips={[BackupEmailTipsContent]} startingColor={1} />
          )}
        </Col>
      </Row>
      <Row mt="6">
        <Col w={[4, 11, 6]}>
          <I.BasicInput
            mb="4"
            label={
              <div style={{ display: 'flex' }}>
                Password{' '}
                <Icon
                  ml="1"
                  width="16"
                  height="16"
                  color="secondaryMain"
                  icon="question"
                  onClick={() => setPasswordTipVisible((_) => !_)}
                />
              </div>
            }
            placeholder="Create a password..."
            margins={{ mt: '2', mb: '1' }}
            type="password"
            value={password}
            handleChange={(input) => setState({ password: input })}
            error={validationErrs.password}
          />

          {passwordTipVisible && (
            <Cards.Tips tips={[PasswordTipsContent]} startingColor={3} />
          )}
        </Col>
      </Row>
      <Row mt="4">
        <Col w={[4, 11, 6]}>
          <I.BasicInput
            label="Organisation"
            placeholder="Type your organisation name..."
            margins={{ mt: '2', mb: '1' }}
            name="organisationName"
            value={organisationName}
            handleChange={(input) => setState({ organisationName: input })}
            error={validationErrs.organisationName}
          />
        </Col>
      </Row>
      <Row mt="7">
        <Col w={[4, 11, 6]}>
          <I.Dropdown
            label="Type of organisation"
            placeholder="Select organisation..."
            margins={{ mt: '2', mb: '1' }}
            name="typeOfOrganisation"
            allowClear={false}
            selected={typeOfOrganisation}
            options={Object.values(types.organisationTypes).map((e) => ({
              label: e,
              value: e,
            }))}
            handleChange={(input) => setState({ typeOfOrganisation: input })}
            error={validationErrs.typeOfOrganisation}
          />
        </Col>
      </Row>
      <Row mt="44px">
        <Col w={[4, 11, 6]}>
          <I.Checkbox
            checked={agreedOnTerms}
            handleChange={(v) => setState({ agreedOnTerms: v })}
            ai="flex-start"
            label={
              <T.P>
                I agree to the{' '}
                <T.Link
                  external
                  underline
                  color="neutralMain"
                  weight="semi"
                  to={R.EXTERNAL.TERMS_OF_USE}
                >
                  Terms of use
                </T.Link>
                . By clicking submit I acknowledge the Privacy{' '}
                <T.Link
                  external
                  underline
                  color="neutralMain"
                  weight="semi"
                  to={R.EXTERNAL.PRIVACY_POLICY}
                >
                  Privacy Policy
                </T.Link>
                .
              </T.P>
            }
            error={validationErrs.agreedOnTerms}
          />
        </Col>
      </Row>
      <Row mt="28px">
        <Col w={[4, 11, 6]}>
          {httpError && (
            <T.P mb="2" color="error">
              {httpError}
            </T.P>
          )}
          <Button
            variant="primary"
            loading={loading}
            text="Sign up"
            type="submit"
          />
        </Col>
      </Row>
    </S.Form>
  );
};

export default SignUp;
