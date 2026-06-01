<template>
  <div class="relative min-h-screen bg-black text-white font-sans overflow-x-hidden">

    <!-- Grid texture -->
    <div class="pointer-events-none fixed inset-0 z-0"
      style="background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px); background-size: 72px 72px; mask-image: radial-gradient(ellipse 90% 80% at 50% 20%, black 40%, transparent 100%);" />
    <!-- Diagonal lines -->
    <div class="pointer-events-none fixed inset-0 z-0 opacity-60"
      style="background-image: repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.012) 40px, rgba(255,255,255,0.012) 41px);" />
    <!-- Glow orbs -->
    <div class="pointer-events-none fixed z-0 rounded-full"
      style="width:600px;height:600px;top:-200px;left:50%;transform:translateX(-50%);filter:blur(140px);background:radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%);" />
    <div class="pointer-events-none fixed z-0 rounded-full"
      style="width:400px;height:400px;top:60%;right:-100px;filter:blur(140px);background:radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%);" />

    <!-- ═══ HEADER ══════════════════════════════════════════ -->
    <header class="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div class="max-w-5xl mx-auto flex items-center justify-between
        bg-black/75 backdrop-blur-xl border border-white/7 rounded-2xl px-5 py-2.5"
        style="border-color:rgba(255,255,255,0.07)">

        <NuxtLink to="/" class="font-display text-[17px] font-extrabold tracking-tight text-white">
          Black<span class="text-blue-500">Wave</span>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden sm:flex items-center gap-1">
          <a href="https://t.me/blackwaveofc" target="_blank" rel="noopener"
            class="px-4 py-2 text-[13px] text-white/40 rounded-xl transition hover:text-white hover:bg-white/5">
            Telegram
          </a>
          <a href="#pricing"
            class="px-4 py-2 text-[13px] text-white/40 rounded-xl transition hover:text-white hover:bg-white/5">
            Pricing
          </a>
          <a href="#faq"
            class="px-4 py-2 text-[13px] text-white/40 rounded-xl transition hover:text-white hover:bg-white/5">
            FAQ
          </a>
          <button @click="goToDashboard"
            class="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-bold rounded-xl transition-all hover:-translate-y-px">
            Dashboard
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </nav>

        <!-- Burger -->
        <button class="sm:hidden flex flex-col gap-1.5 border border-white/10 rounded-lg p-2.5"
          @click="mobileOpen = true" aria-label="Menu">
          <span class="block w-4 h-px bg-white/40 rounded-full" />
          <span class="block w-4 h-px bg-white/40 rounded-full" />
        </button>
      </div>
    </header>

    <!-- ═══ MOBILE MENU ════════════════════════════════════ -->
    <Transition name="curtain">
      <div v-if="mobileOpen" class="fixed inset-0 z-[100] bg-black flex flex-col p-6">
        <div class="flex items-center justify-between pb-6 border-b border-white/7"
          style="border-color:rgba(255,255,255,0.07)">
          <span class="font-display text-[17px] font-extrabold tracking-tight">
            Black<span class="text-blue-500">Wave</span>
          </span>
          <button @click="mobileOpen = false"
            class="border border-white/10 rounded-lg px-3 py-2 text-[13px] text-white/40">✕</button>
        </div>
        <div class="flex flex-col gap-3 mt-6">
          <a href="https://t.me/blackwaveofc" target="_blank" rel="noopener" @click="mobileOpen = false"
            class="block px-5 py-4 border border-white/7 rounded-xl text-[15px] text-white/40"
            style="border-color:rgba(255,255,255,0.07)">Telegram</a>
          <a href="#pricing" @click="mobileOpen = false"
            class="block px-5 py-4 border border-white/7 rounded-xl text-[15px] text-white/40"
            style="border-color:rgba(255,255,255,0.07)">Pricing</a>
          <a href="#faq" @click="mobileOpen = false"
            class="block px-5 py-4 border border-white/7 rounded-xl text-[15px] text-white/40"
            style="border-color:rgba(255,255,255,0.07)">FAQ</a>
          <button @click="goToDashboard"
            class="flex items-center justify-center gap-2 px-5 py-4 bg-blue-600 text-white text-[14px] font-bold rounded-xl">
            Dashboard
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>

    <!-- ═══ TICKER ════════════════════════════════════════════ -->
    <div class="relative z-10 mt-[80px] border-y overflow-hidden py-3"
      style="background:#0a0a0a;border-color:rgba(255,255,255,0.07)">
      <div class="pointer-events-none absolute left-0 top-0 bottom-0 w-28 z-10"
        style="background:linear-gradient(to right, #0a0a0a, transparent)" />
      <div class="pointer-events-none absolute right-0 top-0 bottom-0 w-28 z-10"
        style="background:linear-gradient(to left, #0a0a0a, transparent)" />
      <div class="flex w-max animate-ticker hover:[animation-play-state:paused]">
        <template v-for="_ in 2" :key="_">
          <div v-for="item in tickerItems" :key="item.label"
            class="inline-flex items-center gap-2.5 px-8 text-[11px] font-semibold uppercase tracking-widest text-white/30 border-r"
            style="border-color:rgba(255,255,255,0.07)">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" style="box-shadow:0 0 8px #3b82f6" />
            {{ item.label }}
            <span class="text-blue-400 font-bold">{{ item.value }}</span>
          </div>
        </template>
      </div>
    </div>

    <!-- ═══ HERO ══════════════════════════════════════════════ -->
    <section class="relative z-10 px-6 pt-24 pb-20 text-center">
      <div class="max-w-3xl mx-auto flex flex-col items-center gap-6">

        <div
          class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-semibold uppercase tracking-widest text-blue-400"
          style="background:rgba(59,130,246,0.08);border-color:rgba(59,130,246,0.2)">
          <span class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          New release · v2.0
        </div>

        <h1 class="flex flex-row font-display font-extrabold leading-[0.95] tracking-[-0.05em]"
          style="font-size:clamp(3.2rem, 9vw, 7.5rem)">
          <span class="block text-white">Black</span>
          <span class="block text-blue-400">Wave</span>
        </h1>

        <p class="text-[16px] font-light text-white/40 max-w-md leading-relaxed">
          Fast, accurate, and built for serious users. Everything you need to validate at scale — in one dashboard.
        </p>

        <div class="flex flex-wrap gap-3 justify-center mt-2">
          <button @click="goToDashboard"
            class="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-2xl transition-all hover:-translate-y-0.5">
            Open dashboard
            <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
          <a href="https://t.me/blackwaveofc" target="_blank" rel="noopener"
            class="inline-flex items-center gap-2 px-7 py-3.5 border text-white/40 hover:text-white text-sm font-medium rounded-2xl transition-all"
            style="border-color:rgba(255,255,255,0.1)">
            Join Telegram
          </a>
        </div>

        <!-- Stat strip -->
        <div class="flex flex-wrap justify-center mt-10 border rounded-2xl overflow-hidden max-w-lg w-full"
          style="background:#0a0a0a;border-color:rgba(255,255,255,0.07)">
          <div v-for="stat in heroStats" :key="stat.label"
            class="flex-1 min-w-[120px] px-7 py-5 border-r last:border-r-0 text-center"
            style="border-color:rgba(255,255,255,0.07)">
            <div class="font-display text-[2rem] font-extrabold tracking-[-0.04em] leading-none mb-1.5">
              {{ stat.num }}<span class="text-blue-400">{{ stat.suffix }}</span>
            </div>
            <div class="text-[10px] font-semibold uppercase tracking-widest text-white/20">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <hr class="relative z-10 border-white/7" style="border-color:rgba(255,255,255,0.07)" />

    <!-- ═══ HOW IT WORKS ══════════════════════════════════════ -->
    <section id="how" class="relative z-10 py-20 px-6">
      <div class="max-w-5xl mx-auto">
        <p class="section-label">How it works</p>
        <h2 class="section-title">Three steps to <span class="text-blue-400">results</span></h2>
        <p class="mt-3.5 text-[14px] text-white/40 max-w-md leading-relaxed">
          From upload to output in seconds. No complicated setup, no wasted time.
        </p>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style="background:rgba(255,255,255,0.07)">
          <div v-for="step in steps" :key="step.num"
            class="relative bg-black hover:bg-[#0a0a0a] transition-colors p-9 group">
            <span
              class="absolute top-4 right-5 font-display font-extrabold text-[4.5rem] leading-none tracking-[-0.06em] text-white/[0.04] group-hover:text-blue-500/[0.06] transition-colors select-none">
              {{ step.num }}
            </span>
            <div class="w-11 h-11 flex items-center justify-center border rounded-xl mb-5"
              style="background:#0a0a0a;border-color:rgba(255,255,255,0.07)">
              <component :is="step.icon" class="w-5 h-5 stroke-blue-400" stroke-width="1.8" fill="none" />
            </div>
            <div class="font-display text-[1.05rem] font-bold tracking-tight text-white mb-2.5">{{ step.title }}</div>
            <div class="text-[13px] text-white/40 leading-relaxed">{{ step.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <hr class="relative z-10 border-white/7" style="border-color:rgba(255,255,255,0.07)" />

    <!-- ═══ FEATURES ══════════════════════════════════════════ -->
    <section id="features" class="relative z-10 py-20 px-6">
      <div class="max-w-5xl mx-auto">
        <p class="section-label">Features</p>
        <h2 class="section-title">Built different. <span class="text-blue-400">Works better.</span></h2>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          style="background:rgba(255,255,255,0.07)">
          <div v-for="feat in features" :key="feat.title"
            class="bg-black hover:bg-[#0a0a0a] transition-colors p-7 group">
            <div
              class="w-10 h-10 flex items-center justify-center border rounded-xl mb-4 transition-all group-hover:border-blue-500/30 group-hover:bg-blue-500/5"
              style="background:#0a0a0a;border-color:rgba(255,255,255,0.07)">
              <component :is="feat.icon" class="w-4.5 h-4.5 stroke-blue-400" stroke-width="1.8" fill="none" />
            </div>
            <div class="font-display text-[0.9rem] font-bold tracking-tight text-white mb-2">{{ feat.title }}</div>
            <div class="text-[12px] text-white/40 leading-relaxed">{{ feat.desc }}</div>
          </div>
        </div>
      </div>
    </section>

    <hr class="relative z-10 border-white/7" style="border-color:rgba(255,255,255,0.07)" />

    <!-- ═══ STATS ══════════════════════════════════════════════ -->
    <section class="relative z-10 py-20 px-6 overflow-hidden"
      style="background:#0a0a0a;border-top:1px solid rgba(255,255,255,0.07);border-bottom:1px solid rgba(255,255,255,0.07)">
      <div class="pointer-events-none absolute inset-0"
        style="background:radial-gradient(ellipse 60% 100% at 50% 100%, rgba(59,130,246,0.04) 0%, transparent 70%)" />
      <div class="max-w-5xl mx-auto relative z-10">
        <p class="section-label">Live database</p>
        <h2 class="section-title">Activity <span class="text-blue-400">overview</span></h2>

        <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px rounded-2xl overflow-hidden border"
          style="background:rgba(255,255,255,0.07);border-color:rgba(255,255,255,0.07)">
          <div v-for="s in liveStats" :key="s.label"
            class="relative bg-white/0.3 backdrop-blur-xl px-7 py-8 group overflow-hidden">
            <div
              class="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style="background:linear-gradient(to right, transparent, #3b82f6, transparent)" />
            <div v-if="statsLoading" class="w-36 h-12 rounded-xl mb-2 animate-pulse bg-white/5" />
            <div v-else
              class="font-display text-[2.4rem] font-extrabold tracking-[-0.05em] leading-none mb-2 text-white">
              {{ s.formatted }}<span v-if="s.suffix" class="text-blue-400">{{ s.suffix }}</span>
            </div>
            <div class="text-[11px] font-semibold uppercase tracking-widest text-white/20">{{ s.label }}</div>
            <span class="inline-block mt-2.5 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-widest"
              style="background:rgba(59,130,246,0.08);color:#60a5fa;border:1px solid rgba(59,130,246,0.2)">
              {{ s.tag }}
            </span>
          </div>
        </div>

        <p v-if="statsError" class="mt-4 text-[12px] text-red-400/70">
          ⚠ Couldn't load stats — check Firestore rules or document path.
        </p>
        <p class="mt-4 text-[11px] text-white/20">↻ Auto-refreshes every 10 seconds · Data pulled from Firestore</p>
      </div>
    </section>

    <hr class="relative z-10 border-white/7" style="border-color:rgba(255,255,255,0.07)" />

    <!-- ═══ PRICING ══════════════════════════════════════════ -->
    <section id="pricing" class="relative z-10 py-20 px-6">
      <div class="max-w-5xl mx-auto">
        <p class="section-label">Plans & pricing</p>
        <h2 class="section-title">Choose your <span class="text-blue-400">plan</span></h2>
        <p class="mt-3.5 text-[14px] text-white/40 max-w-md leading-relaxed">
          Start free, upgrade when you're ready. Other plans available on Telegram.
        </p>

        <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-6xl">

          <!-- Basic -->
          <div class="border rounded-2xl p-8 flex flex-col gap-6 transition-colors hover:border-white/10"
            style="background:#0a0a0a;border-color:rgba(255,255,255,0.07)">
            <div>
              <div class="font-display text-[1.1rem] font-extrabold tracking-tight text-white mb-3">Basic</div>
              <div class="flex items-baseline gap-2">
                <span
                  class="font-display text-[3rem] font-extrabold tracking-[-0.05em] leading-none text-white">$5</span>
                <span class="text-[12px] text-white/20">/ 100 lives</span>
              </div>
              <p class="text-[12px] text-white/20 mt-2">Perfect for getting started.</p>
            </div>
            <div class="h-px" style="background:rgba(255,255,255,0.07)" />
            <ul class="flex flex-col gap-3 flex-1">
              <li v-for="f in freePlanFeats" :key="f.text" class="flex items-start gap-2.5 text-[13px] text-white/40">
                <svg v-if="f.yes" class="w-3.5 h-3.5 mt-0.5 shrink-0 stroke-blue-400" viewBox="0 0 14 14" fill="none"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="2 7 6 11 12 4" />
                </svg>
                <svg v-else class="w-3.5 h-3.5 mt-0.5 shrink-0 stroke-white/20" viewBox="0 0 14 14" fill="none"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <line x1="3" y1="3" x2="11" y2="11" />
                  <line x1="11" y1="3" x2="3" y2="11" />
                </svg>
                {{ f.text }}
              </li>
            </ul>
            <a href="https://t.me/yuzuuk1" target="_blank" rel="noopener"
              class="block text-center py-3 border rounded-xl text-[13px] font-semibold text-white/40 hover:text-white hover:border-white/10 hover:bg-white/5 transition-all border-transparent">
              Purchase on Telegram →
            </a>
          </div>

          <!-- Premium -->
          <div class="relative border rounded-2xl p-8 flex flex-col gap-6 overflow-hidden"
            style="background:#020510;border-color:rgba(59,130,246,0.25);box-shadow:0 0 60px rgba(59,130,246,0.08)">
            <div class="pointer-events-none absolute inset-0"
              style="background:radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 65%)" />
            <div class="relative">
              <div class="flex items-center justify-between flex-wrap gap-3 mb-3">
                <div class="font-display text-[1.1rem] font-extrabold tracking-tight text-white">Premium</div>
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-blue-300"
                  style="background:rgba(59,130,246,0.1);border:1px solid rgba(59,130,246,0.2)">★ Most popular</span>
              </div>
              <div class="flex items-baseline gap-3 flex-wrap">
                <span
                  class="font-display text-[3rem] font-extrabold tracking-[-0.05em] leading-none text-blue-400">$15</span>
                <div>
                  <div class="text-[12px] text-white/30">/ 1.000 lives</div>
                </div>
              </div>
              <p class="text-[12px] text-white/20 mt-2">For those serious about results.</p>
            </div>
            <div class="h-px relative z-10" style="background:rgba(255,255,255,0.07)" />
            <ul class="flex flex-col gap-3 flex-1 relative z-10">
              <li v-for="f in premiumPlanFeats" :key="f.text"
                class="flex items-start gap-2.5 text-[13px] text-white/40">
                <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 stroke-blue-400" viewBox="0 0 14 14" fill="none"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="2 7 6 11 12 4" />
                </svg>
                {{ f.text }}
              </li>
            </ul>
            <a href="https://t.me/yuzuuk1" target="_blank" rel="noopener"
              class="relative z-10 block text-center py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-[13px] font-bold rounded-xl transition-opacity">
              Purchase on Telegram →
            </a>
          </div>

          <!-- Elite -->
          <div class="relative border rounded-2xl p-8 flex flex-col gap-6 overflow-hidden"
            style="background:#05020f;border-color:rgba(168,85,247,0.25);box-shadow:0 0 60px rgba(168,85,247,0.08)">
            <div class="pointer-events-none absolute inset-0"
              style="background:radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.08) 0%, transparent 65%)" />
            <div class="relative">
              <div class="flex items-center justify-between flex-wrap gap-3 mb-3">
                <div class="font-display text-[1.1rem] font-extrabold tracking-tight text-white">Elite</div>
              </div>
              <div class="flex items-baseline gap-3 flex-wrap">
                <span
                  class="font-display text-[3rem] font-extrabold tracking-[-0.05em] leading-none text-purple-400">$45</span>
                <div>
                  <div class="text-[11px] text-white/30">/ 12.000 lives (6mos.)</div>
                </div>
              </div>
              <p class="text-[12px] text-white/20 mt-2">Only for the most experienced users.</p>
            </div>
            <div class="h-px relative z-10" style="background:rgba(255,255,255,0.07)" />
            <ul class="flex flex-col gap-3 flex-1 relative z-10">
              <li v-for="f in elitePlanFeats" :key="f.text"
                class="flex items-start gap-2.5 text-[13px] text-white/40">
                <svg class="w-3.5 h-3.5 mt-0.5 shrink-0 stroke-purple-400" viewBox="0 0 14 14" fill="none"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="2 7 6 11 12 4" />
                </svg>
                {{ f.text }}
              </li>
            </ul>
            <a href="https://t.me/yuzuuk1" target="_blank" rel="noopener"
              class="relative z-10 block text-center py-3.5 text-white text-[13px] font-bold rounded-xl transition-all hover:opacity-90"
              style="background:linear-gradient(135deg, #7c3aed, #a855f7)">
              Purchase on Telegram →
            </a>
          </div>
        </div>
      </div>
    </section>

    <hr class="relative z-10 border-white/7" style="border-color:rgba(255,255,255,0.07)" />

    <!-- ═══ FAQ ══════════════════════════════════════════════ -->
    <section id="faq" class="relative z-10 py-20 px-6">
      <div class="max-w-5xl mx-auto">
        <p class="section-label">FAQ</p>
        <h2 class="section-title">Common <span class="text-blue-400">questions</span></h2>

        <div class="mt-12 border rounded-2xl overflow-hidden" style="border-color:rgba(255,255,255,0.07)">
          <div v-for="(item, i) in faqs" :key="i" class="border-b last:border-b-0"
            style="border-color:rgba(255,255,255,0.07)">
            <button
              class="w-full flex items-center justify-between gap-4 px-7 py-6 text-left text-white text-[14px] font-medium transition-colors hover:bg-white/[0.02]"
              :class="{ 'bg-white/[0.02]': openFaq === i }" @click="openFaq = openFaq === i ? null : i">
              {{ item.q }}
              <span class="shrink-0 w-5 h-5 flex items-center justify-center border rounded-full transition-all"
                :class="openFaq === i ? 'rotate-45 border-blue-500' : ''" style="border-color:rgba(255,255,255,0.15)">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke-width="2" stroke-linecap="round"
                  aria-hidden="true" :stroke="openFaq === i ? '#3b82f6' : 'rgba(255,255,255,0.3)'">
                  <line x1="5" y1="1" x2="5" y2="9" />
                  <line x1="1" y1="5" x2="9" y2="5" />
                </svg>
              </span>
            </button>
            <Transition name="faq">
              <div v-if="openFaq === i" class="px-7 pb-6 text-[13px] text-white/40 leading-relaxed border-t"
                style="border-color:rgba(255,255,255,0.07)">
                {{ item.a }}
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <hr class="relative z-10 border-white/7" style="border-color:rgba(255,255,255,0.07)" />

    <!-- ═══ CTA ══════════════════════════════════════════════ -->
    <section class="relative z-10 py-20 px-6">
      <div class="max-w-5xl mx-auto">
        <div class="relative rounded-3xl px-12 py-16 text-center overflow-hidden border"
          style="background:#020510;border-color:rgba(59,130,246,0.2)">
          <div class="pointer-events-none absolute inset-0"
            style="background:radial-gradient(ellipse 60% 80% at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 65%)" />
          <!-- Corner brackets -->
          <span class="absolute top-3 left-3 w-3 h-3 border-l border-t border-blue-500/50" />
          <span class="absolute top-3 right-3 w-3 h-3 border-r border-t border-blue-500/50" />
          <span class="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-blue-500/50" />
          <span class="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-blue-500/50" />
          <div class="relative">
            <h2 class="font-display font-extrabold tracking-[-0.04em] leading-[1.0] text-white mb-5"
              style="font-size:clamp(2rem, 5vw, 3.5rem)">
              Ready to start<br>checking <span class="text-blue-400">faster?</span>
            </h2>
            <p class="text-[14px] text-white/40 mb-9">Join thousands of users who already trust BlackWave.</p>
            <div class="flex gap-3 justify-center flex-wrap">
              <button @click="goToDashboard"
                class="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-2xl transition-all hover:-translate-y-0.5">
                Open dashboard →
              </button>
              <a href="https://t.me/blackwaveofc" target="_blank" rel="noopener"
                class="inline-flex items-center px-7 py-3.5 border text-white/40 hover:text-white text-sm font-medium rounded-2xl transition-all"
                style="border-color:rgba(255,255,255,0.1)">
                Join community
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ FOOTER ════════════════════════════════════════════ -->
    <footer class="relative z-10 border-t px-6 pt-16 pb-9" style="border-color:rgba(255,255,255,0.07)">
      <div class="max-w-5xl mx-auto">
        <div class="flex flex-wrap gap-12 justify-between mb-12">
          <div>
            <div class="font-display text-[16px] font-extrabold tracking-tight text-white">
              Black<span class="text-blue-500">Wave</span>.xyz
            </div>
          </div>
          <div class="flex flex-wrap gap-12">
            <div>
              <p class="text-[10px] font-semibold uppercase tracking-widest text-white/20 mb-3.5">Product</p>
              <ul class="flex flex-col gap-2.5">
                <li><a href="#" class="text-[12px] text-white/20 hover:text-white/60 transition-colors">Premium
                    Checker</a>
                </li>
                <li><a href="https://t.me/yuzuuk1"
                    class="text-[12px] text-white/20 hover:text-white/60 transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <p class="text-[10px] font-semibold uppercase tracking-widest text-white/20 mb-3.5">Community</p>
              <ul class="flex flex-col gap-2.5">
                <li><a href="https://t.me/blackwaveofc"
                    class="text-[12px] text-white/20 hover:text-white/60 transition-colors">Telegram Group</a></li>
                <li><a href="https://t.me/yuzuuk1"
                    class="text-[12px] text-white/20 hover:text-white/60 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <p class="text-[10px] font-semibold uppercase tracking-widest text-white/20 mb-3.5">Resources</p>
              <ul class="flex flex-col gap-2.5">
                <li><a href="https://lunar-10.gitbook.io/lunar-docs/getting-started/introduction"
                    class="text-[12px] text-white/20 hover:text-white/60 transition-colors">Documentation</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="border-t pt-6 flex flex-wrap items-center justify-between gap-3"
          style="border-color:rgba(255,255,255,0.07)">
          <span class="text-[11px] text-white/20 tracking-wide">© 2025 Black Wave — All Rights Reserved.</span>
          <div class="flex gap-5">
            <a href="#"
              class="text-[11px] text-white/20 hover:text-white/50 transition-colors tracking-wide">Privacy</a>
            <a href="#" class="text-[11px] text-white/20 hover:text-white/50 transition-colors tracking-wide">Terms</a>
          </div>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '~/firebase'
import { doc, getDoc } from 'firebase/firestore'

// ── Router / auth ────────────────────────────────────────
const router = useRouter()
const isLogged = ref(false)
const mobileOpen = ref(false)

function goToDashboard() {
  mobileOpen.value = false
  router.push(isLogged.value ? '/dashboard' : '/login')
}

// ── Ticker data ──────────────────────────────────────────
const tickerItems = [
  { label: 'Total Checked', value: '1.2M+' },
  { label: 'Total Approved', value: '300,291' },
  { label: 'Approval Rate', value: '30.9%' },
  { label: 'Active Users', value: '1,400' },
  { label: 'Uptime', value: '99.8%' },
  { label: 'Gateways', value: 'PayPal, Braintree, Adyen +' },
  { label: 'New Update', value: 'v2.0' },
]

// ── Hero stats ───────────────────────────────────────────
const heroStats = [
  { num: '1.2', suffix: 'M', label: 'Careds tested' },
  { num: '3.9', suffix: '%', label: 'Approval rate' },
  { num: '300', suffix: 'k', label: 'Cards approved' },
]

// ── Steps ────────────────────────────────────────────────
// Icons are passed as render functions (inline SVG via component)
const UploadIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4' }),
    h('polyline', { points: '17 8 12 3 7 8' }),
    h('line', { x1: '12', y1: '3', x2: '12', y2: '15' }),
  ])
}
const RunIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('circle', { cx: '12', cy: '12', r: '3' }),
    h('path', { d: 'M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14' }),
  ])
}
const CheckIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('polyline', { points: '20 6 9 17 4 12' }),
  ])
}

const steps = [
  { num: '01', icon: UploadIcon, title: 'Upload your list', desc: 'Import or generate your cards .txt or .csv file directly into the dashboard. Supports thousands of lines with no slowdown.' },
  { num: '02', icon: RunIcon, title: 'Configure & run', desc: 'Select your gateway, set thread count, and launch. Real-time logs show every result as it happens.' },
  { num: '03', icon: CheckIcon, title: 'Safe lives', desc: "All your tested and approved cards will be saved so you don't lose them." },
]

// ── Features ─────────────────────────────────────────────
const BoltIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' }),
  ])
}
const GlobeIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z' }),
    h('circle', { cx: '12', cy: '10', r: '3' }),
  ])
}
const LockIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('rect', { x: '3', y: '11', width: '18', height: '11', rx: '2', ry: '2' }),
    h('path', { d: 'M7 11V7a5 5 0 0110 0v4' }),
  ])
}
const BarChartIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('line', { x1: '18', y1: '20', x2: '18', y2: '10' }),
    h('line', { x1: '12', y1: '20', x2: '12', y2: '4' }),
    h('line', { x1: '6', y1: '20', x2: '6', y2: '14' }),
  ])
}
const ActivityIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('polyline', { points: '22 12 18 12 15 21 9 3 6 12 2 12' }),
  ])
}
const FileIcon = {
  render: () => h('svg', { viewBox: '0 0 24 24', fill: 'none', 'stroke-width': '1.8', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [
    h('path', { d: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' }),
    h('polyline', { points: '14 2 14 8 20 8' }),
    h('line', { x1: '16', y1: '13', x2: '8', y2: '13' }),
    h('line', { x1: '16', y1: '17', x2: '8', y2: '17' }),
  ])
}

const features = [
  { icon: BoltIcon, title: 'Ultra-fast engine', desc: 'Multi-threaded processing up to 30+ checks per minute. No bottlenecks, no timeouts.' },
  { icon: GlobeIcon, title: 'More gateways', desc: 'Paypal US, CA, BR and Braintree, Adyen +.' },
  { icon: LockIcon, title: 'Secure dashboard', desc: 'Auth-protected dashboard with session management. Your data never leaves your account.' },
  { icon: BarChartIcon, title: 'Real-time analytics', desc: 'Live stats, approval rates, and throughput metrics updated every second on your dashboard.' },
  { icon: ActivityIcon, title: 'Instant sync', desc: 'Keeps all approved records synchronized to your data store.' },
  { icon: FileIcon, title: 'Approved log export', desc: 'Full-session export with timestamps and metadata. One-click download in .txt or .csv.' },
]

// ── Pricing ──────────────────────────────────────────────
const freePlanFeats = [
  { text: 'Basic gateways', yes: true },
  { text: 'Live storage', yes: true },
  { text: 'Multithread', yes: false },
]
const premiumPlanFeats = [
  { text: 'All basic features' },
  { text: 'Multithread (4×)' },
  { text: 'Premium gateways included' },
]

const elitePlanFeats = [
  { text: 'All basic & premium features' },
  { text: 'Multithread (8×)' },
  { text: 'Better configurations' },
  { text: 'Exclusive gateways' },
  { text: 'Scrapper access included' },
]

// ── FAQ ──────────────────────────────────────────────────
const openFaq = ref(null)
const faqs = [
  {
    q: 'What is BlackWave and how does it work?',
    a: 'BlackWave is a high-performance checker tool. You upload a list or generate a new one, configure your settings, and the engine processes each card at high speed through multiple gateways. Results are displayed in real-time and can be exported instantly.',
  },
  {
    q: 'How do I purchase the premium plan?',
    a: 'Contact us directly on Telegram at @yuzuuk1. We offer multiple plans beyond the $5 base option. Payment is processed securely and access is granted within minutes of confirmation.',
  },
  {
    q: 'What are the available gateways?',
    a: 'Free users get access to the Paypal US gateway. Premium users unlock Paypal CA, BR and others gateways. The system automatically routes to the best-performing gateway based on current load and latency.',
  },
  {
    q: 'What does "12k lives" mean in the elite plan?',
    a: 'Lives refer to the number of approved results included in your plan. Once you hit 12,000 approved results, you can renew or upgrade. Tested cards that don\'t pass do not count toward this limit.',
  },
  {
    q: 'Is there a free trial for premium features?',
    a: 'No, at the moment we don\'t offer free trials for premium features.',
  },
  {
    q: 'Where can I get support?',
    a: 'Join our Telegram group at @blackwaveofc for community support, updates, and announcements. For direct premium support, message @yuzuuk1 on Telegram. We typically respond within a few hours.',
  },
]

// ── Stats / Firestore ────────────────────────────────────
const statsLoading = ref(true)
const statsError = ref(false)
const totalTested = ref(0)
const approvedCount = ref(0)
const animTotalTested = ref(0)
const animApprovedCount = ref(0)

const approvalRate = computed(() => {
  if (!totalTested.value) return 0
  return Math.max(0, Math.min(100, (approvedCount.value / totalTested.value * 100).toFixed(1)))
})

const liveStats = computed(() => [
  { formatted: animTotalTested.value.toLocaleString('pt-BR'), suffix: '', label: 'Total tested', tag: 'Realtime' },
  { formatted: animApprovedCount.value.toLocaleString('pt-BR'), suffix: '', label: 'Approved', tag: 'Live' },
  { formatted: statsLoading.value ? '—' : approvalRate.value, suffix: statsLoading.value ? '' : '%', label: 'Approval rate', tag: 'Calculated' },
])

function easeOut(t) { return 1 - Math.pow(1 - t, 3) }
function animateNum(refVal, target, duration = 900) {
  const start = performance.now()
  const from = refVal.value
  function frame(now) {
    const t = Math.min(1, (now - start) / duration)
    refVal.value = Math.round(from + (target - from) * easeOut(t))
    if (t < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

async function fetchStats() {
  try {
    statsError.value = false
    const snap = await getDoc(doc(db, 'general', 'totalChecked'))
    if (!snap.exists()) { statsError.value = true; statsLoading.value = false; return }
    const data = snap.data() || {}
    const nextTotal = Number(data.cards ?? 0)
    const nextApproved = Number(data.lives ?? 0)
    totalTested.value = isFinite(nextTotal) ? nextTotal : 0
    approvedCount.value = isFinite(nextApproved) ? nextApproved : 0
    animateNum(animTotalTested, totalTested.value)
    animateNum(animApprovedCount, approvedCount.value)
    statsLoading.value = false
  } catch {
    statsError.value = true
    statsLoading.value = false
  }
}

let pollTimer = null
onMounted(() => {
  isLogged.value = !!auth.currentUser
  auth.onAuthStateChanged(u => { isLogged.value = !!u })
  fetchStats()
  pollTimer = setInterval(fetchStats, 10_000)
})
onBeforeUnmount(() => { if (pollTimer) clearInterval(pollTimer) })
</script>

<style>
/* ── Fonts ───────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

.font-display {
  font-family: 'Syne', sans-serif;
}

.font-sans {
  font-family: 'DM Sans', sans-serif;
}

/* ── Section label helper ────────────────────────────────── */
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #3b82f6;
  margin-bottom: 12px;
}

.section-label::before {
  content: '';
  display: block;
  width: 18px;
  height: 1px;
  background: #3b82f6;
  opacity: 0.5;
}

.section-title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  color: white;
  line-height: 1.1;
}

/* ── Ticker animation ────────────────────────────────────── */
@keyframes ticker-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.animate-ticker {
  animation: ticker-scroll 32s linear infinite;
}

/* ── FAQ transition ──────────────────────────────────────── */
.faq-enter-active,
.faq-leave-active {
  transition: all .3s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-enter-from,
.faq-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ── Mobile curtain ──────────────────────────────────────── */
.curtain-enter-active,
.curtain-leave-active {
  transition: opacity .2s, transform .2s;
}

.curtain-enter-from,
.curtain-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ── Scrollbar ───────────────────────────────────────────── */
html {
  scrollbar-width: thin;
  scrollbar-color: #1a1a1a #000;
}

::-webkit-scrollbar {
  width: 4px;
  background: #000;
}

::-webkit-scrollbar-thumb {
  background: #222;
  border-radius: 99px;
}
</style>