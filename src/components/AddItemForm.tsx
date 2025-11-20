import { useRef, useState } from 'react';
import Button from './Button';

interface AddItemFormProps {
  onAddItem: (text: string) => void;
}

export default function AddItemForm({ onAddItem }: AddItemFormProps) {
  const [itemText, setItemText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!itemText) {
      alert('Item name cannot be empty');
      inputRef.current?.focus();
      return;
    }

    onAddItem(itemText);
    setItemText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Item Form</h2>
      <input
        ref={inputRef}
        value={itemText}
        onChange={handleChange}
        autoFocus={true}
      />
      <Button>Add to list</Button>
    </form>
  );
}
