<template>
  <div class="relative min-h-screen w-full overflow-x-hidden bg-black text-white font-sans md:ml-[260px] pt-20 md:pt-4">

    <!-- ═══ BACKGROUND ════════════════════════════════════════ -->
    <div class="pointer-events-none fixed inset-0 z-0">
      <div class="absolute inset-0"
        style="background-image:linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px);background-size:72px 72px;mask-image:radial-gradient(ellipse 90% 80% at 50% 20%,black 40%,transparent 100%)"/>
      <div class="absolute inset-0 opacity-50"
        style="background-image:repeating-linear-gradient(-45deg,transparent,transparent 40px,rgba(255,255,255,0.01) 40px,rgba(255,255,255,0.01) 41px)"/>
      <div class="absolute rounded-full" style="width:800px;height:800px;top:-300px;left:10%;filter:blur(180px);background:radial-gradient(circle,rgba(59,130,246,0.065) 0%,transparent 70%)"/>
      <div class="absolute rounded-full" style="width:600px;height:600px;bottom:-100px;right:-80px;filter:blur(180px);background:radial-gradient(circle,rgba(139,92,246,0.05) 0%,transparent 70%)"/>
      <div class="absolute rounded-full" style="width:400px;height:400px;top:35%;left:-80px;filter:blur(140px);background:radial-gradient(circle,rgba(255,255,255,0.02) 0%,transparent 70%)"/>
    </div>

    <div class="mx-auto w-full max-w-6xl px-5 sm:px-7 lg:px-10 pt-4 pb-20 relative z-10">

      <!-- ═══ PAGE HEADER ═══════════════════════════════════════ -->
      <div class="mb-8">
        <div class="flex items-center gap-2 mb-4">
          <span class="section-label">Overview</span>
        </div>
        <div class="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 class="font-display text-[2rem] sm:text-[2.5rem] font-extrabold tracking-[-0.04em] leading-tight text-white">
              Welcome back<span class="text-blue-400">,</span>
            </h1>
            <p class="text-[13px] text-white/30 mt-1">Here's what's happening with your account today.</p>
          </div>
          <!-- Live badge -->
          <div class="flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-bold uppercase tracking-widest self-start mt-1"
            style="background:rgba(34,197,94,0.07);border-color:rgba(34,197,94,0.18);color:#4ade80">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
            Account active
          </div>
        </div>
      </div>

      <!-- ═══ STAT CARDS ROW ════════════════════════════════════ -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden mb-6"
        style="background:rgba(255,255,255,0.07)">

        <!-- Balance -->
        <div class="stat-card group">
          <div class="stat-card-icon" style="background:rgba(59,130,246,0.1);border-color:rgba(59,130,246,0.2)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
            </svg>
          </div>
          <div class="font-display text-[1.9rem] font-extrabold tracking-[-0.04em] leading-none text-white mt-3 mb-1">
            R$<span class="text-blue-400 truncate">{{ balance?.toFixed(2) ?? '0.00' }}</span>
          </div>
          <div class="text-[10px] font-semibold uppercase tracking-widest text-white/25">Current Balance</div>
          <!-- bottom glow line -->
          <div class="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style="background:linear-gradient(to right,transparent,rgba(59,130,246,0.5),transparent)"/>
        </div>

        <!-- Lives taken -->
        <div class="stat-card group">
          <div class="stat-card-icon" style="background:rgba(239,68,68,0.08);border-color:rgba(239,68,68,0.2)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
          </div>
          <div class="font-display text-[1.9rem] font-extrabold tracking-[-0.04em] leading-none text-white mt-3 mb-1 truncate">
            {{ livesUsed }}<span class="text-red-400 text-[1rem] ml-0.5">lives</span>
          </div>
          <div class="text-[10px] font-semibold uppercase tracking-widest text-white/25">Total Lives Taken</div>
          <div class="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style="background:linear-gradient(to right,transparent,rgba(239,68,68,0.4),transparent)"/>
        </div>

        <!-- Role -->
        <div class="stat-card group">
          <div class="stat-card-icon"
            :style="roleIconStyle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" :stroke="roleIconColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div class="font-display text-[1.9rem] font-extrabold tracking-[-0.04em] leading-none mt-3 mb-1 truncate"
            :style="{ color: roleColor }">
            {{ accountStatus }}
          </div>
          <div class="text-[10px] font-semibold uppercase tracking-widest text-white/25">Account Role</div>
          <div class="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            :style="`background:linear-gradient(to right,transparent,${roleColor}66,transparent)`"/>
        </div>

        <!-- Total expenses -->
        <div class="stat-card group">
          <div class="stat-card-icon" style="background:rgba(251,191,36,0.08);border-color:rgba(251,191,36,0.2)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          </div>
          <div class="font-display text-[1.9rem] font-extrabold tracking-[-0.04em] leading-none text-white mt-3 mb-1">
            R$<span class="text-amber-400">{{ avgSpentWeek?.toFixed(2) ?? '0.00' }}</span>
          </div>
          <div class="text-[10px] font-semibold uppercase tracking-widest text-white/25">Total Expenses</div>
          <div class="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate"
            style="background:linear-gradient(to right,transparent,rgba(251,191,36,0.4),transparent)"/>
        </div>
      </div>

      <!-- ═══ MIDDLE ROW ════════════════════════════════════════ -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">

        <!-- Account Status — wide card -->
        <div class="lg:col-span-3 rounded-2xl border overflow-hidden relative group"
          style="background:#030305;border-color:rgba(255,255,255,0.07)">
          <!-- corner brackets -->
          <span class="absolute top-3 left-3 w-3 h-3 border-l border-t opacity-30 transition-opacity group-hover:opacity-70" :style="`border-color:${roleColor}`"/>
          <span class="absolute top-3 right-3 w-3 h-3 border-r border-t opacity-30 transition-opacity group-hover:opacity-70" :style="`border-color:${roleColor}`"/>
          <span class="absolute bottom-3 left-3 w-3 h-3 border-l border-b opacity-30 transition-opacity group-hover:opacity-70" :style="`border-color:${roleColor}`"/>
          <span class="absolute bottom-3 right-3 w-3 h-3 border-r border-b opacity-30 transition-opacity group-hover:opacity-70" :style="`border-color:${roleColor}`"/>

          <!-- glow -->
          <div class="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            :style="`background:radial-gradient(ellipse at 50% 0%,${roleColor}0d 0%,transparent 60%)`"/>

          <!-- header -->
          <div class="flex items-center justify-between px-6 py-4 border-b" style="border-color:rgba(255,255,255,0.06)">
            <div class="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              <span class="text-[10px] font-bold uppercase tracking-widest text-white/30">Account Status</span>
            </div>
            <span class="text-[10px] font-semibold text-white/20">{{ lastLogin || '—' }}</span>
          </div>

          <!-- body -->
          <div class="px-6 py-6 flex flex-col gap-6">
            <!-- profile row -->
            <div class="flex items-center gap-5">
              <div class="relative shrink-0">
                <div class="w-16 h-16 rounded-2xl overflow-hidden border-2"
                  :style="`border-color:${roleColor}55`">
                  <img :src="photoURL" class="w-full h-full object-cover" alt="Avatar"/>
                </div>
                <!-- online dot -->
                <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black bg-emerald-500"/>
              </div>
              <div class="flex-1 min-w-0">
                <div class="font-display text-[1.3rem] font-extrabold tracking-tight text-white leading-tight truncate">
                  {{ nickname || user?.email?.split('@')[0] || 'User' }}
                </div>
                <div class="flex items-center gap-2 mt-1.5">
                  <button @click="copyEmail"
                    class="flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition group/email">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                    <span class="font-mono text-[11px] truncate max-w-[200px]">{{ user?.email || '...' }}</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" class="opacity-0 group-hover/email:opacity-100 transition"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                  </button>
                  <transition name="fade-pop">
                    <span v-if="copied" class="text-[10px] text-emerald-400 font-bold">Copied!</span>
                  </transition>
                </div>
              </div>
            </div>

            <!-- status pill + perks -->
            <div class="flex flex-wrap gap-3 items-center">
              <!-- big role badge -->
              <div class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border"
                :style="`background:${roleColor}12;border-color:${roleColor}35`">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" :stroke="roleColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span class="font-display font-extrabold text-[14px] tracking-tight" :style="`color:${roleColor}`">
                  {{ accountStatus }}
                </span>
              </div>

              <!-- perks chips -->
              <template v-for="perk in rolePerksList" :key="perk">
                <span class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold"
                  style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.45)">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {{ perk }}
                </span>
              </template>
            </div>

            <!-- progress bar (balance usage) -->
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <span class="text-[10px] uppercase tracking-widest font-bold text-white/25">Balance usage</span>
                <span class="text-[11px] font-mono font-bold text-white/40">{{ balanceUsagePercent }}%</span>
              </div>
              <div class="h-1.5 rounded-full overflow-hidden" style="background:rgba(255,255,255,0.06)">
                <div class="h-full rounded-full transition-all duration-700"
                  :style="`width:${balanceUsagePercent}%;background:linear-gradient(to right,${roleColor}88,${roleColor})`"/>
              </div>
              <div class="flex items-center justify-between mt-1.5">
                <span class="text-[10px] text-white/20 font-mono">R$ {{ avgSpentWeek?.toFixed(2) }} spent</span>
                <span class="text-[10px] text-white/20 font-mono">R$ {{ balance?.toFixed(2) }} left</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick stats sidebar -->
        <div class="lg:col-span-2 flex flex-col gap-4">

          <!-- Last login -->
          <div class="flex-1 rounded-2xl border px-5 py-5 flex flex-col justify-between"
            style="background:#030305;border-color:rgba(255,255,255,0.07)">
            <div class="flex items-center gap-2 mb-3">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span class="text-[10px] font-bold uppercase tracking-widest text-white/25">Last Login</span>
            </div>
            <div class="font-mono text-[13px] text-white/60 leading-relaxed">{{ lastLogin || 'First session' }}</div>
            <div class="mt-3 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
              <span class="text-[10px] text-emerald-400/70 font-semibold">Active session</span>
            </div>
          </div>

          <!-- Checker stats -->
          <div class="flex-1 rounded-2xl border px-5 py-5"
            style="background:#030305;border-color:rgba(255,255,255,0.07)">
            <div class="flex items-center gap-2 mb-4">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
              <span class="text-[10px] font-bold uppercase tracking-widest text-white/25">Checker</span>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="rounded-xl p-3" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06)">
                <div class="font-display text-[1.4rem] font-extrabold tracking-tight leading-none" style="color:#4ade80">{{ livesUsed }}</div>
                <div class="text-[9px] uppercase tracking-widest font-bold text-white/20 mt-1">Lives taken</div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ═══ VERIFIED RESELLERS ════════════════════════════════ -->
      <div class="rounded-2xl border overflow-hidden" style="background:#030305;border-color:rgba(255,255,255,0.07)">
        <!-- header -->
        <div class="flex items-center justify-between px-6 py-4 border-b" style="border-color:rgba(255,255,255,0.06)">
          <div class="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.63 19.79 19.79 0 01.04 4.18 2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <span class="text-[10px] font-bold uppercase tracking-widest text-white/30">Verified Resellers</span>
          </div>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);color:#60a5fa">
            {{ resellers.length }} verified
          </span>
        </div>

        <!-- reseller grid -->
        <div class="p-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <a v-for="r in resellers" :key="r.name"
            :href="r.url" target="_blank" rel="noopener"
            class="reseller-card group">
            <!-- avatar initials -->
            <div class="w-10 h-10 rounded-xl flex items-center justify-center font-display font-extrabold text-[15px] mb-3 transition-transform group-hover:scale-105"
              :style="`background:${r.color}18;border:1px solid ${r.color}30;color:${r.color}`">
              {{ r.name.charAt(0).toUpperCase() }}
            </div>
            <div class="text-[13px] font-bold text-white leading-tight">{{ r.name }}</div>
            <div class="flex items-center gap-1 mt-1.5">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              <span class="text-[10px] text-blue-400/70 font-semibold">Verified</span>
            </div>
            <!-- telegram handle -->
            <div class="flex items-center gap-1.5 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
              </svg>
              <span class="text-[10px] font-mono text-white/30">{{ r.handle }}</span>
            </div>
            <!-- hover glow -->
            <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              :style="`box-shadow:inset 0 0 0 1px ${r.color}25`"/>
          </a>
        </div>

        <!-- footer note -->
        <div class="px-6 py-3 border-t flex items-center gap-2" style="border-color:rgba(255,255,255,0.05)">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span class="text-[10px] text-white/20">Only purchase from verified resellers. Contact <span class="text-blue-400/60">@yuzuuk1</span> to become one.</span>
        </div>
      </div>

    </div>

    <!-- ═══ NICKNAME MODAL ════════════════════════════════════ -->
    <transition name="modal-fade">
      <div v-if="showNicknameModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-sm"/>
        <transition name="modal-zoom">
          <div class="relative w-full max-w-sm rounded-3xl border p-8 flex flex-col gap-5 overflow-hidden"
            style="background:#020208;border-color:rgba(255,255,255,0.1);box-shadow:0 24px 80px rgba(0,0,0,0.7)">
            <div class="pointer-events-none absolute inset-0"
              style="background:radial-gradient(ellipse at 50% 0%,rgba(59,130,246,0.07) 0%,transparent 55%)"/>
            <span class="absolute top-3 left-3 w-3 h-3 border-l border-t border-blue-500/40"/>
            <span class="absolute top-3 right-3 w-3 h-3 border-r border-t border-blue-500/40"/>
            <span class="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-blue-500/40"/>
            <span class="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-blue-500/40"/>

            <div class="relative flex flex-col items-center gap-2 text-center">
              <div class="w-12 h-12 flex items-center justify-center rounded-2xl border mb-1"
                style="background:rgba(59,130,246,0.1);border-color:rgba(59,130,246,0.25)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h2 class="font-display text-[1.3rem] font-extrabold tracking-tight text-white">Choose your nickname</h2>
              <p class="text-[12px] text-white/35 leading-relaxed">Set a nickname to personalise your account. You can change it later.</p>
            </div>

            <div v-if="nicknameError" class="text-[11px] text-red-400 text-center font-semibold">{{ nicknameError }}</div>

            <input v-model="nicknameInput" type="text" maxlength="20" placeholder="e.g. darkwave99"
              class="w-full px-4 py-3 rounded-xl border bg-transparent text-white text-[13px] outline-none transition placeholder:text-white/20 focus:border-blue-500/50"
              style="border-color:rgba(255,255,255,0.08)"
              @keyup.enter="saveNickname"/>

            <button @click="saveNickname"
              class="relative flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold text-white transition-all hover:-translate-y-px"
              style="background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.25)">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              Save nickname
            </button>
          </div>
        </transition>
      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { auth, db } from '~/firebase'
import {
  doc, getDoc, getDocs, collection,
  updateDoc, serverTimestamp, query, where
} from 'firebase/firestore'

/* ── user data ──────────────────────────────────────────── */
const user          = ref(null)
const balance       = ref(0)
const livesUsed     = ref(0)
const checksMonth   = ref(0)
const avgSpentWeek  = ref(0)
const lastLogin     = ref('')
const accountStatus = ref('Common')
const nickname      = ref('')
const photoURL      = ref('https://i.imgur.com/qqG1ZOD.jpeg')
const copied        = ref(false)

/* ── nickname modal ─────────────────────────────────────── */
const showNicknameModal = ref(false)
const nicknameInput     = ref('')
const nicknameError     = ref('')

/* ── role theming ───────────────────────────────────────── */
const roleMap = {
  Administrator: { color: '#a78bfa', icon: 'shield',  },
  Reseller:      { color: '#fb923c', icon: 'briefcase',  },
  Premium:       { color: '#38bdf8', icon: 'star',  },
  Common:        { color: '#94a3b8', icon: 'user',  },
  Blocked:       { color: '#ef4444', icon: 'x-circle',  },
}

const roleColor     = computed(() => roleMap[accountStatus.value]?.color ?? '#94a3b8')
const rolePerksList = computed(() => roleMap[accountStatus.value]?.perks ?? [])
const roleIconColor = computed(() => roleColor.value)
const roleIconStyle = computed(() => `background:${roleColor.value}12;border-color:${roleColor.value}30;border-width:1px;border-style:solid`)

/* ── balance usage (visual) ─────────────────────────────── */
const balanceUsagePercent = computed(() => {
  const spent = avgSpentWeek.value ?? 0
  const left  = balance.value ?? 0
  const total = spent + left
  if (!total) return 0
  return Math.min(100, Math.round((spent / total) * 100))
})

/* ── resellers ──────────────────────────────────────────── */
const resellers = [
  { name: 'Yuzuk',   handle: '@yuzuuk1',       url: 'https://t.me/yuzuuk1',       color: '#60a5fa' },
  { name: 'Zenitsu', handle: '@figthcobrita',   url: 'https://t.me/figthcobrita',  color: '#4ade80' },
  { name: 'Malibu',  handle: '@Mbuu25',         url: 'https://t.me/Mbuu25',        color: '#fb923c' },
  { name: 'Bolka',   handle: '@TioBolkano',     url: 'https://t.me/TioBolkano',   color: '#a78bfa' },
]

/* ── firebase ───────────────────────────────────────────── */
onMounted(() => {
  auth.onAuthStateChanged(async u => {
    if (!u) return
    user.value     = u
    photoURL.value = u.photoURL || photoURL.value

    try {
      await updateDoc(doc(db, 'users', u.uid), { lastLogin: serverTimestamp() })
    } catch {}

    const snap = await getDoc(doc(db, 'users', u.uid))
    if (snap.exists()) {
      const d = snap.data()
      balance.value      = d.balance       ?? 0
      livesUsed.value    = d.livesUsed     ?? 0
      checksMonth.value  = d.checksMonth   ?? 0
      avgSpentWeek.value = d.avgSpentWeek  ?? 0
      accountStatus.value = d.status       ?? 'Common'
      nickname.value     = d.nickname      || ''

      if (d.lastLogin?.toDate) lastLogin.value = d.lastLogin.toDate().toLocaleString('pt-BR')
      else lastLogin.value = d.lastLogin ?? ''

      if (!nickname.value) showNicknameModal.value = true
    }
  })
})

/* ── actions ────────────────────────────────────────────── */
function copyEmail() {
  if (user.value?.email) {
    navigator.clipboard.writeText(user.value.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 1400)
  }
}

async function saveNickname() {
  nicknameError.value = ''
  const nick = nicknameInput.value.trim()
  if (!nick || nick.length < 3) { nicknameError.value = 'Minimum 3 characters.'; return }

  const q    = query(collection(db, 'users'), where('nicknameLower', '==', nick.toLowerCase()))
  const snap = await getDocs(q)
  if (snap.docs.some(d => d.id !== user.value?.uid)) { nicknameError.value = 'Nickname already taken.'; return }

  try {
    await updateDoc(doc(db, 'users', user.value.uid), { nickname: nick, nicknameLower: nick.toLowerCase() })
    nickname.value = nick
    showNicknameModal.value = false
  } catch { nicknameError.value = 'Error saving nickname.' }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

.font-display { font-family: 'Syne', sans-serif; }
.font-sans    { font-family: 'DM Sans', sans-serif; }
.font-mono    { font-family: 'JetBrains Mono','Fira Code','Courier New',monospace; }

/* ── Section label ───────────────────────────────────────── */
.section-label {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  color: #3b82f6;
}
.section-label::before {
  content: ''; display: block; width: 18px; height: 1px;
  background: #3b82f6; opacity: 0.5;
}

/* ── Stat cards ──────────────────────────────────────────── */
.stat-card {
  position: relative;
  background: #030305;
  padding: 24px 22px;
  display: flex; flex-direction: column;
  transition: background 0.2s;
  overflow: hidden;
}
.stat-card:hover { background: #080810; }
.stat-card-icon {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 10px; border-width: 1px; border-style: solid;
  flex-shrink: 0;
}

.stat-value {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.2rem, 2.6vw, 1.8rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

/* ── Reseller cards ──────────────────────────────────────── */
.reseller-card {
  position: relative;
  display: flex; flex-direction: column;
  padding: 16px;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.02);
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
  overflow: hidden;
}
.reseller-card:hover {
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.1);
  transform: translateY(-2px);
}

/* ── Transitions ─────────────────────────────────────────── */
.fade-pop-enter-active,.fade-pop-leave-active { transition: all 0.2s ease; }
.fade-pop-enter-from,.fade-pop-leave-to { opacity: 0; transform: scale(0.85); }

.modal-fade-enter-active,.modal-fade-leave-active { transition: opacity .2s ease; }
.modal-fade-enter-from,.modal-fade-leave-to { opacity: 0; }
.modal-zoom-enter-active,.modal-zoom-leave-active { transition: all .25s cubic-bezier(.4,2,.6,1); }
.modal-zoom-enter-from,.modal-zoom-leave-to { opacity: 0; transform: scale(0.94) translateY(6px); }

/* ── Scrollbar ───────────────────────────────────────────── */
html { scrollbar-width: thin; scrollbar-color: #1a1a1a #000; }
::-webkit-scrollbar { width: 4px; background: #000; }
::-webkit-scrollbar-thumb { background: #1e1e1e; border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: rgba(122,167,255,0.35); }
html, body { overflow-x: hidden !important; }
</style>