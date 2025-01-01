import React from 'react';
import { Mail } from 'lucide-react';
import EmailForm from './components/EmailForm/EmailForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Mail className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">mailToGo</h1>
          </div>
          <p className="mt-2 text-gray-600">Compose and send emails with ease</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <EmailForm />
      </main>
    </div>
  );
}

export default App;