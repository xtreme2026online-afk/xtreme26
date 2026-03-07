import React, { useEffect } from 'react'
import Staff from '../components/Staff'

export default function StaffPage() {
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
            <Staff />
        </div>
    )
}
