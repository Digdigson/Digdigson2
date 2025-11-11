'use client';

import { useState } from 'react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: data.get('name') as string,
      email: data.get('email') as string,
      message: data.get('message') as string,
      website: data.get('website') as string,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (res.ok && json?.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
        setErrorMsg(json?.error || 'Something went wrong. Please try again.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message || 'Network error. Please try again.');
    }
  }

  const isLoading = status === 'loading';

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-[#171d25] border border-[#2a3441] rounded-2xl p-6 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
      aria-describedby="form-status"
    >
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-neutral-200 tracking-wide">
          NAME <span className="text-teal-400">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="YOUR NAME..."
          className="mt-2 w-full rounded-xl bg-[#0f141b] border border-[#2a3441] px-4 py-3 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/60 transition"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-neutral-200 tracking-wide">
          EMAIL ADDRESS <span className="text-teal-400">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="YOUR EMAIL ADDRESS..."
          className="mt-2 w-full rounded-xl bg-[#0f141b] border border-[#2a3441] px-4 py-3 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/60 transition"
        />
        <p className="mt-2 text-xs text-neutral-400">I’ll never share your email.</p>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-neutral-200 tracking-wide">
          MESSAGE <span className="text-teal-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={7}
          placeholder="YOUR MESSAGE..."
          className="mt-2 w-full rounded-xl bg-[#0f141b] border border-[#2a3441] px-4 py-3 text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500/60 transition resize-y"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-full bg-white/95 text-[#0f141b] font-bold tracking-wide px-6 py-2.5 hover:bg-white transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? 'SENDING…' : 'SUBMIT'}
        </button>
      </div>

      <div id="form-status" aria-live="polite" className="min-h-[1.25rem] text-sm">
        {status === 'success' && <p className="text-teal-400">Thanks! I’ll get back to you soon.</p>}
        {status === 'error' && <p className="text-red-400">Error: {errorMsg}</p>}
      </div>
    </form>
  );
}

