import React, {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {EVENTS} from '../data/events';
import ParticipantBlock from '../components/ParticipantBlock';
import QRCode from '../components/QRCode';
import Button from '../components/Button';
import '../styles/register.css';

gsap.registerPlugin(ScrollTrigger);

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzUGBuT7yJYreBoNaem7TPUZDZcCAN_zz6dnelOGfbwcsqJKLiWK67a23ThFV0OogfM/exec';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeTvUvfrr12fZi2AXQSTEEXEw2-hb7HdqLxB8Qpc1VZhDrc-g/viewform?usp=header';

const emptyMember = () => ({
  name: '',
  email: '',
  phone: '',
  college: '',
  year: '',
  dept: '',
  rollNo: '',
});

const STEP_LABELS = ['Details', 'Event', 'Payment', 'Submit'];

// ── Step Indicator ────────────────────────────────────────────────
function StepIndicator({step, total}) {
  return (
    <div className='step-indicator'>
      {Array.from({length: total}, (_, i) => (
        <React.Fragment key={i}>
          <div className='step-wrapper'>
            <div
              className={`step-dot ${
                step > i + 1 ? 'completed'
                : step === i + 1 ? 'active'
                : ''
              }`}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className='step-label'>{STEP_LABELS[i]}</span>
          </div>
          {i < total - 1 && <div className={`step-line${step > i + 1 ? ' completed' : ''}`} />}
        </React.Fragment>
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────
export default function RegisterPage() {
  const navigate = useNavigate();
  const pageRef = useRef(null);

  const [tab, setTab] = useState('individual');
  const [step, setStep] = useState(1);

  const [primary, setPrimary] = useState(emptyMember());
  const [members, setMembers] = useState([emptyMember()]);
  const [teamName, setTeamName] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState(null);

  useGSAP(
    () => {
      gsap.fromTo(
        '.section-tag, .section-title, .section-subtitle',
        {opacity: 0, y: 30},
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
        },
      );

      gsap.fromTo(
        '.form-container',
        {opacity: 0, y: 40},
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4,
        },
      );
    },
    {scope: pageRef},
  );

  const switchTab = (t) => {
    setTab(t);
    setStep(1);
    setMembers([emptyMember()]);
  };

  const updatePrimary = (field, val) => setPrimary((p) => ({...p, [field]: val}));
  const updateMember = (idx, field, val) => {
    setMembers((ms) => ms.map((m, i) => (i === idx ? {...m, [field]: val} : m)));
  };
  const addMember = () => setMembers((ms) => [...ms, emptyMember()]);
  const removeMember = (idx) => setMembers((ms) => ms.filter((_, i) => i !== idx));

  const eventObj = EVENTS.find((e) => e.title === selectedEvent);

  const validateStep1 = () => {
    const {name, email, phone, college, year, dept, rollNo} = primary;
    return name && email && phone && college && year && dept && rollNo;
  };

  const submitForm = async () => {
    const allMembers = [{...primary}, ...members];
    const payload = {
      type: tab,
      event: selectedEvent,
      teamName: tab === 'team' ? teamName : '',
      transactionId,
      members: allMembers,
      timestamp: new Date().toISOString(),
    };
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type': 'text/plain;charset=utf-8'},
        body: JSON.stringify(payload),
      });
    } catch (_) {}
    navigate('/success');
  };

  return (
    <div className='register-page' ref={pageRef}>
      <div className='section-inner'>
        <div className='section-tag'>Join The Competition</div>
        <h2 className='section-title'>
          Register for <em>XTREME 2026</em>
        </h2>
        <p className='section-subtitle'>March 27, 2026 · Complete your registration below. Limited seats!</p>

        <div className='form-container'>
          {/* Tabs */}
          <div className='reg-tabs'>
            <button className={`reg-tab${tab === 'individual' ? ' active' : ''}`} onClick={() => switchTab('individual')}>
              👤 Individual
            </button>
            <button className={`reg-tab${tab === 'team' ? ' active' : ''}`} onClick={() => switchTab('team')}>
              👥 Team Event
            </button>
          </div>
          <StepIndicator step={step} total={4} />
          {/* ── STEP 1: Primary Details ── */}
          <div className={`form-step${step === 1 ? ' active' : ''}`}>
            <h3 className='form-step-title'>Step 1 — {tab === 'individual' ? 'Your Details' : 'Team Leader Details'}</h3>
            <p className='form-step-hint'>{tab === 'team' ? 'You are the Team Leader. Additional members will be added in Step 2.' : 'Fill in your personal information below.'}</p>
            <ParticipantBlock title={tab === 'team' ? '👑 Team Leader (You)' : '👤 Participant Details'} data={primary} onChange={updatePrimary} />
            <div className='form-nav'>
              <div />
              <Button variant='primary' onClick={() => (validateStep1() ? setStep(2) : alert('Please fill all required fields including Roll Number'))}>
                Next →
              </Button>
            </div>
          </div>
          {/* ── STEP 2: Event + Team Members ── */}
          <div className={`form-step${step === 2 ? ' active' : ''}`}>
            <h3 className='form-step-title'>Step 2 — Event Selection{tab === 'team' ? ' & Team Members' : ''}</h3>

            {tab === 'team' && (
              <div className='form-group'>
                <label className='form-label'>
                  Team Name <span>*</span>
                </label>
                <input className='form-input' value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder='Enter your team name' />
              </div>
            )}

            <div className='form-group'>
              <label className='form-label'>
                Select Event <span>*</span>
              </label>
              <select className='form-select' value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)}>
                <option value=''>Choose an event...</option>
                {EVENTS.map((ev) => (
                  <option key={ev.id} value={ev.title}>
                    {ev.icon} {ev.title} · Team: {ev.size}
                  </option>
                ))}
              </select>
              {eventObj && (
                <div className='event-preview'>
                  <div className='event-preview-grid'>
                    <span>📍 {eventObj.venue}</span>
                    {eventObj.time && <span>🕘 {eventObj.time}</span>}
                    <span>👥 Team: {eventObj.size}</span>
                    {eventObj.prize && <span>🏆 Prize: {eventObj.prize}</span>}
                  </div>
                </div>
              )}
            </div>

            {tab === 'team' && (
              <div style={{marginTop: '1.5rem'}}>
                <div className='team-members-heading'>Team Members (other than Team Leader)</div>
                {members.map((m, i) => (
                  <ParticipantBlock
                    key={i}
                    title={`👤 Member ${i + 2}`}
                    data={m}
                    onChange={(field, val) => updateMember(i, field, val)}
                    removable={members.length > 1}
                    onRemove={() => removeMember(i)}
                  />
                ))}
                {members.length < 2 && (
                  <Button variant='secondary' className='add-member-btn' onClick={addMember}>
                    + Add Another Member
                  </Button>
                )}
                <p className='member-count-hint'>Maximum 3 members total (including team leader)</p>
              </div>
            )}

            <div className='form-nav'>
              <Button variant='secondary' onClick={() => setStep(1)}>
                ← Back
              </Button>
              <Button
                variant='primary'
                onClick={() => {
                  if (!selectedEvent) {
                    alert('Please select an event');
                    return;
                  }
                  if (tab === 'team' && !teamName) {
                    alert('Please enter a team name');
                    return;
                  }
                  setStep(3);
                }}>
                Next →
              </Button>
            </div>
          </div>
          {/* ── STEP 3: Payment ── */}
          <div className={`form-step${step === 3 ? ' active' : ''}`}>
            <h3 className='form-step-title'>Step 3 — Payment</h3>

            <div className='payment-box'>
              <div className='payment-label'>Registration Fee</div>
              <div className='payment-amount'>{'₹100/team'}</div>
              <p style={{fontSize: '.8rem', color: 'rgba(255,255,255,.4)', marginBottom: '1rem'}}>Scan the QR below to pay via GPay / PhonePe / Paytm</p>
              <div className='payment-qr-wrap'>
                <div className='payment-qr'>
                  <QRCode />
                </div>
              </div>
              <div className='payment-upi'>UPI ID: xtreme2026@sbibank</div>
              <div className='payment-bank'>Name: Sri Karuna CSE Dept | Bank: SBI</div>
            </div>

            <div className='form-group'>
              <label className='form-label'>
                Transaction ID / UTR Number <span>*</span>
              </label>
              <input className='form-input' value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder='e.g., T2026032712345678' />
              <p className='form-hint'>Find this in your payment app under transaction history</p>
            </div>

            <div className='form-group'>
              <label className='form-label'>
                Upload Payment Screenshot <span>*</span>
              </label>
              <div className='upload-zone' onClick={() => document.getElementById('ss-upload').click()}>
                <span className='upload-icon'>📸</span>
                <div className='upload-text'>{screenshot ? `✅ ${screenshot}` : 'Click to upload screenshot of payment'}</div>
                <div className='upload-hint'>PNG, JPG accepted · Max 5MB</div>
              </div>
              <input id='ss-upload' type='file' accept='image/*' style={{display: 'none'}} onChange={(e) => setScreenshot(e.target.files[0]?.name || null)} />
            </div>

            <div className='form-nav'>
              <Button variant='secondary' onClick={() => setStep(2)}>
                ← Back
              </Button>
              <Button
                variant='primary'
                onClick={() => {
                  if (!transactionId || !screenshot) {
                    alert('Please enter Transaction ID and upload screenshot');
                  } else {
                    setStep(4);
                  }
                }}>
                Next →
              </Button>
            </div>
          </div>
          {/* ── STEP 4: Review & Submit ── */}
          <div className={`form-step${step === 4 ? ' active' : ''}`}>
            <h3 className='form-step-title'>Step 4 — Review &amp; Submit</h3>

            {/* Summary */}
            <div className='review-box'>
              <div className='review-box-title'>Registration Summary</div>
              {[
                ['Registration Type', tab === 'individual' ? 'Individual' : 'Team'],
                ['Event', selectedEvent],
                tab === 'team' ? ['Team Name', teamName] : null,
                ['Transaction ID', transactionId],
                ['Screenshot', screenshot],
              ]
                .filter(Boolean)
                .map(([label, val]) => (
                  <div key={label} className='review-row'>
                    <span className='review-label'>{label}</span>
                    <span className='review-value'>{val || '—'}</span>
                  </div>
                ))}
            </div>

            {/* Participants */}
            <div className='review-box'>
              <div className='review-box-title'>Participants ({tab === 'team' ? 1 + members.length : 1})</div>
              {[{...primary, label: tab === 'team' ? 'Team Leader' : 'Participant'}, ...(tab === 'team' ? members.map((m, i) => ({...m, label: `Member ${i + 2}`})) : [])].map(
                (p, i) => (
                  <div key={i} className='member-summary-item'>
                    <div className='member-summary-role'>{p.label}</div>
                    <div className='member-summary-name'>{p.name || '—'}</div>
                    <div className='member-summary-meta'>
                      {p.email} · {p.phone} · Roll: {p.rollNo}
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className='confirm-notice'>
              ✅ By submitting, you confirm all information is accurate and you agree to abide by all event rules and regulations of XTREME 2026.
            </div>

            <div className='form-nav'>
              <Button variant='secondary' onClick={() => setStep(3)}>
                ← Back
              </Button>
              <Button variant='primary' onClick={submitForm}>
                🚀 Submit Registration
              </Button>
            </div>
          </div>{' '}
          {/* End Step 4 */}
          {/* Alternative: Google Form (Visible on all steps) */}
          <div className='form-option-divider'>OR use Google Form</div>
          <a className='google-form-btn' href={GOOGLE_FORM_URL} target='_blank' rel='noopener noreferrer'>
            <svg width='20' height='20' viewBox='0 0 24 24'>
              <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z' />
              <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z' />
              <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z' />
              <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z' />
            </svg>
            Register via Google Form (Alternative)
          </a>
        </div>
      </div>
    </div>
  );
}
