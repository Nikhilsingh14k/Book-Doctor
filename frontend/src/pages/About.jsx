import React from 'react'

const About = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">About Us</h1>
      <p className="text-gray-600 mb-4">
        Welcome to <strong>Book Doctor</strong>, a secure and efficient healthcare management platform 
        designed for <strong>patients, doctors, and administrators</strong>. Our system ensures seamless 
        interaction through <strong>role-based access control</strong>, allowing each user to access relevant 
        features tailored to their role.
      </p>
      
      <h2 className="text-xl font-semibold text-gray-700 mt-4">Key Features</h2>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li><strong>For Patients:</strong> Register, log in, update profiles, book and manage appointments, 
            make online payments via Razorpay, and track medical interactions.</li>
        <li><strong>For Doctors:</strong> Access a personal dashboard, manage appointments, update profiles, 
            and track patient consultations securely.</li>
        <li><strong>For Admins:</strong> Oversee platform operations, manage doctors, view appointments, 
            and control doctor availability.</li>
      </ul>

      <p className="text-gray-600 mt-4">
        With features like <strong>secure authentication, appointment booking, profile management, and 
        online payments</strong>, <strong>Book Doctor</strong> enhances the healthcare experience 
        by making it more <strong>accessible, organized, and user-friendly</strong>.
      </p>

      <h2 className="text-xl font-semibold text-gray-700 mt-6">API Endpoints</h2>
      <div className="mt-2">
        <h3 className="font-semibold text-gray-800">Admin:</h3>
        <p className="text-gray-600 text-sm">/add-doctor, /login, /all-doctors, /change-availability, /appointments, /dashboard</p>
      </div>
      <div className="mt-2">
        <h3 className="font-semibold text-gray-800">Doctor:</h3>
        <p className="text-gray-600 text-sm">/list, /login, /appointments, /dashboard, /profile, /update-profile</p>
      </div>
      <div className="mt-2">
        <h3 className="font-semibold text-gray-800">User:</h3>
        <p className="text-gray-600 text-sm">/register, /login, /get-profile, /update-profile, /book-appointment, /appointments, /cancel-appointment, /payment-razorpay, /verifyRazorpay</p>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mt-6">Demo Instructions</h2>
      <p className="text-gray-600 mt-2">
        <strong>Doctor Login:</strong> Use the doctor's first name as the email format: <strong>first_name@gmail.com</strong>. 
        For example, if the doctor's name is <strong>Rahul Mishra</strong>, the email will be <strong>rahul@gmail.com</strong>. 
        Use the password <strong>abcd1234</strong> to log in as a doctor. For doctor login, go to the bottom of the admin login 
        page and click <strong>Doctor Login</strong> to access the website as a doctor.
      </p>
      <p className="text-gray-600 mt-2">
        <strong>Admin Login:</strong> The admin login button is located on the <strong>navbar</strong>. 
      </p>
      <p className="text-gray-600 mt-2">
        <strong>Booking & Payment:</strong> You can book a doctor and pay online as a demo version of Razorpay is used for payments. 
        For card payments, enter <strong>5267 3181 8797 5449</strong>, any future expiry date, and a random CVV. 
        For UPI, type any random UPI ID.
      </p>
    </div>
  )
}

export default About
