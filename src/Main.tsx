import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, Sequence, continueRender, delayRender, interpolate, staticFile} from 'remotion';
import {Background, Grain} from './components/Background';
import {HookAnswer} from './scenes/HookAnswer';
import {Services} from './scenes/Services';
import {Jelly} from './scenes/Jelly';
import {MapScene} from './scenes/MapScene';
import {Trust} from './scenes/Trust';
import {BestPart} from './scenes/BestPart';
import {CTA} from './scenes/CTA';
import {C, DURATION, SCENES, VideoProps} from './theme';

const useFonts = () => {
  const [handle] = useState(() => delayRender('Loading Poppins'));
  useEffect(() => {
    Promise.all(['500', '600', '700', '800'].map((w) => document.fonts.load(`${w} 40px Poppins`)))
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }, [handle]);
};

export const EastmanServices: React.FC<VideoProps> = ({variant, music}) => {
  useFonts();
  const seq = (k: keyof typeof SCENES) => ({from: SCENES[k][0], durationInFrames: SCENES[k][1]});
  return (
    <AbsoluteFill style={{background: C.dark}}>
      <Background />
      <Sequence {...seq('hookAnswer')}>
        <HookAnswer variant={variant} />
      </Sequence>
      <Sequence {...seq('services')}>
        <Services />
      </Sequence>
      <Sequence {...seq('jelly')}>
        <Jelly />
      </Sequence>
      <Sequence {...seq('map')}>
        <MapScene />
      </Sequence>
      <Sequence {...seq('trust')}>
        <Trust />
      </Sequence>
      <Sequence {...seq('best')}>
        <BestPart />
      </Sequence>
      <Sequence {...seq('cta')}>
        <CTA variant={variant} />
      </Sequence>
      <Grain />
      {music ? (
        <Audio src={staticFile('music.mp3')} volume={(f) => interpolate(f, [DURATION - 30, DURATION], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})} />
      ) : null}
    </AbsoluteFill>
  );
};
