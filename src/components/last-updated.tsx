'use client';

import { useState, useEffect } from 'react';

export default function LastUpdated() {
    const [date, setDate] = useState('');

    useEffect(() => {
        // We need to make sure this only runs on the client
        setDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    }, []);

    if (!date) {
        // Return a placeholder to prevent layout shift and avoid hydration mismatch
        return <p className="text-sm text-muted-foreground">&nbsp;</p>;
    }

    return (
        <p className="text-sm text-muted-foreground">Last Updated: {date}</p>
    );
}
