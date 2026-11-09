import React from 'react';
import {Composition} from 'remotion';
import {EastmanServices} from './Main';
import {DURATION, FPS, VideoProps} from './theme';

const defaults: VideoProps = {variant: 'evergreen', music: false};

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Services-Vertical" component={EastmanServices} durationInFrames={DURATION} fps={FPS} width={1080} height={1920} defaultProps={defaults} />
    <Composition id="Services-Feed" component={EastmanServices} durationInFrames={DURATION} fps={FPS} width={1080} height={1350} defaultProps={defaults} />
  </>
);
