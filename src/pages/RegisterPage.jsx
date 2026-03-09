import React, {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import {EVENTS} from '../data/events';
import Button from '../components/Button';
import '../styles/register.css';

const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxoJZ2sZio-_oziI-eY3vizSHbZv3nLXzNhJJeBtt9bUfoGmodcgy_ZzaJn0pUQpNHr/exec';
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeTvUvfrr12fZi2AXQSTEEXEw2-hb7HdqLxB8Qpc1VZhDrc-g/viewform?usp=header';

const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
const STEP_LABELS = ['Details', 'Events', 'Payment', 'Submit'];

// Split events into two groups of 3
const GROUP_A = EVENTS.slice(0, 3); // Events 1-3
const GROUP_B = EVENTS.slice(3, 6); // Events 4-6

function isTeamEvent(ev) {
  return ev && ev.size !== '1';
}

function isPaperEvent(ev) {
  return ev && ev.id === 2; // 2 is Innovators Forum
}

// ── EventPreview chip ───────────────────────────────────────────────
function EventPreview({ev}) {
  if (!ev) return null;
  return (
    <div className='event-preview'>
      <div className='event-preview-grid'>
        <span>📍 {ev.venue}</span>
        {ev.time && <span>🕘 {ev.time}</span>}
        <span>{ev.size === '1' ? '👤 Individual' : `👥 Team: ${ev.size} members`}</span>
        {ev.prize && <span>🏆 Prize: {ev.prize}</span>}
      </div>
    </div>
  );
}

// ── Step Indicator ──────────────────────────────────────────────────
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

// ── Group Selector ──────────────────────────────────────────────────
function GroupSelector({label, badge, group, selected, teamName, onEvent, onTeam, paperTitle, onPaperTitle, paperAbstract, onPaperAbstract, paperFile, onPaperFile}) {
  const ev = group.find((e) => e.title === selected) || null;
  const needsTeam = isTeamEvent(ev);
  const isPaper = isPaperEvent(ev);

  return (
    <div className='event-group-card'>
      <div className='event-group-header'>
        <span className='event-group-badge'>{badge}</span>
        <span className='event-group-label'>{label}</span>
      </div>

      <div className='form-group' style={{marginBottom: needsTeam ? '1rem' : 0}}>
        <label className='form-label'>
          Select Event{' '}
          <span style={{color: 'rgba(255,255,255,.4)', fontFamily: 'Inter', fontSize: '.7rem', textTransform: 'none', letterSpacing: 0}}>
            (optional if selecting from other group)
          </span>
        </label>
        <select
          className='form-select'
          value={selected}
          onChange={(e) => {
            onEvent(e.target.value);
            onTeam('');
          }}>
          <option value=''>— Skip this group —</option>
          {group.map((ev) => (
            <option key={ev.id} value={ev.title}>
              {ev.icon} {ev.title} {ev.size === '1' ? '(Individual)' : `(Team · ${ev.size})`}
            </option>
          ))}
        </select>
        <EventPreview ev={ev} />
      </div>

      {needsTeam && (
        <div className='form-group' style={{marginBottom: 0}}>
          <label className='form-label'>
            Team Name <span>*</span>
          </label>
          <input className='form-input' value={teamName} onChange={(e) => onTeam(e.target.value)} placeholder='Enter your team name for this event' />
          <p className='form-hint'>Each member registers individually with the same team name.</p>
        </div>
      )}

      {isPaper && (
        <div className='paper-presentation-fields' style={{marginTop: needsTeam ? '1rem' : 0}}>
          <div className='form-group'>
            <label className='form-label'>
              Paper Title <span>*</span>
            </label>
            <input className='form-input' value={paperTitle} onChange={(e) => onPaperTitle(e.target.value)} placeholder='Enter your paper title' />
          </div>
          <div className='form-group'>
            <label className='form-label'>
              Abstract <span>*</span>
            </label>
            <textarea className='form-input' value={paperAbstract} onChange={(e) => onPaperAbstract(e.target.value)} placeholder='Short abstract of your paper' rows={3} />
          </div>
          <div className='form-group' style={{marginBottom: 0}}>
            <label className='form-label'>
              Upload Document (.pdf, .doc, .docx) <span>*</span>
            </label>
            <p className='form-hint' style={{color: '#fbbf24', marginTop: '0.2rem', marginBottom: '0.6rem', fontSize: '0.85rem'}}>
              ⚠️ Please ensure your document contains the <strong>Title</strong> and <strong>Abstract</strong> at the beginning.
            </p>
            <input
              className='form-input'
              type='file'
              accept='.pdf,.doc,.docx'
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64Data = reader.result.split(',')[1];
                    onPaperFile({name: file.name, type: file.type, data: base64Data});
                  };
                  reader.readAsDataURL(file);
                } else {
                  onPaperFile(null);
                }
              }}
              style={{padding: '0.6rem'}}
            />
            {paperFile && (
              <p className='form-hint' style={{color: '#a0aec0'}}>
                Selected: {paperFile.name}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────
export default function RegisterPage() {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Step 1 — details
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    year: '',
    dept: '',
  });

  // Step 2 — two event groups
  const [eventA, setEventA] = useState('');
  const [teamNameA, setTeamNameA] = useState('');
  const [paperTitleA, setPaperTitleA] = useState('');
  const [paperAbstractA, setPaperAbstractA] = useState('');
  const [paperFileA, setPaperFileA] = useState(null);

  const [eventB, setEventB] = useState('');
  const [teamNameB, setTeamNameB] = useState('');
  const [paperTitleB, setPaperTitleB] = useState('');
  const [paperAbstractB, setPaperAbstractB] = useState('');
  const [paperFileB, setPaperFileB] = useState(null);

  // Step 3 — payment
  const [transactionId, setTransactionId] = useState('');

  useGSAP(
    () => {
      gsap.fromTo('.section-tag, .section-title, .section-subtitle', {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.8, stagger: 0.2});
      gsap.fromTo('.form-container', {opacity: 0, y: 40}, {opacity: 1, y: 0, duration: 0.8, delay: 0.4});
    },
    {scope: pageRef},
  );

  const update = (field, val) => setForm((f) => ({...f, [field]: val}));

  const evObjA = GROUP_A.find((e) => e.title === eventA) || null;
  const evObjB = GROUP_B.find((e) => e.title === eventB) || null;

  // ── Validation ──────────────────────────────────────────────────
  const validateStep1 = () => {
    const {name, email, phone, college, year, dept} = form;
    return name && email && phone && college && year && dept;
  };

  const validateStep2 = () => {
    // Must choose at least one event
    if (!eventA || !eventB) return {ok: false, msg: 'Please select at least two event.'};
    // If team event chosen, team name required
    if (eventA && isTeamEvent(evObjA) && !teamNameA.trim()) return {ok: false, msg: 'Please enter a team name for the Group A event.'};
    if (eventB && isTeamEvent(evObjB) && !teamNameB.trim()) return {ok: false, msg: 'Please enter a team name for the Group B event.'};
    // If paper event chosen, title, abstract and file are required
    if (eventA && isPaperEvent(evObjA)) {
      if (!paperTitleA.trim() || !paperAbstractA.trim() || !paperFileA) return {ok: false, msg: 'Please provide Title, Abstract, and File for Group A paper presentation.'};
    }
    if (eventB && isPaperEvent(evObjB)) {
      if (!paperTitleB.trim() || !paperAbstractB.trim() || !paperFileB) return {ok: false, msg: 'Please provide Title, Abstract, and File for Group B paper presentation.'};
    }
    return {ok: true};
  };

  // ── Submit ──────────────────────────────────────────────────────
  const submitForm = async () => {
    if (submitting) return;
    setSubmitting(true);

    const eventsSelected = [eventA, eventB].filter(Boolean).join(' | ');
    const payload = {
      timestamp: new Date().toISOString(),
      name: form.name,
      email: form.email,
      phone: form.phone,
      college: form.college,
      year: form.year,
      dept: form.dept,
      event1: eventA || '',
      event1Type:
        evObjA ?
          isTeamEvent(evObjA) ? 'Team'
          : 'Individual'
        : '',
      teamName1: teamNameA || '',
      paperTitle1: paperTitleA || '',
      paperAbstract1: paperAbstractA || '',
      paperFile1Data: paperFileA ? paperFileA.data : '',
      paperFile1Name: paperFileA ? paperFileA.name : '',
      paperFile1MimeType: paperFileA ? paperFileA.type : '',
      event2: eventB || '',
      event2Type:
        evObjB ?
          isTeamEvent(evObjB) ? 'Team'
          : 'Individual'
        : '',
      teamName2: teamNameB || '',
      paperTitle2: paperTitleB || '',
      paperAbstract2: paperAbstractB || '',
      paperFile2Data: paperFileB ? paperFileB.data : '',
      paperFile2Name: paperFileB ? paperFileB.name : '',
      paperFile2MimeType: paperFileB ? paperFileB.type : '',
      eventsSelected,
      transactionId,
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

  const eventsLabel = () => {
    const list = [eventA, eventB].filter(Boolean);
    if (list.length === 0) return '—';
    return list.join(' & ');
  };

  return (
    <div className='register-page' ref={pageRef}>
      <div className='section-inner'>
        <div className='section-tag'>Join The Competition</div>
        <h2 className='section-title'>
          Register for <em>XTREME 2026</em>
        </h2>
        <p className='section-subtitle'>March 27, 2026 · Select up to 2 events. One ₹200 payment covers all.</p>

        <div className='form-container'>
          <StepIndicator step={step} total={4} />

          {/* ── STEP 1: Details ── */}
          <div className={`form-step${step === 1 ? ' active' : ''}`}>
            <h3 className='form-step-title'>Step 1 — Your Details</h3>
            <p className='form-step-hint'>Fill in your personal information below.</p>

            <div className='form-group'>
              <label className='form-label'>
                Full Name <span>*</span>
              </label>
              <input className='form-input' value={form.name} onChange={(e) => update('name', e.target.value)} placeholder='Enter your full name' />
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label className='form-label'>
                  Email <span>*</span>
                </label>
                <input className='form-input' type='email' value={form.email} onChange={(e) => update('email', e.target.value)} placeholder='you@example.com' />
              </div>
              <div className='form-group'>
                <label className='form-label'>
                  Phone <span>*</span>
                </label>
                <input className='form-input' type='tel' value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder='+91 XXXXX XXXXX' />
              </div>
            </div>

            <div className='form-group'>
              <label className='form-label'>
                College Name <span>*</span>
              </label>
              <input className='form-input' value={form.college} onChange={(e) => update('college', e.target.value)} placeholder='Enter your college name' />
            </div>

            <div className='form-row'>
              <div className='form-group'>
                <label className='form-label'>
                  Year <span>*</span>
                </label>
                <select className='form-select' value={form.year} onChange={(e) => update('year', e.target.value)}>
                  <option value=''>Select year...</option>
                  {YEAR_OPTIONS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group'>
                <label className='form-label'>
                  Department <span>*</span>
                </label>
                <input className='form-input' value={form.dept} onChange={(e) => update('dept', e.target.value)} placeholder='e.g. CSE, ECE, MECH' />
              </div>
            </div>

            <div className='form-nav'>
              <div />
              <Button
                variant='primary'
                onClick={() => {
                  if (validateStep1()) setStep(2);
                  else alert('Please fill in all required fields.');
                }}>
                Next →
              </Button>
            </div>
          </div>

          {/* ── STEP 2: Event Selection ── */}
          <div className={`form-step${step === 2 ? ' active' : ''}`}>
            <h3 className='form-step-title'>Step 2 — Select Your Events</h3>
            <p className='form-step-hint'>
              Choose <strong>one event from each group</strong> or just one — it's up to you. One ₹200 fee covers both. Team events will ask for a team name.
            </p>

            <GroupSelector
              label='Group A — Events 1 to 3'
              badge='A'
              group={GROUP_A}
              selected={eventA}
              teamName={teamNameA}
              onEvent={setEventA}
              onTeam={setTeamNameA}
              paperTitle={paperTitleA}
              onPaperTitle={setPaperTitleA}
              paperAbstract={paperAbstractA}
              onPaperAbstract={setPaperAbstractA}
              paperFile={paperFileA}
              onPaperFile={setPaperFileA}
            />

            <div className='event-group-or'>
              <span>+</span>
            </div>

            <GroupSelector
              label='Group B — Events 4 to 6'
              badge='B'
              group={GROUP_B}
              selected={eventB}
              teamName={teamNameB}
              onEvent={setEventB}
              onTeam={setTeamNameB}
              paperTitle={paperTitleB}
              onPaperTitle={setPaperTitleB}
              paperAbstract={paperAbstractB}
              onPaperAbstract={setPaperAbstractB}
              paperFile={paperFileB}
              onPaperFile={setPaperFileB}
            />

            {(eventA || eventB) && (
              <div className='event-selection-summary'>
                ✅ Selected: <strong>{eventsLabel()}</strong>
              </div>
            )}

            <div className='form-nav'>
              <Button variant='secondary' onClick={() => setStep(1)}>
                ← Back
              </Button>
              <Button
                variant='primary'
                onClick={() => {
                  const {ok, msg} = validateStep2();
                  if (ok) setStep(3);
                  else alert(msg);
                }}>
                Next →
              </Button>
            </div>
          </div>

          {/* ── STEP 3: Payment ── */}
          <div className={`form-step${step === 3 ? ' active' : ''}`}>
            <h3 className='form-step-title'>Step 3 — Payment</h3>

            <div className='payment-box'>
              <div className='payment-label'>Registration Fee (all selected events)</div>
              <div className='payment-amount'>₹200</div>
              <p style={{fontSize: '.8rem', color: 'rgba(255,255,255,.4)', marginBottom: '1rem'}}>Scan the QR below to pay via GPay / PhonePe / Paytm</p>
              <div className='payment-qr-wrap'>
                <div className='payment-qr'>
                  <img src='/images/gpay-qr.jpg' alt='GPay QR' />
                </div>
              </div>
              <div className='payment-upi'>UPI ID: harrishmurugesan@okicici</div>
              <div className='payment-bank'>Name: Harrish CSE Dept | Bank: Indian Bank</div>
            </div>

            <div className='form-group'>
              <label className='form-label'>
                Transaction ID / UTR Number <span>*</span>
              </label>
              <input className='form-input' value={transactionId} onChange={(e) => setTransactionId(e.target.value)} placeholder='e.g., T2026032712345678' />
              <p className='form-hint'>Find this in your payment app under transaction history</p>
            </div>

            <div className='form-nav'>
              <Button variant='secondary' onClick={() => setStep(2)}>
                ← Back
              </Button>
              <Button
                variant='primary'
                onClick={() => {
                  if (!transactionId) alert('Please enter your Transaction ID.');
                  else setStep(4);
                }}>
                Next →
              </Button>
            </div>
          </div>

          {/* ── STEP 4: Review & Submit ── */}
          <div className={`form-step${step === 4 ? ' active' : ''}`}>
            <h3 className='form-step-title'>Step 4 — Review &amp; Submit</h3>

            <div className='review-box'>
              <div className='review-box-title'>Participant Details</div>
              {[
                ['Full Name', form.name],
                ['Email', form.email],
                ['Phone', form.phone],
                ['College', form.college],
                ['Year', form.year],
                ['Department', form.dept],
              ].map(([label, val]) => (
                <div key={label} className='review-row'>
                  <span className='review-label'>{label}</span>
                  <span className='review-value'>{val || '—'}</span>
                </div>
              ))}
            </div>

            <div className='review-box'>
              <div className='review-box-title'>Event Details</div>
              {[
                eventA ? ['Group A Event', eventA] : null,
                eventA && isTeamEvent(evObjA) ? ['Team Name (A)', teamNameA] : null,
                eventA && isPaperEvent(evObjA) ? ['Paper Title (A)', paperTitleA] : null,
                eventA && isPaperEvent(evObjA) ? ['Paper Abstract (A)', paperAbstractA] : null,
                eventA && isPaperEvent(evObjA) && paperFileA ? ['Paper File (A)', paperFileA.name] : null,
                eventB ? ['Group B Event', eventB] : null,
                eventB && isTeamEvent(evObjB) ? ['Team Name (B)', teamNameB] : null,
                eventB && isPaperEvent(evObjB) ? ['Paper Title (B)', paperTitleB] : null,
                eventB && isPaperEvent(evObjB) ? ['Paper Abstract (B)', paperAbstractB] : null,
                eventB && isPaperEvent(evObjB) && paperFileB ? ['Paper File (B)', paperFileB.name] : null,
                ['Transaction ID', transactionId],
              ]
                .filter(Boolean)
                .map(([label, val]) => (
                  <div key={label} className='review-row'>
                    <span className='review-label'>{label}</span>
                    <span className='review-value'>{val || '—'}</span>
                  </div>
                ))}
            </div>

            <div className='confirm-notice'>✅ By submitting, you confirm all information is accurate and agree to abide by all event rules and regulations of XTREME 2026.</div>

            <div className='form-nav'>
              <Button variant='secondary' onClick={() => setStep(3)} disabled={submitting}>
                ← Back
              </Button>
              <button
                className='btn-primary btn-submit-lock'
                onClick={submitForm}
                disabled={submitting}
                style={{
                  opacity: submitting ? 0.65 : 1,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  pointerEvents: submitting ? 'none' : 'auto',
                }}>
                <span>{submitting ? '⏳ Submitting...' : '🚀 Submit Registration'}</span>
              </button>
            </div>
          </div>

          {/* ── Alternative: Google Form ── */}
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
