import { useRef, useState } from 'react';
import Button from './Button';

export default function AddItemForm({ onAddItem }) {
  const [itemText, setItemText] = useState('');
  const inputRef = useRef();

  const handleChange = (e) => {
    setItemText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!itemText) {
      alert('Item name cannot be empty');
      inputRef.current.focus();
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
