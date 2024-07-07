
  <h1>Express API Project</h1>
  <p>This project is an Express API that includes user registration with encrypted passwords, login, password reset using JWT tokens and NodeMailer, and protected pages such as a dashboard and change password functionality. The project utilizes various libraries to enhance security and functionality.</p>

  <h2>Features</h2>
  <ul>
    <li><strong>Registration:</strong> Allows users to register with an encrypted password.</li>
    <li><strong>Login:</strong> User authentication using JWT tokens.</li>
    <li><strong>Reset Password:</strong> Enables users to reset their password using a JWT token sent via email using NodeMailer.</li>
    <li><strong>Protected Pages:</strong> Access to dashboard and change password pages is protected using JWT tokens.</li>
  </ul>

  <h2>Libraries Used</h2>
  <ul>
    <li>express</li>
    <li>nodemon</li>
    <li>bcrypt</li>
    <li>cors</li>
    <li>dotenv</li>
    <li>jsonwebtoken</li>
    <li>mongoose</li>
    <li>nodemailer</li>
  </ul>

  <h2>Installation</h2>
  <ol>
    <li><strong>Clone the repository:</strong></li>
    <pre><code>git clone https://github.com/Digvijayjakhaniya/Express-Authentication-JWT.git
cd Express-Authentication-JWT
</code></pre>
    <li><strong>Install dependencies:</strong></li>
    <pre><code>npm install
</code></pre>
    <li><strong>Set up environment variables:</strong></li>
    <p>in <code>.env</code> file add the necessary environment variables (e.g., database connection string, JWT secret, email credentials).</p>
  </ol>

  <h2>Usage</h2>
  <ol>
    <li><strong>Run the development server:</strong></li>
    <pre><code>npm run dev
</code></pre>
    <li><strong>Access the API endpoints:</strong></li>
    <pre><code>http://localhost:8000
</code></pre>
  </ol>

  <h2>API Endpoints</h2>
  <ul>
    <li><strong>POST /register:</strong> Register a new user.</li>
    <li><strong>POST /login:</strong> Login a user and receive a JWT token.</li>
    <li><strong>POST /reset-password:</strong> Request a password reset link.</li>
    <li><strong>POST /change-password:</strong> Change the password using the provided JWT token (protected route).</li>
    <li><strong>GET /dashboard:</strong> Access the dashboard (protected route).</li>
  </ul>

  <h2>Technologies Used</h2>
  <ul>
    <li>Node.js</li>
    <li>Express</li>
    <li>MongoDB (via Mongoose)</li>
  </ul>
<br><br><hr>
  <footer class="card-footer bg-white pt-2">
    <p>© 2024 Made with 🤍 by <a href="https://digvijay.rf.gd" target="_blank" class="link-danger page-link alert-link d-inline">Digvijay Jakhaniya</a></p>
  </footer>
