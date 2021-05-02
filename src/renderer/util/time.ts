const timeFormat = /^((?<hh>\d{1,2}):)?(?<mm>\d{1,2}):(?<ss>\d{1,2})(\.(?<ms>\d+))?$/;

const formatTime = (num: number | string) => {
  return `00${num.toString()}`.slice(-2);
};

const formatMs = (ms: number | string) => {
  return `${ms.toString()}000`.slice(0, 3);
};

export const timeToSeconds = (time: number | string) => {
  const numTime = Number(time);
  const match = typeof time === 'string' ? time.match(timeFormat) : null;

  if (match) {
    let sec = 0;
    sec += parseInt(match?.groups?.hh || '0', 10) * 3600;
    sec += parseInt(match?.groups?.mm || '0', 10) * 60;
    sec += parseInt(match?.groups?.ss || '0', 10);
    sec += Number(`0.${match?.groups?.ms?.slice(0, 3) || '0'}`);
    return sec;
  }
  if (!Number.isNaN(numTime) && numTime >= 0) {
    return numTime;
  }
  return 0;
};

export const secondsToStringTime = (time: number | string) => {
  const numTime = Number(time);
  const match = typeof time === 'string' ? time.match(timeFormat) : null;

  if (match) {
    return `${formatTime(match?.groups?.hh || 0)}:${formatTime(
      match?.groups?.mm || 0
    )}:${formatTime(match?.groups?.ss || 0)}.${formatMs(
      match?.groups?.ms || 0
    )}`;
  }
  if (!Number.isNaN(numTime) && numTime >= 0) {
    const strTime = numTime.toString();
    const splitedTime = strTime.split('.');
    const secs = parseInt(strTime, 10);
    const ms = splitedTime.length === 2 ? parseInt(splitedTime[1], 10) : 0;
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs - h * 3600) / 60);
    const s = secs - h * 3600 - m * 60;

    return `${formatTime(h)}:${formatTime(m)}:${formatTime(s)}.${formatMs(ms)}`;
  }
  return '00:00:00.000';
};
