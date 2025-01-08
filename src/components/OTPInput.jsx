import React, { useState, useRef, useEffect } from 'react';

const OTPInput = ({ length = 6, value = '', onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  useEffect(() => {
    // Update internal state when value prop changes
    if (value) {
      setOtp(value.split('').concat(Array(length).fill('')).slice(0, length));
    }
  }, [value, length]);

  const handleChange = (index, e) => {
    const newValue = e.target.value;
    if (isNaN(newValue)) return;

    const newOtp = [...otp];
    newOtp[index] = newValue.slice(-1);
    setOtp(newOtp);

    // Call parent onChange with concatenated OTP
    const otpString = newOtp.join('');
    onChange?.(otpString);

    // Move to next input if value is entered
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedNumbers = pastedData.replace(/[^0-9]/g, '').slice(0, length);
    
    if (pastedNumbers) {
      const newOtp = pastedNumbers
        .split('')
        .concat(Array(length).fill(''))
        .slice(0, length);
      setOtp(newOtp);
      onChange?.(pastedNumbers);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-12 dark:bg-bgTwo h-14 text-center text-xl font-semibold border dark:border-darkBorder rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
          />
        ))}
      </div>
      <p className="text-sm text-gray-500">
        Enter the verification code sent to your device
      </p>
    </div>
  );
};

export default OTPInput;