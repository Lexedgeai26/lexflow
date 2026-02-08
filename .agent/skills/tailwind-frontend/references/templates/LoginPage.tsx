import React, { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus, Gavel, User, Building2, MapPin } from 'lucide-react';

interface LoginProps {
    onLogin: (email: string) => void;
}

export const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
    const [view, setView] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        onLogin(email);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full animate-slideUp my-8">
                {/* Logo & Title */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-blue-600 p-3 rounded-2xl shadow-lg mb-4">
                        <Gavel className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-slate-900">
                        Your App <span className="text-blue-600">AI</span>
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 text-center">
                        The Intelligent Platform for Professionals
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {view === 'register' && (
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <input
                                type="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                        {view === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                        {view === 'login' ? 'Sign In' : 'Create Account'}
                    </button>

                    <div className="text-center text-sm text-slate-500 mt-6">
                        {view === 'login' ? (
                            <>
                                New to the platform?{' '}
                                <button
                                    type="button"
                                    onClick={() => setView('register')}
                                    className="text-blue-600 font-bold hover:underline"
                                >
                                    Create Account
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setView('login')}
                                    className="text-blue-600 font-bold hover:underline"
                                >
                                    Log In
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};
