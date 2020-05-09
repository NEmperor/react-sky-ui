import React  from 'react';

export interface TimerProps {
    /**
     * 计时器开关
     */
    timeSwitch: boolean;
    style?: React.CSSProperties;
}


export default class Timer extends React.Component<TimerProps, any> {}