export const WELCOME_TEMPLATE = `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#F6FAFB; font-family: Arial, sans-serif;">

  <div style="max-width:500px; margin:40px auto; background:#ffffff; padding:30px; text-align:center; border-radius:8px;">

    <h2 style="color:#333;">🎉 Welcome to Shubham's Website</h2>

    <p style="font-size:14px; color:#555;">
      Hi <strong>{{name}}</strong>,
    </p>

    <p style="font-size:14px; color:#555;">
      Your account has been successfully created using 
      <span style="color:#4C83EE; font-weight:600;">{{email}}</span>.
    </p>

    <p style="font-size:14px; color:#555;">
      We're excited to have you on board 🚀
    </p>

    <p style="margin-top:20px; font-size:12px; color:#888;">
      If you did not create this account, please ignore this email.
    </p>

  </div>

</body>
</html>
`;

export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Email Verification</title>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      font-family: 'Open Sans', sans-serif;
      background: #F6FAFB;
    }
    .container {
      max-width: 500px;
      margin: 60px auto;
      background: #ffffff;
      padding: 40px 30px;
      text-align: center;
      border-radius: 8px;
    }
    .otp {
      display: inline-block;
      background: #22D172;
      color: #fff;
      padding: 12px 20px;
      border-radius: 6px;
      font-size: 18px;
      font-weight: bold;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Email Verification</h2>

    <p>Verify your account for:</p>
    <p><strong>{{email}}</strong></p>

    <p>Use this OTP:</p>

    <div class="otp">{{otp}}</div>

    <p style="font-size:12px; color:#888;">
      This OTP is valid for 24 hours.
    </p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Password Reset</title>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      font-family: 'Open Sans', sans-serif;
      background: #F6FAFB;
    }
    .container {
      max-width: 500px;
      margin: 60px auto;
      background: #ffffff;
      padding: 40px 30px;
      text-align: center;
      border-radius: 8px;
    }
    .otp {
      display: inline-block;
      background: #22D172;
      color: #fff;
      padding: 12px 20px;
      border-radius: 6px;
      font-size: 18px;
      font-weight: bold;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Reset Your Password</h2>

    <p>Password reset request for:</p>
    <p><strong>{{email}}</strong></p>

    <p>Use this OTP:</p>

    <div class="otp">{{otp}}</div>

    <p style="font-size:12px; color:#888;">
      This OTP is valid for 5 minutes.
    </p>
  </div>
</body>
</html>
`;

export const PASSWORD_CHANGED_TEMPLATE = `
<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:#F6FAFB; font-family: Arial, sans-serif;">

  <div style="max-width:500px; margin:40px auto; background:#ffffff; padding:30px; text-align:center; border-radius:8px; border:1px solid #eee;">

    <div style="color:#22D172; font-weight:bold; font-size:18px; margin-bottom:20px;">
      ✅ Password Changed Successfully
    </div>

    <p style="font-size:14px; color:#555;">
      Your password has been successfully changed for:
      <strong>{{email}}</strong>.
    </p>

    <p style="font-size:14px; color:#555;">
      If this was you, no action is needed.
    </p>

    <p style="color:#d9534f; font-size:13px; margin-top:20px;">
      ⚠️ If you did NOT perform this action, please reset your password immediately.
    </p>

  </div>

</body>
</html>
`;