import { useState } from 'react';
import { TextInput } from 'react-native-paper';

interface InputPasswordProps {
  label?: string;
  placeholder?: string;
  model?: 'flat' | 'outlined';
  value ?: string;
  onChangeText ?: (text: string) => void;
}


const InputText = ({ label, placeholder, model, value, onChangeText }: InputPasswordProps) => {
  const [text, setText] = useState('');

  return (
    <TextInput
      mode={model}
      label={label}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      right={<TextInput.Affix />}
    />
  );
};

export default InputText;