import React from 'react'
import styles from './LandingPage.module.css'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiUsers, FiBriefcase, FiAward, FiCheck, FiTrendingUp, FiGlobe, FiLock } from 'react-icons/fi'

const LandingPage = () => {
    const navigate = useNavigate()
  return (
    <div className={styles.mainConatiner}>
       {/* NAVBAR */}
       <div className={styles.landingNav}>
        <h1 className={styles.brand}>JOB PLANET</h1>
        <div className={styles.navButtons}>
            <button className={styles.btnSecondary} onClick={()=> navigate('/register')}>Register</button>
            <button className={styles.btnPrimary} onClick={()=> navigate('/login')}>Login</button>
        </div>
       </div>

       {/* HERO SECTION */}
       <div className={styles.heroContainer}>
        {/* Floating Icons */}
        <div className={styles.floatingIcons}>
          <FiBriefcase className={`${styles.floatingIcon} ${styles.icon1}`} />
          <FiUsers className={`${styles.floatingIcon} ${styles.icon2}`} />
          <FiAward className={`${styles.floatingIcon} ${styles.icon3}`} />
          <FiTrendingUp className={`${styles.floatingIcon} ${styles.icon4}`} />
          <FiGlobe className={`${styles.floatingIcon} ${styles.icon5}`} />
          <FiLock className={`${styles.floatingIcon} ${styles.icon6}`} />
        </div>

        <div className={styles.heroContent}>
          <div className={styles.badge}>🚀 Start Your Career Journey</div>
          <h1 className={styles.heading}>
            Find Your <span className={styles.gradientText}>Dream Job</span> Today
          </h1>
          <p className={styles.subheading}>Discover amazing opportunities with top companies. Your next career move starts here.</p>
          <div className={styles.heroCTA}>
            <button className={styles.btnLarge} onClick={()=> navigate('/login')}>
              Get Started <FiArrowRight size={18} className={styles.arrowIcon} />
            </button>
            <button className={styles.btnOutline} onClick={()=> navigate('/home')}>Explore Jobs</button>
          </div>
          
          {/* Trust Indicators */}
          <div className={styles.trustBadges}>
            <div className={styles.trustItem}>
              <FiCheck className={styles.checkIcon} />
              <span>No Credit Card Required</span>
            </div>
            <div className={styles.trustItem}>
              <FiCheck className={styles.checkIcon} />
              <span>Free Forever</span>
            </div>
          </div>
        </div>
       </div>

       {/* STATS SECTION */}
       <div className={styles.statsContainer}>
        <div className={styles.statCard}>
          <FiUsers className={styles.statIcon} />
          <h3>2.5M+</h3>
          <p>Active Users</p>
        </div>
        <div className={styles.statCard}>
          <FiBriefcase className={styles.statIcon} />
          <h3>8,000+</h3>
          <p>Job Listings</p>
        </div>
        <div className={styles.statCard}>
          <FiAward className={styles.statIcon} />
          <h3>1,000+</h3>
          <p>Companies</p>
        </div>
       </div>

       {/* FEATURES SECTION */}
       <div className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose Job Planet?</h2>
          <p className={styles.sectionSubtitle}>Everything you need to find your perfect job in one place</p>
        </div>

        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIconBox}>
              <FiTrendingUp className={styles.featureIcon} />
            </div>
            <h3>Smart Matching</h3>
            <p>AI-powered job recommendations tailored to your profile and skills</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconBox}>
              <FiGlobe className={styles.featureIcon} />
            </div>
            <h3>Global Opportunities</h3>
            <p>Access thousands of jobs from top companies worldwide</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconBox}>
              <FiLock className={styles.featureIcon} />
            </div>
            <h3>Secure & Private</h3>
            <p>Your data is encrypted and your privacy is our priority</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconBox}>
              <FiBriefcase className={styles.featureIcon} />
            </div>
            <h3>Easy Application</h3>
            <p>Apply to jobs with just one click using your saved profile</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconBox}>
              <FiUsers className={styles.featureIcon} />
            </div>
            <h3>Community</h3>
            <p>Connect with professionals and build your network</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIconBox}>
              <FiAward className={styles.featureIcon} />
            </div>
            <h3>Career Growth</h3>
            <p>Get personalized career tips and development resources</p>
          </div>
        </div>
       </div>

       {/* HOW IT WORKS SECTION */}
       <div className={styles.howItWorksSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <p className={styles.sectionSubtitle}>Get started in just 4 simple steps</p>
        </div>

        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3>Create Account</h3>
            <p>Sign up and build your professional profile in minutes</p>
          </div>

          <div className={styles.stepArrow}>
            <FiArrowRight size={24} />
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3>Browse Jobs</h3>
            <p>Explore thousands of job opportunities tailored for you</p>
          </div>

          <div className={styles.stepArrow}>
            <FiArrowRight size={24} />
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3>Apply Now</h3>
            <p>Apply to your dream jobs with a single click</p>
          </div>

          <div className={styles.stepArrow}>
            <FiArrowRight size={24} />
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <h3>Get Hired</h3>
            <p>Connect with employers and land your dream job</p>
          </div>
        </div>
       </div>

       {/* TESTIMONIALS SECTION */}
       <div className={styles.testimonialsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What Our Users Say</h2>
          <p className={styles.sectionSubtitle}>Join thousands of successful job seekers</p>
        </div>

        <div className={styles.testimonialsGrid}>
          <div className={styles.testimonialCard}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={styles.star}>★</span>
              ))}
            </div>
            <p className={styles.testimonialText}>"Job Planet helped me find the perfect role within a week. The platform is intuitive and the recommendations are spot on!"</p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorInitial}>SK</div>
              <div>
                <h4>Sarah Kim</h4>
                <p>Senior Developer</p>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={styles.star}>★</span>
              ))}
            </div>
            <p className={styles.testimonialText}>"Great job listings and excellent company profiles. Found a role that perfectly matches my career goals!"</p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorInitial}>MJ</div>
              <div>
                <h4>Michael Johnson</h4>
                <p>Product Manager</p>
              </div>
            </div>
          </div>

          <div className={styles.testimonialCard}>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={styles.star}>★</span>
              ))}
            </div>
            <p className={styles.testimonialText}>"The easiest job search experience I've had. Highly recommend to anyone looking for their next opportunity!"</p>
            <div className={styles.testimonialAuthor}>
              <div className={styles.authorInitial}>EP</div>
              <div>
                <h4>Emma Patel</h4>
                <p>UX Designer</p>
              </div>
            </div>
          </div>
        </div>
       </div>

       {/* CTA SECTION */}
       <div className={styles.ctaSection}>
        <h2>Ready to Find Your Dream Job?</h2>
        <p>Join millions of job seekers and start your journey today</p>
        <div className={styles.ctaButtons}>
          <button className={styles.btnLarge} onClick={()=> navigate('/register')}>Sign Up For Free</button>
          <button className={styles.btnOutline} onClick={()=> navigate('/home')}>Explore Jobs</button>
        </div>
       </div>

       {/* FOOTER */}
       <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <h4>Job Planet</h4>
            <p>Your gateway to career success</p>
          </div>
          <div className={styles.footerColumn}>
            <h5>Quick Links</h5>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#jobs">Browse Jobs</a></li>
              <li><a href="#companies">Companies</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h5>Support</h5>
            <ul>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h5>Follow Us</h5>
            <div className={styles.socialLinks}>
              <a href="#fb">Facebook</a>
              <a href="#tw">Twitter</a>
              <a href="#li">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 Job Planet. All rights reserved.</p>
        </div>
       </footer>
    </div>
  )
}

export default LandingPage