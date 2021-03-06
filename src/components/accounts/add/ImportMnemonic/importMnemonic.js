// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError, change, formValueSelector } from 'redux-form';
import { Button, Warning, WarningHeader, WarningText } from 'emerald-js-ui';
import { required } from 'lib/validators';
import { Form, Row, styles as formStyles } from 'elements/Form';
import TextField from 'elements/Form/TextField';
import DashboardButton from 'components/common/DashboardButton';
import screen from 'store/wallet/screen';
import HdPath from 'components/common/HdPath';

import styles from './importMnemonic.scss';

/**
 * Wrapper for redux-form Field component
 */
const HdPathFormField = (props) => {
  const { input: { value, onChange } } = props;
  return (
    <HdPath value={ value } onChange={ onChange }/>
  );
};

export class ImportMnemonic extends React.Component {
  render() {
    const { onBack, backLabel, invalid, handleSubmit, error } = this.props;
    return (
      <Form caption="Import Mnemonic" backButton={ <DashboardButton onClick={ onBack } label={ backLabel }/> }>
        <Row>
          <div style={ formStyles.left }/>
          <div style={ formStyles.right }>
            <div style={{width: '100%'}}>
              <div className={ styles.passwordLabel }>Enter a strong password</div>
              <div className={ styles.passwordSubLabel }>This password will be required to confirm all account
                        operations.
              </div>
              <div style={{marginTop: '30px'}}>
                <Field
                  hintText="At least 8 characters"
                  name="password"
                  type="password"
                  component={ TextField }
                  fullWidth={ true }
                  underlineShow={ false }
                  validate={ [required] }
                />
              </div>
            </div>
          </div>
        </Row>
        <Row>
          <div style={formStyles.left}/>
          <div style={formStyles.right}>
            <Warning fullWidth={ true }>
              <WarningHeader>Don&#39;t forget it.</WarningHeader>
              <WarningText>If you forget this password, you will lose access to the account and its funds.</WarningText>
            </Warning>
          </div>
        </Row>

        <Row>
          <div style={ formStyles.left }/>
          <div style={ formStyles.right }>
            <div style={{width: '100%'}}>
              <div className={ styles.mnemonicLabel }>HD derivation path</div>
              <div>
                <Field
                  name="hdpath"
                  component={ HdPathFormField }
                  validate={ [required] }
                />
              </div>
            </div>
          </div>
        </Row>

        <Row>
          <div style={formStyles.left}>
          </div>
          <div style={formStyles.right}>
            <div style={{width: '100%'}}>
              <div className={ styles.mnemonicLabel }>Enter a mnemonic phrase</div>
              <div>
                <Field
                  multiLine={ true }
                  rowsMax={ 4 }
                  rows={ 2 }
                  name="mnemonic"
                  component={ TextField }
                  fullWidth={ true }
                  underlineShow={ false }
                  validate={ [required] }
                />
              </div>
            </div>
          </div>
        </Row>

        <Row>
          <div style={formStyles.left}/>
          <div style={formStyles.right}>
            <Button
              primary
              label="Continue"
              disabled={ invalid }
              onClick={ handleSubmit }
            />
          </div>
        </Row>

        {error && (
          <Row>
            <div style={formStyles.left}/>
            <div style={formStyles.right}>
              <Warning>
                <WarningText>{error}</WarningText>
              </Warning>
            </div>
          </Row>
        )}
      </Form>
    );
  }
}

const importForm = reduxForm({
  form: 'importMnemonic',
  fields: ['password', 'mnemonic', 'hdpath'],
})(ImportMnemonic);

export default connect(
  (state, ownProps) => ({
    initialValues: {
      mnemonic: ownProps.mnemonic,
      hdpath: "m/44'/60'/160720'/0'",
    },
  }),
  (dispatch, ownProps) => ({
    onSubmit: (data) => {
      return ownProps.onContinue(data);
    },

    onBack: () => {
      if (ownProps.onBack) {
        ownProps.onBack();
      } else {
        dispatch(screen.actions.gotoScreen('home'));
      }
    },
  })
)(importForm);

