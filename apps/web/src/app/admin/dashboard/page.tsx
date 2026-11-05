'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  phone: string;
  preferred_lang: string;
  goats?: Array<any>;
}

interface QueryRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  state?: string;
  queryType: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read' | 'contacted';
  emailSent: boolean;
  emailError?: string | null;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [queries, setQueries] = useState<QueryRecord[]>([]);
  const [activeTab, setActiveTab] = useState<'queries' | 'users'>('queries');
  const [loading, setLoading] = useState(true);
  const [queriesLoading, setQueriesLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchQueries();
    fetchUsers();
  }, [router]);

  const fetchQueries = async () => {
    setQueriesLoading(true);
    try {
      const res = await fetch('/api/admin/queries');
      const data = await res.json();
      if (data.success) {
        setQueries(data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch queries:', err);
    } finally {
      setQueriesLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/users');
      const data = await res.json();
      if (data.success) {
        setUsers(data.data || []);
      }
    } catch (err) {
      // Backend api-gateway might not be running in standalone mode
      console.warn('Backend users API not reachable:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'contacted' ? 'unread' : 'contacted';
    try {
      const res = await fetch('/api/admin/queries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setQueries((prev) =>
          prev.map((q) => (q.id === id ? { ...q, status: newStatus as any } : q))
        );
      }
    } catch (err) {
      alert('Error updating status');
    }
  };

  const handleDeleteQuery = async (id: string) => {
    if (!confirm('Are you sure you want to delete this query?')) return;
    try {
      const res = await fetch(`/api/admin/queries?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setQueries((prev) => prev.filter((q) => q.id !== id));
      }
    } catch (err) {
      alert('Error deleting query');
    }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    const token = localStorage.getItem('adminToken');
    try {
      const res = await fetch(`http://localhost:8000/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setUsers(users.filter((u) => u.id !== id));
      } else {
        alert(data.error || 'Delete failed');
      }
    } catch (err) {
      alert('Error deleting user');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const unreadCount = queries.filter((q) => q.status === 'unread').length;

  const queryTypeLabels: Record<string, string> = {
    training: 'Training Enrollment',
    expert: 'Health Advisory',
    breeds: 'Breed Inquiry',
    dpr: 'Loan DPR',
    other: 'General Inquiry',
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
                🐐 BakriWala Admin Portal
              </h1>
              <span className="text-xs bg-green-500/20 text-green-400 font-semibold px-2.5 py-1 rounded-full border border-green-500/30">
                Live
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Recipient email: <span className="text-green-400 font-semibold">bakriwaalaofficial@gmail.com</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3.5 py-2 rounded-lg transition"
            >
              ← Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-lg text-xs sm:text-sm transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl">
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Total Inquiries</h3>
            <p className="text-3xl font-black text-white mt-1">{queries.length}</p>
          </div>

          <div className="bg-slate-800/90 border border-amber-500/30 p-5 rounded-2xl">
            <h3 className="text-amber-400 text-xs font-semibold uppercase tracking-wider">Pending / Unread</h3>
            <p className="text-3xl font-black text-amber-400 mt-1">{unreadCount}</p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl">
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Contacted / Resolved</h3>
            <p className="text-3xl font-black text-green-400 mt-1">
              {queries.filter((q) => q.status === 'contacted').length}
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl">
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Registered Farmers</h3>
            <p className="text-3xl font-bold text-slate-200 mt-1">{users.length}</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('queries')}
            className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition ${
              activeTab === 'queries'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <span>💬 Farmer Queries & Inquiries</span>
            {unreadCount > 0 && (
              <span className="bg-amber-400 text-slate-950 text-xs px-2 py-0.5 rounded-full font-black">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              activeTab === 'users'
                ? 'bg-green-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            👨‍🌾 Registered Users ({users.length})
          </button>

          <button
            onClick={fetchQueries}
            className="ml-auto text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg font-medium transition"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Tab 1: Queries Table */}
        {activeTab === 'queries' && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-white">Inquiries & Message Inbox</h2>
                <p className="text-slate-400 text-xs mt-1">
                  Submissions from the Website Query Section • All forwarded to bakriwaalaofficial@gmail.com
                </p>
              </div>
            </div>

            {queriesLoading ? (
              <div className="text-center py-12 text-slate-400">Loading inquiries...</div>
            ) : queries.length === 0 ? (
              <div className="text-center py-16 text-slate-500">
                <div className="text-4xl mb-3">📬</div>
                <p className="font-bold text-slate-300">No queries received yet</p>
                <p className="text-xs text-slate-500 mt-1">
                  When visitors submit a query on the Contact or Programs page, it will appear here and in bakriwaalaofficial@gmail.com
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {queries.map((q) => {
                  const cleanPhone = q.phone.replace(/[^0-9]/g, '');
                  const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(
                    `Namaste ${q.name}, this is BakriWala Official regarding your inquiry. How can we help you?`
                  )}`;

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-xl border transition ${
                        q.status === 'unread'
                          ? 'bg-slate-900/90 border-amber-500/40 shadow-sm'
                          : 'bg-slate-800/60 border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-700/60">
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                              q.status === 'unread'
                                ? 'bg-amber-400/20 text-amber-400 border border-amber-400/30'
                                : 'bg-green-500/20 text-green-400 border border-green-500/30'
                            }`}
                          >
                            {q.status === 'unread' ? '● Unread' : '✓ Contacted'}
                          </span>
                          <span className="text-xs font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                            {queryTypeLabels[q.queryType] || q.queryType}
                          </span>
                          {q.emailSent ? (
                            <span className="text-[11px] text-green-400 font-medium">✉️ Email Dispatched</span>
                          ) : (
                            <span className="text-[11px] text-slate-500">📥 Saved Locally</span>
                          )}
                        </div>

                        <span className="text-xs text-slate-400">
                          {new Date(q.createdAt).toLocaleString('en-IN', {
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3 text-sm">
                        <div>
                          <p className="text-xs text-slate-400">Farmer Name</p>
                          <p className="font-bold text-white text-base">{q.name}</p>
                          {q.state && <p className="text-xs text-slate-400 mt-0.5">📍 {q.state}</p>}
                        </div>

                        <div>
                          <p className="text-xs text-slate-400">Contact Details</p>
                          <a
                            href={`tel:${q.phone}`}
                            className="font-bold text-green-400 hover:underline block"
                          >
                            📞 {q.phone}
                          </a>
                          {q.email && (
                            <a
                              href={`mailto:${q.email}`}
                              className="text-xs text-sky-400 hover:underline block mt-0.5"
                            >
                              ✉️ {q.email}
                            </a>
                          )}
                        </div>

                        <div className="md:col-span-1 flex items-center md:justify-end gap-2 flex-wrap">
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs bg-green-600 hover:bg-green-500 text-white font-bold px-3 py-2 rounded-lg transition flex items-center gap-1.5"
                          >
                            <span>💬 WhatsApp</span>
                          </a>
                          <button
                            onClick={() => handleToggleStatus(q.id, q.status)}
                            className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold px-3 py-2 rounded-lg transition"
                          >
                            {q.status === 'unread' ? 'Mark Contacted' : 'Mark Unread'}
                          </button>
                          <button
                            onClick={() => handleDeleteQuery(q.id)}
                            className="text-xs bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white px-2.5 py-2 rounded-lg transition"
                            title="Delete query"
                          >
                            🗑
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-700/60 bg-slate-950/40 p-3.5 rounded-lg">
                        <p className="text-xs uppercase font-bold text-slate-400 mb-1">Message:</p>
                        <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">{q.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Users Table */}
        {activeTab === 'users' && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">Registered Farmers List</h2>

            {loading ? (
              <p className="text-slate-400">Loading registered farmers...</p>
            ) : users.length === 0 ? (
              <p className="text-slate-500">No farmers registered in database yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-slate-300">
                  <thead className="text-xs uppercase bg-slate-900/50 text-slate-400 border-b border-slate-700">
                    <tr>
                      <th className="py-3 px-4">ID</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Language</th>
                      <th className="py-3 px-4">Goats Owned</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-700/30">
                        <td className="py-3 px-4 font-mono text-slate-400">#{user.id}</td>
                        <td className="py-3 px-4 font-semibold text-white">{user.name}</td>
                        <td className="py-3 px-4">{user.phone}</td>
                        <td className="py-3 px-4 uppercase text-xs font-bold text-orange-400">
                          {user.preferred_lang}
                        </td>
                        <td className="py-3 px-4">{user.goats?.length || 0}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-xs bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white px-3 py-1.5 rounded transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
