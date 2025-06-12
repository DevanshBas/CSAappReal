import React from 'react';

const SettingsPanel = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Account Settings */}
      <div className="bg-card rounded-xl p-5 mb-6 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Account Settings</h2>
        {/* display name input, email (read-only), password reset link */}
        <p className="text-sm text-muted-foreground">Manage your account information.</p>
        {/* Placeholder for account settings form controls */}
        <div>Display Name: <input type="text" placeholder="Your Name" className="border p-1 rounded" /></div>
        <div>Email: <span className="text-muted-foreground">your.email@example.com (Read Only)</span></div>
        <div><button className="text-blue-600 hover:underline">Reset Password</button></div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-card rounded-xl p-5 mb-6 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Appearance Settings</h2>
        {/* Light/Dark/System toggle, animations on/off, font size slider */}
        <p className="text-sm text-muted-foreground">Customize the look and feel of the application.</p>
        {/* Placeholder for appearance settings controls */}
        <div>Theme: <select className="border p-1 rounded"><option>System</option><option>Light</option><option>Dark</option></select></div>
        <div>Animations: <input type="checkbox" /> Enabled</div>
        <div>Font Size: <input type="range" /></div>
      </div>

      {/* Accessibility Settings */}
      <div className="bg-card rounded-xl p-5 mb-6 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold">Accessibility Settings</h2>
        {/* high-contrast toggle, keyboard mode, screen-reader hints */}
        <p className="text-sm text-muted-foreground">Adjust settings for better accessibility.</p>
        {/* Placeholder for accessibility settings controls */}
        <div>High Contrast: <input type="checkbox" /> Enabled</div>
        <div>Keyboard Mode: <input type="checkbox" /> Enabled</div>
      </div>

      {/* Notifications Settings */}
      <div className="bg-card rounded-2xl shadow-md p-6 space-y-4">
        <h2 className="text-lg font-semibold">Notifications Settings</h2>
        {/* master switch + toggles for Remix, Battles, Badges, Comments */}
        <p className="text-sm text-muted-foreground">Configure your notification preferences.</p>
        {/* Placeholder for notification settings controls */}
        <div className="flex justify-between items-center flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
          <label htmlFor="master-switch" className="text-base font-medium">Master Switch</label>
          <input type="checkbox" id="master-switch" className="form-checkbox h-5 w-5 text-primary rounded" />
        </div>
        <div className="flex justify-between items-center flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
          <label htmlFor="remix-notifications" className="text-base font-medium">Remix Notifications</label>
          <input type="checkbox" id="remix-notifications" className="form-checkbox h-5 w-5 text-primary rounded" />
        </div>
        <div className="flex justify-between items-center flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
          <label htmlFor="battle-notifications" className="text-base font-medium">Battle Notifications</label>
          <input type="checkbox" id="battle-notifications" className="form-checkbox h-5 w-5 text-primary rounded" />
        </div>
        <div className="flex justify-between items-center flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
          <label htmlFor="badge-notifications" className="text-base font-medium">Badge Notifications</label>
          <input type="checkbox" id="badge-notifications" className="form-checkbox h-5 w-5 text-primary rounded" />
        </div>
        <div className="flex justify-between items-center flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0">
          <label htmlFor="comment-notifications" className="text-base font-medium">Comment Notifications</label>
          <input type="checkbox" id="comment-notifications" className="form-checkbox h-5 w-5 text-primary rounded" />
        </div>
      </div>

      {/* Logout Button */}
      <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Logout</button>
    </div>
  );
};

export default SettingsPanel;