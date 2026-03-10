import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '../components/Button';
import '../styles/success.css';

const WHATSAPP_LINK = 'https://chat.whatsapp.com/GaKURLFdzWRE07XRgew0Zp';

const CHECKLIST = [
  'Check your email for confirmation within 24 hours',
  'Join the WhatsApp group for real-time updates',
  'Arrive at the venue by 8:00 AM on March 27',
  'Carry your college ID card and registration printout',
];

export default function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className='success-page'>
      <div className='success-inner'>
        <div className='success-icon'>✨</div>

        <h1 className='success-title'>You&apos;re Registered!</h1>

        <p className='success-body'>
          Congratulations! Your registration for <strong>XTREME 2026</strong> has been received successfully. We&apos;ll verify your payment and send a confirmation to your email
          within 24 hours.
        </p>

        <div style={{marginBottom: '2rem'}}>
          <a className='whatsapp-btn' href={WHATSAPP_LINK} target='_blank' rel='noopener noreferrer'>
            <span>💬</span>
            Join WhatsApp Group for Updates
          </a>
        </div>

        <div className='success-actions'>
          <Button variant='secondary' to='/'>
            ← Back to Home
          </Button>
          <Button variant='secondary' to='/register'>
            Register for Another Event
          </Button>
        </div>

        <div className='success-checklist'>
          <div className='success-checklist-title'>What&apos;s Next?</div>
          {CHECKLIST.map((item, i) => (
            <div key={i} className='success-checklist-item'>
              <span className='success-checklist-num'>{i + 1}.</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
