import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Avatar from './Avatar';
import {hideNewUserHints} from '../actions';
import {StyledFeedbackHint} from '../styled/FeedbackHint';

const FeedbackHint = ({hideHints, hideNewUserHints}) => {
  if (hideHints) {
    return null;
  }

  return (
    <StyledFeedbackHint>
      <i className="fa fa-times hide-hints" onClick={() => hideNewUserHints()}></i>
      <div style={{width: '45px'}}>
        <Avatar user={{email: 'set@zuehlke.com'}} index={0} />
      </div>
      <div>
        Hey there! Do you use Poinz on a regular basis? I would be very interested in your{' '}
        <a href="https://github.com/Zuehlke/poinz/issues" target="_blank" rel="noopener noreferrer">
          feedback!
        </a>
      </div>
    </StyledFeedbackHint>
  );
};

FeedbackHint.propTypes = {
  hideHints: PropTypes.bool,
  hideNewUserHints: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    hideHints: state.hideNewUserHints
  }),
  {hideNewUserHints}
)(FeedbackHint);
