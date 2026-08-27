'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [goats, setGoats] = useState([
    { id: 1, tagNumber: 'GOAT-001', breed: 'Beetal', status: 'Healthy' },
    { id: 2, tagNumber: 'GOAT-002', breed: 'Jamnapari', status: 'Needs Scan' },
    { id: 3, tagNumber: 'GOAT-003', breed: 'Sirohi', status: 'Healthy' }
  ]);
  const [stats, setStats] = useState({ total: 3, healthScore: 92, pendingScans: 1 });

  return (
    <div className="min-h-screen bg-stone-50 text-slate-800 p-4 sm:p-6 relative">
      
      {/* Header Section */}
      <header className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-bold text-green-900">Farmer Dashboard</h1>
          <p className="text-slate-600 mt-1">Overview of your herd's health and activity</p>
        </div>
        <div className="flex gap-4">
          <Link href="/" className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-md shadow-sm font-medium transition">
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Total Goats</h3>
          <p className="text-4xl font-bold text-green-800 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Herd Health Score</h3>
          <p className="text-4xl font-bold text-green-800 mt-2">{stats.healthScore}%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Pending Alerts</h3>
          <p className="text-4xl font-bold text-orange-600 mt-2">{stats.pendingScans}</p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: My Herd */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">My Herd</h2>
          <div className="space-y-4">
            {goats.map((goat) => (
              <div key={goat.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div>
                  <p className="font-bold text-lg text-slate-800">{goat.tagNumber}</p>
                  <p className="text-slate-600 text-sm">{goat.breed}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  goat.status === 'Healthy' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {goat.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Appointments & Alerts */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Upcoming Schedule</h2>
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="font-semibold text-blue-900">Expert Consultation</p>
            <p className="text-blue-700 text-sm mt-1">Dr. Sharma • Tomorrow, 10:00 AM</p>
          </div>
        </div>

      </div>
    </div>
  );
}
