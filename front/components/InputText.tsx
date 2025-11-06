import { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

interface InputPasswordProps {
  label?: string;
  placeholder?: string;
  model?: 'flat' | 'outlined';
  value ?: string;
  onChangeText ?: (text: string) => void;
  multiline?: boolean;
}

const theme = () => ({
  colors: {
    primary: '#4896b8',
    underlineColor: 'transparent',
    background: '#ffffff',
    text: '#000000',
  },
});

const InputText = ({ label, placeholder, model, value, onChangeText, multiline }: InputPasswordProps) => {
  const [text, setText] = useState('');

  return (
    <TextInput
      mode={model}
      label={label}
      placeholder={placeholder}
      theme={theme()}
      value={value}
      onChangeText={onChangeText}
      right={<TextInput.Affix />}
      style={style.input}
      multiline={multiline}
    />
  );
};

const style = StyleSheet.create({
  input: {
    marginBottom: 6,
    backgroundColor: '#ffffff',
  },
});

export default InputText;