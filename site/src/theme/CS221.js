import React, { useState } from 'react';

function train({ iterations = 200, learningRate = 0.1, log = console.log.bind(console) } = {}) {
  // 训练集
  const trainSet = [
    [1, 1],
    [2, 3],
    [4, 3],
  ];
  log(`train epochs:${iterations} eta:${learningRate}`);
  // Optimization problem
  // 1/3 * sum((w*phi(x) - y) ^ 2)
  const trainLoss = (w) => {
    let sum = 0;
    for (const [x, y] of trainSet) {
      sum += (w[0] * 1 + w[1] * x - y) ** 2;
    }
    return sum * (1 / trainSet.length);
  };
  // 1/3 * sum(2(w*phi(x) - y)phi(x))
  const gradientTrainLoss = (w) => {
    let sum = [0, 0];
    for (const [x, y] of trainSet) {
      let d = 2 * (w[0] * 1 + w[1] * x - y);
      let z = [d * 1, d * x];
      sum = [sum[0] + z[0], sum[1] + z[1]];
    }
    const loss = [sum[0] * (1.0 / trainSet.length), sum[1] * (1.0 / trainSet.length)];
    return loss;
  };
  // Optimization algorithm
  const gradientDescent = (F, gradientF, initialWeightVector) => {
    let w = initialWeightVector;
    let eta = learningRate;
    for (let i = 0; i < iterations; i++) {
      let value = F(w);
      let gradient = gradientF(w);
      w = [w[0] - eta * gradient[0], w[1] - eta * gradient[1]];
      //
      log(`epoch ${i + 1}:`, `w: ${w}, F(w)=${value}, gradient: ${gradient}`);
    }
    return w;
  };
  const w = gradientDescent(trainLoss, gradientTrainLoss, [0, 0]);
  log(`w: ${w}`);
  return { w };
}

export function Lession2Demo(props) {
  const [state, setState] = useState({
    iterations: 200,
    learningRate: 0.1,
    logs: [],
    w: [0, 0],
  });

  return (
    <div>
      <button
        onClick={() => {
          setState({ ...state, logs: [`⏱ ${new Date().toLocaleString()}`] });
          const { w } = train({
            iterations: state.iterations,
            learningRate: state.learningRate,
            log: (...args) =>
              setState((s) => {
                return { ...s, logs: [...s.logs, args.join(' ')] };
              }),
          });
        }}
      >
        Run
      </button>
      <div style={{ display: 'flex', flexFlow: 'column' }}>
        <label>
          iterations:{' '}
          <input
            type="number"
            step="1"
            value={state.iterations}
            onChange={(e) => setState({ ...state, iterations: e.currentTarget.valueAsNumber })}
          />
        </label>
        <label>
          learningRate:{' '}
          <input
            type="number"
            min="0.001"
            step="0.001"
            value={state.learningRate}
            onChange={(e) =>
              setState({
                ...state,
                learningRate: e.currentTarget.valueAsNumber,
              })
            }
          />
        </label>
      </div>
      <h2>
        Logs <small>F(w)⬇️, gradient ⬇️ </small>
      </h2>
      <pre style={{ overflow: 'auto', height: '240px' }}>
        {state.logs.map((v, i) => (
          <div key={i}>{v}</div>
        ))}
      </pre>
    </div>
  );
}
