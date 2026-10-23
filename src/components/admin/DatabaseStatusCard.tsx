import React, { useEffect, useState } from 'react';
import { Database, Server, CheckCircle2, AlertCircle, RefreshCw, ExternalLink, ShieldCheck } from 'lucide-react';
import { fetchDatabaseStatus } from '../../services/courseApi';
import { DatabaseStatus } from '../../types';

export const DatabaseStatusCard: React.FC = () => {
  const [status, setStatus] = useState<DatabaseStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadStatus = async () => {
    setIsLoading(true);
    const data = await fetchDatabaseStatus();
    setStatus(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadStatus();
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-400 shrink-0">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Database & Persistence Diagnostics</h3>
            <p className="text-xs text-slate-400">
              Honest status of backend data storage and cloud recommendations
            </p>
          </div>
        </div>

        <button
          onClick={loadStatus}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-950 hover:bg-slate-800 text-xs font-bold text-slate-300 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
          <span>Refresh Diagnostics</span>
        </button>
      </div>

      {/* Current Active Storage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Storage Engine</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Active & Persistent</span>
            </span>
          </div>
          <div className="text-sm font-bold text-white">
            {status?.type || 'Local Server Persistent Document Store (JSON Database)'}
          </div>
          <div className="text-xs text-slate-400 break-all">
            File Location: <code className="text-cyan-300">{status?.location || './data/courses_db.json'}</code>
          </div>
          <p className="text-xs text-slate-300 pt-1 leading-relaxed">
            All course modifications, additions, and status toggles are written atomically to server disk storage and survive server restarts.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Cloud Database Service</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-600/40 text-amber-300 text-xs font-bold">
              <AlertCircle className="h-3.5 w-3.5" />
              <span>Not Configured Yet</span>
            </span>
          </div>
          <div className="text-sm font-bold text-white">
            External Cloud Managed Database
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            No remote cloud database credentials (such as Google Cloud SQL or Firebase Firestore) are currently attached to this container. We do not pretend a remote cloud service is connected.
          </p>
        </div>
      </div>

      {/* Cloud Recommendations & Required Credentials */}
      <div className="pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
          Recommended Cloud Database Options for Future Multi-Instance Deployment
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cloud Option 1: Cloud SQL */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">Option 1: Google Cloud SQL (PostgreSQL)</span>
              <span className="text-[11px] font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded">Relational / SQL</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ideal for enterprise data integrity, student enrollment tables, payment ledgers, and relational course cohorts.
            </p>
            <div className="text-xs text-slate-400 space-y-1 pt-1 border-t border-slate-800/80">
              <span className="font-bold text-slate-300 block">Required Credentials & Setup:</span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-400">
                <li>GCP Project ID & Cloud SQL Instance connection string</li>
                <li>Database Name & Password (<code className="text-slate-300">DATABASE_URL</code>)</li>
                <li>Drizzle ORM schema configuration & migrations</li>
              </ul>
            </div>
          </div>

          {/* Cloud Option 2: Firebase Firestore */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-white">Option 2: Firebase Firestore</span>
              <span className="text-[11px] font-bold text-teal-300 bg-teal-950/60 px-2 py-0.5 rounded">NoSQL / Auth Ready</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides real-time multi-user syncing, serverless scalability, and unified Firebase Authentication for students.
            </p>
            <div className="text-xs text-slate-400 space-y-1 pt-1 border-t border-slate-800/80">
              <span className="font-bold text-slate-300 block">Required Credentials & Setup:</span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-400">
                <li>Firebase Project ID & Web SDK Config</li>
                <li>Firestore Security Rules (<code className="text-slate-300">firestore.rules</code>)</li>
                <li>Service Account JSON for server operations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
