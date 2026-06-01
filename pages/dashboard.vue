<template>
  <div class="relative min-h-screen w-full overflow-x-hidden bg-black text-white font-sans">

    <!-- ═══ BACKGROUND LAYERS ════════════════════════════════ -->
    <div class="pointer-events-none fixed inset-0 z-0">
      <!-- Grid texture -->
      <div class="absolute inset-0"
        style="background-image: linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px); background-size: 72px 72px; mask-image: radial-gradient(ellipse 90% 80% at 50% 20%, black 40%, transparent 100%);" />
      <!-- Diagonal lines -->
      <div class="absolute inset-0 opacity-60"
        style="background-image: repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,0.012) 40px, rgba(255,255,255,0.012) 41px);" />
      <!-- Glow orbs -->
      <div class="absolute rounded-full"
        style="width:700px;height:700px;top:-220px;left:20%;filter:blur(160px);background:radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%);" />
      <div class="absolute rounded-full"
        style="width:500px;height:500px;bottom:0;right:-100px;filter:blur(160px);background:radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%);" />
      <div class="absolute rounded-full"
        style="width:300px;height:300px;top:40%;left:-50px;filter:blur(120px);background:radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%);" />
    </div>

    <div class="relative z-10 flex min-h-screen">

      <!-- ═══ DESKTOP SIDEBAR ══════════════════════════════════ -->
      <aside class="hidden md:flex w-[260px] min-h-screen flex-col fixed left-0 top-0 bottom-0"
        style="background:rgba(0,0,0,0.7);border-right:1px solid rgba(255,255,255,0.07);backdrop-filter:blur(24px);">

        <!-- Logo -->
        <div class="px-6 py-6 border-b" style="border-color:rgba(255,255,255,0.07)">
          <a href="/" class="flex items-center gap-2.5">
            <Icon name="lucide-lab:wave-circle" class="text-[#3b82f6]" size="24px"></Icon>
            <span class="font-display text-[16px] font-extrabold tracking-tight">
              Black<span class="text-blue-500">Wave</span>
            </span>
          </a>
        </div>

        <!-- Nav -->
        <nav class="flex-1 px-3 py-5 flex flex-col gap-0.5">

          <!-- Account group -->
          <div class="mb-1">
            <button @click="accountOpen = !accountOpen"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-[13px] font-semibold"
              :class="accountOpen ? 'bg-white/5 text-white' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'">
              <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
              Account
              <svg class="w-3 h-3 ml-auto transition-transform" :class="accountOpen ? 'rotate-180' : ''" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <path d="M2 4l4 4 4-4"/>
              </svg>
            </button>
            <transition name="faq">
              <div v-if="accountOpen" class="ml-7 mt-1 flex flex-col gap-0.5">
                <a href="/dashboard" class="sidebar-sub-link">Overview</a>
                <a href="/dashboard/historical" class="sidebar-sub-link">Historical</a>
                <a href="/dashboard/settings" class="sidebar-sub-link">Settings</a>
              </div>
            </transition>
          </div>

          <a href="/dashboard/checker" class="sidebar-link sidebar-link">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
            Checker
          </a>

          <a v-if="isReseller" href="/dashboard/reseller" class="sidebar-link">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
            Reseller
          </a>

          <a v-if="isAdmin" href="/dashboard/admin" class="sidebar-link">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            Admin
          </a>

          <a v-if="isAdmin" href="/dashboard/keys" class="sidebar-link">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
            </svg>
            Keys
          </a>

          <!-- Divider -->
          <div class="my-3 h-px" style="background:rgba(255,255,255,0.06)" />

          <a href="https://t.me/blackwaveofc" target="_blank" class="sidebar-link" style="color:rgba(96,165,250,0.7)">
            <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Help Center
          </a>
        </nav>

        <!-- Bottom actions + profile -->
        <div class="px-3 py-4 border-t flex flex-col gap-2" style="border-color:rgba(255,255,255,0.07)">

          <button v-if="isAdmin" @click="openCreateKeyModal"
            class="flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-[12px] font-semibold text-white/50 border transition hover:text-white hover:bg-white/5 hover:border-white/10"
            style="border-color:rgba(255,255,255,0.07)">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
            </svg>
            Create Key
          </button>

          <button @click="openModal"
            class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[12px] font-semibold text-white/50 border transition hover:text-white hover:bg-white/5 hover:border-white/10"
            style="border-color:rgba(255,255,255,0.07)">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
            </svg>
            Redeem Key
          </button>

          <!-- Profile card -->
          <div class="relative">
            <button @click="showProfileMenu = !showProfileMenu"
              class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition hover:bg-white/[0.03] hover:border-white/10 group"
              style="background:rgba(255,255,255,0.02);border-color:rgba(255,255,255,0.07)">
              <img :src="photoURL" class="w-8 h-8 rounded-full object-cover bg-black/30 shrink-0" alt="Profile" />
              <div class="flex flex-col items-start min-w-0 flex-1">
                <span class="text-[13px] font-bold text-white leading-tight truncate w-full text-left">{{ nickname }}</span>
                <span class="text-[10px] text-white/30 font-medium">R$ {{ balance.toFixed(2) }}</span>
              </div>
              <svg class="w-3.5 h-3.5 text-white/20 group-hover:text-white/40 transition shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
              </svg>
            </button>

            <!-- Profile dropdown -->
            <transition name="faq">
              <div v-if="showProfileMenu"
                class="absolute bottom-full left-0 right-0 mb-2 rounded-2xl border p-3 flex flex-col gap-1.5 z-50"
                style="background:rgba(5,5,10,0.95);border-color:rgba(255,255,255,0.1);backdrop-filter:blur(24px);box-shadow:0 -12px 40px rgba(0,0,0,0.6)">
                <div class="px-2 pb-2 border-b mb-1" style="border-color:rgba(255,255,255,0.06)">
                  <p class="text-[12px] font-bold text-white">Other Links</p>
                  <p class="text-[10px] text-white/30">Navigate quickly</p>
                </div>
                <a href="/" class="profile-menu-item">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  Home
                </a>
                <a href="https://t.me/blackwaveofc" target="_blank" class="profile-menu-item" style="color:rgba(96,165,250,0.8)">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/></svg>
                  Telegram Group
                </a>
                <a href="/dashboard/settings" class="profile-menu-item">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>
                  Account Settings
                </a>
                <button @click="logout" class="profile-menu-item profile-menu-item--danger w-full text-left">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Logout
                </button>
              </div>
            </transition>
          </div>
        </div>
      </aside>

      <!-- ═══ MOBILE HEADER ════════════════════════════════════ -->
      <header class="md:hidden fixed top-0 left-0 right-0 z-50 px-3 py-2.5">
        <div class="flex items-center justify-between rounded-2xl px-4 py-2.5"
          style="background:rgba(0,0,0,0.85);border:1px solid rgba(255,255,255,0.07);backdrop-filter:blur(20px)">
          <a href="/" class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <span class="font-display text-[15px] font-extrabold tracking-tight">
              Black<span class="text-blue-500">Wave</span>
            </span>
          </a>
          <button @click="showMobileMenu = !showMobileMenu"
            class="w-8 h-8 flex items-center justify-center rounded-lg border text-white/40 hover:text-white transition"
            style="border-color:rgba(255,255,255,0.1)">
            <svg v-if="!showMobileMenu" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      </header>

      <!-- ═══ MOBILE MENU ════════════════════════════════════ -->
      <transition name="curtain">
        <div v-if="showMobileMenu" class="fixed inset-0 z-[100] flex md:hidden">
          <!-- backdrop -->
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showMobileMenu = false" />
          <!-- drawer -->
          <div class="relative w-72 max-w-[85vw] h-full flex flex-col"
            style="background:rgba(2,2,8,0.97);border-right:1px solid rgba(255,255,255,0.07);backdrop-filter:blur(24px)">

            <div class="flex items-center justify-between px-5 py-4 border-b" style="border-color:rgba(255,255,255,0.07)">
              <span class="font-display text-[15px] font-extrabold tracking-tight">
                Black<span class="text-blue-500">Wave</span>
              </span>
              <button @click="showMobileMenu = false"
                class="text-[12px] text-white/30 border border-white/10 rounded-lg px-2.5 py-1.5 hover:text-white transition">✕</button>
            </div>

            <nav class="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
              <button @click="accountOpen = !accountOpen"
                class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-[13px] font-semibold text-white/40 hover:text-white hover:bg-white/[0.03]">
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                Account
                <svg class="w-3 h-3 ml-auto transition-transform" :class="accountOpen ? 'rotate-180' : ''" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 4l4 4 4-4"/></svg>
              </button>
              <transition name="faq">
                <div v-if="accountOpen" class="ml-7 flex flex-col gap-0.5">
                  <a href="/dashboard" class="sidebar-sub-link" @click="showMobileMenu = false">Overview</a>
                  <a href="/dashboard/results" class="sidebar-sub-link" @click="showMobileMenu = false">Historical</a>
                  <a href="/dashboard/settings" class="sidebar-sub-link" @click="showMobileMenu = false">Settings</a>
                </div>
              </transition>
              <a href="/dashboard/store" class="sidebar-link" @click="showMobileMenu = false">
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
                Store
              </a>
              <a href="/dashboard/checker" class="sidebar-link sidebar-link--active" @click="showMobileMenu = false">
                <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                Checker
              </a>
            </nav>

            <div class="px-3 py-4 border-t flex flex-col gap-2" style="border-color:rgba(255,255,255,0.07)">
              <button @click="openModal; showMobileMenu = false"
                class="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[12px] font-semibold text-white/50 border transition hover:text-white hover:bg-white/5 hover:border-white/10"
                style="border-color:rgba(255,255,255,0.07)">
                Redeem Key
              </button>
              <div class="flex items-center gap-3 px-3 py-2.5 rounded-xl border" style="background:rgba(255,255,255,0.02);border-color:rgba(255,255,255,0.07)">
                <img :src="photoURL" class="w-8 h-8 rounded-lg object-cover bg-black/30 shrink-0" alt="Profile" />
                <div class="flex flex-col min-w-0">
                  <span class="text-[13px] font-bold text-white leading-tight">{{ nickname }}</span>
                  <span class="text-[10px] text-white/30">R$ {{ balance.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- ═══ MAIN CONTENT ══════════════════════════════════════ -->
       <NuxtPage />
    </div>

    <!-- ═══ MODAL: REDEEM KEY ════════════════════════════════ -->
    <transition name="modal-fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="closeModal" />
        <transition name="modal-zoom">
          <div class="relative w-full max-w-md rounded-3xl border p-8 flex flex-col gap-6 overflow-hidden"
            style="background:rgba(2,2,10,0.97);border-color:rgba(255,255,255,0.1);box-shadow:0 24px 80px rgba(0,0,0,0.7)">
            <!-- glow -->
            <div class="pointer-events-none absolute inset-0"
              style="background:radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 60%)" />
            <!-- corner brackets -->
            <span class="absolute top-3 left-3 w-3 h-3 border-l border-t border-blue-500/40" />
            <span class="absolute top-3 right-3 w-3 h-3 border-r border-t border-blue-500/40" />
            <span class="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-blue-500/40" />
            <span class="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-blue-500/40" />

            <button @click="closeModal" class="absolute top-4 right-4 text-white/30 hover:text-white transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <div class="relative flex flex-col items-center gap-2 text-center">
              <div class="w-12 h-12 flex items-center justify-center rounded-2xl border mb-1"
                style="background:#0a0a0a;border-color:rgba(59,130,246,0.2)">
                <svg class="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/>
                </svg>
              </div>
              <h2 class="font-display text-[1.4rem] font-extrabold tracking-tight text-white">Redeem Key</h2>
              <p class="text-[13px] text-white/30">Enter your key below to add funds to your account.</p>
            </div>

            <input v-model="keyInput" placeholder="e.g. WAVE-XXXXXXXXXXXX"
              class="w-full px-4 py-3 rounded-xl border bg-transparent text-white text-[13px] outline-none transition placeholder:text-white/20 focus:border-blue-500/50"
              style="border-color:rgba(255,255,255,0.08)" />

            <button @click="redeemKey" :disabled="loading"
              class="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-[13px] font-bold rounded-xl transition-all hover:-translate-y-px">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {{ loading ? 'Redeeming...' : 'Confirm' }}
            </button>

            <div v-if="redeemMessage" class="text-center text-[12px] font-semibold"
              :class="redeemSuccess ? 'text-emerald-400' : 'text-red-400'">
              {{ redeemMessage }}
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <!-- ═══ MODAL: CREATE KEY (admin) ════════════════════════ -->
    <transition name="modal-fade">
      <div v-if="showCreateKeyModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="closeCreateKeyModal" />
        <transition name="modal-zoom">
          <div class="relative w-full max-w-md rounded-3xl border p-8 flex flex-col gap-6 overflow-hidden"
            style="background:rgba(2,2,10,0.97);border-color:rgba(255,255,255,0.1);box-shadow:0 24px 80px rgba(0,0,0,0.7)">
            <div class="pointer-events-none absolute inset-0"
              style="background:radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 60%)" />
            <span class="absolute top-3 left-3 w-3 h-3 border-l border-t border-blue-500/40" />
            <span class="absolute top-3 right-3 w-3 h-3 border-r border-t border-blue-500/40" />
            <span class="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-blue-500/40" />
            <span class="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-blue-500/40" />

            <button @click="closeCreateKeyModal" class="absolute top-4 right-4 text-white/30 hover:text-white transition">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <div class="relative flex flex-col items-center gap-2 text-center">
              <div class="w-12 h-12 flex items-center justify-center rounded-2xl border mb-1"
                style="background:#0a0a0a;border-color:rgba(59,130,246,0.2)">
                <svg class="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                </svg>
              </div>
              <h2 class="font-display text-[1.4rem] font-extrabold tracking-tight text-white">Create Key</h2>
              <p class="text-[13px] text-white/30">Set the value in BRL — code is generated automatically.</p>
            </div>

            <input v-model="newKeyValue" type="number" min="1" placeholder="Value (R$)"
              class="w-full px-4 py-3 rounded-xl border bg-transparent text-white text-[13px] outline-none transition placeholder:text-white/20 focus:border-blue-500/50"
              style="border-color:rgba(255,255,255,0.08)" />

            <button @click="createKey" :disabled="createKeyLoading"
              class="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-[13px] font-bold rounded-xl transition-all hover:-translate-y-px">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              {{ createKeyLoading ? 'Creating...' : 'Create Key' }}
            </button>

            <div v-if="createKeyMessage" class="text-center text-[12px] font-semibold"
              :class="createKeySuccess ? 'text-emerald-400' : 'text-red-400'">
              {{ createKeyMessage }}
            </div>
          </div>
        </transition>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth, db } from '~/firebase'
import { signOut } from 'firebase/auth'
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore'

// ── Router ───────────────────────────────────────────────
const router = useRouter()

// ── User ─────────────────────────────────────────────────
const user = ref(null)

const nickname = ref('User')
const balance = ref(0)
const photoURL = ref('https://i.imgur.com/vJZfcZj.png')

const isAdmin = ref(false)
const isVip = ref(false)
const isReseller = ref(false)

const canCustomize = computed(
  () => isAdmin.value || isReseller.value
)

// ── UI State ─────────────────────────────────────────────
const showMobileMenu = ref(false)
const showProfileMenu = ref(false)
const accountOpen = ref(true)

// ── Redeem Key Modal ─────────────────────────────────────
const showModal = ref(false)
const keyInput = ref('')
const loading = ref(false)
const redeemMessage = ref('')
const redeemSuccess = ref(false)

// ── Create Key Modal ─────────────────────────────────────
const showCreateKeyModal = ref(false)
const newKeyValue = ref('')
const createKeyLoading = ref(false)
const createKeyMessage = ref('')
const createKeySuccess = ref(false)

// ── Helpers ──────────────────────────────────────────────
function generateKeyCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

  let code = ''

  for (let i = 0; i < 16; i++) {
    code += chars.charAt(
      Math.floor(Math.random() * chars.length)
    )
  }

  return `WAVE-${code}`
}

// ── Auth Load ────────────────────────────────────────────
onMounted(() => {
  auth.onAuthStateChanged(async (u) => {
    if (!u) {
      router.push('/login')
      return
    }

    user.value = u

    if (u.photoURL) {
      photoURL.value = u.photoURL
    }

    try {
      const userRef = doc(db, 'users', u.uid)
      const snap = await getDoc(userRef)

      if (!snap.exists()) return

      const data = snap.data()

      nickname.value = data.nickname || 'User'
      balance.value = data.balance || 0

      if (data.photoURL) {
        photoURL.value = data.photoURL
      }

      isAdmin.value = !!data.admin
      isVip.value = !!data.vipAccess
      isReseller.value = !!data.reseller

      await updateDoc(userRef, {
        lastLogin: serverTimestamp()
      })
    } catch (err) {
      console.error(err)
    }
  })
})

// ── Modal Actions ────────────────────────────────────────
function openModal() {
  showModal.value = true
  keyInput.value = ''
  redeemMessage.value = ''
  redeemSuccess.value = false
}

function closeModal() {
  showModal.value = false
}

function openCreateKeyModal() {
  showCreateKeyModal.value = true
  newKeyValue.value = ''
  createKeyMessage.value = ''
  createKeySuccess.value = false
}

function closeCreateKeyModal() {
  showCreateKeyModal.value = false
}

// ── Logout ───────────────────────────────────────────────
async function logout() {
  try {
    await signOut(auth)
    router.push('/login')
  } catch (err) {
    console.error(err)
  }

  showProfileMenu.value = false
}

// ── Redeem Key ───────────────────────────────────────────
async function redeemKey() {
  redeemMessage.value = ''
  redeemSuccess.value = false
  loading.value = true

  try {
    const key = keyInput.value.trim()

    if (!key) {
      redeemMessage.value = 'Digite uma key válida.'
      loading.value = false
      return
    }

    const keyRef = doc(db, 'keys', key)
    const keySnap = await getDoc(keyRef)

    if (!keySnap.exists()) {
      redeemMessage.value = 'Key inválida ou já utilizada.'
      loading.value = false
      return
    }

    const keyData = keySnap.data()
    const value = keyData.value || 0

    const userRef = doc(db, 'users', user.value.uid)

    const newBalance = balance.value + value

    const batch = writeBatch(db)

    batch.update(userRef, {
      balance: newBalance
    })

    batch.set(doc(db, 'usedKeys', key), {
      keyId: key,
      value,
      usedBy: user.value.uid,
      usedByEmail: user.value.email,
      usedAt: serverTimestamp()
    })

    batch.delete(keyRef)

    await batch.commit()

    balance.value = newBalance

    redeemSuccess.value = true
    redeemMessage.value =
      `Key resgatada! Valor: R$ ${value.toFixed(2)}`

    keyInput.value = ''
  } catch (err) {
    console.error(err)

    redeemMessage.value =
      'Erro ao resgatar key.'
  }

  loading.value = false
}

// ── Create Key ───────────────────────────────────────────
async function createKey() {
  createKeyMessage.value = ''
  createKeySuccess.value = false
  createKeyLoading.value = true

  try {
    const value = Number(newKeyValue.value)

    if (!value || value <= 0) {
      createKeyMessage.value =
        'Informe um valor válido.'
      createKeyLoading.value = false
      return
    }

    const keyId = generateKeyCode()

    await setDoc(doc(db, 'keys', keyId), {
      value,
      createdBy: user.value.uid,
      createdByEmail: user.value.email,
      createdAt: serverTimestamp()
    })

    await navigator.clipboard.writeText(keyId)

    createKeySuccess.value = true
    createKeyMessage.value =
      `Key criada: ${keyId}`

    newKeyValue.value = ''
  } catch (err) {
    console.error(err)

    createKeyMessage.value =
      'Erro ao criar key.'
  }

  createKeyLoading.value = false
}

// ── Demo Data ────────────────────────────────────────────
const demoStats = [
  { val: '0', suffix: '', label: 'Cards Loaded' },
  { val: '0', suffix: '', label: 'Hits' },
  { val: '0', suffix: '', label: 'Dies' },
  { val: '0.0', suffix: '%', label: 'Approval Rate' }
]

const demoLogs = [
  { id: 1, type: 'info', text: 'Waiting for input...' },
  { id: 2, type: 'hit', text: '4111111111111111|12/28|123 → APPROVED' },
  { id: 3, type: 'die', text: '5500005555555559|09/27|999 → DECLINED' },
  { id: 4, type: 'hit', text: '378282246310005|01/26|1234 → APPROVED' },
  { id: 5, type: 'die', text: '6011111111111117|11/26|123 → DECLINED' }
]
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

.font-display { font-family: 'Syne', sans-serif; }
.font-sans    { font-family: 'DM Sans', sans-serif; }

/* ── Section label ───────────────────────────────────────── */
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #3b82f6;
  margin-bottom: 8px;
}
.section-label::before {
  content: '';
  display: block;
  width: 18px;
  height: 1px;
  background: #3b82f6;
  opacity: 0.5;
}

/* ── Sidebar links ───────────────────────────────────────── */
.sidebar-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255,255,255,0.35);
  border: 1px solid transparent;
  transition: all 0.15s;
  text-decoration: none;
}
.sidebar-link:hover {
  color: rgba(255,255,255,0.75);
  background: rgba(255,255,255,0.03);
}
.sidebar-link--active {
  color: white !important;
  background: rgba(59,130,246,0.08) !important;
  border-color: rgba(59,130,246,0.2) !important;
}
.sidebar-sub-link {
  display: block;
  padding: 6px 12px;
  font-size: 13px;
  color: rgba(255,255,255,0.3);
  text-decoration: none;
  border-radius: 8px;
  transition: color 0.15s;
}
.sidebar-sub-link:hover { color: rgba(255,255,255,0.7); }

/* ── Profile menu items ─────────────────────────────────── */
.profile-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  transition: all 0.15s;
  cursor: pointer;
  background: transparent;
  border: none;
}
.profile-menu-item:hover { color: white; background: rgba(255,255,255,0.05); }
.profile-menu-item--danger:hover { color: #f87171; background: rgba(239,68,68,0.08); }

/* ── FAQ / accordion transition ─────────────────────────── */
.faq-enter-active, .faq-leave-active { transition: all .25s cubic-bezier(0.4, 0, 0.2, 1); }
.faq-enter-from, .faq-leave-to { opacity: 0; transform: translateY(-6px); }

/* ── Curtain (mobile drawer) ────────────────────────────── */
.curtain-enter-active, .curtain-leave-active { transition: opacity .2s, transform .2s; }
.curtain-enter-from, .curtain-leave-to { opacity: 0; }

/* ── Modal transitions ──────────────────────────────────── */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .22s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-zoom-enter-active, .modal-zoom-leave-active { transition: all .26s cubic-bezier(.4, 2, .6, 1); }
.modal-zoom-enter-from, .modal-zoom-leave-to { opacity: 0; transform: scale(0.93) translateY(8px); }

/* ── Scrollbar ───────────────────────────────────────────── */
html { scrollbar-width: thin; scrollbar-color: #1a1a1a #000; }
::-webkit-scrollbar { width: 4px; background: #000; }
::-webkit-scrollbar-thumb { background: #222; border-radius: 99px; }
</style>