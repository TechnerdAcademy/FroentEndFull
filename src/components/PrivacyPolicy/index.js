import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Privacy Policy</h1>
            <p><strong>Effective Date:</strong> 24 September 2024</p>

            <div style={styles.section}>
                <h2 style={styles.subheadingLeft}>Tech Nerd</h2>
                <p><strong>Location:</strong> Ropar, India</p>
                <p>
                    At Tech Nerd, your privacy is of utmost importance to us. This Privacy Policy outlines how we collect, use, 
                    and protect your personal information when you interact with our services, including our website, online courses, 
                    and any other products or services we offer.
                </p>
            </div>

            <div style={styles.section}>
                <h2 style={styles.subheadingLeft}>1. Information We Collect</h2>
                <ul style={styles.ul}>
                    <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and other contact details.</li>
                    <li><strong>Educational Information:</strong> Information about the courses you enroll in, your progress, and any feedback you provide.</li>
                    <li><strong>Payment Information:</strong> Billing details, including credit card information and payment history, for course enrollments and other transactions.</li>
                    <li><strong>Technical Data:</strong> IP address, browser type, operating system, and other technical information collected through cookies and similar technologies.</li>
                </ul>
            </div>

            <div style={styles.section}>
                <h2 style={styles.subheadingLeft}>2. How We Use Your Information</h2>
                <ul style={styles.ul}>
                    <li><strong>To Provide Services:</strong> To enroll you in courses, track your progress, and manage your account.</li>
                    <li><strong>To Communicate:</strong> To send you updates, newsletters, and information about our services.</li>
                    <li><strong>To Process Payments:</strong> To facilitate payments for courses and other services.</li>
                    <li><strong>To Improve Our Services:</strong> To analyze usage patterns and feedback to enhance our offerings.</li>
                    <li><strong>To Ensure Security:</strong> To protect our services from fraud and other security risks.</li>
                </ul>
            </div>

            <div style={styles.section}>
                <h2 style={styles.subheadingLeft}>3. Information Sharing and Disclosure</h2>
                <p>
                    Tech Nerd does not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:
                </p>
                <ul style={styles.ul}>
                    <li><strong>Service Providers:</strong> We may share your information with trusted service providers who assist us in operating our website, processing payments, or delivering services.</li>
                    <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to legal processes, such as a court order or subpoena.</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or part of our assets, your information may be transferred to the new owner.</li>
                </ul>
            </div>

            <div style={styles.section}>
                <h2 style={styles.subheadingLeft}>4. Data Security</h2>
                <p>
                    We implement a variety of security measures to protect your personal information. These include encryption, secure servers, 
                    and access controls. However, no method of transmission over the internet or electronic storage is completely secure, 
                    and we cannot guarantee absolute security.
                </p>
            </div>

            <div style={styles.section}>
                <h2 style={styles.subheadingLeft}>5. Cookies and Tracking Technologies</h2>
                <p>
                    Our website uses cookies and similar tracking technologies to enhance your experience, gather usage data, and deliver 
                    personalized content. You can choose to disable cookies through your browser settings, but this may affect your ability 
                    to use certain features of our website.
                </p>
            </div>

            <div style={styles.section}>
                <h2 style={styles.subheadingLeft}>6. Your Rights</h2>
                <ul style={styles.ul}>
                    <li><strong>Access:</strong> You can request access to the personal information we hold about you.</li>
                    <li><strong>Correction:</strong> You can request corrections to any inaccurate or incomplete information.</li>
                    <li><strong>Deletion:</strong> You can request the deletion of your personal information, subject to certain legal obligations.</li>
                    <li><strong>Opt-Out:</strong> You can opt out of receiving marketing communications from us at any time.</li>
                </ul>
            </div>

            <div style={styles.section}>
                <h2 style={styles.subheadingLeft}>7. Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
                    We will notify you of any significant changes by posting the new policy on our website and updating the effective date.
                </p>
            </div>

            <div style={styles.contact}>
                <h2 style={styles.subheadingLeft}>8. Contact Us</h2>
                <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
                <p><strong>Tech Nerd</strong></p>
                <p>Email: Help@technerd.com</p>
                <p>Phone: +91 7696842820 </p>
                <p>Ropar, India</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        lineHeight: '1.6',
    },
    heading: {
        textAlign: 'center',
        fontSize: '24px',
    },
    subheadingLeft: {
        textAlign: 'left',
        fontSize: '20px',
    },
    section: {
        marginBottom: '40px',
    },
    ul: {
        margin: '10px 0',
        paddingLeft: '20px',
    },
    contact: {
        textAlign: 'left',
        marginTop: '20px',
    }
};

export default PrivacyPolicy;
