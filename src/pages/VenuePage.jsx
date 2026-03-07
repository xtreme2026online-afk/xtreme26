import React, { useEffect } from 'react'
import Venue from '../components/Venue'

export default function VenuePage() {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('visible')
                })
            },
            { threshold: 0.1 }
        )
        const els = document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right')
        els.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])

    return (
        <div className="page-container">
            <Venue />
        </div>
    )
}
