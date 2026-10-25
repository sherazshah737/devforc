import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../config';
import {fontFamily} from '../fonts';
import {progress} from '../lib/anim';

export type ChatMessage = {from: 'user' | 'biz'; text: string; at: number};

const Dots: React.FC<{frame: number}> = ({frame}) => (
  <div style={{display: 'flex', gap: 10, padding: '6px 4px'}}>
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        style={{
          width: 14,
          height: 14,
          borderRadius: 7,
          background: colors.grayDark,
          transform: `translateY(${Math.sin((frame + i * 4) / 3) * -5}px)`,
        }}
      />
    ))}
  </div>
);

/** DM-style chat card. Message `at` is the frame (in the scene) the bubble pops in; replies show typing dots first. */
export const ChatCard: React.FC<{
  handle: string;
  messages: ChatMessage[];
  at: number;
  width?: number;
  height?: number;
}> = ({handle, messages, at, width = 900, height = 620}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cardP = progress(frame, at, 18);

  return (
    <div
      style={{
        width,
        height,
        borderRadius: 40,
        background: colors.white,
        boxShadow: '0 40px 90px rgba(60,10,20,0.22)',
        overflow: 'hidden',
        opacity: cardP,
        filter: cardP < 1 ? `blur(${(1 - cardP) * 12}px)` : undefined,
        transform: `translateY(${(1 - cardP) * 50}px)`,
        display: 'flex',
        flexDirection: 'column',
        fontFamily,
        fontStyle: 'italic',
      }}
    >
      <div
        style={{
          height: 110,
          flex: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          padding: '0 36px',
          borderBottom: '2px solid #EEEBEA',
        }}
      >
        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: 31,
            background: `linear-gradient(135deg, ${colors.burgundy}, ${colors.deepBurgundy})`,
          }}
        />
        <div>
          <div style={{fontSize: 36, fontWeight: 700, color: colors.ink}}>{handle}</div>
          <div style={{fontSize: 24, color: '#8C8482'}}>Active now</div>
        </div>
      </div>
      <div style={{flex: 1, padding: 36, display: 'flex', flexDirection: 'column', gap: 26, justifyContent: 'flex-end'}}>
        {messages.map((m, i) => {
          const isUser = m.from === 'user';
          const typingFrom = m.at - 26;
          const showTyping = !isUser && frame >= typingFrom && frame < m.at;
          const pop = spring({frame: frame - m.at, fps, config: {damping: 14, stiffness: 170}});
          const visible = frame >= m.at;
          return (
            <React.Fragment key={i}>
              {showTyping && (
                <div style={{alignSelf: 'flex-start', background: '#F0EDEC', borderRadius: 36, padding: '18px 26px'}}>
                  <Dots frame={frame} />
                </div>
              )}
              {visible && (
                <div
                  style={{
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    background: isUser ? colors.burgundy : '#F0EDEC',
                    color: isUser ? colors.offWhite : colors.ink,
                    fontSize: 46,
                    padding: '22px 36px',
                    borderRadius: 40,
                    borderBottomRightRadius: isUser ? 10 : 40,
                    borderBottomLeftRadius: isUser ? 40 : 10,
                    transform: `scale(${0.6 + 0.4 * pop})`,
                    transformOrigin: isUser ? 'bottom right' : 'bottom left',
                    opacity: Math.min(1, pop * 1.5),
                  }}
                >
                  {m.text}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
