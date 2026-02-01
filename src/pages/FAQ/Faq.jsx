import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Faq.module.css'
import { FiArrowLeft, FiHelpCircle, FiChevronDown, FiChevronUp, FiMail, FiPhone, FiMessageCircle, FiCheck } from 'react-icons/fi'

const Faq = () => {
  const navigate = useNavigate()
  const [expandedId, setExpandedId] = useState(null)
  const [category, setCategory] = useState('general')

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // FAQ data organized by categories
  const faqData = {
    general: [
      {
        id: 'gen-1',
        question: 'What is this job portal?',
        answer: 'This is a comprehensive job portal platform that connects job seekers with employers. It allows users to search for jobs, apply directly, save job postings, and track their applications in one place.'
      },
      {
        id: 'gen-2',
        question: 'Is it free to use?',
        answer: 'Yes! The job portal is completely free for job seekers. You can create an account, browse jobs, and apply without any charges. Employers also get free job posting capabilities.'
      },
      {
        id: 'gen-3',
        question: 'How do I create an account?',
        answer: 'Click on the "Register" button, fill in your details (name, email, password), and submit. You\'ll receive a confirmation and can immediately start browsing jobs.'
      },
      {
        id: 'gen-4',
        question: 'Can I edit my profile after registration?',
        answer: 'Yes, you can update your profile information at any time from your account settings. This helps employers get accurate information about you.'
      }
    ],
    jobseeking: [
      {
        id: 'job-1',
        question: 'How do I search for jobs?',
        answer: 'Use the search bar at the top to enter keywords. You can also use filters like location, salary, experience level, and job type to narrow down your search results.'
      },
      {
        id: 'job-2',
        question: 'How do I apply for a job?',
        answer: 'Click on any job posting, review the details, and click the "Apply" button. Upload your resume (PDF format), enter your contact details, and submit. You\'ll receive a confirmation of your application.'
      },
      {
        id: 'job-3',
        question: 'What is the ATS Score?',
        answer: 'ATS (Applicant Tracking System) Score measures how well your resume matches the job description. A higher score indicates better alignment with the job requirements. We provide suggestions to improve your score.'
      },
      {
        id: 'job-4',
        question: 'Can I save jobs for later?',
        answer: 'Yes, you can save any job by clicking the save icon. Your saved jobs are stored in the "Saved Jobs" section for easy access anytime.'
      },
      {
        id: 'job-5',
        question: 'How do I track my applications?',
        answer: 'Go to "My Applications" to see all the jobs you\'ve applied to. You can view the status of each application and access submitted documents.'
      }
    ],
    employer: [
      {
        id: 'emp-1',
        question: 'How do I post a job?',
        answer: 'After logging in, go to "Create Job Post". Fill in job details (title, description, salary, location, experience level), upload company logo, and publish. Your job will be visible to all job seekers.'
      },
      {
        id: 'emp-2',
        question: 'How can I view applications?',
        answer: 'Visit the "Admin Panel" to see all applications for your posted jobs. You can download resumes, review applicant information, and manage your hiring process.'
      },
      {
        id: 'emp-3',
        question: 'Can I edit a job posting?',
        answer: 'Yes, you can edit job details anytime. Go to your job listing and update the information needed. Changes will be reflected immediately.'
      },
      {
        id: 'emp-4',
        question: 'How long is a job posting active?',
        answer: 'Job postings remain active indefinitely until you choose to remove them. You can delete a job anytime from your admin panel.'
      }
    ],
    technical: [
      {
        id: 'tech-1',
        question: 'What file formats are supported for resumes?',
        answer: 'We accept PDF files only. Ensure your resume is properly formatted and in PDF format for the best ATS compatibility.'
      },
      {
        id: 'tech-2',
        question: 'What should I do if I forget my password?',
        answer: 'Click "Forgot Password" on the login page, enter your email, and we\'ll send you a reset link. Follow the instructions to create a new password.'
      },
      {
        id: 'tech-3',
        question: 'Is my data secure?',
        answer: 'Yes, we use industry-standard encryption and security measures to protect your personal data. Your information is never shared with third parties without consent.'
      },
      {
        id: 'tech-4',
        question: 'Which browsers are supported?',
        answer: 'Our platform works on all modern browsers including Chrome, Firefox, Safari, and Edge. For best experience, keep your browser updated.'
      },
      {
        id: 'tech-5',
        question: 'Can I use the platform on mobile?',
        answer: 'Yes! Our platform is fully responsive and works seamlessly on mobile devices. You can browse, apply, and manage applications on the go.'
      }
    ]
  }

  const categories = [
    { key: 'general', label: 'General', icon: FiHelpCircle },
    { key: 'jobseeking', label: 'Job Seeking', icon: FiCheck },
    { key: 'employer', label: 'For Employers', icon: FiMessageCircle },
    { key: 'technical', label: 'Technical', icon: FiPhone }
  ]

  const currentFaqs = faqData[category] || []

  return (
    <div className={styles.faqContainer}>
      {/* Back Button */}
      <button className={styles.backBtn} onClick={() => navigate('/home')}>
        <FiArrowLeft />
        <span>Back to Home</span>
      </button>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <FiHelpCircle className={styles.headerIcon} />
          <div>
            <h1>Frequently Asked Questions</h1>
            <p>Find answers to common questions about our job portal</p>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className={styles.categoryTabs}>
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <button
              key={cat.key}
              className={`${styles.categoryTab} ${category === cat.key ? styles.activeCategory : ''}`}
              onClick={() => {
                setCategory(cat.key)
                setExpandedId(null)
              }}
            >
              <Icon className={styles.categoryIcon} />
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>

      {/* FAQ Items */}
      <div className={styles.faqList}>
        {currentFaqs.map((faq) => (
          <div
            key={faq.id}
            className={`${styles.faqItem} ${expandedId === faq.id ? styles.expanded : ''}`}
          >
            {/* Question */}
            <button
              className={styles.questionBtn}
              onClick={() => toggleExpand(faq.id)}
            >
              <div className={styles.questionContent}>
                <h3>{faq.question}</h3>
              </div>
              <div className={styles.expandIcon}>
                {expandedId === faq.id ? <FiChevronUp /> : <FiChevronDown />}
              </div>
            </button>

            {/* Answer */}
            {expandedId === faq.id && (
              <div className={styles.answer}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className={styles.contactSection}>
        <div className={styles.contactHeader}>
          <h2>Still have questions?</h2>
          <p>We're here to help! Get in touch with our support team</p>
        </div>

        <div className={styles.contactGrid}>
          <div className={styles.contactCard}>
            <FiMail className={styles.contactIcon} />
            <h4>Email Support</h4>
            <p>support@jobportal.com</p>
          </div>
          <div className={styles.contactCard}>
            <FiPhone className={styles.contactIcon} />
            <h4>Phone Support</h4>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className={styles.contactCard}>
            <FiMessageCircle className={styles.contactIcon} />
            <h4>Live Chat</h4>
            <p>Available 9 AM - 6 PM EST</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Faq
