interface CounterProps {
  totalNumberOfItems: number;
  numberOfItemsPacked: number;
}

export default function Counter({
  totalNumberOfItems,
  numberOfItemsPacked,
}: CounterProps) {
  return (
    <p>
      <b>{numberOfItemsPacked}</b> /{totalNumberOfItems} items packed
    </p>
  );
}
