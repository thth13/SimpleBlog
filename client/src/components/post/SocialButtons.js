import React from 'react';

import fb from '../../img/fb.png';
import tw from '../../img/tw.png';
import gplus from '../../img/g+.png';
import pn from '../../img/pinterest.png';

function SocialButtons(props) {
  return (
    <ul className="post-share">
      <span>Share</span>
      <li>
        <img src={fb} alt="fb" />
      </li>
      <li>
        <img src={tw} alt="tw" />
      </li>
      <li>
        <img src={gplus} alt="g+" />
      </li>
      <li>
        <img src={pn} alt="pn" />
      </li>
    </ul>
  );
}

export default SocialButtons;
