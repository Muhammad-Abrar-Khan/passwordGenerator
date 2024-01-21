import { useState, useEffect,useCallback } from 'react';

const PasswordGenerator = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(8);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSpecialChars, setIncludeSpecialChars] = useState(false);

    const generatePassword = useCallback(() => {
        const lowerChars = 'abcdefghijklmnopqrstuvwxyz';
        const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        
        let characters = lowerChars + upperChars;
        if (includeNumbers) characters += numbers;
        if (includeSpecialChars) characters += specialChars;

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setPassword(newPassword);
    }, [includeNumbers, includeSpecialChars, length]); 

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password).then(() => {
            alert('Password copied to clipboard!');
        }, () => {
            alert('Failed to copy password to clipboard.');
        });
    };

    useEffect(() => {
        generatePassword();
    }, [length, includeNumbers, includeSpecialChars,generatePassword]);

    return (
        <div className="fixed w-full h-full flex justify-center items-center">
            <div className="w-1/2 flex flex-col justify-center items-center bg-gray-500 rounded-xl p-8 space-y-4">
                <div className="w-full flex justify-between items-center">
                    <input type="text" className="w-3/4 p-2 rounded" value={password} readOnly />
                    <button onClick={copyToClipboard} className="w-1/4 p-2 bg-blue-500 text-white rounded">Copy</button>
                </div>

                <div className="w-full flex  gap-8 items-center space-y-2">

                        <input type="range" min="8" max="100" value={length} onChange={(e) => setLength(e.target.value)} />
                        <span className='text-white '>Length: {length}</span>

                        <label htmlFor="numbers" className='text-white'> 
                        <input type="checkbox" id="numbers"  checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} /> Numbers </label>

                        <label htmlFor="characters" className='text-white '>
                        <input type="checkbox" id="characters" checked={includeSpecialChars} onChange={(e) => setIncludeSpecialChars(e.target.checked)} /> Characters</label>

                </div>
            </div>
        </div>
    );
}

export default PasswordGenerator;
