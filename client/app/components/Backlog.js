import React from 'react';
import { pure } from 'recompose';
import classnames from 'classnames';

import Stories from './Stories';
import StoryAddForm from './StoryAddForm';
import zuehlkeLogo from '../assets/logo-zuehlke-small.png';

const Backlog = ({ stories, selectedStory, showMenu, actions }) => {

  const hasStories = stories && !!stories.size;

  const backlogClasses = classnames('backlog', {
    'backlog-active': showMenu // if true, show menu also in small screens (menu toggle)
  });

  return (
    <div className={backlogClasses}>

      <StoryAddForm onAddStory={actions.addStory}/>

      {
        hasStories &&
        <Stories stories={stories} selectedStory={selectedStory} actions={actions}/>
      }

      {
        !hasStories &&
        <div className='story-hint'>You don't have any stories in your estimation backlog...</div>
      }

      <div className='logo-wrapper'>
        <img src={zuehlkeLogo}/>
      </div>
    </div>
  );
};


export default pure(Backlog);
