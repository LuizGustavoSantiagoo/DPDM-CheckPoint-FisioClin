import { useState } from 'react';
import { TextInput } from 'react-native-paper';

interface InputPasswordProps {
  label?: string;
  placeholder?: string;
  model?: 'flat' | 'outlined';
  value?: string;
  onChangeText?: (text: string) => void;
}


const InputPassword = ({ label, placeholder, model, value, onChangeText }: InputPasswordProps) => {
  const [internalValue, setInternalValue] = useState('');
  const [secure, setSecure] = useState(true);

  const isControlled = value !== undefined;

  const handleChangeText = (text: string) => {
    // Notify parent first if provided
    onChangeText?.(text);
    // Keep internal state in sync only when uncontrolled
    if (!isControlled) setInternalValue(text);
  };

  return (
    <TextInput
      mode={model}
      label={label}
      placeholder={placeholder}
      value={isControlled ? value : internalValue}
      onChangeText={handleChangeText}
      secureTextEntry={secure}
      right={
        <TextInput.Icon
          icon={secure ? 'eye' : 'eye-off'}
          onPress={() => setSecure((s) => !s)}
          forceTextInputFocus={false}
          accessibilityLabel={secure ? 'Mostrar senha' : 'Ocultar senha'}
        />
      }
    />
  );
};

export default InputPassword;