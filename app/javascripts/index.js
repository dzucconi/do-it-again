import moment from 'moment';

const DOM = {
  app: document.getElementById('app'),
};

const render = t => {
  const now = t();
  return `
    <div class='clock'>
      <div class='clock__units'>
        ${now.format('YY:MM:GG:DD:HH:mm:ss:SSS')}
      </div>

      <div class='clock__readable'>
        ${now.format('LLLL')}
      </div>
    </div>
  `;
};

const units = [
  'years',
  'months',
  'days',
  'hours',
  'minutes',
  'seconds',
  'milliseconds',
];

const move = method => {
  const then = moment();
  units.forEach(unit => then[method](1, unit));
  return then;
};

export default () => {
  const now = () => moment();
  const past = () => move('subtract');
  const future = () => move('add');

  const tick = () => DOM.app.innerHTML = `
    <div class='clocks'>
      ${render(past)}
      ${render(now)}
      ${render(future)}
    </div>
  `;

  tick();
  setInterval(tick, 1);
};
