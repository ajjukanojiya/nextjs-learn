'use client'
import { useCounterStore } from '@/stores/useCounterStore';
import { ajay } from '@/stores/useCounterStore';

export default function CounterComponent() {
  // Store se state aur actions nikale
  const count = ajay((state) => state.count);
  const increment = ajay((state) => state.increment);
  const decrement = ajay((state) => state.decrement);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Plus +</button>
      <button onClick={decrement} style={{ marginLeft: '10px' }}>Minus -</button>
    </div>
  );
}