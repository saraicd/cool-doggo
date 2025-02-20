"use client";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Quote = () => {
    const [advice, setAdvice] = useState('');
    const router = useRouter();
    const [shrink, setShrink] = useState(false);

    useEffect(() => {
        fetchAdvice();
    }, []);

    const handleClick = () => {
        setShrink(true);
        setTimeout(() => {
            router.push('/');
        }, 800);
    };

    const fetchAdvice = async () => {
        try {
            const response = await fetch('https://api.adviceslip.com/advice');
            const data = await response.json();
            setAdvice(data.slip.advice);
        } catch (error) {
            console.error('Error fetching the advice:', error);
        }
    };

    return (
        <motion.div
            className="cursor-pointer"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={shrink ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onClick={handleClick}
        >
            <div className="flex flex-col items-center justify-center">
                {advice && (
                    <p className="mt-4 text-lg main-text">
                        &quot;{advice}&quot;
                    </p>
                )}
            </div>
        </motion.div>
    );
};

export default Quote;